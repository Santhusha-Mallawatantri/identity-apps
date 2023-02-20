/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content.
 */

import { AccessControlConstants, Show } from "@wso2is/access-control";
import { AlertLevels, IdentifiableComponentInterface } from "@wso2is/core/models";
import { addAlert } from "@wso2is/core/store";
import { useTrigger } from "@wso2is/forms";
import {
    AnimatedAvatar,
    AppAvatar,
    ConfirmationModal,
    ContentLoader,
    DataTable,
    EmphasizedSegment,
    EmptyPlaceholder,
    Heading,
    LinkButton,
    ListLayout,
    PrimaryButton,
    TableActionsInterface,
    TableColumnInterface,
    useConfirmationModalAlert
} from "@wso2is/react-components";
import { AxiosError } from "axios";
import React, {
    FunctionComponent,
    MouseEvent,
    ReactElement,
    ReactNode,
    SyntheticEvent,
    useCallback,
    useEffect,
    useState
} from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { Divider, DropdownProps, Grid, Header, Icon, PaginationProps, SemanticICONS } from "semantic-ui-react";
import { CreateApplicationRoleWizard } from "./create-app-role-wizard";
import { EditApplicationRole } from "./edit-app-role";
import { 
    AdvancedSearchWithBasicFilters,
    UIConstants,
    getEmptyPlaceholderIllustrations,
    history
} from "../../../../../features/core";
import { deleteRole, getApplicationRolesList } from "../../api/application-roles";
import { 
    ApplicationRolesResponseInterface,
    LinkInterface,
    RoleListItemInterface
} from "../../models/application-roles";

/**
 * Application roles component.
 * 
 * @param props - Props related to application roles component.
 */
