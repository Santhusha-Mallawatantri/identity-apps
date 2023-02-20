/**
 * Copyright (c) 2021, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content.
 */

import { FeatureAccessConfigInterface } from "@wso2is/core/models";
import { HeaderExtension, HeaderLinkCategoryInterface } from "@wso2is/react-components";
import { HeaderSubPanelItemInterface } from "../../../features/core/components";
import { FeatureConfigInterface } from "../../../features/core/models";

export interface CommonConfig {
    advancedSearchWithBasicFilters: {
        enableQuerySearch: boolean;
    };
    blockLoopBackCalls: boolean;
    checkForUIResourceScopes: boolean;
    enableOrganizationAssociations: boolean;
    header: {
        /**
         * Get the extensions for the header.
         * @returns the extensions for the header
         */
        getHeaderExtensions: () => HeaderExtension[];
        /**
         * Get the extensions for the Header sub panel.
         * These will come along with the `Manage` & `Develop` links.
         * @returns the extensions for the header sub panel
         */
        getHeaderSubPanelExtensions: () => HeaderSubPanelItemInterface[];
        /**
         * Get the user dropdown link extensions.
         * @param tenantDomain - Current tenant
         * @param associatedTenants - Tenant list
         * @returns the user dropdown link extensions
         */
        getUserDropdownLinkExtensions: (tenantDomain: string,
            associatedTenants: any[]) => Promise<HeaderLinkCategoryInterface[]>;
        /**
         * Header menu item config.
         */
        headerQuickstartMenuItem: string;
        /**
         * Should the app switcher be shown as nine dots dropdown.
         */
        renderAppSwitcherAsDropdown: boolean;
    };
    leftNavigation: {
        /**
         * Should the side panel be categorized for different views.
         */
        isLeftNavigationCategorized: {
            develop: boolean;
            manage: boolean;
        };
    };
    userEditSection: {
        isGuestUser: boolean;
        showEmail: boolean;
    };
}

/**
 * Types of views that are extended.
 * @remarks Any views other thant `DEVELOP` and `MANAGE` can go here.
 * @readonly
 */
export enum AppViewExtensionTypes {
    QUICKSTART = "QUICKSTART"
}

/**
 * Interface for the extended feature configs.
 */
export interface ExtendedFeatureConfigInterface extends FeatureConfigInterface {
    /**
     * API resource feature.
     */
    apiResources?: FeatureAccessConfigInterface;
    /**
     * Application roles feature.
     */
    applicationRoles?: FeatureAccessConfigInterface;
    /**
     * Branding feature.
     */
    branding?: FeatureAccessConfigInterface;
    /**
     * Try it application feature
     */
    tryIt?: FeatureAccessConfigInterface;
}
