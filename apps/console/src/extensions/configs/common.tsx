/**
 * Copyright (c) 2021, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content.
 */

import { AlertLevels } from "@wso2is/core/models";
import { addAlert, setTenants } from "@wso2is/core/store";
import { I18n } from "@wso2is/i18n";
import { GenericIcon, HeaderExtension, HeaderLinkCategoryInterface } from "@wso2is/react-components";
import React, { ReactNode } from "react";
import { Dropdown, Label, Menu } from "semantic-ui-react";
import { AppViewExtensionTypes, CommonConfig } from "./models";
import { HeaderSubPanelItemInterface } from "../../features/core/components";
import { AppConstants } from "../../features/core/constants";
import { history } from "../../features/core/helpers";
import { AppViewTypes } from "../../features/core/models";
import { store } from "../../features/core/store";
import { ReactComponent as AskHelpIcon } from "../../themes/asgardio/assets/images/icons/ask-help-icon.svg";
import { ReactComponent as CommunityIcon } from "../../themes/asgardio/assets/images/icons/community-icon.svg";
import {
    ReactComponent as ContactSupportIcon
} from "../../themes/asgardio/assets/images/icons/contact-support-icon.svg";
import { ReactComponent as DocsIcon } from "../../themes/asgardio/assets/images/icons/docs-icon.svg";
import { ReactComponent as billingPortalIcon } from "../../themes/asgardio/assets/images/icons/dollar-icon.svg";
import { ReactComponent as QuickStartIcon } from "../../themes/default/assets/images/icons/shuttle-icon.svg";
import { getAssociatedTenants } from "../components/tenants/api";
import { TenantInfo, TenantRequestResponse } from "../components/tenants/models";

