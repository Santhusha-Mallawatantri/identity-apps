/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content.
 */

import { AlertLevels, IdentifiableComponentInterface } from "@wso2is/core/models";
import { addAlert } from "@wso2is/core/store";
import {
    ContentLoader,
    EmphasizedSegment,
    EmptyPlaceholder,
    GenericIcon,
    Heading,
    LinkButton,
    PrimaryButton,
    useWizardAlert
} from "@wso2is/react-components";
import { AxiosError } from "axios";
import React, {
    Dispatch,
    FormEvent,
    Fragment,
    FunctionComponent,
    ReactElement,
    SetStateAction,
    useEffect,
    useState
} from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Accordion, Checkbox, Grid, Icon, Input, Modal, Table } from "semantic-ui-react";
import { getAuthorizedAPIList, updateRolePermissions } from "../../api/application-roles";
import { 
    AuthorizedAPIListItemInterface,
    AuthorizedPermissionListItemInterface,
    PermissionListItemInterface,
    RoleListItemInterface,
    UpdateRolePayloadInterface
} from "../../models";

/**
 * Interface to capture selected application roles details.
 */
interface EdiApplicationRoleProps extends IdentifiableComponentInterface {
    onShowEditRoleModal: (show: boolean) => void;
    appId: string;
    selectedRole?: RoleListItemInterface;
    showEditRoleModal: boolean;
}

/**
 * Component to edit selected application roles details.
 *
 * @param props - Application roles details prop types.
 */
