/**
 * Copyright (c) 2021, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content.
 */

import { CommonHelpers } from "@wso2is/core/helpers";
import {
    AlertInterface,
    AlertLevels,
    MultiValueAttributeInterface,
    TestableComponentInterface
} from "@wso2is/core/models";
import { addAlert } from "@wso2is/core/store";
import { LocalStorageUtils } from "@wso2is/core/utils";
import {
    Button,
    EmptyPlaceholder,
    ListLayout,
    PageLayout,
    Popup,
    PrimaryButton
} from "@wso2is/react-components";
import { AxiosError } from "axios";
import React, { FunctionComponent, MutableRefObject, ReactElement, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { DropdownProps, Icon, PaginationProps } from "semantic-ui-react";
import{
    AdvancedSearchWithBasicFilters,
    AppState,
    FeatureConfigInterface,
    UIConstants,
    UserBasicInterface,
    getEmptyPlaceholderIllustrations,
    history,
    store
} from "../../../../features/core";
import {
    ConnectorPropertyInterface,
    GovernanceConnectorInterface,
    RealmConfigInterface,
    ServerConfigurationsConstants,
    ServerConfigurationsInterface,
    getConnectorCategory,
    getServerConfigs
} from "../../../../features/server-configurations";
import { deleteUser, getUsersList } from "../../../../features/users/api";
import { UsersListOptionsComponent } from "../../../../features/users/components";
import { UserManagementConstants } from "../../../../features/users/constants";
import { UserListInterface } from "../../../../features/users/models";
import { CONSUMER_USERSTORE } from "../../../../features/userstores";
import { ConsumerUsersConstants } from "../consumer-users-constants";
import { ConsumerUsersList } from "../consumer-users-list";
import { AddConsumerUserWizard } from "../wizard";

/**
 * Props for the Consumer Users page.
 */
type ConsumerUsersPageInterface = TestableComponentInterface;

/**
 * Temporary value to append to the list limit to figure out if the next button is there.
 */
const TEMP_RESOURCE_LIST_ITEM_LIMIT_OFFSET: number = 1;

/**
 * Consumer Users info page.
 *
 * @param props - Props injected to the component.
 *
 * @returns Consumer users page component.
 */
const ConsumerUsersPage: FunctionComponent<ConsumerUsersPageInterface> = (
    props: ConsumerUsersPageInterface
): ReactElement => {

    const {
        [ "data-testid" ]: testId
    } = props;

    const { t } = useTranslation();

    const dispatch: Dispatch = useDispatch();

    const featureConfig: FeatureConfigInterface = useSelector((state: AppState) => state.config.ui.features);

    const [ searchQuery, setSearchQuery ] = useState<string>("");
    const [ listOffset, setListOffset ] = useState<number>(0);
    const [ listItemLimit, setListItemLimit ] = useState<number>(UIConstants.DEFAULT_RESOURCE_LIST_ITEM_LIMIT);
    const [ showWizard, setShowWizard ] = useState<boolean>(false);
    const [ usersList, setUsersList ] = useState<UserListInterface>({});
    const [ rolesList ] = useState([]);
    const [ isListUpdated, setListUpdated ] = useState(false);
    const [ userListMetaContent, setUserListMetaContent ] = useState(undefined);
    const [ userStoreOptions ] = useState([]);
    const [ triggerClearQuery, setTriggerClearQuery ] = useState<boolean>(false);
    const [ isUserListRequestLoading, setUserListRequestLoading ] = useState<boolean>(false);
    const [ readOnlyUserStoresList ] = useState<string[]>(undefined);
    const [ userStoreError, setUserStoreError ] = useState(false);
    const [ emailVerificationEnabled, setEmailVerificationEnabled ] = useState<boolean>(undefined);
    const [ isNextPageAvailable, setIsNextPageAvailable ] = useState<boolean>(undefined);
    const [ realmConfigs, setRealmConfigs ] = useState<RealmConfigInterface>(undefined);

    const init: MutableRefObject<boolean> = useRef(true);

    const username: string = useSelector((state: AppState) => state.auth.username);
    const tenantName: string = store.getState().config.deployment.tenant;
    const tenantSettings: Record<string, any> = JSON.parse(LocalStorageUtils.getValueFromLocalStorage(tenantName));

    const getList = (limit: number, offset: number, filter: string, attribute: string, domain: string) => {
        setUserListRequestLoading(true);

        const modifiedLimit: number = limit + TEMP_RESOURCE_LIST_ITEM_LIMIT_OFFSET;

        getUsersList(modifiedLimit, offset, filter, attribute, domain)
            .then((response: UserListInterface) => {
                const data: UserListInterface = { ...response };

                data.Resources = data?.Resources?.map((resource: UserBasicInterface) => {
                    let email: string = null;

                    if (resource?.emails instanceof Array) {
                        const emailElement: string | MultiValueAttributeInterface = resource?.emails[ 0 ];

                        if (typeof emailElement === "string") {
                            email = emailElement;
                        } else {
                            email = emailElement?.value;
                        }
                    }

                    resource.emails = [ email ];

                    return resource;
                });

                setUsersList(moderateUsersList(data, modifiedLimit, TEMP_RESOURCE_LIST_ITEM_LIMIT_OFFSET));
                setUserStoreError(false);
            }).catch((error: AxiosError) => {
                if (error?.response?.data?.description) {
                    dispatch(addAlert({
                        description: error?.response?.data?.description ?? error?.response?.data?.detail
                        ?? t("console:manage.features.users.notifications.fetchUsers.error.description"),
                        level: AlertLevels.ERROR,
                        message: error?.response?.data?.message
                        ?? t("console:manage.features.users.notifications.fetchUsers.error.message")
                    }));

                    return;
                }

                dispatch(addAlert({
                    description: t("console:manage.features.users.notifications.fetchUsers.genericError." +
                    "description"),
                    level: AlertLevels.ERROR,
                    message: t("console:manage.features.users.notifications.fetchUsers.genericError.message")
                }));

                setUserStoreError(true);
                setUsersList({
                    Resources: [],
                    itemsPerPage: 10,
                    links: [],
                    startIndex: 1,
                    totalResults: 0
                });
            })
            .finally(() => {
                setUserListRequestLoading(false);
            });
    };

    useEffect(() => {
        if (init.current) {
            init.current = false;
        } else {
            if (emailVerificationEnabled !== undefined) {
                setShowWizard(true);
            }
        }
    }, [ emailVerificationEnabled ]);

    // useEffect(() => {
    //     SharedUserStoreUtils.getReadOnlyUserStores().then((response) => {
    //         setReadOnlyUserStoresList(response);
    //     });
    // }, [ userStore ]);

    useEffect(() => {
        if(CommonHelpers.lookupKey(tenantSettings, username) !== null) {
            const userSettings: Record<string, any> = CommonHelpers.lookupKey(tenantSettings, username);
            const userPreferences: Record<string, any> = userSettings[1];
            const tempColumns:  Map<string, string> = new Map<string, string> ();

            if (userPreferences.identityAppsSettings.userPreferences.userListColumns.length < 1) {
                const metaColumns: string[] = UserManagementConstants.DEFAULT_USER_LIST_ATTRIBUTES;

                setUserMetaColumns(metaColumns);
                metaColumns.map((column: string) => {
                    if (column === "id") {
                        // tempColumns.set(column, "");
                    } else {
                        tempColumns.set(column, column);
                    }
                });
                setUserListMetaContent(tempColumns);
            }
            userPreferences.identityAppsSettings.userPreferences.userListColumns.map((column: string) => {
                tempColumns.set(column, column);
            });
            setUserListMetaContent(tempColumns);
        }
    }, []);

    /**
     * Returns a moderated users list.
     *
     * @remarks There is no proper way to count the total entries in the userstore with LDAP. So as a workaround, when
     * fetching users, we request an extra entry to figure out if there is a next page.
     * TODO: Remove this function and other related variables once there is a proper fix for LDAP pagination.
     * @see {@link https://github.com/wso2/product-is/issues/7320}
     *
     * @param list - Users list retrieved from the API.
     * @param requestedLimit - Requested item limit.
     * @param popCount - Tempt count used which will be removed after figuring out if next page is available.
     *
     * @returns User list.
     */
    const moderateUsersList = (list: UserListInterface, requestedLimit: number,
        popCount: number = 1): UserListInterface => {

        const moderated: UserListInterface = list;

        if (moderated.itemsPerPage === requestedLimit) {
            moderated.Resources.splice(-1, popCount);
            setIsNextPageAvailable(true);
        } else {
            setIsNextPageAvailable(false);
        }

        return moderated;
    };

    /**
     * The following method accepts a Map and returns the values as a string.
     *
     * @param attributeMap - IterableIterator<string>
     *
     * @returns Attribute array.
     */
    const generateAttributesString = (attributeMap: IterableIterator<string>) => {
        const attArray: string[] = [];
        const iterator1: IterableIterator<string> = attributeMap[Symbol.iterator]();

        for (const attribute of iterator1) {
            if (attribute !== "") {
                attArray.push(attribute);
            }
        }
        if (!attArray.includes(UserManagementConstants.SCIM2_SCHEMA_DICTIONARY.get("USERNAME"))) {
            attArray.push(UserManagementConstants.SCIM2_SCHEMA_DICTIONARY.get("USERNAME"));
        }

        return attArray.toString();
    };

    /**
     * Util method to get super admin
     */
    const getAdminUser = () => {
        getServerConfigs()
            .then((response: ServerConfigurationsInterface) => {
                setRealmConfigs(response?.realmConfig);
            });
    };

    /**
     * Fetch the list of available userstores.
     */
    useEffect(() => {
        getAdminUser();
    }, []);

    useEffect(() => {
        const attributes: string = userListMetaContent ? generateAttributesString(userListMetaContent?.values()) : null;

        getList(listItemLimit, listOffset, null, attributes, CONSUMER_USERSTORE);
    }, []);

    useEffect(() => {
        if (userListMetaContent) {
            const attributes: string = generateAttributesString(userListMetaContent?.values());

            getList(listItemLimit, listOffset, null, attributes, CONSUMER_USERSTORE);
        }
    }, [ listOffset, listItemLimit ]);

    useEffect(() => {
        if (!isListUpdated) {
            return;
        }
        const attributes: string = generateAttributesString(userListMetaContent?.values());

        getList(listItemLimit, listOffset, null, attributes, CONSUMER_USERSTORE);
        setListUpdated(false);
    }, [ isListUpdated ]);

    /**
     * The following method set the user preferred columns to the local storage.
     *
     * @param metaColumns - string[]
     */
    const setUserMetaColumns = (metaColumns: string[]) => {
        if(CommonHelpers.lookupKey(tenantSettings, username) !== null) {
            const userSettings: Record<string, any> = CommonHelpers.lookupKey(tenantSettings, username);
            const userPreferences: Record<string, any> = userSettings[1];

            const newUserSettings: Record<string, any> = {
                ...tenantSettings,
                [ username ]: {
                    ...userPreferences,
                    identityAppsSettings: {
                        ...userPreferences.identityAppsSettings,
                        userPreferences: {
                            ...userPreferences.identityAppsSettings.userPreferences,
                            userListColumns: metaColumns
                        }
                    }
                }
            };

            LocalStorageUtils.setValueInLocalStorage(tenantName, JSON.stringify(newUserSettings));
        }
    };

    /**
     * Handles the `onSearchQueryClear` callback action.
     */
    const handleSearchQueryClear = (): void => {
        setTriggerClearQuery(!triggerClearQuery);
        setSearchQuery("");
        getList(listItemLimit, listOffset, null, null, null);
    };

    /**
     * Dispatches the alert object to the redux store.
     *
     * @param alert - Alert object.
     */
    const handleAlerts = (alert: AlertInterface) => {
        dispatch(addAlert(alert));
    };

    /**
     * The following method set the list of columns selected by the user to
     * the state.
     *
     * @param metaColumns - string[]
     */
    const handleMetaColumnChange = (metaColumns: string[]) => {
        metaColumns.push("profileUrl");
        const tempColumns: Map<string, string> = new Map<string, string> ();

        setUserMetaColumns(metaColumns);

        metaColumns.map((column: string) => {
            tempColumns.set(column, column);
        });
        setUserListMetaContent(tempColumns);
        setListUpdated(true);
    };

    /**
     * Handles the `onFilter` callback action from the
     * users search component.
     *
     * @param query - Search query.
     */
    const handleUserFilter = (query: string): void => {
        const attributes: string = generateAttributesString(userListMetaContent.values());

        if (query === "userName sw ") {
            getList(listItemLimit, listOffset, null, attributes, CONSUMER_USERSTORE);

            return;
        }

        setSearchQuery(query);
        getList(listItemLimit, listOffset, query, attributes, CONSUMER_USERSTORE);
    };

    const advancedSearchFilter = (): ReactElement => (
        <AdvancedSearchWithBasicFilters
            onFilter={ handleUserFilter }
            filterAttributeOptions={ [
                {
                    key: 0,
                    text: t("console:manage.features.users.advancedSearch.form.dropdown." +
                        "filterAttributeOptions.username"),
                    value: "userName"
                },
                {
                    key: 1,
                    text: t("console:manage.features.users.advancedSearch.form.dropdown." +
                        "filterAttributeOptions.email"),
                    value: "emails"
                }
            ] }
            filterAttributePlaceholder={
                t("console:manage.features.users.advancedSearch.form.inputs.filterAttribute" +
                    ".placeholder")
            }
            filterConditionsPlaceholder={
                t("console:manage.features.users.advancedSearch.form.inputs.filterCondition" +
                    ".placeholder")
            }
            filterValuePlaceholder={
                t("console:manage.features.users.advancedSearch.form.inputs.filterValue" +
                    ".placeholder")
            }
            placeholder={ t("console:manage.features.users.advancedSearch.placeholder") }
            defaultSearchAttribute="userName"
            defaultSearchOperator="co"
            triggerClearQuery={ triggerClearQuery }
        />
    );

    const handlePaginationChange = (event: React.MouseEvent<HTMLAnchorElement>, data: PaginationProps) => {
        setListOffset((data.activePage as number - 1) * listItemLimit);
    };

    const handleItemsPerPageDropdownChange = (event: React.MouseEvent<HTMLAnchorElement>, data: DropdownProps) => {
        setListItemLimit(data.value as number);
    };

    const handleUserDelete = (userId: string): void => {
        deleteUser(userId)
            .then(() => {
                handleAlerts({
                    description: t(
                        "console:manage.features.users.notifications.deleteUser.success.description"
                    ),
                    level: AlertLevels.SUCCESS,
                    message: t(
                        "console:manage.features.users.notifications.deleteUser.success.message"
                    )
                });
                setListUpdated(true);
            });
    };

    /**
     * Handles the click event of the create new user button.
     */
    const handleAddNewUserWizardClick = (): void => {
        getConnectorCategory(ServerConfigurationsConstants.USER_ONBOARDING_CONNECTOR_ID)
            .then((response: { connectors: GovernanceConnectorInterface[]; }) => {
                const connectors: GovernanceConnectorInterface[]  = response?.connectors;
                const userOnboardingConnector: GovernanceConnectorInterface = connectors.find(
                    (connector: GovernanceConnectorInterface) => connector.id
                        === ServerConfigurationsConstants.USER_EMAIL_VERIFICATION_CONNECTOR_ID
                );

                const emailVerification: ConnectorPropertyInterface = userOnboardingConnector.properties.find(
                    (property: ConnectorPropertyInterface) =>
                        property.name ===
                        ServerConfigurationsConstants.EMAIL_VERIFICATION_ENABLED
                );

                setEmailVerificationEnabled(emailVerification.value === "true");
            }).catch((error: AxiosError) => {
                handleAlerts({
                    description: error?.response?.data?.description ?? t(
                        "console:manage.features.governanceConnectors.notifications." +
                    "getConnector.genericError.description"
                    ),
                    level: AlertLevels.ERROR,
                    message: error?.response?.data?.message ?? t(
                        "console:manage.features.governanceConnectors.notifications." +
                    "getConnector.genericError.message"
                    )
                });
            });
    };

    return (
        <PageLayout
            action={
                (isUserListRequestLoading || !(!searchQuery && usersList?.totalResults <= 0))
                && (
                    <PrimaryButton
                        data-testid="user-mgt-user-list-add-user-button"
                        onClick={ () => handleAddNewUserWizardClick()  }
                    >
                        <Icon name="add"/>
                        New Business User
                    </PrimaryButton>
                )
            }
            title={ "Business Users" }
            description={ "Create and manage your organization's business users, their user access, and profiles." }
            data-testid={ `${ testId }-page-layout` }
        >
            <ListLayout
                // TODO add sorting functionality.
                advancedSearch={ advancedSearchFilter() }
                currentListSize={ usersList.itemsPerPage }
                listItemLimit={ listItemLimit }
                onItemsPerPageDropdownChange={ handleItemsPerPageDropdownChange }
                data-testid="user-mgt-user-list-layout"
                onPageChange={ handlePaginationChange }
                rightActionPanel={
                    (
                        <>
                            <Popup
                                className={ "list-options-popup" }
                                flowing
                                basic
                                content={
                                    (<UsersListOptionsComponent
                                        data-testid="user-mgt-user-list-meta-columns"
                                        handleMetaColumnChange={ handleMetaColumnChange }
                                        userListMetaContent={ userListMetaContent }
                                    />)
                                }
                                position="bottom left"
                                on="click"
                                pinned
                                trigger={
                                    (<Button
                                        data-testid="user-mgt-user-list-meta-columns-button"
                                        className="meta-columns-button"
                                        basic
                                    >
                                        <Icon name="columns"/>
                                        { t("console:manage.features.users.buttons.metaColumnBtn") }
                                    </Button>)
                                }
                            />
                        </>
                    )
                }
                showPagination={ true }
                showTopActionPanel={ isUserListRequestLoading
                || !(!searchQuery
                    && !userStoreError
                    && userStoreOptions.length < 3
                    && usersList?.totalResults <= 0) }
                totalPages={ Math.ceil(usersList.totalResults / listItemLimit) }
                totalListSize={ usersList.totalResults }
                paginationOptions={ {
                    disableNextButton: !isNextPageAvailable
                } }
            >
                { userStoreError
                    ? (<EmptyPlaceholder
                        subtitle={ [ t("console:manage.features.users.placeholders.userstoreError.subtitles.0"),
                            t("console:manage.features.users.placeholders.userstoreError.subtitles.1")     ] }
                        title={ t("console:manage.features.users.placeholders.userstoreError.title") }
                        image={ getEmptyPlaceholderIllustrations().genericError }
                        imageSize="tiny"
                    />)
                    : (<ConsumerUsersList
                        advancedSearch={ advancedSearchFilter() }
                        usersList={ usersList }
                        handleUserDelete={ handleUserDelete }
                        userMetaListContent={ userListMetaContent }
                        isLoading={ isUserListRequestLoading }
                        realmConfigs={ realmConfigs }
                        onEmptyListPlaceholderActionClick={ () => handleAddNewUserWizardClick() }
                        onSearchQueryClear={ handleSearchQueryClear }
                        searchQuery={ searchQuery }
                        data-testid="user-mgt-user-list"
                        readOnlyUserStores={ readOnlyUserStoresList }
                        featureConfig={ featureConfig }
                        userEditPath={ ConsumerUsersConstants.getPaths().get("CONSUMER_USERS_EDIT_PATH") }
                    />)
                }
                {
                    showWizard && (
                        <AddConsumerUserWizard
                            data-testid="user-mgt-add-user-wizard-modal"
                            closeWizard={ () => {
                                setShowWizard(false);
                                setEmailVerificationEnabled(undefined);
                            } }
                            listOffset={ listOffset }
                            listItemLimit={ listItemLimit }
                            updateList={ () => setListUpdated(true) }
                            rolesList={ rolesList }
                            emailVerificationEnabled={ emailVerificationEnabled }
                            onSuccessfulUserAddition={ (id: string) => {
                                history.push(ConsumerUsersConstants.getPaths().get("CONSUMER_USERS_EDIT_PATH")
                                    .replace(":id", id));
                            } }
                        />
                    )
                }
            </ListLayout>
        </PageLayout>
    );
};

/**
 * Default props for the component.
 */
ConsumerUsersPage.defaultProps = {
    "data-testid": "users"
};

/**
 * A default export was added to support React.lazy.
 * TODO: Change this to a named export once react starts supporting named exports for code splitting.
 * @see {@link https://reactjs.org/docs/code-splitting.html#reactlazy}
 */
export default ConsumerUsersPage;
