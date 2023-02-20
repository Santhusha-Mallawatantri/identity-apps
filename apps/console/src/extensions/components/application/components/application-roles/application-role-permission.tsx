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
import { Forms } from "@wso2is/forms";
import { ContentLoader, EmphasizedSegment, EmptyPlaceholder, GenericIcon, Heading } from "@wso2is/react-components";
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
import { Accordion, Checkbox, Icon, Input, Table } from "semantic-ui-react";
import { getAuthorizedAPIList } from "../../api";
import { AuthorizedAPIListItemInterface, AuthorizedPermissionListItemInterface } from "../../models";

/**
 * Interface to capture permission list props.
 */
interface PermissionListProp extends  IdentifiableComponentInterface {
    emphasize?: boolean;
    appId?: string;
    triggerSubmit?: boolean;
    initialValues: string[];
    onSubmit?: (permissions: string[]) => void;
}

/**
 * Component to create the API permission list.
 *
 * @param props - Props containing event handlers and data for permission list.
 */
export const PermissionList: FunctionComponent<PermissionListProp> = (props: PermissionListProp): ReactElement => {

    const {
        emphasize,
        appId,
        triggerSubmit,
        onSubmit,
        [ "data-componentid" ]: componentId
    } = props;

    const { t } = useTranslation();
    const dispatch: Dispatch<any> = useDispatch();
    

    const [ isPermissionsLoading, setIsPermissionsLoading ] = useState<boolean>(true);
    const [ authorizedAPIResourceList, setAuthorizedAPIResourceList ] = useState<AuthorizedAPIListItemInterface[]>([]);
    const [ 
        filteredAuthorizedAPIResourceList,
        setFilteredAuthorizedAPIResourceList
    ] = useState<AuthorizedAPIListItemInterface[]>([]);
    const [ expandedAPIs, setExpandedAPIs ] = useState<string[]>([]);
    const [ assignedPermissions, setAssignedPermissions ] = useState<string[]>([]);

    useEffect(() => {
        getAPIAuthorizations(appId);
    }, []);

    /**
     * Get the authorized API permissions.
     * 
     * @param appId - Application Id.
     */
    const getAPIAuthorizations = (appId: string): void => {
        getAuthorizedAPIList(appId)
            .then((response: AuthorizedAPIListItemInterface[]) => {
                setAuthorizedAPIResourceList(response);
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
                setAuthorizedAPIResourceList([]);
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
        if (assignedPermissions.includes(permissionName)) {
            const newAssignededPermissions: string[] = assignedPermissions.filter(
                (item: string) => item !== permissionName);

            setAssignedPermissions(newAssignededPermissions);
        } else {
            const newAssignededPermissions: string[] = [ ...assignedPermissions, permissionName ];

            setAssignedPermissions(newAssignededPermissions);
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
                                        checked={ assignedPermissions && 
                                            assignedPermissions.some(
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
    const renderAPIList = (): ReactElement => (
        <>
            {
                !isPermissionsLoading
                    ? (
                        <>
                            <Input
                                data-componentid={ `${ componentId }-permissions-list-search-input` }
                                icon={ <Icon name="search" /> }
                                placeholder={ t(
                                    "extensions:develop.applications.edit.sections.roles." + 
                                    "addRoleWizard.forms.rolePermissions.searchPlaceholer"
                                ) }
                                floated="left"
                                size="small"
                                onChange={ (
                                    e: FormEvent<HTMLInputElement>,
                                    { value }: { value: string; }
                                ) => {
                                    handleSearchFieldChange(e, value, authorizedAPIResourceList, 
                                        setFilteredAuthorizedAPIResourceList, setExpandedAPIs);
                                } }
                                fluid
                            />
                            <Accordion
                                data-componentid={ `${ componentId }-permissions` }
                                className="nested-list-accordion"
                            >
                                { filteredAuthorizedAPIResourceList &&
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
                        </>
                    )
                    : <ContentLoader className="p-3" active />
            }
        </>
    );

    return (
        <Forms
            submitState={ triggerSubmit }
            onSubmit={ () => { onSubmit(assignedPermissions); } }
        >
            {
                !isPermissionsLoading
                    ? (
                        (authorizedAPIResourceList.length > 0)
                            ? (
                                <>
                                    <Heading as="h5" className="mt-3">
                                        {
                                            t("extensions:develop.applications.edit.sections.roles.addRoleWizard." +
                                            "forms.rolePermissions.label")
                                        }
                                    </Heading>
                                    { emphasize
                                        ? (
                                            <EmphasizedSegment data-componentid={ componentId } padded={ false }>
                                                { renderAPIList() }
                                            </EmphasizedSegment>
                                        )
                                        : (
                                            <div data-componentid={ componentId }>
                                                { renderAPIList() }
                                            </div>
                                        )
                                    }
                                </>
                            )
                            : (
                                <div className={ "empty-placeholder-center" }>
                                    <EmptyPlaceholder
                                        subtitle={ [ 
                                            t("extensions:develop.applications.edit.sections.roles.placeHolders." + 
                                            "emptyPermissions.subtitles.0") 
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
        </Forms>
    );
};

/**
 * Default props for the component.
 */
PermissionList.defaultProps = {
    emphasize: true
};
