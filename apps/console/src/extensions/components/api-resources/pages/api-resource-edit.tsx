/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content.
 */

import { AlertInterface, AlertLevels, IdentifiableComponentInterface } from "@wso2is/core/models";
import { addAlert } from "@wso2is/core/store";
import { AnimatedAvatar, EmptyPlaceholder, TabPageLayout } from "@wso2is/react-components";
import React, { FunctionComponent, ReactElement, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { AppState, getEmptyPlaceholderIllustrations, history } from "../../../../features/core";
import { ExtendedFeatureConfigInterface } from "../../../configs/models";
import { useAPIResourceDetails } from "../api";
import { EditAPIResource } from "../components/edit-api-resource";
import { APIResourcesConstants } from "../constants";

/**
 * Prop-types for the API resources page component.
 */
type APIResourcesEditPageInterface = IdentifiableComponentInterface;

/**
 * API Resources listing page.
 *
 * @param props - Props injected to the component.
 * @returns API Resources Page component
 */
const APIResourcesEditPage: FunctionComponent<APIResourcesEditPageInterface> = (
    props: APIResourcesEditPageInterface
): ReactElement => {

    const {
        ["data-componentid"]: componentId
    } = props;

    const { t } = useTranslation();
    const dispatch: Dispatch = useDispatch();

    const [ apiResourceId, setAPIResourceId ] = useState<string>(null);

    const featureConfig: ExtendedFeatureConfigInterface = useSelector((state: AppState) => state.config.ui.features);

    const {
        data: apiResourceData,
        isLoading: isAPIResourceDatatLoading,
        error: apiResourceDataFetchRequestError
    } = useAPIResourceDetails(apiResourceId);

    useEffect(() => {
        setAPIResourceIdFromPath();
    }, []);

    /**
     * The following useEffect is used to handle if any error occurs while fetching the API resource
     */
    useEffect(() => {
        if(apiResourceDataFetchRequestError) {
            switch (apiResourceDataFetchRequestError.response?.data?.code) {
                case APIResourcesConstants.UNAUTHORIZED_ACCESS:
                    dispatch(addAlert<AlertInterface>({
                        description: t("extensions:develop.apiResource.notifications.getAPIResource" +
                            ".unauthorizedError.description"),
                        level: AlertLevels.ERROR,
                        message: t("extensions:develop.apiResource.notifications.getAPIResource" +
                            ".unauthorizedError.message")
                    }));

                    break;

                case APIResourcesConstants.NO_VALID_API_RESOURCE_ID_FOUND:
                case APIResourcesConstants.API_RESOURCE_NOT_FOUND:
                    dispatch(addAlert<AlertInterface>({
                        description: t("extensions:develop.apiResource.notifications.getAPIResource" +
                            ".notFoundError.description"),
                        level: AlertLevels.ERROR,
                        message: t("extensions:develop.apiResource.notifications.getAPIResource" +
                            ".notFoundError.message")
                    }));

                    break;

                default:
                    dispatch(addAlert<AlertInterface>({
                        description: t("extensions:develop.apiResource.notifications.getAPIResource" +
                            ".genericError.description"),
                        level: AlertLevels.ERROR,
                        message: t("extensions:develop.apiResource.notifications.getAPIResource" +
                            ".genericError.message")
                    }));
            }
        }
    }, [ apiResourceDataFetchRequestError ]);

    /**
     * set API resource id from the URL path
     */
    const setAPIResourceIdFromPath = (): void => {
        const path: string[] = history.location.pathname.split("/");
        const id: string = path[path.length - 1];

        setAPIResourceId(id);
    };

    /**
     * go back to API resources list section
     */
    const handleBackButtonClick = () => {
        history.push(APIResourcesConstants.getPaths().get("API_RESOURCES"));
    };

    return (
        (!isAPIResourceDatatLoading && !apiResourceData) || apiResourceDataFetchRequestError
            ? (<EmptyPlaceholder
                subtitle={ [ t("extensions:develop.apiResource.tabs.apiResourceError.subtitles.0"),
                    t("extensions:develop.apiResource.tabs.apiResourceError.subtitles.1") ] }
                title={ t("extensions:develop.apiResource.tabs.apiResourceError.title") }
                image={ getEmptyPlaceholderIllustrations().emptySearch }
                imageSize="tiny"
            />)
            : (<TabPageLayout
                isLoading={ isAPIResourceDatatLoading }
                title={ apiResourceData?.displayName }
                pageTitle={ t("extensions:develop.apiResource.tabs.title") }
                image={ (
                    <AnimatedAvatar
                        name={ apiResourceData?.displayName }
                        size="tiny"
                        floated="left"
                    />
                ) }
                loadingStateOptions={ {
                    count: 5,
                    imageType: "circular"
                } }
                backButton={ {
                    "data-testid": `${componentId}-back-button`,
                    onClick: handleBackButtonClick,
                    text: t("extensions:develop.apiResource.tabs.backButton")
                } }
                titleTextAlign="left"
                bottomMargin={ false }
            >
                <EditAPIResource 
                    apiResourceData={ apiResourceData } 
                    isAPIResourceDataLoading={ isAPIResourceDatatLoading }   
                    featureConfig={ featureConfig }             
                />

            </TabPageLayout>)
    );

};

/**
 * Default props for the component.
 */
APIResourcesEditPage.defaultProps = {
    "data-componentid": "api-resource-edit"
};

/**
 * A default export was added to support React.lazy.
 * TODO: Change this to a named export once react starts supporting named exports for code splitting.
 * @see {@link https://reactjs.org/docs/code-splitting.html#reactlazy}
 */
export default APIResourcesEditPage;
