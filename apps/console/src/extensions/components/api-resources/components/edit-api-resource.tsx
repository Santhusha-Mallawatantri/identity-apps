/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content.
 */

import { IdentifiableComponentInterface, SBACInterface } from "@wso2is/core/models";
import { ResourceTab } from "@wso2is/react-components";
import React, { FunctionComponent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { GeneralAPIResource } from "./general-api-resource";
import { ExtendedFeatureConfigInterface } from "../../../configs/models";
import { APIResourceInterface } from "../models";

/**
 * Prop-types for the API resources page component.
 */
interface EditAPIResourceInterface extends SBACInterface<ExtendedFeatureConfigInterface>, 
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
export const EditAPIResource: FunctionComponent<EditAPIResourceInterface> = (
    props: EditAPIResourceInterface
): ReactElement => {

    const {
        featureConfig,
        apiResourceData,
        isAPIResourceDataLoading
    } = props;

    const { t } = useTranslation();

    /**
     * Panes for the resource tab.
     * @returns `ResourceTab.Pane[]`
     */
    const panes = () => ([
        {
            menuItem: t("extensions:develop.apiResource.tabs.general.label"),
            render: () => (
                <ResourceTab.Pane controlledSegmentation attached={ false }>
                    <GeneralAPIResource 
                        apiResourceData={ apiResourceData } 
                        isAPIResourceDataLoading={ isAPIResourceDataLoading }
                        featureConfig={ featureConfig } />
                </ResourceTab.Pane>
            )
        },
        {
            menuItem: t("extensions:develop.apiResource.tabs.permissions.label"),
            render: () => (
                <ResourceTab.Pane controlledSegmentation attached={ false }>
                </ResourceTab.Pane>
            )
        }
    ]);

    return (
        <ResourceTab
            isLoading={ isAPIResourceDataLoading }
            panes={ panes() }
        />
    );

};