export const commonConfig: CommonConfig = {
    advancedSearchWithBasicFilters: {
        enableQuerySearch: false
    },
    blockLoopBackCalls: true,
    checkForUIResourceScopes: true,
    enableOrganizationAssociations: true,
    header: {
        getHeaderExtensions: (): HeaderExtension[] => [
            {
                component: (
                    window[ "AppUtils" ].getConfig().docSiteUrl
                    && (
                        <Menu.Item
                            className="header-link"
                            key="dev-doc-site-link"
                            data-testid="dev-doc-site-link"
                        >
                            <div
                                className="header-link-inner"
                                onClick={ () => {
                                    window.open(
                                        window["AppUtils"].getConfig().docSiteUrl,
                                        "_blank",
                                        "noopener"
                                    );
                                } }
                            >
                                <GenericIcon
                                    className="spaced-right"
                                    transparent
                                    fill="white"
                                    size="x22"
                                    icon={ DocsIcon }
                                />
                                <div className="header-link-inner-text">
                                    { I18n.instance.t("extensions:common.help.docSiteLink") as ReactNode }
                                </div>
                            </div>
                        </Menu.Item>
                    )
                ),
                floated: "right"
            },
            {
                component: (
                    (window[ "AppUtils" ].getConfig().extensions.community
                        || window[ "AppUtils" ].getConfig().extensions.helpCenterUrl)
                        && (
                            <Menu.Item
                                className="header-link"
                                key="get-help-dropdown-link"
                                data-testid="get-help-dropdown-link"
                            >
                                <Dropdown
                                    className="get-help-dropdown"
                                    trigger={
                                        (
                                            <div className="header-link-inner">
                                                <GenericIcon
                                                    className="spaced-right"
                                                    transparent
                                                    fill="white"
                                                    size="x22"
                                                    icon={ AskHelpIcon }
                                                />
                                                <div className="header-link-inner-text">
                                                    {
                                                        I18n
                                                            .instance
                                                            .t("extensions:common.help.helpDropdownLink") as ReactNode
                                                    }
                                                </div>
                                            </div>
                                        )
                                    }
                                    pointing="top right"
                                    labeled
                                    floating
                                    icon={ null }
                                >
                                    <Dropdown.Menu>
                                        { window[ "AppUtils" ].getConfig().extensions.community
                                            && (
                                                <Dropdown.Item
                                                    className="get-help-dropdown-item"
                                                    onClick={ () => {
                                                        window.open(
                                                            window[ "AppUtils" ].getConfig().extensions.community,
                                                            "_blank",
                                                            "noopener"
                                                        );
                                                    } }
                                                >
                                                    <>
                                                        <GenericIcon
                                                            className="spaced-right"
                                                            transparent
                                                            fill="white"
                                                            size="x22"
                                                            icon={ CommunityIcon }
                                                        />
                                                        { I18n.instance.t("extensions:common.help.communityLink") }
                                                    </>
                                                </Dropdown.Item>
                                            )
                                        }
                                        { window[ "AppUtils" ].getConfig().extensions.helpCenterUrl
                                            && (
                                                <Dropdown.Item
                                                    className="get-help-dropdown-item"
                                                    onClick={ () => {
                                                        window.open(
                                                            window[ "AppUtils" ].getConfig().extensions.helpCenterUrl,
                                                            "_blank",
                                                            "noopener"
                                                        );
                                                    } }
                                                >
                                                    <>
                                                        <GenericIcon
                                                            className="spaced-right"
                                                            transparent
                                                            fill="white"
                                                            size="x22"
                                                            icon={ ContactSupportIcon }
                                                        />
                                                        { I18n.instance.t("extensions:common.help.helpCenterLink") }
                                                        <Label className="ml-2 premium-label">PREMIUM</Label>
                                                    </>
                                                </Dropdown.Item>
                                            )
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Menu.Item>
                        )
                ),
                floated: "right"
            }
        ],
        getHeaderSubPanelExtensions: (): HeaderSubPanelItemInterface[] => [
            {
                component: (currentActiveView?: AppViewTypes, onClickCb?: (newActiveView: AppViewTypes) => void) => (
                    <Menu.Item
                        active={ currentActiveView === AppViewExtensionTypes.QUICKSTART }
                        className="secondary-panel-item quickstart-page-switch"
                        onClick={ () => {
                            history.push(`${ AppConstants.getMainViewBasePath() }/getting-started`);
                            onClickCb && onClickCb(AppViewExtensionTypes.QUICKSTART);
                        } }
                        data-testid="app-header-quick-start-switch"
                    >
                        <GenericIcon
                            defaultIcon
                            transparent
                            size="x22"
                            hoverable={ false }
                            icon={ QuickStartIcon }
                        />
                    </Menu.Item>
                ),
                floated: "left",
                order: 0
            }
        ],
        getUserDropdownLinkExtensions: async (tenantDomain: string,
            associatedTenants: any[]): Promise<HeaderLinkCategoryInterface[]> => {
            if (!Array.isArray(associatedTenants)) {
                await getAssociatedTenants()
                    .then((response: TenantRequestResponse) => {
                        associatedTenants = response?.associatedTenants;

                        store.dispatch(setTenants<TenantInfo>(response.associatedTenants));
                    })
                    .catch((error: any) => {
                        store.dispatch(
                            addAlert({
                                description:
                                    error?.description &&
                                    I18n.instance.t("extensions:manage.features.tenant.notifications."
                                        + "getTenants.description"),
                                level: AlertLevels.ERROR,
                                message:
                                    error?.description &&
                                    I18n.instance.t("extensions:manage.features.tenant.notifications."
                                        + "getTenants.message")
                            })
                        );
                    });
            }

            const buildBillingPortalURL = (): string => {
                if (!tenantDomain) {
                    return null;
                }

                if (!Array.isArray(associatedTenants)) {
                    return null;
                }

                const user: Record<string, unknown> = associatedTenants.find(tenant => tenant.domain == tenantDomain);

                if (user?.associationType !== "MEMBER") {
                    return null;
                }

                return window[ "AppUtils" ].getConfig()
                    .extensions?.billingPortalUrl?.replace("${tenantId}", user.id);

            };

            return [
                {
                    category: "APPS",
                    categoryLabel: I18n.instance.t("common:apps") as ReactNode,
                    links: [
                        buildBillingPortalURL() &&  {
                            "data-testid": "app-switch-billingPortal",
                            icon: billingPortalIcon,
                            name: I18n
                                .instance
                                .t("extensions:manage.features.header.links.billingPortalNav") as ReactNode,
                            onClick: () => {
                                window.open(buildBillingPortalURL());
                            }
                        }
                    ]
                }
            ];
        },
        headerQuickstartMenuItem: "QUICKSTART",
        renderAppSwitcherAsDropdown: false
    },
    leftNavigation: {
        isLeftNavigationCategorized: {
            develop: false,
            manage: true
        }
    },
    userEditSection: {
        isGuestUser: true,
        showEmail: false
    }
};