export const EditApplicationRole: FunctionComponent<EdiApplicationRoleProps> = (
    props: EdiApplicationRoleProps): ReactElement => {

    const {
        onShowEditRoleModal,
        appId,
        selectedRole,
        showEditRoleModal,
        [ "data-componentid" ]: componentId
    } = props;

    const { t } = useTranslation();
    const dispatch: Dispatch<any> = useDispatch();
    const [ alert, setAlert, alertComponent ] = useWizardAlert();

    const [ expandedAPIs, setExpandedAPIs ] = useState<string[]>([]);
    const [ checkedPermissions, setCheckedPermissions ] = useState<string[]>([]);
    const [ addedPermissions, setAddedPermissions ] = useState<string[]>([]);
    const [ removedPermissions, setRemovedPermissions ] = useState<string[]>([]);
    const [ authorizedAPIResourceList, setApiAuthorizationsList ] = useState<AuthorizedAPIListItemInterface[]>([]);
    const [ 
        filteredAuthorizedAPIResourceList,
        setFilteredAuthorizedAPIResourceList
    ] = useState<AuthorizedAPIListItemInterface[]>([]);
    const [ isPermissionsLoading, setIsPermissionsLoading ] = useState<boolean>(true);
    const [ isSubmitting, setIsSubmitting ] = useState<boolean>(false);

    useEffect(() => {
        if (showEditRoleModal) {
            const checkedPermissionsList: string[] = [];

            if (selectedRole && selectedRole.permissions.length > 0) {
                selectedRole.permissions.map( (permission: PermissionListItemInterface) => {
                    checkedPermissionsList.push(permission.name);
                });
            }
            setCheckedPermissions(checkedPermissionsList);
            getAPIAuthorizations(appId);
        }
    }, [ selectedRole, showEditRoleModal ]);

    /**
     * Get the authorized API permissions.
     * 
     * @param appId - Application Id.
     */
    const getAPIAuthorizations = (appId: string): void => {
        getAuthorizedAPIList(appId)
            .then((response: AuthorizedAPIListItemInterface[]) => {
                setApiAuthorizationsList(response);
                setFilteredAuthorizedAPIResourceList(response);
                setExpandedAPIs(getDefaultExpandedAPIs(response));
            }).catch((error: AxiosError) => {
                if (error?.response?.data?.description) {
                    dispatch(addAlert({
                        description: error?.response?.data?.description ??
                            error?.response?.data?.detail ??
                            t("extensions:develop.applications.edit.sections.roles.notifications." + 
                                "fetchAuthorizedAPIs.error.description"),
                        level: AlertLevels.ERROR,
                        message: error?.response?.data?.message ??
                            t("extensions:develop.applications.edit.sections.roles.notifications." + 
                                "fetchAuthorizedAPIs.error.message")
                    }));

                    return;
                }
                dispatch(addAlert({
                    description: t("extensions:develop.applications.edit.sections.roles.notifications." + 
                        "fetchAuthorizedAPIs.genericError.description"),
                    level: AlertLevels.ERROR,
                    message: t("extensions:develop.applications.edit.sections.roles.notifications." + 
                        "fetchAuthorizedAPIs.genericError.message")
                }));
                setApiAuthorizationsList([]);
                setFilteredAuthorizedAPIResourceList([]);
                setExpandedAPIs([]);
            })
            .finally(() => {
                setIsPermissionsLoading(false);
            });
    };

    /**
     * Get default expanded API list.
     * 
     * @param apiList - API list item.
     * 
     * @returns Default expanded APIs.
     */
    const getDefaultExpandedAPIs = (apiList: AuthorizedAPIListItemInterface[]): string[] => {
        const initialExpandedAPIs: string[] = [];

        apiList.map(
            (api: AuthorizedAPIListItemInterface) => {
                initialExpandedAPIs.push(api.apiId);
            }
        );

        return initialExpandedAPIs;
    };

    /**
     * Handle the expand/collapse of the APIs.
     * 
     * @param api - API list item.
     */
    const handleAccordionTitleClick = (api: AuthorizedAPIListItemInterface) => {
        let tempExpandedAPIs: string[] = [ ...expandedAPIs ];

        if (!expandedAPIs?.includes(api.apiId)) {
            tempExpandedAPIs.push(api.apiId);
        } else {
            tempExpandedAPIs =  tempExpandedAPIs
                .filter((apiDeselected: string) =>
                    apiDeselected !== api.apiId);
        }
        setExpandedAPIs(tempExpandedAPIs);
    };

    /**
     * Handle checkbox change of a permission.
     * 
     * @param permissionName - Permission name.
     */
    const handleCheckboxChange = (permissionName: string) => {
        if (checkedPermissions.includes(permissionName)) {
            const newcheckedPermissions: string[] = checkedPermissions.filter(
                (item: string) => item !== permissionName);

            setCheckedPermissions(newcheckedPermissions);
            if (addedPermissions.includes(permissionName)) {
                const newAddedRoles: string[] = addedPermissions.filter(
                    (item: string) => item !== permissionName);

                setAddedPermissions(newAddedRoles);
            } else {
                const newRemovedRoles: string[] = [ ...removedPermissions, permissionName ];

                setRemovedPermissions(newRemovedRoles);
            }
        } else {
            const newcheckedPermissions: string[] = [ ...checkedPermissions, permissionName ];

            setCheckedPermissions(newcheckedPermissions);
            if (removedPermissions.includes(permissionName)) {
                const newRemovedRoles: string[] = removedPermissions.filter(
                    (item: string) => item !== permissionName);

                setRemovedPermissions(newRemovedRoles);
            } else {
                const newAddedRoles: string[] = [ ...addedPermissions, permissionName ];

                setAddedPermissions(newAddedRoles);
            }
        }
    };

    /**
     * Handle the search field query change.
     * 
     * @param e - Event.
     * @param query - Search query.
     * @param list - Unfiltered API list.
     * @param stateActionList - Set filtered APIs action.
     * @param stateActionExpanded - Set expanded APIs action.
     */
    const handleSearchFieldChange = (
        e: FormEvent<HTMLInputElement>, 
        query: string, 
        list: AuthorizedAPIListItemInterface[],
        stateActionList: Dispatch<SetStateAction<any>>, 
        stateActionExpanded: Dispatch<SetStateAction<any>>
    ) => {

        if (query.length > 0) {
            searchFilter(query, list, stateActionList, stateActionExpanded);
        } else {
            stateActionList(list);
            stateActionExpanded(getDefaultExpandedAPIs(list));
        }
    };

    /**
     * Search operation for API/permissions.
     *
     * @param changeValue - Search value.
     * @param list - Unfiltered API list.
     * @param stateActionList - Set filtered APIs action.
     * @param stateActionExpanded - Set expanded APIs action.
     */
    const searchFilter = (
        changeValue: string,
        list: AuthorizedAPIListItemInterface[], 
        stateActionList: Dispatch<SetStateAction<any>>,
        stateActionExpanded:  Dispatch<SetStateAction<any>>
    ) => {
        if (changeValue !== ""){
            const apiFiltered: AuthorizedAPIListItemInterface[] = list
                .filter((item: AuthorizedAPIListItemInterface) =>
                    item.apiDisplayName?.toLowerCase().indexOf(changeValue.toLowerCase()) !== -1);
 
            const unfilteredAPIs: AuthorizedAPIListItemInterface[] = [ ...list ];
            const tempExpandedAPIs: string[] = [];
            const apiPermissionsFiltered: AuthorizedAPIListItemInterface[] = [];
 
            unfilteredAPIs.forEach((api: AuthorizedAPIListItemInterface) => {
                const matchedPermissions: AuthorizedPermissionListItemInterface[] = api.permissions
                    .filter((permission: AuthorizedPermissionListItemInterface) =>
                        (permission.displayName?.toLowerCase().indexOf(changeValue.toLowerCase()) !== -1 ));
 
                if (matchedPermissions !== undefined && matchedPermissions.length !== 0) {
 
                    if (!tempExpandedAPIs.includes(api.apiId)) {
                        tempExpandedAPIs.push(api.apiId);
                    }
 
                    const updatedAPI: AuthorizedAPIListItemInterface = {
                        ...api,
                        permissions: matchedPermissions
                    };

                    apiPermissionsFiltered.push(updatedAPI);
                }
                apiFiltered.map((apiTemp: AuthorizedAPIListItemInterface) => {
                    if (apiTemp.apiId === api.apiId && matchedPermissions.length === 0){
                        apiPermissionsFiltered.push(api);
                    }
                });
            });
            stateActionList(apiPermissionsFiltered);
            stateActionExpanded(tempExpandedAPIs);
        }
    };

    /**
     * Handle edit application role modal close.
     */
    const handleCloseEditRoleModal = () => {
        onShowEditRoleModal(false);
        setIsPermissionsLoading(true);
    };

    /**
     * Handle save for editted application role.
     */
    const handleSave = () => {
        updateRolePermissionsList();
    };

    /**
     * Update the application role with added and removed permissions.
     */
    const updateRolePermissionsList = () => {
        const payload: UpdateRolePayloadInterface = {
            added_permissions: addedPermissions.map( 
                (permission: string) => { return { name: permission }; } ),
            name: selectedRole.name,
            removed_permissions: removedPermissions.map(
                (permission: string) => { return { name: permission }; } )
        };

        setIsSubmitting(true);
        updateRolePermissions(appId, selectedRole.name, payload)
            .then(() => {
                dispatch(addAlert({
                    description: t("extensions:develop.applications.edit.sections.roles.notifications." +
                        "updatePermissions.success.description"),
                    level: AlertLevels.SUCCESS,
                    message: t("extensions:develop.applications.edit.sections.roles.notifications." + 
                        "updatePermissions.success.message")
                }));
            }).catch(() => {
                setAlert({
                    description: t("extensions:develop.applications.edit.sections.roles.notifications." + 
                        "updatePermissions.genericError.description"),
                    level: AlertLevels.ERROR,
                    message: t("extensions:develop.applications.edit.sections.roles.notifications." + 
                        "updatePermissions.genericError.message")
                });
            }).finally(() => {
                setIsSubmitting(false);
                onShowEditRoleModal(false);
            });
    };

    /**
     * Render the permission list of an API list item.
     * 
     * @param permissions - Permission list.
     * 
     * @returns Permission list component.
     */
    const resolvePermissionsList = (permissions: AuthorizedPermissionListItemInterface[]): ReactElement => {
        return (
            <>
                {
                    permissions.map((permission: AuthorizedPermissionListItemInterface) => {
                        return (
                            <Table.Row key={ permission.id } width="10" >
                                <Table.Cell key={ permission.id } >
                                    <Checkbox 
                                        label={ permission.displayName }
                                        checked={ checkedPermissions && 
                                            checkedPermissions.some(
                                                (checkedPermission: string) => checkedPermission === permission.name) }
                                        onClick={ () => handleCheckboxChange(permission.name) }
                                    />
                                </Table.Cell>
                            </Table.Row>
                        );
                    })
                }
            </>
        );
    };


    /**
     * Render the API list with permissions.
     * 
     * @returns API list component.
     */
    const renderAPIList = (): ReactElement => {
        return (
            <EmphasizedSegment size="small">
                <Grid className="transfer-list" padded="vertically" >
                    <Grid.Row>
                        <Grid.Column>
                            <Input
                                loading={ false }
                                data-componentid={ componentId }
                                icon={ <Icon name="search"/> }
                                iconPosition={ "left" }
                                fluid
                                placeholder={ 
                                    t("extensions:develop.applications.edit.sections.roles." + 
                                        "editModal.searchPlaceholer")
                                }
                                onChange={ (
                                    e: FormEvent<HTMLInputElement>,
                                    { value }: { value: string; }
                                ) => {
                                    handleSearchFieldChange(e, value, authorizedAPIResourceList, 
                                        setFilteredAuthorizedAPIResourceList, setExpandedAPIs);
                                } }
                                disabled={ false }
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Accordion
                                data-componentid={ `${ componentId }-permissions` }
                                className="nested-list-accordion"
                            >
                                {
                                    filteredAuthorizedAPIResourceList.map(
                                        (api: AuthorizedAPIListItemInterface) => {
                                            return (
                                                <Fragment key={ api.apiId }>
                                                    <Accordion.Title
                                                        id={ api.apiId }
                                                        data-componentid={ `${componentId}-${api.apiId}-title` }
                                                        attached={ true }
                                                        active={ expandedAPIs?.includes(api.apiId) }
                                                        accordionIndex={ api.apiId }
                                                        className="nested-list-accordion-title"
                                                        onClick={ 
                                                            () => 
                                                                handleAccordionTitleClick(api)
                                                        }
                                                        hideChevron={ false }
                                                    >
                                                        <GenericIcon
                                                            size="default"
                                                            defaultIcon
                                                            link
                                                            inline
                                                            transparent
                                                            spaced="right"
                                                            verticalAlign="middle"
                                                            floated="left"
                                                            data-componentid={ `${ componentId }-chevron` }
                                                            icon={ <Icon name="angle right" className="chevron"/> }
                                                        />
                                                        { api.apiDisplayName }
                                                    </Accordion.Title>
                                                    <Accordion.Content
                                                        active={ expandedAPIs?.includes(api.apiId) }
                                                        className="nested-list-accordion-content-checkbox"
                                                        data-componentid={ `${componentId}-${api.apiId}-content` }
                                                        children={ resolvePermissionsList(api.permissions) }
                                                    />
                                                </Fragment>
                                            );
                                        })
                                }
                            </Accordion>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </EmphasizedSegment>
        );
    };

    return (
        <Modal
            data-componentid={ `${ componentId }-edit-permissions-modal` }
            className="wizard"
            dimmer="blurring"
            open={ showEditRoleModal }
            size="small"
        >
            <Modal.Header>
                { t("extensions:develop.applications.edit.sections.roles.editModal.heading") }
                <Heading subHeading ellipsis as="h6">
                    { t("extensions:develop.applications.edit.sections.roles.editModal.subHeading") }
                </Heading>
            </Modal.Header>
            <Modal.Content className="content-container" scrolling>
                { alert && alertComponent   }
                <>
                    {
                        !isPermissionsLoading
                            ? (
                                (authorizedAPIResourceList.length > 0)
                                    ? (
                                        <>
                                            { renderAPIList() }
                                        </>
                                    )
                                    : (
                                        <div className={ "empty-placeholder-center" }>
                                            <EmptyPlaceholder
                                                subtitle={ [ 
                                                    t("extensions:develop.applications.edit.sections.roles." + 
                                                    "placeHolders.emptyPermissions.subtitles.0") 
                                                ] }
                                                data-componentid={ `${ componentId }-empty-permission-placeholder` }
                                            />
                                        </div>
                                    )
                            )
                            : (
                                <ContentLoader />
                            )
                    }
                </>
            </Modal.Content>
            <Modal.Actions>
                <Grid>
                    <Grid.Row columns={ 2 }>
                        <Grid.Column mobile={ 8 } tablet={ 8 } computer={ 8 }>
                            <LinkButton
                                data-componentid={ `${ componentId }-edit-permissions-modal-cancel-button` }
                                onClick={ handleCloseEditRoleModal }
                                floated="left"
                            >
                                { t("common:cancel") }
                            </LinkButton>
                        </Grid.Column>
                        <Grid.Column mobile={ 8 } tablet={ 8 } computer={ 8 }>
                            <PrimaryButton
                                data-componentid={ `${ componentId }-edit-permissions-modal-save-button` }
                                onClick={ handleSave }
                                floated="right"
                                loading={ isSubmitting }
                                disabled={ isSubmitting }
                            >
                                { t("common:save") }
                            </PrimaryButton>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Modal.Actions>
        </Modal>
    );
};
