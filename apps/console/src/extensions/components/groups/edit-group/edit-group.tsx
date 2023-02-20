/**
 * Copyright (c) 2021, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content.
 */

import { hasRequiredScopes, isFeatureEnabled } from "@wso2is/core/helpers";
import { AlertLevels, SBACInterface } from "@wso2is/core/models";
import { addAlert } from "@wso2is/core/store";
import { ResourceTab } from "@wso2is/react-components";
import React, { FunctionComponent, ReactElement, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// TODO: Move to shared components.
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { BasicGroupDetails } from "./edit-group-basic";
import { GroupRolesList } from "./edit-group-roles";
import { GroupUsersList } from "./edit-group-users";
import { AppState, FeatureConfigInterface, SharedUserStoreUtils } from "../../../../features/core";
import { GroupsInterface } from "../../../../features/groups";
import { GroupConstants } from "../../../../features/groups/constants";
import { ExtendedFeatureConfigInterface } from "../../../configs/models";
import { CONSUMER_USERSTORE } from "../../users/constants";
import { getAllApplicationRolesList } from "../api";
import { ApplicationRoleInterface } from "../models";

/**
 * Captures props needed for edit group component
 */
interface EditGroupProps extends SBACInterface<FeatureConfigInterface> {
    /**
     * Group ID
     */
    groupId: string;
    /**
     * Group details
     */
    group: GroupsInterface;
    /**
     * Handle group update callback.
     */
    onGroupUpdate: () => void;
    /**
     * Flag for request loading status.
     */
    isGroupDetailsRequestLoading?: boolean;
}

/**
 * Component which will allow editing of a selected group.
 *
 * @param props - contains group details to be edited.
 */
export const EditGroup: FunctionComponent<EditGroupProps> = (props: EditGroupProps): ReactElement => {

    const {
        groupId,
        group,
        onGroupUpdate,
        featureConfig,
        isGroupDetailsRequestLoading
    } = props;

    const { t } = useTranslation();

    const allowedScopes: string = useSelector((state: AppState) => state?.auth?.allowedScopes);
    const extendedFeatureConfig: ExtendedFeatureConfigInterface = useSelector(
        (state: AppState) => state.config.ui.features);

    const [ isReadOnly, setReadOnly ] = useState<boolean>(false);
    const [ isUserstoreRemote, setUserstoreRemote ] = useState<boolean>(false);
    const [ isReadOnlyLoading, setReadOnlyLoading ] = useState<boolean>(true);
    const [ readOnlyUserStoresList, setReadOnlyUserStoresList ] = useState<string[]>(undefined);
    const [ isApplicationRolesAvailable, setIsApplicationRolesAvailable ] = useState<boolean>(false);
    const [ isResourcePanesLoading, setIsResourcePanesLoading ] = useState<boolean>(true);

    const dispatch: Dispatch = useDispatch();

    useEffect(() => {
        checkApplicationRoles();
        SharedUserStoreUtils.getReadOnlyUserStores().then((response: string[]) => {
            setReadOnlyUserStoresList(response);
        }).catch(() => {
            dispatch(addAlert({
                description: t("console:manage.features.groups.notifications.fetchGroups.genericError.description"),
                level: AlertLevels.ERROR,
                message: t("console:manage.features.groups.notifications.fetchGroups.genericError.message")
            }));
        }).finally(() => {
            setReadOnlyLoading(false);
        });
    }, [ ]);

    useEffect(() => {
        if(!group) {
            return;
        }

        const userStore: string[] = group?.displayName.split("/");

        if (!isFeatureEnabled(featureConfig?.groups, GroupConstants.FEATURE_DICTIONARY.get("GROUP_UPDATE"))
            || readOnlyUserStoresList?.includes(userStore[0]?.toString())
            || !hasRequiredScopes(featureConfig?.groups, featureConfig?.groups?.scopes?.update, allowedScopes)
        ) {
            setReadOnly(true);
        }

        if(userStore[0]?.toString()!==CONSUMER_USERSTORE) {
            setUserstoreRemote(true);
        }
    }, [ group, readOnlyUserStoresList ]);


    const checkApplicationRoles = () => {
        if (extendedFeatureConfig?.applicationRoles?.enabled) {
            getAllApplicationRolesList()
                .then((response: ApplicationRoleInterface[]) => {
                    if (response.length > 0) {
                        setIsApplicationRolesAvailable(true);
                    } else {
                        setIsApplicationRolesAvailable(false);
                    }
                }).catch(() => {
                    setIsApplicationRolesAvailable(false);
                }).finally(() => {
                    setIsResourcePanesLoading(false);
                });
        } else {
            setIsResourcePanesLoading(false);
        }
    };

    const resolveResourcePanes = () => {
        const panes: {
            menuItem?: string;
            render?: () => React.ReactNode;
        }[] = [
            {
                menuItem: "General",
                render: () => (
                    <ResourceTab.Pane controlledSegmentation attached={ false }>
                        <BasicGroupDetails
                            data-testid="group-mgt-edit-group-basic"
                            groupId={ groupId }
                            isGroup={ true }
                            groupObject={ group }
                            onGroupUpdate={ onGroupUpdate }
                            isReadOnly={ isReadOnly }
                            isUserstoreRemote = { isUserstoreRemote }
                            isReadOnlyLoading={ isReadOnlyLoading }
                        />
                    </ResourceTab.Pane>
                )
            },{
                menuItem: t("console:manage.features.roles.edit.menuItems.users"),
                render: () => (
                    <ResourceTab.Pane controlledSegmentation attached={ false }>
                        <GroupUsersList
                            isGroupDetailsRequestLoading={ isGroupDetailsRequestLoading }
                            data-testid="group-mgt-edit-group-users"
                            isGroup={ true }
                            group={ group }
                            onGroupUpdate={ onGroupUpdate }
                            isReadOnly={ isReadOnly }
                        />
                    </ResourceTab.Pane>
                )
            }
        ];

        if (extendedFeatureConfig?.applicationRoles?.enabled && isApplicationRolesAvailable) {
            panes.push(
                {
                    menuItem: t("extensions:manage.groups.edit.roles.title"),
                    render: () => (
                        <ResourceTab.Pane controlledSegmentation attached={ false }>
                            <GroupRolesList
                                isGroupDetailsRequestLoading={ isGroupDetailsRequestLoading }
                                data-componentid="group-mgt-edit-group-roles"
                                isGroup={ true }
                                group={ group }
                                onGroupUpdate={ onGroupUpdate }
                                isReadOnly={ isReadOnly }
                            />
                        </ResourceTab.Pane>
                    )
                }
            );
        }

        return panes;
    };

    return (
        <ResourceTab
            isLoading={ isResourcePanesLoading }
            panes={ resolveResourcePanes() }
        />
    );
};
