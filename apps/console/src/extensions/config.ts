/**
 * Copyright (c) 2020, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content.
 */

import { lazy } from "react";
import { APIResourcesConstants } from "./components/api-resources/constants/api-resources-constants";
import { RemoteUserStoreConstants } from "./components/user-stores/constants";
import { UsersConstants } from "./components/users/constants";
import { userstoresConfig } from "./configs/userstores";
import { ExtensionsConfigInterface } from "./models";
import { getSidePanelIcons } from "../features/core/configs";
import { AppConstants } from "../features/core/constants";
import { ServerConfigurationsConstants } from "../features/server-configurations";

export const ExtensionsConfig = (): ExtensionsConfigInterface => ({
    routes: {
        auth: [
            {
                component: "./components/tenants/pages/create-tenant",
                exact: true,
                icon: null,
                id: "createTenant",
                name: "createTenant",
                path: AppConstants.getPaths().get("CREATE_TENANT"),
                protected: true,
                showOnSidePanel: false
            }
        ],
        default: [
            {
                component: "./components/getting-started/getting-started",
                exact: false,
                icon: {
                    icon: import("./assets/images/icons/shuttle-icon.svg")
                },
                id: "gettingStarted",
                name: "Getting Started",
                order: 0,
                path: `${ AppConstants.getMainViewBasePath() }/getting-started`,
                protected: true,
                showOnSidePanel: true
            }
        ],
        develop: [
            {
                id: "secretsManagement",
                showOnSidePanel: false
            },
            {
                category: "extensions:develop.sidePanel.categories.apiResources",
                children: [
                    {
                        component: "./components/api-resources/pages/api-resource-edit",
                        exact: true,
                        id: "apiResources-edit",
                        name: "extensions:develop.sidePanel.apiResources",
                        path: APIResourcesConstants.getPaths().get("API_RESOURCE_EDIT"),
                        protected: true,
                        showOnSidePanel: false
                    }
                ],
                component: "./components/api-resources/pages/api-resources",
                exact: true,
                featureStatus: "NEW",
                featureStatusLabel: "common:new",
                id: "apiResources",
                name: "extensions:develop.sidePanel.apiResources",
                order: 1,
                path: APIResourcesConstants.getPaths().get("API_RESOURCES"),
                protected: true,
                showOnSidePanel: false
            },
            {
                category: "extensions:develop.sidePanel.categories.branding",
                component: "./components/branding/pages/branding",
                exact: true,
                icon: {
                    icon: import("./assets/images/icons/paint-palette-and-brush-outline.svg")
                },
                id: "branding",
                name: "extensions:develop.sidePanel.branding",
                order: 3,
                path: `${ AppConstants.getDeveloperViewBasePath() }/branding`,
                protected: true,
                showOnSidePanel: true
            },
            {
                category: "extensions:develop.sidePanel.categories.eventPublishing",
                children: [
                    {
                        component: "./components/events/pages/event-edit",
                        exact: true,
                        icon: {
                            icon: import("./assets/images/icons/event-configuration.svg")
                        },
                        id: "event-edit",
                        name: "Event Edit",
                        path: AppConstants.getPaths().get("EVENT_EDIT"),
                        protected: true,
                        showOnSidePanel: false
                    }
                ],
                component: "./components/events/pages/events",
                exact: true,
                featureStatus: "NEW",
                featureStatusLabel: "common:new",
                icon: {
                    icon: import("./assets/images/icons/event-publishing.svg")
                },
                id: "eventPublishing",
                name: "Event Publishing",
                order: 7,
                path: AppConstants.getPaths().get("EVENTS_PATH"),
                protected: true,
                showOnSidePanel: true
            },
            {
                category: "extensions:develop.sidePanel.categories.monitor",
                component: "./components/logs/pages/logs",
                exact: true,
                featureStatus: "NEW",
                featureStatusLabel: "common:new",
                icon: {
                    icon: import("./assets/images/icons/monitor-icon-outline.svg")
                },
                id: "logs",
                name: "extensions:develop.sidePanel.monitor",
                order: 4,
                path: `${ AppConstants.getDeveloperViewBasePath() }/logs`,
                protected: true,
                showOnSidePanel: true
            }
        ],
        fullscreen: [],
        manage: [
            {
                id: "emailTemplates",
                showOnSidePanel: false
            },
            {
                id: "remoteFetchConfig",
                showOnSidePanel: false
            },
            {
                id: "approvals",
                showOnSidePanel: false
            },
            {
                id: "certificates",
                showOnSidePanel: false
            },
            {
                category: "extensions:manage.sidePanel.categories.userManagement",
                children: [
                    {
                        component: "./components/users/pages/consumer-user-edit",
                        exact: true,
                        icon: {
                            icon: import("./assets/images/icons/user-icon.svg")
                        },
                        id: "customer-user-edit",
                        name: "Customer Users Edit",
                        path: UsersConstants.getPaths().get("CUSTOMER_USER_EDIT_PATH"),
                        protected: true,
                        showOnSidePanel: false
                    }
                ],
                component: "./components/users/pages/users",
                exact: true,
                icon: {
                    icon: import("./assets/images/icons/user-icon.svg")
                },
                id: "users",
                name: "Users",
                order: 1,
                path: UsersConstants.getPaths().get("USERS_PATH"),
                protected: true,
                showOnSidePanel: true
            },
            {
                category: "extensions:manage.sidePanel.categories.userManagement",
                children: [
                    {
                        component: "./components/users/pages/guest-user-edit",
                        exact: true,
                        icon: {
                            icon: import("./assets/images/icons/admin-icon.svg")
                        },
                        id: "collaborator-user-edit",
                        name: "Collaborator Users Edit",
                        path: UsersConstants.getPaths().get("COLLABORATOR_USER_EDIT_PATH"),
                        protected: true,
                        showOnSidePanel: false
                    },
                    {
                        component: "./components/users/pages/administrator-settings",
                        exact: true,
                        icon: {
                            icon: getSidePanelIcons().childIcon
                        },
                        id: "administrator-settings-edit",
                        name: "administrator-settings-edit",
                        path: UsersConstants.getPaths().get("COLLABORATOR_SETTINGS_EDIT_PATH"),
                        protected: true,
                        showOnSidePanel: false
                    }
                ],
                component: "./components/users/pages/administrators",
                exact: true,
                icon: {
                    icon: import("./assets/images/icons/admin-icon.svg")
                },
                id: "administrators",
                name: "Administrators",
                order: 2,
                path: UsersConstants.getPaths().get("COLLABORATOR_USERS_PATH"),
                protected: true,
                showOnSidePanel: true
            },
            {
                category: "extensions:manage.sidePanel.categories.userManagement",
                children: [
                    {
                        component: "./components/groups/pages/groups-edit",
                        exact: true,
                        icon: {
                            icon: getSidePanelIcons().childIcon
                        },
                        id: "groupsEdit",
                        name: "console:manage.features.sidePanel.editGroups",
                        path: AppConstants.getPaths().get("GROUP_EDIT"),
                        protected: true,
                        showOnSidePanel: false
                    }
                ],
                component: "./components/groups/pages/groups",
                exact: true,
                icon: {
                    icon: getSidePanelIcons().groups
                },
                id: "groups",
                name: "Groups",
                order: 3,
                path: AppConstants.getPaths().get("GROUPS"),
                protected: true,
                showOnSidePanel: true
            },
            {
                // Remove roles temporarily.
                /* category: "extensions:manage.sidePanel.categories.userManagement",
                children: [
                    {
                        component: "./components/roles/pages/role-edit",
                        exact: true,
                        icon: {
                            icon: getSidePanelIcons().childIcon
                        },
                        id: "rolesEdit",
                        name: "console:manage.features.sidePanel.editRoles",
                        path: AppConstants.getPaths().get("ROLE_EDIT"),
                        protected: true,
                        showOnSidePanel: false
                    }
                ],
                component: "./components/roles/pages/role",
                exact: true,
                icon: {
                    icon: getSidePanelIcons().roles
                },
                name: "console:manage.features.sidePanel.roles",
                order: 3,
                path: AppConstants.getPaths().get("ROLES"),
                protected: true, */
                id: "roles",
                showOnSidePanel: false
            },
            {
                category: "extensions:manage.sidePanel.categories.userManagement",
                children: [
                    {
                        component: lazy(() => import("../features/organizations/pages/organization-roles-edit")),
                        exact: true,
                        icon: {
                            icon: getSidePanelIcons().roles
                        },
                        id: "organization-roles-edit",
                        name: "organization Roles Edit",
                        path: AppConstants.getPaths().get("ORGANIZATION_ROLE_UPDATE"),
                        protected: true,
                        showOnSidePanel: false
                    }
                ],
                component: lazy(() => import("../features/organizations/pages/organization-roles")),
                exact: true,
                icon: {
                    icon: getSidePanelIcons().roles
                },
                id: "organization-roles",
                name: "Organization Roles",
                order: 4,
                path: AppConstants.getPaths().get("ORGANIZATION_ROLES"),
                protected: true,
                showOnSidePanel: true
            },
            {
                category: "extensions:manage.sidePanel.categories.userManagement",
                children: [
                    {
                        component: lazy(() => import("../features/userstores/pages/user-stores-edit")),
                        exact: true,
                        icon: {
                            icon: getSidePanelIcons().childIcon
                        },
                        id: "edit-user-store",
                        name: "console:manage.features.sidePanel.editUserstore",
                        path: AppConstants.getPaths().get("USERSTORES_EDIT"),
                        protected: true,
                        showOnSidePanel: false
                    },
                    {
                        component: "./components/user-stores/pages/remote-user-store-edit-page",
                        exact: true,
                        icon: {
                            icon: getSidePanelIcons().childIcon
                        },
                        id: "remote-edit-user-store",
                        name: "console:manage.features.sidePanel.editUserstore",
                        path: AppConstants.getPaths().get("USERSTORES_EDIT").replace("edit-user-store",
                            userstoresConfig.userstoreEdit.remoteUserStoreEditPath),
                        protected: true,
                        showOnSidePanel: false
                    },
                    {
                        component: "./components/user-stores/pages/remote-customer-user-store-create",
                        icon: {
                            icon: getSidePanelIcons().childIcon
                        },
                        id: "remote-user-store-create",
                        name: "userstore create",
                        path: RemoteUserStoreConstants.getPaths().get("REMOTE_USER_STORE_CREATE"),
                        protected: true,
                        showOnSidePanel: false
                    }
                ],
                component: "./components/user-stores/pages/user-stores",
                exact: true,
                featureStatus: "NEW",
                featureStatusLabel: "common:new",
                icon: {
                    icon: getSidePanelIcons().userStore
                },
                id: "userStores",
                name: "User Stores",
                order: 5,
                path: AppConstants.getPaths().get("USERSTORES"),
                protected: true,
                showOnSidePanel: true
            },
            {
                category: "extensions:manage.sidePanel.categories.AccountManagement",
                children: [
                    {
                        component: "./components/governance-connectors/pages/connector-edit-page",
                        exact: true,
                        icon: {
                            icon: getSidePanelIcons().childIcon
                        },
                        id: "password-recovery",
                        name: "Password Recovery",
                        path: AppConstants.getPaths()
                            .get("GOVERNANCE_CONNECTOR_EDIT")
                            .replace(":categoryId", ServerConfigurationsConstants.
                                ACCOUNT_MANAGEMENT_CONNECTOR_CATEGORY_ID)
                            .replace(":connectorId", ServerConfigurationsConstants.
                                ACCOUNT_RECOVERY_CONNECTOR_ID),
                        protected: true,
                        showOnSidePanel: false
                    }
                ],
                component: "./components/governance-connectors/pages/connector-listing-page",
                exact: true,
                icon: {
                    icon: getSidePanelIcons().connectors[
                        ServerConfigurationsConstants.ACCOUNT_MANAGEMENT_CONNECTOR_CATEGORY_ID
                    ]
                },
                id: "accountRecovery",
                name: "Account Recovery",
                order: 6,
                path: AppConstants.getPaths()
                    .get("GOVERNANCE_CONNECTOR")
                    .replace(":id", ServerConfigurationsConstants.ACCOUNT_MANAGEMENT_CONNECTOR_CATEGORY_ID),
                protected: true,
                showOnSidePanel: true
            },
            {
                category: "extensions:manage.sidePanel.categories.AccountManagement",
                children: [
                    {
                        component: "./components/governance-connectors/pages/connector-edit-page",
                        exact: true,
                        icon: {
                            icon: getSidePanelIcons().childIcon
                        },
                        id: "self-registration-connector",
                        name: "Self Registration Connector",
                        path: AppConstants.getPaths()
                            .get("GOVERNANCE_CONNECTOR_EDIT")
                            .replace(":categoryId", ServerConfigurationsConstants.USER_ONBOARDING_CONNECTOR_ID)
                            .replace(":connectorId", ServerConfigurationsConstants.SELF_SIGN_UP_CONNECTOR_ID),
                        protected: true,
                        showOnSidePanel: false
                    }
                ],
                component: "./components/governance-connectors/pages/connector-listing-page",
                exact: true,
                icon: {
                    icon: getSidePanelIcons().connectors[
                        ServerConfigurationsConstants.USER_ONBOARDING_CONNECTOR_ID
                    ]
                },
                id: "userOnboarding",
                name: "Self Registration",
                order: 7,
                path: AppConstants.getPaths()
                    .get("GOVERNANCE_CONNECTOR")
                    .replace(":id", ServerConfigurationsConstants.USER_ONBOARDING_CONNECTOR_ID),
                protected: true,
                showOnSidePanel: true
            },
            {
                category: "extensions:manage.sidePanel.categories.AccountManagement",
                children: [
                    {
                        component: "./components/governance-connectors/pages/connector-edit-page",
                        exact: true,
                        icon: {
                            icon: getSidePanelIcons().childIcon
                        },
                        id: "login-attempt-security",
                        name: "Login Attempts Security",
                        path: AppConstants.getPaths()
                            .get("GOVERNANCE_CONNECTOR_EDIT")
                            .replace(":categoryId", ServerConfigurationsConstants.
                                LOGIN_ATTEMPT_SECURITY_CONNECTOR_CATEGORY_ID)
                            .replace(":connectorId", ServerConfigurationsConstants.ACCOUNT_LOCKING_CONNECTOR_ID),
                        protected: true,
                        showOnSidePanel: false
                    },
                    {
                        component: "./components/governance-connectors/pages/connector-edit-page",
                        exact: true,
                        icon: {
                            icon: getSidePanelIcons().childIcon
                        },
                        id: "bot-detection",
                        name: "Bot Detection",
                        path: AppConstants.getPaths()
                            .get("GOVERNANCE_CONNECTOR_EDIT")
                            .replace(":categoryId", ServerConfigurationsConstants.
                                LOGIN_ATTEMPT_SECURITY_CONNECTOR_CATEGORY_ID)
                            .replace(":connectorId", ServerConfigurationsConstants.CAPTCHA_FOR_SSO_LOGIN_CONNECTOR_ID),
                        protected: true,
                        showOnSidePanel: false
                    },
                    {
                        component: lazy(() => import("../features/validation/pages/validation-config-edit")),
                        exact: true,
                        icon: {
                            icon: getSidePanelIcons().organization
                        },
                        id: "validation-config-edit",
                        name: "Validation Configuration Edit",
                        path: AppConstants.getPaths().get("VALIDATION_CONFIG_EDIT"),
                        protected: true,
                        showOnSidePanel: false
                    }
                ],
                component: "./components/governance-connectors/pages/connector-listing-page",
                exact: true,
                icon: {
                    icon: getSidePanelIcons().connectors[
                        ServerConfigurationsConstants.LOGIN_ATTEMPT_SECURITY_CONNECTOR_CATEGORY_ID
                    ]
                },
                id: "accountSecurity",
                name: "Account Security",
                order: 8,
                path: AppConstants.getPaths()
                    .get("GOVERNANCE_CONNECTOR")
                    .replace(":id", ServerConfigurationsConstants.LOGIN_ATTEMPT_SECURITY_CONNECTOR_CATEGORY_ID),
                protected: true,
                showOnSidePanel: true
            },
            {
                category: "extensions:manage.sidePanel.categories.AccountManagement",
                children: [
                    {
                        component: "./components/my-account/pages/my-account-edit",
                        exact: true,
                        icon: {
                            icon: getSidePanelIcons().childIcon
                        },
                        id: "my-account-settings",
                        name: "My Account Settings",
                        path: AppConstants.getPaths().get("MY_ACCOUNT_EDIT"),
                        protected: true,
                        showOnSidePanel: false
                    }
                ],
                component: "./components/my-account/pages/my-account",
                exact: true,
                featureStatus: "NEW",
                featureStatusLabel: "common:new",
                icon: {
                    icon: import("./assets/images/icons/self-service-portal-icon.svg")
                },
                id: "myAccount",
                name: "Self-Service Portal",
                order: 9,
                path: AppConstants.getPaths().get("MY_ACCOUNT"),
                protected: true,
                showOnSidePanel: true
            },
            {
                category: "extensions:manage.sidePanel.categories.AccountManagement",
                children: [
                    {
                        component: "./components/account-login/pages/username-validation-edit",
                        exact: true,
                        icon: {
                            icon: getSidePanelIcons().childIcon
                        },
                        id: "account-login",
                        name: "Account Login",
                        path: AppConstants.getPaths().get("USERNAME_VALIDATION_EDIT"),
                        protected: true,
                        showOnSidePanel: false
                    }
                ],
                component: "./components/account-login/pages/account-login",
                exact: true,
                icon: {
                    icon: import("./assets/images/icons/account-login-icon.svg")
                },
                id: "accountLogin",
                name: "Account Login",
                order: 10,
                path: AppConstants.getPaths().get("ACCOUNT_LOGIN"),
                protected: true,
                showOnSidePanel: false
            },
            {
                category: "extensions:manage.sidePanel.categories.attributeManagement",
                id: "oidcScopes",
                showOnSidePanel: true
            },
            {
                category: "extensions:manage.sidePanel.categories.attributeManagement",
                id: "attributeDialects",
                showOnSidePanel: true
            },
            {
                category: "console:manage.features.sidePanel.categories.organizations",
                children: [
                    {
                        component: lazy(() => import("../features/organizations/pages/organization-edit")),
                        exact: true,
                        icon: {
                            icon: getSidePanelIcons().organization
                        },
                        id: "organization-edit",
                        name: "organization Edit",
                        path: AppConstants.getPaths().get("ORGANIZATION_UPDATE"),
                        protected: true,
                        showOnSidePanel: false
                    }
                ],
                component: lazy(() => import("../features/organizations/pages/organizations")),
                exact: true,
                featureStatus: "PREVIEW",
                featureStatusLabel: "common:preview",
                icon: {
                    icon: getSidePanelIcons().organization
                },
                id: "organizations",
                name: "console:manage.features.sidePanel.organizations",
                order: 9,
                path: AppConstants.getPaths().get("ORGANIZATIONS"),
                protected: true,
                showOnSidePanel: true
            }
        ]
    },
    sections: {
        components: {
            // TODO: Temporarily disable feedback button.
            // "feedback-button": "./components/feedback/feedback.tsx"
            // TODO: Temporarily use help center in the place of feedback.
            "feedback-button": "./components/help-center/helpCenter.tsx",
            "tenant-dropdown": "./components/tenants/components/dropdown/tenant-dropdown.tsx"
        }
    },
    templateExtensions: {
        applications: {
            categories: [],
            groups: [
                {
                    enabled: true,
                    id: "web-application",
                    resource: "./application-templates/groups/web-application-template-group.json"
                }
            ],
            templates: [
                {
                    content: {
                        quickStart: "./application-templates/templates/single-page-application/quick-start.tsx"
                    },
                    enabled: true,
                    id: "6a90e4b0-fbff-42d7-bfde-1efd98f07cd7",
                    resource: "./application-templates/templates/single-page-application/single-page-application.json"
                },
                {
                    content: {
                        quickStart: "./application-templates/templates/oidc-web-application/quick-start.tsx"
                    },
                    enabled: true,
                    id: "b9c5e11e-fc78-484b-9bec-015d247561b8",
                    resource: "./application-templates/templates/oidc-web-application/oidc-web-application.json"
                },
                {
                    content: {
                        quickStart: "./application-templates/templates/saml-web-application/quick-start.tsx"
                    },
                    enabled: true,
                    id: "776a73da-fd8e-490b-84ff-93009f8ede85",
                    resource: "./application-templates/templates/saml-web-application/saml-web-application.json"
                },
                {
                    enabled: false,
                    id: "df929521-6768-44f5-8586-624126ec3f8b"
                },
                {
                    content: {
                        quickStart: "./application-templates/templates/oidc-web-application/quick-start.tsx"
                    },
                    enabled: true,
                    id: "custom-application"
                },
                {
                    content: {
                        quickStart: "./application-templates/templates/mobile-application/quick-start.tsx"
                    },
                    enabled: true,
                    id: "mobile-application",
                    resource: "./application-templates/templates/mobile-application/mobile-application.json"
                },
                {
                    enabled: true,
                    id: "choreo-apim-application-oidc",
                    resource: "./application-templates/templates/choreo-apim-application-oidc/" +
                        "choreo-apim-application-oidc.json"
                }
            ]
        },
        identityProviders: {
            categories: [],
            templates: [
                {
                    content: {
                        quickStart: "./identity-provider-templates/templates/google/quick-start.tsx"
                    },
                    enabled: true,
                    id: "google-idp",
                    resource: "./identity-provider-templates/templates/google/google.json"
                },
                {
                    content: {
                        quickStart: "./identity-provider-templates/templates/github/quick-start.tsx"
                    },
                    enabled: true,
                    id: "github-idp",
                    resource: "./identity-provider-templates/templates/github/github.json"
                },
                {
                    content: {
                        quickStart: "./identity-provider-templates/templates/facebook/quick-start.tsx"
                    },
                    enabled: true,
                    id: "facebook-idp",
                    resource: "./identity-provider-templates/templates/facebook/facebook.json"
                },
                {
                    content: {},
                    enabled: true,
                    id: "enterprise-oidc-idp",
                    resource: "./identity-provider-templates/templates/oidc/oidc.json"
                },
                {
                    content: {},
                    enabled: true,
                    id: "enterprise-saml-idp",
                    resource: "./identity-provider-templates/templates/saml/saml.json"
                },
                {
                    content: {
                        quickStart: "./identity-provider-templates/templates/microsoft/quick-start.tsx"
                    },
                    enabled: true,
                    id: "microsoft-idp",
                    resource: "./identity-provider-templates/templates/microsoft/microsoft.json"
                },
                {
                    content: {},
                    enabled: true,
                    id: "linkedin-idp",
                    resource: "./identity-provider-templates/templates/linkedin/linkedin.json"
                },
                {
                    content: {},
                    enabled: true,
                    id: "apple-idp",
                    resource: "./identity-provider-templates/templates/apple/apple.json"
                },
                {
                    content: {
                        quickStart: "./identity-provider-templates/templates/swe/quick-start.tsx",
                        wizardHelp: "./identity-provider-templates/templates/swe/create-wizard-help.tsx"
                    },
                    enabled: true,
                    id: "swe-idp",
                    resource: "./identity-provider-templates/templates/swe/swe.json"
                }
            ]
        }
    }
});
