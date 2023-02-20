/**
 * Copyright (c) 2022, WSO2 Inc. (http://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 Inc. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content."
 */

import { AlertLevels, TestableComponentInterface } from "@wso2is/core/models";
import { addAlert } from "@wso2is/core/store";
import { DocumentationLink, ListLayout, PageLayout, useDocumentation } from "@wso2is/react-components";
import React, { FunctionComponent, ReactElement, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { PaginationProps } from "semantic-ui-react";

import {
    AppState,
    FeatureConfigInterface,
    UIConstants,
    filterList,
    history,
    sortList
} from "../../../../features/core";
import { UserStoreManagementConstants } from "../../../../features/userstores/constants";
import { UserStoreListItem } from "../../../../features/userstores";
import { useUserStores } from "../../../../features/userstores/api";
import { UserStoresList } from "../../../../features/userstores/components";
import { RemoteUserStoreConstants } from "../constants";

/**
 * Props for the Userstore page.
 */
type UserStoresPageInterface = TestableComponentInterface;

/**
 * This renders the Userstores page.
 *
 * @param {UserStoresPageInterface} props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */
const UserStores: FunctionComponent<UserStoresPageInterface> = (
    props: UserStoresPageInterface
): ReactElement => {

    const {
        [ "data-testid" ]: testId
    } = props;

    const { t } = useTranslation();

    const { getLink } = useDocumentation();

    /**
     * Sets the attributes by which the list can be sorted.
     */
    const SORT_BY = [
        {
            key: 0,
            text: t("common:name"),
            value: "name"
        },
        {
            key: 1,
            text: t("common:description"),
            value: "description"
        }
    ];

    const featureConfig: FeatureConfigInterface = useSelector((state: AppState) => state.config.ui.features);
    const allowedScopes: string = useSelector((state: AppState) => state?.auth?.scope);

    const [ userStores, setUserStores ] = useState<UserStoreListItem[]>([]);
    const [ offset, setOffset ] = useState(0);
    const [ listItemLimit, setListItemLimit ] = useState<number>(UIConstants.DEFAULT_RESOURCE_LIST_ITEM_LIMIT);
    const [ filteredUserStores, setFilteredUserStores ] = useState<UserStoreListItem[]>(undefined);
    const [ sortBy, setSortBy ] = useState(SORT_BY[ 0 ]);
    const [ sortOrder, setSortOrder ] = useState(true);
    const [ searchQuery, setSearchQuery ] = useState("");
    const [ triggerClearQuery, setTriggerClearQuery ] = useState<boolean>(false);

    const dispatch = useDispatch();

    const {
        data: originalUserStoreList,
        isLoading: isUserStoreListFetchRequestLoading,
        error: userStoreListFetchRequestError,
        mutate: mutateUserStoreListFetchRequest
    } = useUserStores({ filter: null, limit: null, offset: null, sort: null });

    /**
     * Moderate Userstores list fetch response from the API.
     */
    useEffect(() => {
        if (!originalUserStoreList) {
            return;
        }

        const userStores = originalUserStoreList.filter(
            (userStore) => userStore.id !== RemoteUserStoreConstants.CUSTOMER_USERSTORE_ID
        );

        setUserStores(userStores);
        setFilteredUserStores(userStores);
    }, [ originalUserStoreList ]);

    /**
     * Handles Userstore fetch request error.
     */
    useEffect(() => {
        if (!userStoreListFetchRequestError) {
            return;
        }

        // Ignore resource not found errors.
        if (userStoreListFetchRequestError?.response?.data?.message
            === UserStoreManagementConstants.RESOURCE_NOT_FOUND_ERROR_MESSAGE) {
            return;
        }

        dispatch(addAlert({
            description: userStoreListFetchRequestError?.response?.data?.description
                || t("console:manage.features.userstores.notifications.fetchUserstores.genericError" +
                    ".description"),
            level: AlertLevels.ERROR,
            message: userStoreListFetchRequestError?.response?.data?.message
                || t("console:manage.features.userstores.notifications.fetchUserstores.genericError.message")
        }));
    }, [ userStoreListFetchRequestError ]);

    useEffect(() => {
        setFilteredUserStores((sortList(filteredUserStores, sortBy.value, sortOrder)));
    }, [ sortBy, sortOrder ]);

    /**
     * This slices and returns a portion of the list.
     *
     * @param {number} list.
     * @param {number} limit.
     * @param {number} offset.
     *
     * @return {UserStoreListItem[]} Paginated list.
     */
    const paginate = (list: UserStoreListItem[], limit: number, offset: number): UserStoreListItem[] => {
        return list?.slice(offset, offset + limit);
    };

    /**
     * This paginates.
     *
     * @param {React.MouseEvent<HTMLAnchorElement>} event.
     * @param {PaginationProps} data.
     */
    const handlePaginationChange = (event: React.MouseEvent<HTMLAnchorElement>, data: PaginationProps) => {
        setOffset((data.activePage as number - 1) * listItemLimit);
    };

    /**
     * Handles the `onSearchQueryClear` callback action.
     */
    const handleSearchQueryClear = (): void => {
        setTriggerClearQuery(!triggerClearQuery);
        setSearchQuery("");
        setFilteredUserStores(userStores);
    };

    return (
        <PageLayout
            pageTitle="User Stores"
            title={ t("extensions:manage.features.userStores.list.title") }
            description={ (
                <>
                    { t("extensions:manage.features.userStores.list.subTitle") }
                    <DocumentationLink
                        link={ getLink("manage.userStores.userStoresList.learnMore") }
                    >
                        { t("extensions:common.learnMore") }
                    </DocumentationLink>
                </>
            ) }
            data-testid={ `${ testId }-page-layout` }
        >
            <ListLayout
                currentListSize={ listItemLimit }
                listItemLimit={ listItemLimit }
                onPageChange={ handlePaginationChange }
                leftActionPanel={ null }
                showPagination={ false }
                showTopActionPanel={ false }
                totalPages={ 1 }
                totalListSize={ filteredUserStores?.length }
                data-testid={ `${ testId }-list-layout` }
            >
                <UserStoresList
                    isLoading={ isUserStoreListFetchRequestLoading || filteredUserStores === undefined }
                    list={ paginate(filteredUserStores, listItemLimit, offset) }
                    onEmptyListPlaceholderActionClick={ () =>
                        history.push(RemoteUserStoreConstants.getPaths().get("REMOTE_USER_STORE_CREATE"))
                    }
                    onSearchQueryClear={ handleSearchQueryClear }
                    searchQuery={ searchQuery }
                    update={ () => mutateUserStoreListFetchRequest() }
                    featureConfig={ featureConfig }
                    data-testid={ `${ testId }-list` }
                />
            </ListLayout>
        </PageLayout>
    );
};

/**
 * Default props for the component.
 */
UserStores.defaultProps = {
    "data-testid": "userstores"
};

/**
 * A default export was added to support React.lazy.
 * TODO: Change this to a named export once react starts supporting named exports for code splitting.
 * @see {@link https://reactjs.org/docs/code-splitting.html#reactlazy}
 */
export default UserStores;
