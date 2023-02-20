/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content.
 */

import {
    AlertLevels,
    IdentifiableComponentInterface,
    LoadableComponentInterface
} from "@wso2is/core/models";
import { addAlert } from "@wso2is/core/store";
import {
    Button, ContentLoader,
    EmphasizedSegment,
    EmptyPlaceholder,
    GenericIcon,
    Heading,
    LinkButton,
    PrimaryButton,
    Text,
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
import { Accordion, Checkbox,Divider, Grid, Icon, Input, Modal, Table } from "semantic-ui-react";
import { getApplicationList } from "../../../../features/applications/api";
import { ApplicationListInterface, ApplicationListItemInterface } from "../../../../features/applications/models";
import { getEmptyPlaceholderIllustrations } from "../../../../features/core";
import { GroupsInterface } from "../../../../features/groups";
import { getAllApplicationRolesList,
    getAssignedApplicationRolesList,
    updateGroupRoleMapping
} from "../api/application-roles";
import { ApplicationRoleInterface,
    GroupRoleAssignPayloadInterface,
    RoleBasicInterface
} from "../models/application-roles";

/**
 * Proptypes for the group users list component.
 */
interface GroupRolesListProps extends IdentifiableComponentInterface, LoadableComponentInterface {
    group: GroupsInterface;
    isGroup: boolean;
    isReadOnly?: boolean;
    onGroupUpdate: (groupId: string) => void;
    isGroupDetailsRequestLoading: boolean;
}

/**
 * Group roles tab component.
 * 
 * @param props - Props related to group roles tab component.
 */
export const GroupRolesList: FunctionComponent<GroupRolesListProps> = (props: GroupRolesListProps): ReactElement => {
    const {
        isReadOnly,
        group,
        onGroupUpdate,
        isGroupDetailsRequestLoading,
        [ "data-componentid" ]: componentId
    } = props;

    const { t } = useTranslation();
    const dispatch: Dispatch<any> = useDispatch();
    const [ alert, setAlert, alertComponent ] = useWizardAlert();

    const [ appList, setAppList ] = useState<ApplicationListItemInterface[]>(undefined);
    const [ allApplicationRoleList, setAllApplicationRoleList ] = useState<ApplicationRoleInterface[]>([]);
    const [ selectedApplicationRoleList, setSelectedApplicationRoleList ] = useState<ApplicationRoleInterface[]>([]);
    const [ 
        allFilteredApplicationRoleList,
        setAllFilteredApplicationRoleList
    ] = useState<ApplicationRoleInterface[]>([]);
    const [ 
        selectedFilteredApplicationRoleList,
        setSelectedFilteredApplicationRoleList
    ] = useState<ApplicationRoleInterface[]>([]);
    const [ isAssignedRolesFetchRequestLoading, setIsAssignedRolesFetchRequestLoading ] = useState<boolean>(true);
    const [ isApplicationRolesFetchRequestLoading, setIsApplicationRolesFetchRequestLoading ] = useState<boolean>(true);
    const [ isApplicationsFetchRequestLoading, setIsApplicationFetchRequestLoading ] = useState<boolean>(true);
    const [ showAssignApplicationRolesModal, setShowAssignApplicationRolesModal ] = useState<boolean>(false);

    const [ addedRoles, setAddedRoles ] = useState<string[]>([]);
    const [ removedRoles, setRemovedRoles ] = useState<string[]>([]);
    const [ checkedRoles, setCheckedRoles ] = useState<string[]>([]);

    const [ expandedApplications, setExpandedApplications ] = useState<string[]>([]);
    const [ expandedAssignedApplications, setExpandedAssignedApplications ] = useState<string[]>([]);
    const [ isSubmitting, setIsSubmitting ] = useState<boolean>(false);

    useEffect(() => {
        getApplicationList(null, null, null)
            .then((response: ApplicationListInterface) => {
                setAppList(response.applications);
                setIsApplicationFetchRequestLoading(false);
            })
            .catch((error: AxiosError) => {
                if (error.response && error.response.data && error.response.data.description) {
                    dispatch(addAlert({
                        description: error.response.data.description,
                        level: AlertLevels.ERROR,
                        message: t("console:develop.features.applications.notifications.fetchApplications." +
                            "error.message")
                    }));

                    return;
                }
                dispatch(addAlert({
                    description: t("console:develop.features.applications.notifications.fetchApplications" +
                        ".genericError.description"),
                    level: AlertLevels.ERROR,
                    message: t("console:develop.features.applications.notifications.fetchApplications." +
                        "genericError.message")
                }));
            });
    }, []);

    useEffect(() => {
        getAssignedApplicationRoles();
        getAllApplicationRoles();
    }, [ group ]);

    /**
     * Get the assigned application roles of the group.
     */
    const getAssignedApplicationRoles = (): void => {

        setIsAssignedRolesFetchRequestLoading(true);
        getAssignedApplicationRolesList(encodeURIComponent(group?.displayName))
            .then((response: ApplicationRoleInterface[]) => {
                setSelectedApplicationRoleList(response);
                setSelectedFilteredApplicationRoleList(response);
                addCheckedRoles(response);
                setExpandedAssignedApplications(getDefaultExpandedApps(response));
            }).catch((error: AxiosError) => {
                if (error?.response?.data?.description) {
                    dispatch(addAlert({
                        description: error?.response?.data?.description ?? error?.response?.data?.detail ?? 
                            t("extensions:manage.groups.edit.roles.notifications.fetchAssignedApplicationRoles." + 
                                "error.description"),
                        level: AlertLevels.ERROR,
                        message: error?.response?.data?.message ?? 
                            t("extensions:manage.groups.edit.roles.notifications.fetchAssignedApplicationRoles." + 
                                "error.message")
                    }));

                    return;
                }
                dispatch(addAlert({
                    description: t("extensions:manage.groups.edit.roles.notifications.fetchAssignedApplicationRoles." + 
                        "genericError.description"),
                    level: AlertLevels.ERROR,
                    message: t("extensions:manage.groups.edit.roles.notifications.fetchAssignedApplicationRoles." + 
                        "genericError.message")
                }));

                setSelectedApplicationRoleList([]);
                setSelectedFilteredApplicationRoleList([]);
            })
            .finally(() => {
                setIsAssignedRolesFetchRequestLoading(false);
            });
    };

    /**
     * Get all the application roles in the organization.
     */
    const getAllApplicationRoles = (): void => {

        setIsApplicationRolesFetchRequestLoading(true);
        getAllApplicationRolesList()
            .then((response: ApplicationRoleInterface[]) => {
                setAllApplicationRoleList(response);
                setAllFilteredApplicationRoleList(response);
                setExpandedApplications(getDefaultExpandedApps(response));
            }).catch((error: AxiosError) => {
                if (error?.response?.data?.description) {
                    dispatch(addAlert({
                        description: error?.response?.data?.description ?? error?.response?.data?.detail ?? 
                            t("extensions:manage.groups.edit.roles.notifications.fetchApplicationRoles." + 
                                "error.description"),
                        level: AlertLevels.ERROR,
                        message: error?.response?.data?.message ??
                            t("extensions:manage.groups.edit.roles.notifications.fetchApplicationRoles." +
                                "error.message")
                    }));

                    return;
                }

                dispatch(addAlert({
                    description: t("extensions:manage.groups.edit.roles.notifications.fetchApplicationRoles." + 
                        "genericError.description"),
                    level: AlertLevels.ERROR,
                    message: t("extensions:manage.groups.edit.roles.notifications.fetchApplicationRoles." + 
                        "genericError.message")
                }));

                setAllApplicationRoleList([]);
                setAllFilteredApplicationRoleList([]);
            })
            .finally(() => {
                setIsApplicationRolesFetchRequestLoading(false);
            });
    };

    /**
     * Get the application name by application ID.
     * 
     * @param app_id - Application ID.
     * 
     * @returns Application name.
     */
    const getApplicationName = (app_id: string): string => {

        const applicationFiltered: ApplicationListItemInterface[] = appList
            .filter((item: ApplicationListItemInterface) =>
                item.id === app_id);

        if (applicationFiltered.length === 1) {
            return applicationFiltered[0].name;
        }

        return app_id;
    };

    /**
     * Get default expanded application list.
     * 
     * @param app - Application role list item.
     * 
     * @returns Default expanded apps.
     */
    const getDefaultExpandedApps = (appRoleList: ApplicationRoleInterface[]): string[] => {
        const initialExpandedApps: string[] = [];

        appRoleList.map(
            (appRole: ApplicationRoleInterface) => {
                initialExpandedApps.push(appRole.app);
            }
        );

        return initialExpandedApps;
    };

    /**
     * Add the selected application roles of the group to checked roles.
     * 
     * @param list - Assigned application roles list.
     */
    const addCheckedRoles = (list: ApplicationRoleInterface[]): void => {
        const tempList: string[] = [];

        list.map( (appRole: ApplicationRoleInterface) => {
            const app_id: string = appRole.app;

            appRole.roles.map( (role: RoleBasicInterface) => {
                tempList.push(app_id + ":" + role.name);
            });
        });
        setCheckedRoles(tempList);
    };

    /**
     * Handle the search field query change.
     * 
     * @param e - Event.
     * @param query - Search query.
     * @param list - Unfiltered application roles list.
     * @param stateActionList - Set filtered application roles action.
     * @param stateActionExpanded - Set expanded application roles action.
     */
    const handleSearchFieldChange = (
        e: FormEvent<HTMLInputElement>,
        query: string,
        list: ApplicationRoleInterface[],
        stateActionList: Dispatch<SetStateAction<any>>,
        stateActionExpanded: Dispatch<SetStateAction<any>>
    ) => {

        if (query.length > 0) {
            searchFilter(query, list, stateActionList, stateActionExpanded);
        } else {
            stateActionList(list);
            stateActionExpanded(getDefaultExpandedApps(list));
        }
    };

    /**
     * Search operation for application roles.
     * 
     * @param changeValue - Search value.
     * @param list - Unfiltered application roles list.
     * @param stateActionList - Set filtered application roles action.
     * @param stateActionExpanded - Set expanded application roles action.
     */
    const searchFilter = (
        changeValue: string,
        list: ApplicationRoleInterface[],
        stateActionList: Dispatch<SetStateAction<any>>,
        stateActionExpanded: Dispatch<SetStateAction<any>>
    ) => {
        if (changeValue !== ""){
            const applicationsFiltered: ApplicationRoleInterface[] = list
                .filter((item: ApplicationRoleInterface) =>
                    getApplicationName(item.app)?.toLowerCase().indexOf(changeValue.toLowerCase()) !== -1);

            const unfilteredRoles: ApplicationRoleInterface[] = [ ...list ];
            const tempExpandedApplication: string[] = [];
            const applicationRolesFiltered: ApplicationRoleInterface[] = [];

            unfilteredRoles.forEach((application: ApplicationRoleInterface) => {
                const matchedRoles: RoleBasicInterface[] = application.roles
                    .filter((role: RoleBasicInterface) =>
                        (role.name?.toLowerCase().indexOf(changeValue.toLowerCase()) !== -1 ));

                if (matchedRoles !== undefined && matchedRoles.length !== 0) {
                    if (!tempExpandedApplication.includes(application.app)) {
                        tempExpandedApplication.push(application.app);
                    }
                    const updatedApplication: ApplicationRoleInterface = { 
                        app: application.app,
                        roles: matchedRoles
                    };

                    applicationRolesFiltered.push(updatedApplication);
                }
                applicationsFiltered.map((tempApplication: ApplicationRoleInterface) => {
                    if (tempApplication.app === application.app && matchedRoles.length === 0){
                        applicationRolesFiltered.push(application);
                    }
                });
            });
            stateActionList(applicationRolesFiltered);
            stateActionExpanded(tempExpandedApplication);
        }
    };

    /**
     * Handle open assign application roles modal.
     */
    const handleOpenAssignApplicationRolesModal = () => {
        setShowAssignApplicationRolesModal(true);
    };

    /**
     * Handle close assign application roles modal.
     */
    const handleCloseAssignApplicationRolesModal = () => {
        setShowAssignApplicationRolesModal(false);
    };

    /**
     * Get the application roles list nested by application.
     * 
     * @param roleNameList - Application qualified role name list.
     * 
     * @returns Application roles list nested by application.
     */
    const getOrderedRoleList = (roleNameList: string[]): ApplicationRoleInterface[] => {
        const applicationRoleList: ApplicationRoleInterface[] = [];

        roleNameList.map((roleName: string) => {
            const appId: string = roleName.split(":")[0];
            const role: string = roleName.split(":")[1];

            if (applicationRoleList.some( (item: ApplicationRoleInterface) => item.app === appId)) {
                const itemIndex: number = applicationRoleList.findIndex( 
                    (item: ApplicationRoleInterface) => item.app === appId);
                const appRoleItem: ApplicationRoleInterface = applicationRoleList[itemIndex];

                appRoleItem.roles.push({ name: role });
                applicationRoleList[itemIndex] = appRoleItem;
            } else {
                applicationRoleList.push({
                    app: appId,
                    roles: [ { name: role } ]
                });
            }
        });

        return applicationRoleList;
    };

    /**
     * Update assigned applications roles.
     */
    const updateGroupRolesList = () => {

        const orderedAddedRoles: ApplicationRoleInterface[] = getOrderedRoleList(addedRoles);
        const orderedRemovedRoles: ApplicationRoleInterface[] = getOrderedRoleList(removedRoles);
        const payload: GroupRoleAssignPayloadInterface = {
            added_roles: orderedAddedRoles,
            removed_roles: orderedRemovedRoles
        };

        setIsSubmitting(true);
        updateGroupRoleMapping(encodeURIComponent(group?.displayName), payload)
            .then(() => {
                dispatch(addAlert({
                    description: t("extensions:manage.groups.edit.roles.notifications.updateApplicationRoles." + 
                        "success.description"),
                    level: AlertLevels.SUCCESS,
                    message: t("extensions:manage.groups.edit.roles.notifications.updateApplicationRoles." + 
                        "success.message")
                }));
                onGroupUpdate(group.id);
            }).catch(() => {
                setAlert({
                    description: t("extensions:manage.groups.edit.roles.notifications.updateApplicationRoles." + 
                        "genericError.description"),
                    level: AlertLevels.ERROR,
                    message: t("extensions:manage.groups.edit.roles.notifications.updateApplicationRoles." + 
                        "genericError.message")
                });
            }).finally(() => {
                setIsSubmitting(false);
                setShowAssignApplicationRolesModal(false);
            });
    };

    /**
     * Handle expand accordion title.
     * 
     * @param appRole - Application role.
     */
    const handleAccordionTitleClick = (
        appRole: ApplicationRoleInterface,
        expandedList: string[],
        stateActionExpanded: Dispatch<SetStateAction<any>>
    ) => {
        let tempExpandedList: string[] = [ ...expandedList ];

        if (!expandedList?.includes(appRole.app)) {
            tempExpandedList.push(appRole.app);
        } else {
            tempExpandedList =  tempExpandedList
                .filter((roleDeselected: string) =>
                    roleDeselected !== appRole.app);
        }
        stateActionExpanded(tempExpandedList);
    };

    /**
     * Handle checkbox change of application roles.
     * 
     * @param appId - Application.
     * @param roleName - Application role name.
     */
    const handleCheckboxChange = (appId: string, roleName: string) => {
        const appQualifiedRoleName: string = appId + ":" + roleName;

        if (checkedRoles.includes(appQualifiedRoleName)) {
            const newCheckedRoles: string[] = checkedRoles.filter( 
                (item: string) => item !== appQualifiedRoleName);

            setCheckedRoles(newCheckedRoles);
            if (addedRoles.includes(appQualifiedRoleName)) {
                const newAddedRoles: string[] = addedRoles.filter(
                    (item: string) => item !== appQualifiedRoleName);

                setAddedRoles(newAddedRoles);
            } else {
                const newRemovedRoles: string[] = [ ...removedRoles ].concat(appQualifiedRoleName);

                setRemovedRoles(newRemovedRoles);
            }
        } else {
            const newCheckedRoles: string[] = [ ...checkedRoles ].concat(appQualifiedRoleName);

            setCheckedRoles(newCheckedRoles);
            if (removedRoles.includes(appQualifiedRoleName)) {
                const newRemovedRoles: string[] = removedRoles.filter(
                    (item: string) => item !== appQualifiedRoleName);

                setRemovedRoles(newRemovedRoles);
            } else {
                const newAddedRoles: string[] = [ ...addedRoles ].concat(appQualifiedRoleName);

                setAddedRoles(newAddedRoles);
            }
        }

    };

    /**
     * Renders the nested role list.
     * 
     * @param roles - Role list.
     * @param appId - Application Id.
     * 
     * @returns Selected role list component.
     */
    const resolveSelectedApplicationRolesList = (roles: RoleBasicInterface[], appId: string): ReactElement => {
        return (
            <>
                {
                    roles.map((role: RoleBasicInterface) => {
                        return (
                            <Table.Row key={ role.name } width="10" >
                                <Table.Cell key={ role.name } >
                                    <Checkbox 
                                        label={ role.name }
                                        checked={ checkedRoles && 
                                            checkedRoles.some( 
                                                (checkedRole: string) => checkedRole === appId + ":" + role.name) }
                                        onClick={ () => handleCheckboxChange(appId, role.name) }
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
     * Render the assign application roles modal.
     * 
     * @returns Modal component.
     */
    const assignApplicationRolesModal = () => (
        <Modal
            data-componentid={ `${ componentId }-assign-role-wizard-modal` }
            className="wizard"
            dimmer="blurring"
            open={ showAssignApplicationRolesModal }
            size="small"
        >
            <Modal.Header>
                { t("extensions:manage.groups.edit.roles.addNewModal.heading") }
                <Heading subHeading ellipsis as="h6">
                    { t("extensions:manage.groups.edit.roles.addNewModal.subHeading") }
                </Heading>
            </Modal.Header>
            <Modal.Content className="content-container" scrolling>
                { alert && alertComponent }
                <EmphasizedSegment size="small">
                    <Grid className="transfer-list" padded="vertically" >
                        <Grid.Row>
                            <Grid.Column>
                                <Input
                                    data-componentid={ `${ componentId }-roles-list-search-input` }
                                    icon={ <Icon name="search" /> }
                                    onChange={ (
                                        e: FormEvent<HTMLInputElement>,
                                        { value }: { value: string; }
                                    ) => {
                                        handleSearchFieldChange(
                                            e,
                                            value,
                                            allApplicationRoleList, 
                                            setAllFilteredApplicationRoleList,
                                            setExpandedApplications
                                        );
                                    } }
                                    placeholder={
                                        t("extensions:manage.groups.edit.roles.searchPlaceholder")
                                    }
                                    floated="left"
                                    size="small"
                                    fluid
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Accordion
                                    data-componentid={ `${ componentId }-application-roles` }
                                    className="nested-list-accordion"
                                >
                                    {
                                        allFilteredApplicationRoleList.map(
                                            (application: ApplicationRoleInterface) => {
                                                return (
                                                    <Fragment key={ application.app }>
                                                        <Accordion.Title
                                                            id={ application.app }
                                                            data-componentid={ 
                                                                `${componentId}-${application.app}-title`
                                                            }
                                                            attached={ true }
                                                            active={ expandedApplications?.includes(application.app) }
                                                            accordionIndex={ application.app }
                                                            className="nested-list-accordion-title"
                                                            onClick={ 
                                                                () => 
                                                                    handleAccordionTitleClick(
                                                                        application,
                                                                        expandedApplications,
                                                                        setExpandedApplications
                                                                    )
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
                                                            { getApplicationName(application.app) }
                                                        </Accordion.Title>

                                                        <Accordion.Content
                                                            active={ expandedApplications?.includes(application.app) }
                                                            className="nested-list-accordion-content-checkbox"
                                                            data-componentid={ 
                                                                `${componentId}-${application.app}-content`
                                                            }
                                                            children={
                                                                resolveSelectedApplicationRolesList(
                                                                    application.roles,
                                                                    application.app
                                                                )
                                                            }
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
            </Modal.Content>
            <Modal.Actions>
                <Grid>
                    <Grid.Row columns={ 2 }>
                        <Grid.Column mobile={ 8 } tablet={ 8 } computer={ 8 }>
                            <LinkButton
                                data-componentid={ `${ componentId }-assign-role-wizard-modal-cancel-button` }
                                onClick={ handleCloseAssignApplicationRolesModal }
                                floated="left"
                            >
                                { t("common:cancel") }
                            </LinkButton>
                        </Grid.Column>
                        <Grid.Column mobile={ 8 } tablet={ 8 } computer={ 8 }>
                            <PrimaryButton
                                data-componentid={ `${ componentId }-assign-role-wizard-modal-save-button` }
                                onClick={ updateGroupRolesList }
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

    /**
     * Renders the nested role list.
     * 
     * @param roles - Role list.
     * @returns Role list component.
     */
    const resolveApplicationRolesListItem = (roles: RoleBasicInterface[]): ReactElement => {
        return (
            <>
                {
                    roles.map((role: RoleBasicInterface) => {
                        return (
                            <Table.Row key={ role.name } width="10" >
                                <Table.Cell key={ role.name } >
                                    <Text spaced="left">
                                        { role.name }
                                    </Text>
                                </Table.Cell>
                            </Table.Row>
                        );
                    })
                }
            </>
        );
    };

    /**
     * Renders the application roles list.
     * 
     * @param roles - Role list.
     * 
     * @returns Role list component.
     */
    const resolveApplicationRolesList = (filteredApplicationRoles: ApplicationRoleInterface[]): ReactElement => {
        return (
            <>
                {
                    filteredApplicationRoles.map(
                        (application: ApplicationRoleInterface) => {
                            return (
                                <Fragment key={ application.app }>
                                    <Accordion.Title
                                        id={ application.app }
                                        data-componentid={ `${componentId}-${application.app}-title` }
                                        attached={ true }
                                        active={ expandedAssignedApplications?.includes(application.app) }
                                        accordionIndex={ application.app }
                                        className="nested-list-accordion-title"
                                        onClick={ 
                                            () => 
                                                handleAccordionTitleClick(
                                                    application,
                                                    expandedAssignedApplications,
                                                    setExpandedAssignedApplications
                                                )
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
                                        { getApplicationName(application.app) }
                                    </Accordion.Title>

                                    <Accordion.Content
                                        active={ expandedAssignedApplications?.includes(application.app) }
                                        className="nested-list-accordion-content-text"
                                        data-componentid={ `${componentId}-${application.app}-content` }
                                        children={ resolveApplicationRolesListItem(application.roles) }
                                    />
                                </Fragment>
                            );
                        })
                }
            </>
        );
    };


    return (
        <EmphasizedSegment padded="very">
            <Heading as="h4">{ t("extensions:manage.groups.edit.roles.heading") }</Heading>
            <Heading subHeading ellipsis as="h6">
                { t("extensions:manage.groups.edit.roles.description") }
            </Heading>
            <Divider hidden />
            <Grid>
                <Grid.Row>
                    <Grid.Column computer={ 16 }>
                        { (!isGroupDetailsRequestLoading && 
                            !isAssignedRolesFetchRequestLoading &&
                            !isApplicationsFetchRequestLoading) 
                            ? (
                                selectedApplicationRoleList?.length > 0 
                                    ? (
                                        <EmphasizedSegment
                                            data-componentid="group-mgt-application-roles-list"
                                            className="user-role-edit-header-segment"
                                        >
                                            <Grid.Row>
                                                <Grid.Column mobile={ 16 } tablet={ 16 } computer={ 12 }>
                                                    <Input
                                                        data-componentid={ `${ componentId }-roles-list-search-input` }
                                                        icon={ <Icon name="search" /> }
                                                        onChange={ (
                                                            e: FormEvent<HTMLInputElement>,
                                                            { value }: { value: string; }
                                                        ) => {
                                                            handleSearchFieldChange(
                                                                e,
                                                                value,
                                                                selectedApplicationRoleList, 
                                                                setSelectedFilteredApplicationRoleList,
                                                                setExpandedAssignedApplications
                                                            );
                                                        } }
                                                        placeholder={
                                                            t("extensions:manage.groups.edit.roles.searchPlaceholder")
                                                        }
                                                        floated="left"
                                                        size="small"
                                                    />
                                                    { !isReadOnly && (
                                                        <Button
                                                            data-componentid={ 
                                                                `${ componentId }-roles-list-edit-button`
                                                            }
                                                            size="medium"
                                                            icon="pencil"
                                                            floated="right"
                                                            onClick={ handleOpenAssignApplicationRolesModal }
                                                        />
                                                    ) }
                                                </Grid.Column>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <Grid.Column mobile={ 16 } tablet={ 16 } computer={ 12 }>
                                                    <Accordion
                                                        data-componentid={ `${ componentId }-application-roles` }
                                                        className="nested-list-accordion"
                                                    >
                                                        { 
                                                            resolveApplicationRolesList(
                                                                selectedFilteredApplicationRoleList
                                                            )
                                                        }
                                                    </Accordion>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </EmphasizedSegment>
                                    ) 
                                    : (
                                        <Grid.Row>
                                            <Grid.Column mobile={ 16 } tablet={ 16 } computer={ 12 }>
                                                <EmphasizedSegment>
                                                    <EmptyPlaceholder
                                                        title={
                                                            t("extensions:manage.groups.edit.roles.placeHolders." + 
                                                                "emptyList.title")
                                                        }
                                                        subtitle={ 
                                                            [ t("extensions:manage.groups.edit.roles.placeHolders." + 
                                                                "emptyList.subtitles.0") ]
                                                        }
                                                        action={
                                                            !isReadOnly && (
                                                                <PrimaryButton
                                                                    data-componentid={
                                                                        `${ componentId }--empty-assign-roles-button`
                                                                    }
                                                                    onClick={ handleOpenAssignApplicationRolesModal }
                                                                >
                                                                    <Icon name="plus" />
                                                                    { t("extensions:manage.groups.edit.roles." + 
                                                                        "placeHolders.emptyList.action") }
                                                                </PrimaryButton>
                                                            )
                                                        }
                                                        image={ getEmptyPlaceholderIllustrations().emptyList }
                                                        imageSize="tiny"
                                                    />
                                                </EmphasizedSegment>
                                            </Grid.Column>
                                        </Grid.Row>
                                    )
                            ) 
                            : (
                                <ContentLoader />
                            ) }
                        { 
                            !isApplicationsFetchRequestLoading && 
                            !isApplicationRolesFetchRequestLoading && 
                            assignApplicationRolesModal()
                        }
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </EmphasizedSegment>
    );
};
