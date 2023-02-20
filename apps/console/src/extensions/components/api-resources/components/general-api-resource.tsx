/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content.
 */

import { hasRequiredScopes } from "@wso2is/core/helpers";
import { AlertInterface, AlertLevels, IdentifiableComponentInterface, SBACInterface } from "@wso2is/core/models";
import { addAlert } from "@wso2is/core/store";
import { ConfirmationModal, ContentLoader, DangerZone, DangerZoneGroup } from "@wso2is/react-components";
import { AppState, history } from "apps/console/src/features/core";
import { IdentityAppsApiException } from "modules/core/dist/types/exceptions";
import React, { FunctionComponent, ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { ExtendedFeatureConfigInterface } from "../../../configs/models";
import { deleteAPIResource } from "../api/api-resources";
import { APIResourcesConstants } from "../constants/api-resources-constants";
import { APIResourceInterface } from "../models";

/**
 * Prop-types for the API resources page component.
 */
interface GeneralAPIResourceInterface extends SBACInterface<ExtendedFeatureConfigInterface>,
    IdentifiableComponentInterface {
    /**
     * List of API Resources
     */
    apiResourceData: APIResourceInterface;
    /**
     * show if API resources list is still loading
     */
    isAPIResourceDataLoading: boolean;
}

/**
 * API Resources listing page.
 *
 * @param props - Props injected to the component.
 * @returns API Resources Page component
 */
export const GeneralAPIResource: FunctionComponent<GeneralAPIResourceInterface> = (
    props: GeneralAPIResourceInterface
): ReactElement => {

    const {
        featureConfig,
        apiResourceData,
        isAPIResourceDataLoading,
        ["data-componentid"]: componentId
    } = props;

    const { t } = useTranslation();
    const dispatch: Dispatch = useDispatch();
    const allowedScopes: string = useSelector((state: AppState) => state?.auth?.allowedScopes);

    const [ deleteAPIResourceLoading, setDeleteAPIResourceLoading ] = useState<boolean>(false);
    const [ showDeleteConfirmationModal, setShowDeleteConfirmationModal ] = useState<boolean>(false);
    const [ deletingAPIResource, setDeletingAPIResource ] = useState<APIResourceInterface>(undefined);

    /**
     * Deletes an API resource when the delete API resource button is clicked.
     *
     * @param apiResourceId - API resource ID.
     */
    const handleAPIResourceDelete = (apiResourceId: string): void => {

        setDeleteAPIResourceLoading(true);
        deleteAPIResource(apiResourceId)
            .then(() => {
                dispatch(addAlert<AlertInterface>({
                    description: t("extensions:develop.apiResource.notifications.deleteAPIResource.success" +
                        ".description"),
                    level: AlertLevels.SUCCESS,
                    message: t("extensions:develop.apiResource.notifications.deleteAPIResource.success.message")
                }));

                setShowDeleteConfirmationModal(false);
                history.push(APIResourcesConstants.getPaths().get("API_RESOURCES"));
            })
            .catch((error: IdentityAppsApiException) => {
                switch(error?.code) {
                    case APIResourcesConstants.UNAUTHORIZED_ACCESS:
                        dispatch(addAlert<AlertInterface>({
                            description: t("extensions:develop.apiResource.notifications.deleteAPIResource" +
                                ".unauthorizedError.description"),
                            level: AlertLevels.ERROR,
                            message: t("extensions:develop.apiResource.notifications.deleteAPIResource" +
                                ".unauthorizedError.message")
                        }));

                        break;
                        
                    case APIResourcesConstants.NO_VALID_API_RESOURCE_ID_FOUND:
                    case APIResourcesConstants.API_RESOURCE_NOT_FOUND:
                        dispatch(addAlert<AlertInterface>({
                            description: t("extensions:develop.apiResource.notifications.deleteAPIResource" +
                                ".notFoundError.description"),
                            level: AlertLevels.ERROR,
                            message: t("extensions:develop.apiResource.notifications.deleteAPIResource" +
                                ".notFoundError.message")
                        }));

                        break;

                    default:
                        dispatch(addAlert<AlertInterface>({
                            description: t("extensions:develop.apiResource.notifications.deleteAPIResource" +
                                ".genericError.description"),
                            level: AlertLevels.ERROR,
                            message: t("extensions:develop.apiResource.notifications.deleteAPIResource" +
                                ".genericError.message")
                        }));
                }
            })
            .finally(() => {
                setDeleteAPIResourceLoading(false);
                setDeletingAPIResource(undefined);
            });
    };

    /**
     * Show danger zone component
     * 
     * @returns `ReactElement`
     */
    const resolveDangerActions = (): ReactElement => {
        if (!hasRequiredScopes(featureConfig?.apiResources, featureConfig?.apiResources?.scopes?.update,
            allowedScopes)) {
            return null;
        }

        return (
            <>
                {
                    (hasRequiredScopes(featureConfig?.users, featureConfig?.users?.scopes?.delete, allowedScopes)) &&
                    (
                        <DangerZoneGroup
                            sectionHeader={ t("extensions:develop.apiResource.tabs.general.dangerZoneGroup.header") }
                        >
                            <DangerZone
                                data-testid={ `${componentId}-danger-zone` }
                                actionTitle={ t("extensions:develop.apiResource.tabs.general.dangerZoneGroup" +
                                    ".deleteApiResource.button") }
                                header={ t("extensions:develop.apiResource.tabs.general.dangerZoneGroup" +
                                    ".deleteApiResource.header") }
                                subheader={ t("extensions:develop.apiResource.tabs.general.dangerZoneGroup" +
                                    ".deleteApiResource.subHeading")
                                }
                                onActionClick={ (): void => {
                                    setShowDeleteConfirmationModal(true);
                                    setDeletingAPIResource(apiResourceData);
                                } }
                                isButtonDisabled={ false }
                                buttonDisableHint={ t("console:manage.features.user.editUser.dangerZoneGroup." +
                                    "deleteUserZone.buttonDisableHint") }
                            />
                        </DangerZoneGroup>
                    )
                }
            </>
        );
    };

    return (
        !isAPIResourceDataLoading
            ? (
                <>
                    { resolveDangerActions() }
                    {
                        deletingAPIResource && (
                            <ConfirmationModal
                                primaryActionLoading={ deleteAPIResourceLoading }
                                onClose={ (): void => setShowDeleteConfirmationModal(false) }
                                type="negative"
                                open={ showDeleteConfirmationModal }
                                assertionHint={ t("extensions:develop.apiResource.confirmations.deleteAPIResource." +
                                    "assertionHint") }
                                assertionType="checkbox"
                                primaryAction={ t("common:confirm") }
                                secondaryAction={ t("common:cancel") }
                                onSecondaryActionClick={ (): void => {
                                    setShowDeleteConfirmationModal(false);
                                } }
                                onPrimaryActionClick={ (): void => handleAPIResourceDelete(deletingAPIResource.id) }
                                data-testid={ `${componentId}-delete-confirmation-modal` }
                                closeOnDimmerClick={ false }
                            >
                                <ConfirmationModal.Header
                                    data-testid={ `${componentId}-delete-confirmation-modal-header` }
                                >
                                    { t("extensions:develop.apiResource.confirmations.deleteAPIResource.header") }
                                </ConfirmationModal.Header>
                                <ConfirmationModal.Message
                                    attached
                                    negative
                                    data-testid={ `${componentId}-delete-confirmation-modal-message` }
                                >
                                    { t("extensions:develop.apiResource.confirmations.deleteAPIResource.message") }
                                </ConfirmationModal.Message>
                                <ConfirmationModal.Content
                                    data-testid={ `${componentId}-delete-confirmation-modal-content` }
                                >
                                    { t("extensions:develop.apiResource.confirmations.deleteAPIResource.content") }
                                </ConfirmationModal.Content>
                            </ConfirmationModal>
                        )
                    }
                </>
            )
            : <ContentLoader dimmer />
    );
};

/**
 * Default props for the component.
 */
GeneralAPIResource.defaultProps = {
    "data-componentid": "general-api-resource"
};