export const ApplicationRoles: FunctionComponent<IdentifiableComponentInterface> = (
    props: IdentifiableComponentInterface
): ReactElement => {

    const {
        [ "data-componentid" ]: componentId
    } = props;

    const { t } = useTranslation();
    const dispatch: Dispatch<any> = useDispatch();
    const [ alert, setAlert, alertComponent ] = useConfirmationModalAlert();

    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const [ showWizard, setShowWizard ] = useState<boolean>(false);
    const [ showEditModal, setShowEditModal ] = useState<boolean>(false);
    const [ showDeleteConfirmationModal, setShowDeleteConfirmationModal ] = useState<boolean>(false);
    const [ isDeleteSubmitting, setIsDeleteSubmitting ] =  useState<boolean>(false);

    const [ roleList, setRoleList ] = useState<RoleListItemInterface[]>([]);
    const [ roleListItem, setRoleListItem ] = useState<RoleListItemInterface>();
    const [ applicationRoleResponse, setApplicationRoleResponse ] = useState<ApplicationRolesResponseInterface>(null);
    const [ deletingRole, setDeletingRole ] = useState<RoleListItemInterface>(undefined);

    const [ searchQuery, setSearchQuery ] = useState<string>("");
    const [ listItemLimit, setListItemLimit ] = useState<number>(UIConstants.DEFAULT_RESOURCE_LIST_ITEM_LIMIT);
    const [ after, setAfter ] = useState<string>("");
    const [ before, setBefore ] = useState<string>("");
    const [ isApplicationRoleNextPageAvailable, setIsApplicationRoleNextPageAvailable ] = useState<boolean>(undefined);
    const [ isApplicationRoleNextPrevAvailable, setIsApplicationRolePrevPageAvailable ] = useState<boolean>(undefined);
    const [ activePage, setActivePage ] = useState<number>(1);
    const [ paginationReset, triggerResetPagination ] = useTrigger();
    
    const path: string[] = history.location.pathname.split("/");
    const appId: string = path[path.length - 1].split("#")[0];

    useEffect(() => {
        let nextFound: boolean = false;
        let prevFound: boolean = false;

        applicationRoleResponse?.links?.forEach((link: LinkInterface) => {
            if (link.rel === "after") {
                const afterID: string = link.href.split("after=")[ 1 ];

                setAfter(afterID);
                setIsApplicationRoleNextPageAvailable(true);
                nextFound = true;
            }
            if (link.rel === "before") {
                const beforeID: string = link.href.split("before=")[ 1 ];

                setBefore(beforeID);
                setIsApplicationRolePrevPageAvailable(true);
                prevFound = true;
            }
        });

        if (!nextFound) {
            setAfter("");
            setIsApplicationRoleNextPageAvailable(false);
        }
        if (!prevFound) {
            setBefore("");
            setIsApplicationRolePrevPageAvailable(false);
        }
    }, [ applicationRoleResponse ]);

    useEffect(() => {
        getApplicationRoles(appId, null, null, searchQuery? searchQuery: null , listItemLimit);
    }, [ listItemLimit, searchQuery ]);

    /**
     * Get application roles of the application.
     * 
     * @param appId - Application ID.
     * @param before - Before cursor link.
     * @param after - After cursor link.
     * @param filter - Filter query.
     * @param limit - Limit.
     */
    const getApplicationRoles: (
        appId: string,
        before?: string,
        after?: string,
        filter?: string,
        limit?: number
    ) => void = useCallback(
        (appId: string, before?: string, after?: string, filter?: string, limit?: number): void => {
            getApplicationRolesList(appId, before, after, filter, limit)
                .then((response: ApplicationRolesResponseInterface) => {
                    setApplicationRoleResponse(response);
                    setRoleList(response.roles);
                }).catch((error: AxiosError) => {
                    if (error?.response?.data?.description) {
                        dispatch(addAlert({
                            description: error?.response?.data?.description ?? 
                                error?.response?.data?.detail ?? 
                                t("extensions:develop.applications.edit.sections.roles.notifications." + 
                                    "fetchApplicationRoles.error.description"),
                            level: AlertLevels.ERROR,
                            message: error?.response?.data?.message ?? 
                                t("extensions:develop.applications.edit.sections.roles.notifications." + 
                                    "fetchApplicationRoles.error.message")
                        }));

                        return;
                    }
                    dispatch(addAlert({
                        description: t("extensions:develop.applications.edit.sections.roles.notifications." + 
                            "fetchApplicationRoles.genericError.description"),
                        level: AlertLevels.ERROR,
                        message: t("extensions:develop.applications.edit.sections.roles.notifications." + 
                            "fetchApplicationRoles.genericError.message")
                    }));

                    setApplicationRoleResponse({
                        links: [],
                        roles: []
                    });
                    setRoleList([]);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }, [ getApplicationRolesList, setIsLoading ] );

    /**
     * Delete the selected application roles.
     */
    const deleteApplicationRole = (): void => {
        setIsDeleteSubmitting(true);
        deleteRole(appId, deletingRole.name)
            .then(() => {
                dispatch(addAlert({
                    description: t("extensions:develop.applications.edit.sections.roles.notifications." + 
                        "deleteApplicationRole.success.description"),
                    level: AlertLevels.SUCCESS,
                    message: t("extensions:develop.applications.edit.sections.roles.notifications." + 
                        "deleteApplicationRole.success.message")
                }));
                onRoleUpdate();
            }).catch(() => {
                setAlert({
                    description: t("extensions:develop.applications.edit.sections.roles.notifications." + 
                        "deleteApplicationRole.genericError.description"),
                    level: AlertLevels.ERROR,
                    message: t("extensions:develop.applications.edit.sections.roles.notifications." + 
                        "deleteApplicationRole.genericError.message")
                });
            }).finally(() => {
                setIsDeleteSubmitting(false);
                setShowDeleteConfirmationModal(false);
            });
    };

    /**
     * Reset pagination to initial state.
     */
    const resetPagination: () => void = useCallback((): void => {
        setActivePage(1);
        triggerResetPagination();
    }, [ setActivePage, triggerResetPagination ]);

    /**
     * Handles the search query clear action.
     */
    const handleSearchQueryClear: () => void = useCallback((): void => {
        setSearchQuery("");
        resetPagination();
    }, [ setSearchQuery, resetPagination ]);

    /**
     * Handles the `onFilter` callback action.
     *
     * @param query - Search query.
     */
    const handleApplicationRolesFilter: (query: string) => void = useCallback((query: string): void => {
        resetPagination();
        setSearchQuery(query);
    }, [ resetPagination, setSearchQuery ]);

    /**
     * Handles the pagination change.
     *
     * @param event - Mouse event.
     * @param data - Pagination component data.
     */
    const handlePaginationChange: (
        event: MouseEvent<HTMLAnchorElement>,
        data: PaginationProps
    ) => void = useCallback((event: MouseEvent<HTMLAnchorElement>, data: PaginationProps): void => {
        const newPage: number = parseInt(data?.activePage as string);

        if (newPage > activePage) {
            getApplicationRoles(appId, null, after, searchQuery, listItemLimit);
        } else if (newPage < activePage) {
            getApplicationRoles(appId, before, null, searchQuery, listItemLimit);
        }
        setActivePage(newPage);
    }, [ activePage, searchQuery, listItemLimit, after, before ]);

    /**
     * Handles items per page change.
     *
     * @param event - Mouse event.
     * @param data - Dropdown data.
     */
    const handleItemsPerPageDropdownChange: (
        event: MouseEvent<HTMLAnchorElement>,
        data: DropdownProps
    ) => void = useCallback((event: MouseEvent<HTMLAnchorElement>, data: DropdownProps): void => {
        setListItemLimit(data.value as number);
        resetPagination();
    }, [ setListItemLimit, resetPagination ]);

    /**
     * Handle the edit role action.
     * 
     * @param role - Selected role.
     */
    const handleRoleEdit = (role: RoleListItemInterface) => {
        setRoleListItem(role);
        setShowEditModal(true);
    };

    /**
     * Handle the delete role action.
     * 
     * @param role - Selected role.
     */
    const handleRoleDelete = (role: RoleListItemInterface) => {
        setDeletingRole(role);
        setShowDeleteConfirmationModal(true);
    };

    /**
     * Triggers on role update.
     */
    const onRoleUpdate = (): void => {
        getApplicationRoles(appId, null, null, null, null);
    };

    /**
     * Resolves data table actions.
     *
     * @returns TableActionsInterface[]
     */
    const resolveTableActions = (): TableActionsInterface[] => {
        return [
            {
                "data-componentid": `${ componentId }-item-edit-button`,
                hidden: (): boolean => false,
                icon: (): SemanticICONS => "pencil alternate",
                onClick: (e: SyntheticEvent, role: RoleListItemInterface): void => handleRoleEdit(role),
                popupText: (): string => t("common:edit"),
                renderer: "semantic-icon"
            },
            {
                "data-componentid": `${ componentId }-item-delete-button`,
                hidden: (): boolean => false,
                icon: (): SemanticICONS => "trash alternate",
                onClick: (e: SyntheticEvent, role: RoleListItemInterface): void => handleRoleDelete(role),
                popupText: (): string => t("common:delete"),
                renderer: "semantic-icon"
            }
        ];
    };

    /**
     * Resolves data table columns.
     *
     * @returns TableColumnInterface[]
     */
    const resolveTableColumns = (): TableColumnInterface[] => {
        return [
            {
                allowToggleVisibility: false,
                dataIndex: "name",
                id: "name",
                key: "name",
                render: (app: RoleListItemInterface): ReactNode => {
                    return (
                        <Header
                            image
                            as="h6"
                            className="header-with-icon"
                            data-componentid={ `${ componentId }-item-heading` }
                        >
                            <AppAvatar
                                image={ (
                                    <AnimatedAvatar
                                        name={ app.name }
                                        size="mini"
                                        data-componentid={ `${ componentId }-item-image-inner` }
                                    />
                                ) }
                                size="mini"
                                spaced="right"
                                data-componentid={ `${ componentId }-item-image` }
                            />
                            <Header.Content>
                                { app.name }
                            </Header.Content>
                        </Header>
                    );
                },
                title: t("extensions:develop.applications.edit.sections.roles.list.columns.name")
            },
            {
                allowToggleVisibility: false,
                dataIndex: "action",
                id: "actions",
                key: "actions",
                textAlign: "right",
                title: t("extensions:develop.applications.edit.sections.roles.list.columns.actions")
            }
        ];
    };

    /**
     * Resolve the relevant placeholder.
     *
     * @returns React element.
     */
    const showPlaceholders = (): ReactElement => {
        // When the search returns empty.
        if (searchQuery && roleList.length === 0) {
            return (
                <EmptyPlaceholder
                    action={ (
                        <LinkButton onClick={ () => setSearchQuery("") }>
                            { t("extensions:develop.applications.edit.sections.roles.placeHolders." + 
                                "emptySearchResults.action") }
                        </LinkButton>
                    ) }
                    image={ getEmptyPlaceholderIllustrations().emptySearch }
                    imageSize="tiny"
                    title={ t("extensions:develop.applications.edit.sections.roles.placeHolders." + 
                        "emptySearchResults.title") }
                    subtitle={ [
                        t("extensions:develop.applications.edit.sections.roles.placeHolders." + 
                            "emptySearchResults.subtitles.0", { query: searchQuery })
                    ] }
                    data-componentid={ `${ componentId }-empty-search-placeholder-icon` }
                />
            );
        }

        if (roleList.length === 0) {
            return (
                <EmptyPlaceholder
                    className={ "list-placeholder" }
                    action={ 
                        (<Show when={ AccessControlConstants.APPLICATION_WRITE }>
                            <PrimaryButton
                                onClick={ () => { setShowWizard(true); } }>
                                <Icon name="add" />
                                { t("extensions:develop.applications.edit.sections.roles.placeHolders." + 
                                    "emptyList.action") }
                            </PrimaryButton>
                        </Show>)
                    }
                    image={ getEmptyPlaceholderIllustrations().newList }
                    imageSize="tiny"
                    title={ t("extensions:develop.applications.edit.sections.roles.placeHolders." + 
                        "emptyList.title") }
                    subtitle={ [
                        t("extensions:develop.applications.edit.sections.roles.placeHolders." + 
                            "emptyList.subtitles.0")
                    ] }
                    data-componentid={ `${ componentId }-empty-placeholder` }
                />
            );
        }

        return null;
    };

    return (
        !isLoading
            ? (
                <EmphasizedSegment loading={ isLoading } padded="very" data-componentid={ componentId }>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column className="heading-wrapper" computer={ 10 }>
                                <Heading as="h4">
                                    { t("extensions:develop.applications.edit.sections.roles.heading") }
                                </Heading>
                                <Heading subHeading ellipsis as="h6" >
                                    { t("extensions:develop.applications.edit.sections.roles.subHeading") }
                                </Heading>
                            </Grid.Column >
                            <Grid.Column className="action-wrapper" computer={ 6 }>
                                <div className="floated right action">
                                    {
                                        (roleList.length > 0) && (
                                            <PrimaryButton
                                                data-componentid={ `${ componentId }-add-new-role-button` }
                                                onClick={ () => setShowWizard(true) }
                                            >
                                                <Icon name="add"/>
                                                {
                                                    t("extensions:develop.applications.edit.sections." + 
                                                        "roles.buttons.newRole")
                                                }
                                            </PrimaryButton>
                                        )
                                    }
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Divider hidden />
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <ListLayout
                                    advancedSearch={ (
                                        <AdvancedSearchWithBasicFilters
                                            onFilter={ handleApplicationRolesFilter }
                                            filterAttributeOptions={ [
                                                {
                                                    key: 0,
                                                    text: t("common:name"),
                                                    value: "name"
                                                }
                                            ] }
                                            filterValuePlaceholder={
                                                t("extensions:develop.applications.edit.sections.roles." + 
                                                    "advancedSearch.form.inputs.filterValue.placeholder") 
                                            }
                                            placeholder={ 
                                                t("extensions:develop.applications.edit.sections.roles." + 
                                                    "advancedSearch.placeholder")
                                            }
                                            style={ { minWidth: "425px" } }
                                            defaultSearchAttribute="name"
                                            defaultSearchOperator="co"
                                            predefinedDefaultSearchStrategy={
                                                "name co %search-value%"
                                            }
                                            data-componentid={ `${ componentId }-list-advanced-search` }
                                        />
                                    ) }
                                    currentListSize={ roleList.length }
                                    listItemLimit={ listItemLimit }
                                    onItemsPerPageDropdownChange={ handleItemsPerPageDropdownChange }
                                    onPageChange={ handlePaginationChange }
                                    showPagination={ true }
                                    showTopActionPanel={ false }
                                    showPaginationPageLimit={ false }
                                    totalPages={ 10 }
                                    totalListSize={ roleList.length }
                                    paginationOptions={ {
                                        disableNextButton: !isApplicationRoleNextPageAvailable,
                                        disablePreviousButton: !isApplicationRoleNextPrevAvailable
                                    } }
                                    resetPagination={ paginationReset }
                                    activePage={ activePage }
                                    data-componentid={ `${ componentId }-list-layout` }
                                >
                                    <DataTable<RoleListItemInterface>
                                        className="application-roles-table"
                                        isLoading={ false }
                                        onSearchQueryClear={ handleSearchQueryClear }
                                        actions={ resolveTableActions() }
                                        columns={ resolveTableColumns() }
                                        data={ roleList }
                                        onRowClick={ (e: SyntheticEvent, role: RoleListItemInterface): void => 
                                            handleRoleEdit(role) }
                                        placeholders={ showPlaceholders() }
                                        selectable={ true }
                                        showHeader={ true }
                                        transparent={ !isLoading && (showPlaceholders() !== null) }
                                        data-componentid={ `${ componentId }-data-table` }
                                    />
                                </ListLayout>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    {
                        showWizard &&
                            (<CreateApplicationRoleWizard
                                data-componentid="create-app-role-wizard"
                                onRoleUpdate={ onRoleUpdate }
                                closeWizard={ () => setShowWizard(false) }
                                appId={ appId }
                            />)
                    }
                    <EditApplicationRole
                        data-componentid="edit-app-role-wizard"
                        onShowEditRoleModal={ setShowEditModal }
                        selectedRole={ roleListItem }
                        appId={ appId }
                        showEditRoleModal={ showEditModal }
                    />
                    {
                        deletingRole && (
                            <ConfirmationModal
                                primaryActionLoading={ isDeleteSubmitting }
                                onClose={ (): void => setShowDeleteConfirmationModal(false) }
                                type="negative"
                                open={ showDeleteConfirmationModal }
                                assertionHint={ t("extensions:develop.applications.edit.sections.roles." +
                                    "deleteRole.confirmationModal.assertionHint") }
                                assertionType="checkbox"
                                primaryAction={ t("common:confirm") }
                                secondaryAction={ t("common:cancel") }
                                onSecondaryActionClick={ (): void => {
                                    setShowDeleteConfirmationModal(false);
                                    setAlert(null);
                                } }
                                onPrimaryActionClick={ (): void => deleteApplicationRole() }
                                data-componentid={ `${ componentId }-delete-confirmation-modal` }
                                closeOnDimmerClick={ false }
                            >
                                <ConfirmationModal.Header
                                    data-componentid={ `${ componentId }-delete-confirmation-modal-header` }
                                >
                                    { t("extensions:develop.applications.edit.sections.roles." + 
                                        "deleteRole.confirmationModal.header") }
                                </ConfirmationModal.Header>
                                <ConfirmationModal.Message
                                    attached
                                    negative
                                    data-componentid={ `${ componentId }-delete-confirmation-modal-message` }
                                >
                                    { t("extensions:develop.applications.edit.sections.roles." + 
                                        "deleteRole.confirmationModal.message") }
                                </ConfirmationModal.Message>
                                <ConfirmationModal.Content
                                    data-componentid={ `${ componentId }-delete-confirmation-modal-content` }
                                >
                                    <div className="modal-alert-wrapper"> { alert && alertComponent }</div>
                                    { t("extensions:develop.applications.edit.sections.roles." + 
                                        "deleteRole.confirmationModal.content") }
                                </ConfirmationModal.Content>
                            </ConfirmationModal>
                        )
                    }
                </EmphasizedSegment>
            ) :
            (
                <EmphasizedSegment padded="very">
                    <ContentLoader inline="centered" active/>
                </EmphasizedSegment>
            )
    );
};

/**
 * Default props for application roles tab component.
 */
ApplicationRoles.defaultProps = {
    "data-componentid": "application-roles-tab"
};
