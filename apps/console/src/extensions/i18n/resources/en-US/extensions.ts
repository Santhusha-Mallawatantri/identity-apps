/**
 * Copyright (c) 2021, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content.
 */

import { Extensions } from "../../models";

/**
 * NOTES: No need to care about the max-len for this file since it's easier to
 * translate the strings to other languages easily with editor translation tools.
 * sort-keys is suppressed temporarily until the existing warnings are fixed.
 */
/* eslint-disable max-len */
/* eslint-disable sort-keys */
export const extensions: Extensions = {
    common: {
        community: "Community",
        help: {
            communityLink: "Ask the Community",
            docSiteLink: "Documentation",
            helpCenterLink: "Contact Support",
            helpDropdownLink: "Get Help"
        },
        learnMore: "Learn More",
        quickStart: {
            greeting: {
                alternativeHeading: "Welcome back, {{username}}!",
                heading: "Welcome, {{username}}!",
                subHeading: "Here’s how you can get started"
            },
            sections: {
                addSocialLogin: {
                    actions: {
                        setup: "Set Up Social Connections",
                        view: "View Social Connections"
                    },
                    description:
                        "Let your users log in to your applications with an Identity Provider of " + "their choice.",
                    heading: "Add social login"
                },
                integrateApps: {
                    actions: {
                        create: "Register Application",
                        manage: "Explore Applications",
                        view: "View Applications"
                    },
                    capabilities: {
                        sso: "SSO",
                        mfa: "MFA",
                        social: "Social Login"
                    },
                    description:
                        "Register your app and design the user login experience you want by configuring " +
                        "SSO, MFA, social login, and various flexible authentication rules.",
                    heading: "Add login to your apps"
                },
                learn: {
                    actions: {
                        view: "View Docs"
                    },
                    description:
                        "Get started using Asgardeo. Implement authentication for any kind of application " +
                        "in minutes.",
                    heading: "Learn"
                },
                manageUsers: {
                    actions: {
                        create: "Add Users",
                        manage: "Manage Users",
                        view: "View Users"
                    },
                    capabilities: {
                        collaborators: "Administrators",
                        customers: "Users",
                        groups: "User Groups"
                    },
                    description:
                        "Create user accounts for users and invite administrators to your organization. " +
                        "Allow your users to securely self-manage their profiles.",
                    heading: "Manage users and groups"
                },
                asgardeoTryIt: {
                    errorMessages: {
                        appCreateGeneric: {
                            message: "Something went wrong!",
                            description: "Failed to initialize the Try It app."
                        },
                        appCreateDuplicate: {
                            message: "Application already exists!",
                            description: "Please delete the existing {{productName}} Try It application."
                        }
                    }
                }
            }
        }
    },
    console: {
        application: {
            quickStart: {
                addUserOption: {
                    description: "You need a <1>user account</1> to log in to the application.",
                    hint:
                        "If you don’t already have a user account, click the below button to create one. " +
                        "Alternatively, go to <1>Manage > Users</1><3></3> and create users.",
                    message:
                        "If you do not already have a user account, contact your organization " +
                        "administrator."
                },
                spa: {
                    customConfig: {
                        heading: "You can implement login using <1>Authorization Code flow with PKCE</1> " + 
                            "with Asgardeo for any SPA technology.",
                        anySPATechnology: "or any SPA Technology",
                        configurations: "Configurations",
                        protocolConfig: "Use the following configurations to integrate your application with Asgardeo. " +
                            "For more details on configurations, go to the <1>Protocols</1> tab.",
                        clientId: "Client ID",
                        baseUrl: "Base URL",
                        redirectUrl: "Redirect URL",
                        scope: "Scope",
                        serverEndpoints: "Details on the server endpoints are available in the <1>Info</1> tab."
                    },
                    techSelection: {
                        heading: "Use the SDKs curated by Asgardeo and 3rd party integrations."
                    }
                },
                technologySelectionWrapper: {
                    subHeading:
                        "Use the <1>server endpoint " +
                        "details</1> and start integrating your own app or read through our <3>documentation</3> " +
                        "to learn  more.",
                    otherTechnology: "or any mobile technology"
                },
                twa: {
                    common: {
                        orAnyTechnology: "or any technology"
                    },
                    oidc: {
                        customConfig: {
                            clientSecret: "Client Secret",
                            heading: "You can implement login using <1>Authorization Code flow</1> " +
                                "with Asgardeo for any traditional web application."
                        }
                    },
                    saml: {
                        customConfig: {
                            heading: "Discover <1>SAML configurations</1> to integrate Asgardeo with" +
                                " any traditional web application.",
                            issuer: "Issuer",
                            acsUrl: "Assertion Consumer Service URL",
                            idpEntityId: "IdP Entity ID",
                            idpUrl: "IdP URL"
                        }
                    }
                }
            }
        },
        marketingConsent: {
            heading: "Let's stay in touch!",
            description: "Subscribe to our newsletter to get the latest news and product updates straight to your inbox.",
            actions: {
                subscribe: "Subscribe",
                decline: "Don't show this again"
            },
            notifications: {
                errors: {
                    fetch: {
                        message: "Something went wrong",
                        description: "Something went wrong when getting user consent data"
                    },
                    update: {
                        message: "Something went wrong",
                        description: "Something went wrong when updating user consent"
                    }
                }
            }
        }
    },
    develop: {
        apiResource: {
            pageHeader: {
                description: "Register and manage your API resources and configure permissions",
                title: "API Resources"
            },
            empty: "There are no API resources available at the moment.",
            apiResourceError: {
                subtitles: {
                    0: "Something went wrong when fetching the API resources",
                    1: "Please try again"
                },
                title: "Something went wrong"
            },
            addApiResourceButton: "+ New API Resource",
            confirmations: {
                deleteAPIResource: {
                    assertionHint: "Please confirm your action.",
                    content: "This action is irreversible and will permanently delete the API resource.",
                    header: "Are you sure?",
                    message: "If you delete this API resource, some functionalities may not work properly. " +
                        "Please proceed with caution."
                }
            },
            notifications: {
                deleteAPIResource: {
                    unauthorizedError: {
                        description: "You are not authorized to delete the API resource.",
                        message: "Unauthorized"
                    },
                    notFoundError: {
                        description: "The API resource you are trying to delete does not exist.",
                        message: "API resource not found"
                    },
                    genericError: {
                        description: "Failed to delete the API resource.",
                        message: "Something went wrong"
                    },
                    success: {
                        description: "Successfully deleted the API resource.",
                        message: "API resource deleted"
                    }
                },
                getAPIResource: {
                    unauthorizedError: {
                        description: "You are not authorized to view the API resource.",
                        message: "Unauthorized"
                    },
                    notFoundError: {
                        description: "The API resource you are trying to view does not exist.",
                        message: "API resource not found"
                    },
                    genericError: {
                        description: "Failed to retrieve the API resource.",
                        message: "Something went wrong"
                    }
                },
                getAPIResources: {
                    unauthorizedError: {
                        description: "You are not authorized to view the API resources.",
                        message: "Unauthorized"
                    },
                    genericError: {
                        description: "Failed to retrieve the API resources.",
                        message: "Something went wrong"
                    }
                }
            },
            table: {
                name: {
                    column: "Display name"
                },
                identifier: {
                    column: "Identifier",
                    label: "Identifier"
                },
                actions: {
                    column: "Actions"
                },
                advancedSearch: {
                    form: {
                        inputs: {
                            filterAttribute: {
                                placeholder: "Display name or Identifier"
                            },
                            filterCondition: {
                                placeholder: "E.g. Starts with etc."
                            },
                            filterValue: {
                                placeholder: "Enter value to search"
                            }
                        }
                    },
                    placeholder: "Search by display name"
                }
            },
            tabs: {
                apiResourceError: {
                    subtitles: {
                        0: "An error occurred while retrieving the requested API resource, possibly because the resource does not exist.",
                        1: "Please try again."
                    },
                    title: "Something went wrong"
                },
                title: "Edit API Resource",
                backButton: "Go back to API Resources",
                general: {
                    dangerZoneGroup: {
                        header: "Danger Zone",
                        deleteApiResource: {
                            header: "Delete API Resource",
                            subHeading: "This action will permanently delete the API Resource. Please be certain before you proceed.",
                            button: "Delete API Resource"
                        }
                    },
                    form: {
                        fields: {
                            name: {
                                emptyValidate: "Name cannot be empty",
                                label: "Name",
                                placeholder: "Enter a friendly name for the API resource"
                            },
                            identifier: {
                                hint: "[Text description for identifier]",
                                label: "Identifier"
                            },
                            description: {
                                label: "Description",
                                placeholder: "Enter a description for the API resource"
                            }
                        },
                        updateButton: "Update"
                    },
                    label: "General"
                },
                permissions: {
                    button: "+ Add Permission",
                    label: "Permissions",
                    title: "List of Permissions",
                    subTitle: "List of permissions uses by the API Resource.",
                    learnMore: "Learn More",
                    search: "Search Permissions",
                    emptyPlaceHolder: "No permission is assigned to the API resource",
                    form: {
                        button: "+ Add Permission",
                        cancelButton: "Cancel",
                        submitButton: "Finish",
                        title: "Add Permissions",
                        subTitle: "Create new Permissions",
                        fields: {
                            permission: {
                                emptyValidate: "Permission cannot be empty",
                                label: "Permission",
                                placeholder: "Enter the permission"
                            },
                            description: {
                                label: "Description",
                                placeholder: "Enter the Description"
                            }
                        }
                    }
                }
            },
            wizard: {
                addApiResource: {
                    cancelButton: "Cancel",
                    nextButton: "Next",
                    previousButton: "Previous",
                    submitButton: "Finish",
                    title: "Add API Resource",
                    subtitle: "Create a new API resource",
                    steps: {
                        basic: {
                            stepTitle: "Basic Details",
                            form: {
                                fields: {
                                    name: {
                                        emptyValidate: "Name cannot be empty",
                                        label: "Name",
                                        placeholder: "Enter a friendly name for the API resource"
                                    },
                                    identifier: {
                                        emptyValidate: "Identifier cannot be empty",
                                        hint: "[Text description for identifier]",
                                        label: "Identifier",
                                        placeholder: "Enter the identifier of the API resource"
                                    },
                                    description: {
                                        label: "Description",
                                        placeholder: "Enter a description for the API resource"
                                    }
                                }
                            }
                        },
                        permissions: {
                            emptyPlaceHolder: "No permission is assigned to the API Resource",
                            stepTitle: "Permissions",
                            form: {
                                button: "+ Add Permission",
                                fields: {
                                    permission: {
                                        emptyValidate: "Permission cannot be empty",
                                        label: "Permission",
                                        placeholder: "Enter the permission"
                                    },
                                    description: {
                                        label: "Description",
                                        placeholder: "Enter the Description"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        applications: {
            asgardeoTryIt: {
                description:
                    "You can try out different login flows of Asgardeo with our Try It app."
            },
            edit: {
                sections: {
                    signInMethod: {
                        sections: {
                            authenticationFlow: {
                                sections: {
                                    stepBased: {
                                        secondFactorDisabled:
                                            "Second factor authenticators can only be used if " +
                                            "<1>Username & Password</1>, <3>Social Login</3> or " +
                                            "<5>Security Key/Biometrics </5> is present in a " +
                                            "previous step."
                                    }
                                }
                            }
                        }
                    },
                    roles: {
                        addRoleWizard: {
                            buttons: {
                                finish: "Finish",
                                next: "Next",
                                previous: "Previous"
                            },
                            forms: {
                                roleBasicDetails: {
                                    roleName: {
                                        hint: "A name for the role.",
                                        label: "Role Name",
                                        placeholder: "Enter role name",
                                        validations: {
                                            duplicate: "A role already exists with the given role name.",
                                            empty: "Role name is required to proceed.",
                                            invalid: "A role name can only contain alphanumeric characters, -, and _. "
                                                + "And must be of length between 3 to 30 characters."
                                        }
                                    }
                                },
                                rolePermissions: {
                                    label: "Role Permissions",
                                    searchPlaceholer: "Search by API name and permission name"
                                }
                            },
                            heading: "Create Role",
                            subHeading: "Create a new role in your application.",
                            wizardSteps: {
                                0: "Basic Details",
                                1: "Permission Selection"
                            }
                        },
                        title: "Roles",
                        heading: "Roles",
                        subHeading: "Manage application level roles in your application.",
                        buttons: {
                            newRole: "New Role"
                        },
                        advancedSearch: {
                            form: {
                                inputs: {
                                    filterValue: {
                                        placeholder: "Enter value to search"
                                    }
                                }
                            },
                            placeholder: "Search by role name"
                        },
                        list: {
                            columns: {
                                actions: "",
                                name: "Name"
                            }
                        },
                        editModal: {
                            heading: "Manage Permissions",
                            subHeading: "Select the permissions related to the role.",
                            searchPlaceholer: "Search by API name and permission name"
                        },
                        deleteRole: {
                            confirmationModal: {
                                assertionHint: "Please confirm your action.",
                                content: "If you delete this application role, the users associated with above application role" +
                                    "will no longer have the assigned permissions. Please proceed with caution.",
                                header: "Are you sure?",
                                message: "This action is irreversible and will permanently delete the application role."
                            }
                        },
                        placeHolders: {
                            emptyList: {
                                action: "New Role",
                                subtitles: {
                                    0: "There are currently no roles available."
                                },
                                title: "No Roles Available"
                            },
                            emptySearchResults: {
                                action: "Clear search query",
                                subtitles: {
                                    0: "We couldn't find any results for '{{ searchQuery }}'",
                                    1: "Please try a different search term."
                                },
                                title: "No results found"
                            },
                            emptyPermissions: {
                                subtitles: {
                                    0: "There are no authorized permissions available for your application."
                                }
                            }
                        },
                        notifications: {
                            createApplicationRole: {
                                error: {
                                    description: "{{description}}",
                                    message: "Error occurred while creating the application role"
                                },
                                genericError: {
                                    description: "Error occurred while creating the application role.",
                                    message: "Something went wrong"
                                },
                                success: {
                                    description: "Successfully created the application role.",
                                    message: "Create successful"
                                }
                            },
                            updatePermissions: {
                                error: {
                                    description: "{{description}}",
                                    message: "Error occurred while updating the role permissions"
                                },
                                genericError: {
                                    description: "Error occurred while updating the role permissions.",
                                    message: "Something went wrong"
                                },
                                success: {
                                    description: "Updating role permissions successful.",
                                    message: "Update successful"
                                }
                            },
                            deleteApplicationRole: {
                                error: {
                                    description: "{{description}}",
                                    message: "Error occurred while delete the application role"
                                },
                                genericError: {
                                    description: "Error occurred while deleting the application role.",
                                    message: "Something went wrong"
                                },
                                success: {
                                    description: "Successfully deleted the application role.",
                                    message: "Delete successful"
                                }
                            },
                            fetchApplicationRoles: {
                                error: {
                                    description: "{{description}}",
                                    message: "Error occurred while fetching the application roles"
                                },
                                genericError: {
                                    description: "Error occurred while fetching the application roles.",
                                    message: "Something went wrong"
                                }
                            },
                            fetchAuthorizedAPIs: {
                                error: {
                                    description: "{{description}}",
                                    message: "Error occurred while fetching the Authorized APIs"
                                },
                                genericError: {
                                    description: "Error occurred while fetching the Authorized APIs.",
                                    message: "Something went wrong"
                                }
                            }
                        }
                    }
                }
            },
            quickstart: {
                mobileApp: {
                    configurations: {
                        anyTechnology: "or any mobile application technology",
                        heading: "Follow <1>this guide</1> to learn the OIDC Authorization Code Flow with PKCE and use below details to " +
                            "configure any third-party OIDC SDK for mobile applications.",
                        discoveryURI: {
                            label: "Discovery URI",
                            info: "This endpoint is called by applications to dynamically discover the OpenID Connect identity provider metadata."
                        },
                        generalDescription: "Use the following configurations to integrate your mobile application with Asgardeo.",
                        moreInfoDescription: "Use additional details on server endpoints in the <1>Info</1> tab to build your application.",
                        protocolDescription: "For more details on configurations, go to the <1>Protocol</1> tab.",
                        redirectURI: {
                            label: "Redirect URI"
                        },
                        scope: {
                            label: "Scope"
                        }
                    },
                    tabHeading: "Guide",
                    technologyInfo: "You can integrate this application with any third party OIDC mobile SDK of your choice. <1>Learn More</1>"
                },
                spa: {
                    common: {
                        addTestUser: {
                            title: "Try Out!"
                        },
                        prerequisites: {
                            angular:
                                "<0>Note: </0>The SDK currently doesn't support Angular 11 applications " +
                                "in the <2>Strict Mode</2>. We are working on making the SDK compatible.",
                            node:
                                "You will need to have <1>Node.js</1> and <3>npm</3> installed on your " +
                                "environment to try out the SDK. To download the Long Term Support (LTS) version " +
                                "of <5>Node.js</5> (which includes <7>npm</7>), navigate to the official " +
                                "<9>downloads</9> page."
                        }
                    },
                    integrate: {
                        common: {
                            sdkConfigs: {
                                clientId: {
                                    hint: "The OAuth 2.0 Client Identifier valid at the authorization server."
                                },
                                scope: {
                                    hint:
                                        "These are the set of scopes that are used to request " +
                                        "user attributes.<1></1>" +
                                        "If you need to add more scopes other than <3>openid</3> & <5>profile</5>" +
                                        ", you can append them to the array.<7></7>" +
                                        "Read through our <9>documentation</9> to learn  more."
                                },
                                serverOrigin: {
                                    hint: "The origin of the Identity Provider."
                                },
                                signInRedirectURL: {
                                    hint: {
                                        content:
                                            "The URL that determines where the authorization code is sent to " +
                                            "upon user authentication.<1></1>" +
                                            "If your application is hosted on a different URL, go to the " +
                                            "<3>protocol</3> tab and configure the correct URL from the " +
                                            "<5>Authorized redirect URLs</5> field.",
                                        multipleWarning:
                                            "You have configured multiple valid callback URLs for " +
                                            "your application. Please verify that the correct URL is selected."
                                    }
                                },
                                signOutRedirectURL: {
                                    hint: {
                                        content:
                                            "The URL that determines where the user is redirected to upon " +
                                            "logout.<1></1>" +
                                            "If your application is hosted on a different URL, go to the " +
                                            "<3>protocol</3> tab and configure the correct URL from the " +
                                            "<5>Authorized redirect URLs</5> field.",
                                        multipleWarning:
                                            "You have configured multiple valid callback URLs for " +
                                            "your application. Please verify that the correct URL is selected."
                                    }
                                }
                            }
                        }
                    },
                    samples: {
                        exploreMoreSamples: "Explore <1>more samples <1></1></1> like this."
                    }
                },
                twa: {
                    setup: {
                        skipURIs:
                            "Note the <1>skipURIs</1> property. This property defines the web pages in your " +
                            "application that should not be secured, and do not require authentication. Multiple " +
                            "URIs can be set using <3>comma separated</3> values."
                    }
                }
            }
        },
        branding: {
            confirmations: {
                revertBranding: {
                    assertionHint: "Please confirm your action.",
                    content: "This action is irreversible and will permanently revert your branding preferences.",
                    header: "Are you sure?",
                    message:
                        "If you revert the branding preferences, your users will start to see " +
                        "{{ productName }} branding on the login flows. Please proceed with caution."
                },
                featureToggle: {
                    assertionHint: "Please confirm your action.",
                    enableContent: "Once these preferences are published, they are applied to the user registration flows and all login flows (including multi-factor login) of your apps and email templates.",
                    disableContent: "Once these preferences are unpublished, they are no longer applied to the user registration flows and all login flows (including multi-factor login) of your apps and email templates.",
                    header: "Are you sure?",
                    enableMessage:
                        "If you enable the branding preferences, your users will start to see " +
                        "your branding on the login flows. Please confirm.",
                    disableMessage:
                        "If you disable the branding preferences, your users will start to see " +
                        "{{ productName }} branding on the login flows. Please confirm."
                }
            },
            dangerZoneGroup: {
                header: "Danger Zone",
                revertBranding: {
                    actionTitle: "Revert",
                    header: "Revert to default",
                    subheader: "Once the branding preferences are reverted, they can't be recovered and your " +
                        "users will see {{ productName }}'s default branding."
                }
            },
            forms: {
                advance: {
                    links: {
                        fields: {
                            cookiePolicyURL: {
                                hint:
                                    "Link to a document or a webpage with detailed information on all cookies " +
                                    "used by your applications and the purpose of each of them.",
                                label: "Cookie Policy",
                                placeholder: "https://asgardeo.io/cookie-policy"
                            },
                            privacyPolicyURL: {
                                hint:
                                    "Link to a statement or a legal document that states how your organization " +
                                    "collects, handles, and processes the data of your customers and visitors.",
                                label: "Privacy Policy",
                                placeholder: "https://asgardeo.io/privacy-policy"
                            },
                            termsOfUseURL: {
                                hint:
                                    "Link to an agreement that your customers must agree to and abide by in " +
                                    "order to use your organization's applications or other services.",
                                label: "Terms of Service",
                                placeholder: "https://asgardeo.io/terms-of-service"
                            }
                        },
                        heading: "Links"
                    }
                },
                design: {
                    layout: {
                        headings: {
                            fields: {
                                productTagline: {
                                    hint: "Add a tagline for your product."
                                        + "This will be displayed below your product logo.",
                                    label: "Product Tagline Text",
                                    placeholder: "Enter a text for the tagline"
                                }
                            },
                            heading: "Product Tagline"
                        },
                        images: {
                            logo: {
                                fields: {
                                    alt: {
                                        hint: "Add an alternative text to represent the image. It will be displayed"
                                            + " when the image does not load.",
                                        label: "Side Image Alt Text",
                                        placeholder: "Enter alt text for side image"
                                    },
                                    url: {
                                        hint: "Use an image that’s at least <1>1920x1080 pixels</1> and less than"
                                            + " <3>1 mb</3> in size for better performance.",
                                        label: "Side Image URL",
                                        placeholder: "https://asgardeo.io/placeholder.jpeg"
                                    }
                                },
                                heading: "Side Image",
                                preview: "Preview"
                            }
                        },
                        variations: {
                            fields: {
                                centered: {
                                    imgAlt: "Centered layout",
                                    label: "Centered"
                                },
                                "custom": {
                                    imgAlt: "Custom layout",
                                    label: "Custom"
                                },
                                "left-aligned": {
                                    imgAlt: "Left aligned layout",
                                    label: "Left Aligned"
                                },
                                "left-image": {
                                    imgAlt: "Left image layout",
                                    label: "Left Image"
                                },
                                "right-aligned": {
                                    imgAlt: "Right aligned layout",
                                    label: "Right Aligned"
                                },
                                "right-image": {
                                    imgAlt: "Right image layout",
                                    label: "Right Image"
                                }
                            }
                        }
                    },
                    theme: {
                        buttons: {
                            externalConnections: {
                                fields: {
                                    backgroundColor: {
                                        hint: "The background color of buttons for external connections such as " +
                                            "social logins, third-party IdPs, etc.",
                                        label: "Background Color",
                                        placeholder: "Select a background color for external connections buttons."
                                    },
                                    borderRadius: {
                                        hint: "The border radius of buttons for external connections.",
                                        label: "Border Radius",
                                        placeholder: "Select a border radius for external connections button."
                                    },
                                    fontColor: {
                                        hint: "The font color of buttons for external connections.",
                                        label: "Font Color",
                                        placeholder: "Select a font color for external connections button."
                                    }
                                },
                                heading: "External Connection Button"
                            },
                            heading: "Buttons",
                            primary: {
                                fields: {
                                    borderRadius: {
                                        hint: "The border radius of primary buttons.",
                                        label: "Border Radius",
                                        placeholder: "Select a primary button border radius."
                                    },
                                    fontColor: {
                                        hint: "The font color of the primary buttons.",
                                        label: "Font Color",
                                        placeholder: "Select a primary button font color."
                                    }
                                },
                                heading: "Primary Button"
                            },
                            secondary: {
                                fields: {
                                    borderRadius: {
                                        hint: "The border radius of secondary buttons.",
                                        label: "Border Radius",
                                        placeholder: "Select a secondary button border radius."
                                    },
                                    fontColor: {
                                        hint: "The font color of secondary buttons.",
                                        label: "Font Color",
                                        placeholder: "Select a secondary button font color."
                                    }
                                },
                                heading: "Secondary Button"
                            }
                        },
                        colors: {
                            fields: {
                                primaryColor: {
                                    hint: "The main color that is shown in primary action buttons, hyperlinks, etc.",
                                    label: "Primary Color",
                                    placeholder: "Select a primary color."
                                },
                                secondaryColor: {
                                    hint: "The color that is shown in secondary action buttons like cancel buttons" +
                                        ", etc.",
                                    label: "Secondary Color",
                                    placeholder: "Select a secondary color."
                                }
                            },
                            heading: "Color Palette"
                        },
                        font: {
                            fields: {
                                fontFamilyDropdown: {
                                    hint: "Pick a web safe font (fonts that are pre-installed by many "+
                                        "operating systems) as the font family for the pages.",
                                    label: "Font Family",
                                    placeholder: "Select a font family."
                                },
                                fontFamilyInput: {
                                    hint: "Enter the font family of the custom font you selected above. This is " +
                                        "usually documented in the font service where you extracted the import URL.",
                                    label: "Font Family",
                                    placeholder: "E.g. Poppins"
                                },
                                importURL: {
                                    hint: "Enter a URL to import a custom font from a font service.",
                                    label: "Font Import URL",
                                    placeholder: "E.g., https://fonts.googleapis.com/css2?family=Poppins"
                                }
                            },
                            heading: "Font",
                            types: {
                                fromCDN: "Import a font",
                                fromDefaults: "Use a web-safe font"
                            }
                        },
                        footer: {
                            fields: {
                                borderColor: {
                                    hint: "The top border color of the page footer.",
                                    label: "Border Color",
                                    placeholder: "Select a footer border color"
                                },
                                fontColor: {
                                    hint: "The font color of the copyright text and other links in the footer. " +
                                        "If not set, page font color will be used.",
                                    label: "Font Color",
                                    placeholder: "Select a footer font color"
                                }
                            },
                            heading: "Footer"
                        },
                        headings: {
                            fields: {
                                fontColor: {
                                    hint: "The font color of the headings (h1, h2, h3, etc.) that appear on " +
                                        "the pages. If not set, page font color will be used.",
                                    label: "Font Color",
                                    placeholder: "Select a heading font color."
                                }
                            },
                            heading: "Headings"
                        },
                        images: {
                            favicon: {
                                fields: {
                                    url: {
                                        hint: "Use an image with a square aspect ratio that’s at least <1>16x16 " +
                                            "pixels</1> in size for better results. If not set, {{ productName }} " +
                                            "defaults are used.",
                                        label: "Favicon URL",
                                        placeholder: "https://asgardeo.io/favicon.ico"
                                    }
                                },
                                heading: "Favicon",
                                preview: "Preview"
                            },
                            heading: "Images",
                            logo: {
                                fields: {
                                    alt: {
                                        hint:
                                            "Add a short description of the logo image to display when the image " +
                                            "does not load and also for SEO and accessibility. If not set, " +
                                            "{{ productName }} defaults are used.",
                                        label: "Logo Alt Text",
                                        placeholder: "Enter an alt text for logo."
                                    },
                                    url: {
                                        hint:
                                            "Use an image that’s at least <1>600x600 pixels</1> and less than " +
                                            "<3>1mb</3> in size for better performance. If not set, " +
                                            "{{ productName }} defaults are used.",
                                        label: "Logo URL",
                                        placeholder: "https://asgardeo.io/logo.png"
                                    }
                                },
                                heading: "Logo",
                                preview: "Preview"
                            }
                        },
                        inputs: {
                            fields: {
                                backgroundColor: {
                                    hint: "The background color of the inputs such as text inputs, checkboxes, etc.",
                                    label: "Background Color",
                                    placeholder: "Select a background color for the inputs."
                                },
                                borderColor: {
                                    hint: "The border color of the text inputs, checkboxes, etc.",
                                    label: "Border Color",
                                    placeholder: "Select a border color for the inputs."
                                },
                                borderRadius: {
                                    hint: "The border radius of the text inputs.",
                                    label: "Border Radius",
                                    placeholder: "Select a border radius for the inputs."
                                },
                                fontColor: {
                                    hint: "The font color of the characters inside the text input fields, check" +
                                        "symbol of checkboxes, etc. If not set, page font color will be used.",
                                    label: "Font Color",
                                    placeholder: "Select a font color for the inputs."
                                }
                            },
                            heading: "Inputs",
                            labels: {
                                fields: {
                                    fontColor: {
                                        hint: "The font color of the labels of text inputs, checkboxes, etc. "
                                            + "If not set, page font color will be used.",
                                        label: "Font Color",
                                        placeholder: "Select a font color for the input labels."
                                    }
                                },
                                heading: "Input Labels"
                            }
                        },
                        loginBox: {
                            fields: {
                                backgroundColor: {
                                    hint: "The background color of the login box.",
                                    label: "Background Color",
                                    placeholder: "Select a background color of the login box."
                                },
                                borderColor: {
                                    hint: "The border color of the login box.",
                                    label: "Border Color",
                                    placeholder: "Select a border color for the login box."
                                },
                                borderRadius: {
                                    hint: "The border radius of the login box.",
                                    label: "Border Radius",
                                    placeholder: "Select a border radius for the login box."
                                },
                                borderWidth: {
                                    hint: "The border width of the login box.",
                                    label: "Border Width",
                                    placeholder: "Select a border width of the login box."
                                },
                                fontColor: {
                                    hint: "The font color of the text, labels, etc. that's inside the login box. "
                                        + "If not set, page font color will be used.",
                                    label: "Font Color",
                                    placeholder: "Select a font color for the login box text."
                                }
                            },
                            heading: "Login Box"
                        },
                        page: {
                            fields: {
                                backgroundColor: {
                                    hint: "The background color of the pages.",
                                    label: "Background Color",
                                    placeholder: "Select a page background color"
                                },
                                fontColor: {
                                    hint: "The font color for the text on pages. This doesn't change the colors " +
                                        "of the hyperlinks and button text. More fine grained control on the " +
                                        "specific elements like headings, inputs, footer text, etc. can be " +
                                        "configured in the below sections.",
                                    label: "Font Color",
                                    placeholder: "Select a page font color"
                                }
                            },
                            heading: "Page"
                        },
                        variations: {
                            fields: {
                                dark: {
                                    label: "Dark"
                                },
                                light: {
                                    label: "Light"
                                }
                            }
                        }
                    }
                },
                general: {
                    fields: {
                        copyrightText: {
                            hint:
                                "Text that appears at the footer of the login screens. If not set, " +
                                "{{ productName }} defaults are used.",
                            label: "Copyright Text",
                            placeholder: "Enter a copyright text"
                        },
                        siteTitle: {
                            hint:
                                "The site title may appear in browser tabs, search engine results, social shares, " +
                                "etc. If not set, {{ productName }} defaults are used.",
                            label: "Site Title",
                            placeholder: "Enter a site title"
                        },
                        supportEmail: {
                            hint: "The email address that appears on error pages and other pages where " +
                                "users would require support. If not set, {{ productName }} defaults are used.",
                            label: "Contact Email",
                            placeholder: "Enter a contact email"
                        }
                    }
                }
            },
            notifications: {
                delete: {
                    genericError: {
                        description: "An error occurred while reverting the Branding preferences for {{ tenant }}.",
                        message: "Couldn't revert branding preferences"
                    },
                    invalidStatus: {
                        description: "Something went wrong while reverting branding preferences for {{ tenant }}.",
                        message: "Couldn't revert branding preferences"
                    },
                    notConfigured: {
                        description: "No Branding preferences found for {{ tenant }}.",
                        message: "Nothing to revert"
                    },
                    success: {
                        description: "Successfully reverted Branding preferences for {{ tenant }}.",
                        message: "Revert successful"
                    }
                },
                fetch: {
                    customLayoutNotFound: {
                        description: "There is no deployed custom layout for {{ tenant }}.",
                        message: "Couldn't activate the custom layout"
                    },
                    genericError: {
                        description: "An error occurred while getting the Branding preferences for {{ tenant }}.",
                        message: "Couldn't get branding preferences"
                    },
                    invalidStatus: {
                        description: "Something went wrong while getting branding preferences for {{ tenant }}.",
                        message: "Couldn't get branding preferences"
                    },
                    tenantMismatch: {
                        description: "Something went wrong while getting branding preferences for {{ tenant }}.",
                        message: "Couldn't get branding preferences"
                    }
                },
                update: {
                    genericError: {
                        description: "An error occurred while updating the Branding preferences for {{ tenant }}.",
                        message: "Update Error"
                    },
                    invalidStatus: {
                        description: "Something went wrong while updating branding preferences for {{ tenant }}.",
                        message: "Update Error"
                    },
                    success: {
                        description: "Branding preference updated successfully for {{ tenant }}.",
                        message: "Update Successful"
                    },
                    tenantMismatch: {
                        description: "Something went wrong while updating branding preferences for {{ tenant }}.",
                        message: "Update Error"
                    }
                }
            },
            pageHeader: {
                description: "Customize consumer-facing user interfaces of applications in your organization.",
                title: "Branding"
            },
            publishToggle: {
                hint: "Branding feature is turned off. Your changes will not be reflected until the feature is turned on.",
                label: "Publish",
                enabled: "Enabled",
                disabled: "Disabled"
            },
            tabs: {
                advance: {
                    label: "Advanced"
                },
                design: {
                    label: "Design",
                    sections: {
                        imagePreferences: {
                            description: "Add custom images to match your organization’s theme.",
                            heading: "Image Preferences"
                        },
                        layoutVariation: {
                            description: "Select a layout for your interfaces. "
                                + "You can further customize these layouts by updating the theme preferences.",
                            heading: "Layout",
                            status: "NEW"
                        },
                        themePreferences: {
                            description: "Based on the above selected theme variation, start customizing the "
                                + "following elements to match your organization's guidelines.",
                            heading: "Theme Preferences"
                        },
                        themeVariation: {
                            description: "Select a color theme for your interfaces. You can further customize " +
                                "these themes using the options given below. By default, the light theme " +
                                "({{ productName }} theme) is selected.",
                            heading: "Theme"
                        }
                    }
                },
                general: {
                    customRequest: {
                        description:
                            "If you require further customizations, please reach to us at " +
                            "<1>{{ supportEmail }}</>",
                        heading: "Need more customizations?"
                    },
                    label: "General"
                },
                preview: {
                    disclaimer:
                        "Once these preferences are published, they are applied to the user registration flows " +
                        "and all login flows (including multi-factor login) of your apps and email templates.",
                    errors: {
                        layout: {
                            notFound: {
                                subTitle: "The resource you are looking for is not available.",
                                title: "Resource Not Found"
                            },
                            notFoundWithSupport: {
                                subTitle: "Need a fully customized layout for your organization? "
                                    + "Reach us out at <1>{{ supportEmail }}</1>",
                                title: "Custom Layout Not Found"
                            }
                        }
                    },
                    label: "Preview"
                }
            }
        },
        identityProviders: {
            emailOTP: {
                quickStart: {
                    addLoginModal: {
                        heading: "Add Email OTP",
                        subHeading: "Select an application to set up Email OTP login."
                    },
                    connectApp: {
                        description:
                            "Add <1>Email OTP</1> to <3>Step 2</3> on the <5>Sign-in Method" +
                            "</5> section of your <7>application</7>."
                    },
                    heading: "Email OTP Set Up Guide",
                    subHeading:
                        "Follow the instructions given below to set up Email OTP as a factor in your login " + "flow.",
                    steps: {
                        customizeFlow: {
                            content: "Continue to configure the login flow as required.",
                            heading: "Customize the flow"
                        },
                        selectApplication: {
                            content: "Choose the <1>application</1> for which you want to set up Email OTP login.",
                            heading: "Select Application"
                        },
                        selectEmailOTP: {
                            content:
                                "Go to <1>Sign-in Method</1> tab and click on <3>Add Email OTP as a second " +
                                "factor</3> to configure a basic Email OTP flow.",
                            heading: "Select <1>Add Email OTP as a second factor</1>"
                        }
                    }
                }
            },
            smsOTP: {
                settings: {
                    smsOtpEnableDisableToggle: {
                        labelEnable: "Enable SMS OTP",
                        labelDisable: "Disable SMS OTP "
                    },
                    enableRequiredNote: {
                        message: "Asgardeo publishes events to <1>Choreo</1> to enable SMS OTP, where Choreo " +
                            "webhooks will be used to integrate with multiple services to publish OTP Notifications. " +
                            "Follow the <3>Add SMS OTP Guide</3> to configure Choreo webhooks for Asgardeo publish " +
                            "events."
                    },
                    errorNotifications: {
                        notificationSendersRetrievalError: {
                            message: "Error Occurred",
                            description: "Error occurred while trying to get SMS OTP configuration."
                        },
                        smsPublisherCreationError: {
                            message: "Error Occurred",
                            description: "Error occurred while trying to enable SMS OTP."
                        },
                        smsPublisherDeletionError: {
                            message: "Error Occurred",
                            description: "Error occurred while trying to disable SMS OTP."
                        }
                    }
                },
                quickStart: {
                    addLoginModal: {
                        heading: "Add SMS OTP",
                        subHeading: "Select an application to set up SMS OTP login."
                    },
                    connectApp: {
                        description:
                            "Add <1>SMS OTP</1> to <3>Step 2</3> on the <5>Sign-in Method" +
                            "</5> section of your <7>application</7>."
                    },
                    heading: "SMS OTP Set Up Guide",
                    subHeading:
                        "Follow the instructions given below to set up SMS OTP as a factor in your login flow.",
                    steps: {
                        selectApplication: {
                            content: "Choose the <1>application</1> for which you want to set up SMS OTP login.",
                            heading: "Select Application"
                        },
                        selectSMSOTP: {
                            content:
                                "Go to <1>Sign-in Method</1> tab and click on <3>Add SMS OTP as a second " +
                                "factor</3> to configure a basic SMS OTP flow.",
                            heading: "Select <1>Add SMS OTP as a second factor</1>"
                        }
                    }
                }
            },
            facebook: {
                quickStart: {
                    addLoginModal: {
                        heading: "Add Facebook Login",
                        subHeading: "Select an application to set up Facebook login."
                    },
                    connectApp: {
                        description:
                            "Add <1>Facebook</1> authenticator to <3>Step 1</3> on the <5>Sign-in Method" +
                            "</5> section of your <7>application</7>."
                    },
                    heading: "Add Facebook Login",
                    subHeading: "Facebook is now ready to be used as a login option for your " + "applications.",
                    steps: {
                        customizeFlow: {
                            content: "Continue to configure the login flow as required.",
                            heading: "Customize the flow"
                        },
                        selectApplication: {
                            content: "Choose the <1>application</1> for which you want to set up Facebook login.",
                            heading: "Select Application"
                        },
                        selectDefaultConfig: {
                            content:
                                "Go to <1>Sign-in Method</1> tab and click on <3>Start with default " +
                                "configuration</3>.",
                            heading: "Select <1>Start with default configuration</1>"
                        }
                    }
                }
            },
            github: {
                quickStart: {
                    addLoginModal: {
                        heading: "Add GitHub Login",
                        subHeading: "Select an application to set up GitHub login."
                    },
                    connectApp: {
                        description:
                            "Add <1>GitHub</1> authenticator to <3>Step 1</3> on the <5>Sign-in Method" +
                            "</5> section of your <7>application</7>."
                    },
                    heading: "Add GitHub Login",
                    subHeading: "GitHub is now ready to be used as a login option for your " + "applications.",
                    steps: {
                        customizeFlow: {
                            content: "Continue to configure the login flow as required.",
                            heading: "Customize the flow"
                        },
                        selectApplication: {
                            content: "Choose the <1>application</1> for which you want to set up Github login.",
                            heading: "Select Application"
                        },
                        selectDefaultConfig: {
                            content:
                                "Go to <1>Sign-in Method</1> tab and click on <3>Start with default " +
                                "configuration</3>.",
                            heading: "Select <1>Start with default configuration</1>"
                        }
                    }
                }
            },
            google: {
                quickStart: {
                    addLoginModal: {
                        heading: "Add Google Login",
                        subHeading: "Select an application to set up Google login."
                    },
                    connectApp: {
                        description:
                            "Add <1>Google</1> authenticator to <3>Step 1</3> on the <5>Sign-in Method" +
                            "</5> section of your <7>application</7>."
                    },
                    heading: "Add Google Login",
                    subHeading: "Google is now ready to be used as a login option for your " + "applications.",
                    steps: {
                        customizeFlow: {
                            content: "Continue to configure the login flow as required.",
                            heading: "Customize the flow"
                        },
                        selectApplication: {
                            content: "Choose the <1>application</1> for which you want to set up Google login.",
                            heading: "Select Application"
                        },
                        selectDefaultConfig: {
                            content:
                                "Go to <1>Sign-in Method</1> tab and click on <3>Add Google login</3> to " +
                                "configure a Google login flow.",
                            heading: "Select <1>Add Google login</1>"
                        }
                    }
                }
            },
            microsoft: {
                quickStart: {
                    addLoginModal: {
                        heading: "Add Microsoft Login",
                        subHeading: "Select an application to set up Microsoft login."
                    },
                    connectApp: {
                        description:
                            "Add <1>Microsoft</1> authenticator to <3>Step 1</3> on the <5>Sign-in Method" +
                            "</5> section of your <7>application</7>."
                    },
                    heading: "Add Microsoft Login",
                    subHeading: "Microsoft is now ready to be used as a login option for your " + "applications.",
                    steps: {
                        customizeFlow: {
                            content: "Continue to configure the login flow as required.",
                            heading: "Customize the flow"
                        },
                        selectApplication: {
                            content: "Choose the <1>application</1> for which you want to set up Microsoft login.",
                            heading: "Select Application"
                        },
                        selectDefaultConfig: {
                            content:
                                "Go to <1>Sign-in Method</1> tab and click on <3>Start with default " +
                                "configuration</3>.",
                            heading: "Select <1>Start with default configuration</1>"
                        }
                    }
                }
            },
            siwe: {
                forms: {
                    authenticatorSettings: {
                        callbackUrl: {
                            hint: "The set of redirect URIs specified as valid for the hosted OIDC server.",
                            label: "Authorization callback URL",
                            placeholder: "Enter Authorization callback URL.",
                            validations: {
                                required: "Authorization callback URL is a required field."
                            }
                        },
                        clientId: {
                            hint: "The <1>client_id</1> you received from <2>oidc.signinwithethereum.org</2> " +
                                "for your OIDC client.",
                            label: "Client ID",
                            placeholder: "Enter Client ID of OIDC client.",
                            validations: {
                                required: "Client ID is a required field."
                            }
                        },
                        clientSecret: {
                            hint: "The <1>client_secret</1> you received <2>oidc.signinwithethereum.org</2> " +
                                "for your OIDC client.",
                            label: "Client secret",
                            placeholder: "Enter Client secret of OIDC client.",
                            validations: {
                                required: "Client secret is a required field."
                            }
                        },
                        scopes: {
                            heading: "Scopes",
                            hint: "The type of access provided for the connected apps to access data " +
                                "from Ethereum wallet.",
                            list: {
                                openid: {
                                    description: "Engages the OpenID flow."
                                },
                                profile: {
                                    description: "Grants access to read a user's profile data."
                                }
                            }
                        }
                    }
                },
                quickStart: {
                    addLoginModal: {
                        heading: "Add Sign In With Ethereum",
                        subHeading: "Select an application to set up Sign In With Ethereum."
                    },
                    connectApp: {
                        description:
                            "Add <1>Sign In With Ethereum</1> authenticator to <3>Step 1</3> on the <5>Sign-in Method" +
                            "</5> section of your <7>application</7>."
                    },
                    heading: "Add Sign In With Ethereum",
                    steps: {
                        customizeFlow: {
                            content: "Continue to configure the login flow as required.",
                            heading: "Customize the flow"
                        },
                        selectApplication: {
                            content: "Choose the <1>application</1> for which you want to " +
                                "set up Sign In With Ethereum.",
                            heading: "Select Application"
                        },
                        selectDefaultConfig: {
                            content:
                                "Go to <1>Sign-in Method</1> tab and click on <3>Start with default " +
                                "configuration</3>.",
                            heading: "Select <1>Start with default configuration</1>"
                        }
                    },
                    subHeading: "Sign In With Ethereum is now ready to be used as a login option for your "
                        + "applications."
                },
                wizardHelp: {
                    clientId: {
                        description: "Provide the <1>client_id</1> you received from " +
                            "<2>oidc.signinwithethereum.org</2> for your OIDC client.",
                        heading: "Client ID"
                    },
                    clientSecret: {
                        description: "Provide the <1>client_secret</1> you received from " +
                            "<2>oidc.signinwithethereum.org</2> for your OIDC client.",
                        heading: "Client secret"
                    },
                    heading: "Help",
                    name: {
                        connectionDescription: "Provide a unique name for the connection.",
                        heading: "Name",
                        idpDescription: "Provide a unique name for the selected identity provider to be easily identifiable."
                    },
                    preRequisites: {
                        clientRegistrationDocs: "See the guide on registering an OIDC client.",
                        configureClient: "If you want to quickly get things started, use the following <1>curl</1> command to register the client.",
                        configureRedirectURI: "The following URL has to be set as the <1>Redirect URI</1>.",
                        getCredentials: "Before you begin, register an <1>OIDC client</1> using the OIDC client registration of <3>oidc.signinwithethereum.org</3>, and obtain a <5>client ID & secret</5>.",
                        heading: "Prerequisite"
                    },
                    subHeading: "Use the guide below"
                }
            },
            totp: {
                quickStart: {
                    addLoginModal: {
                        heading: "Add TOTP",
                        subHeading: "Select an application to set up TOTP login."
                    },
                    heading: "TOTP Set Up Guide",
                    steps: {
                        customizeFlow: {
                            content: "Continue to configure the login flow as required.",
                            heading: "Customize the flow"
                        },
                        selectApplication: {
                            content: "Choose the <1>application</1> for which you want to set up TOTP login.",
                            heading: "Select Application"
                        },
                        selectTOTP: {
                            content:
                                "Go to <1>Sign-in Method</1> tab and click on <3>Add OTP as a second " +
                                "factor</3> to configure a basic TOTP flow.",
                            heading: "Select <1>Add TOTP as a second factor</1>"
                        }
                    },
                    subHeading: "Follow the instructions given below to set up TOTP as a factor in your login flow."
                }
            },
            fido: {
                quickStart: {
                    addLoginModal: {
                        heading: "Add Security Key/Biometrics Login",
                        subHeading: "Select an application to set up security Key/biometrics login."
                    },
                    heading: "Security Key/Biometrics Set Up Guide",
                    passkeys: {
                        docLinkText: "FIDO2 Security key/biometrics",
                        content:
                            "Passkeys provide simple and secure passwordless login for your applications that " +
                            "survives device loss and works across platforms. You can try out passkey " +
                            "authentication on Asgardeo with \"Security Key/Biometrics\". However passkeys " +
                            "are currently available as a developer preview in most of the vendor platforms.",
                        heading: "FIDO2 authentication with passkeys"
                    },
                    steps: {
                        customizeFlow: {
                            content: "Continue to configure the login flow as required.",
                            heading: "Customize the flow"
                        },
                        selectApplication: {
                            content:
                                "Choose the <1>application</1> for which you want to set up " +
                                "security key/biometrics login.",
                            heading: "Select Application"
                        },
                        selectFIDO: {
                            content:
                                "Go to <1>Sign-in Method</1> tab and click on <3>Add Security Key/Biometrics login" +
                                "</3> to configure a basic FIDO flow.",
                            heading: "Select <1>Add Security Key/Biometrics login</1>"
                        }
                    },
                    subHeading:
                        "Follow the instructions given below to set up Security Key/Biometrics login in your login flow."
                }
            },
            magicLink: {
                quickStart: {
                    addLoginModal: {
                        heading: "Add Magic Link Login",
                        subHeading: "Select an application to set up magic link login."
                    },
                    heading: "Magic Link Set Up Guide",
                    steps: {
                        customizeFlow: {
                            content: "Continue to configure the login flow as required.",
                            heading: "Customize the flow"
                        },
                        selectApplication: {
                            content: "Choose the <1>application</1> for which you want to set up magic link login.",
                            heading: "Select Application"
                        },
                        selectMagicLink: {
                            content:
                                "Go to <1>Sign-in Method</1> tab and click on <3>Add Magic Link login" +
                                "</3> to configure a basic magic-link flow.",
                            heading: "Select <1>Add Magic Link login</1>"
                        }
                    },
                    subHeading: "Follow the instructions given below to set up magic link login in your login flow."
                }
            }
        },
        monitor: {
            filter: {
                advancedSearch: {
                    attributes: {
                        placeholder: "E.g., actionId, traceId etc."
                    },
                    fields: {
                        value: {
                            placeholder: "E.g., validate-token, access_token etc."
                        }
                    },
                    buttons: {
                        submit: {
                            label: "Add Filter"
                        }
                    },
                    title: "Advanced Search"
                },
                dropdowns: {
                    timeRange: {
                        custom: {
                            labels: {
                                from: "From",
                                timeZone: "Select time zone",
                                to: "To"
                            }
                        },
                        texts: {
                            0: "Last 15 minutes",
                            1: "Last 30 minutes",
                            2: "Last hour",
                            3: "Last 4 hours",
                            4: "Last 12 hours",
                            5: "Last 24 hours",
                            6: "Last 48 hours",
                            7: "Last 3 days",
                            8: "Last 7 days",
                            9: "Custom Time Range"
                        }
                    },
                    timeZone: {
                        placeholder: "Select time zone"
                    }
                },
                topToolbar: {
                    buttons: {
                        addFilter: {
                            label: "Add Filters"
                        },
                        clearFilters: {
                            label: "Clear all filters"
                        }
                    }
                },
                searchBar: {
                    placeholder: "Search Logs by Trace ID, Action ID, Client ID, Result Message, or Result Status"
                },
                refreshButton: {
                    text: "Currently viewing logs until ",
                    linkText: "Refresh logs"
                }
            },
            logView: {
                toolTips: {
                    seeMore: "See more"
                }
            },
            notifications: {
                genericError: {
                    subtitle: {
                        0: "Couldn't fetch diagnostic logs.",
                        1: "Please try again."
                    },
                    title: "Something went wrong"
                },
                emptyFilterResult: {
                    actionLabel: "Clear all filters",
                    subtitle: {
                        0: "We couldn't find any results.",
                        1: "Please try adding a different filter."
                    },
                    title: "No results found"
                },
                emptySearchResult: {
                    actionLabel: "Clear search query",
                    subtitle: {
                        0: "We couldn't find any results for this search query.",
                        1: "Please try a different search term."
                    },
                    title: "No results found"
                },
                emptyResponse: {
                    subtitle: {
                        0: "We couldn't find any logs in ",
                        1: "Please try a different time range."
                    },
                    title: "No logs available"
                }
            },
            pageHeader: {
                description: "Query your logs to troubleshoot production application issues.",
                title: "Diagnostic Logs"
            },
            tooltips: {
                copy: "Copy to clipboard"
            }
        },
        sidePanel: {
            apiResources: "API Resources",
            branding: "Branding",
            monitor: "Logs",
            categories: {
                apiResources: "API Resources",
                branding: "Branding",
                monitor: "Logs"
            },
            eventPublishing : "Event Publishing"
        },
        eventPublishing: {
            heading: "Event Publishing",
            subHeading: "Event Publishing related settings.",
            connectors: {
                eventsConfiguration : {
                    heading: "Event Configuration",
                    subHeading: "Configure event publishing for Asgardeo events."
                }
            },
            eventsConfiguration: {
                heading: "Configure Events",
                subHeading:  "When event publishing is enabled, Asgardeo events are published to Choreo. You can use the published events for analytics and to trigger custom use cases.",
                backButton: "Go back to Event Publishing",
                form : {
                    updateButton: "Update"
                },
                navigateToChoreo: {
                    description: "Navigate to your Choreo organization to consume the published events.",
                    navigateButton: "Go to Choreo"
                }
            },
            notifications : {
                updateConfiguration : {
                    error : {
                        description : "An error occurred while updating the event configurations.",
                        message : "Something went wrong"
                    },
                    success : {
                        description : "Event configurations updated successfully.",
                        message : "Update Successful"
                    }
                },
                getConfiguration : {
                    error : {
                        description : "An error occurred while retrieving the event configurations.",
                        message :  "Retrieval Error"
                    },
                    success : {
                        description : "",
                        message : ""
                    }
                }
            }
        }
    },
    manage: {
        accountLogin: {
            notifications: {
                success: {
                    description:  "Successfully updated username validation configuration.",
                    message: "Update successful"
                },
                error: {
                    description: "{{description}}",
                    message: "Update error"
                },
                genericError: {
                    description: "Failed to update username validation configuration.",
                    message: "Something went wrong"
                }
            },
            validationError: {
                minMaxMismatch: "Minimum length should be less than maximum length.",
                minLimitError: "The minimum length cannot be less than 3.",
                maxLimitError: "The maximum length cannot be more than 50.",
                wrongCombination: "The combination is not allowed"
            },
            editPage: {
                pageTitle: "Username Validation",
                description: "Update the username type and customize username validation rules for your users.",
                usernameType: "Select username type",
                usernameTypeHint: "Allow users to set an email or a combination of alphanumeric characters for the username.",
                emailType: "Email",
                alphanumericType: "Alphanumeric (a-z, A-Z, 0-9)",
                usernameLength: "Set username length",
                usernameLengthMin: "Min",
                usernameLengthMax: "Max"
            },
            pageTitle: "Account Login",
            description: "Customize account login configurations of the users in your organization.",
            goBackToApplication: "Go back to Applications",
            goBackToAccountLogin: "Go back to Account Login"
        },
        attributes: {
            attributes: {
                description: "View and manage user attributes in the organization."
            },
            displayNameHint:
                "The display name will be used in the user profile to recognize the attribute, " +
                "hence be mindful on selecting it.",
            generatedAttributeMapping: {
                title: "Protocol Mappings",
                OIDCProtocol: "OpenID Connect",
                SCIMProtocol: "SCIM 2.0",
                description:
                    "We are simplifying the process for you and adding the required mappings for " +
                    "the following protocols."
            }
        },
        features: {
            header: {
                links: {
                    billingPortalNav: "Billing Portal"
                }
            },
            tenant: {
                header: {
                    tenantSwitchHeader: "Switch Organization",
                    tenantAddHeader: "New Organization",
                    tenantDefaultButton: "Default",
                    tenantMakeDefaultButton: "Make default",
                    backButton: "Go back",
                    tenantSearch: {
                        placeholder: "Search organization",
                        emptyResultMessage: "No organizations found"
                    }
                },
                wizards: {
                    addTenant: {
                        heading: "Add New Organization",
                        forms: {
                            fields: {
                                tenantName: {
                                    label: "Organization Name",
                                    placeholder: "Organization name (E.g., myorg)",
                                    validations: {
                                        empty: "This is a required field.",
                                        duplicate:
                                            "An organization with the name {{ tenantName }} already exists." +
                                            " Please try a different name.",
                                        invalid: "Please enter a valid format for organization name. It must" +
                                            "<1><0>be unique</0><1>contain more than {{ minLength }} and less than" +
                                            " {{ maxLength }} characters</1><2>consist of only lowercase" +
                                            " alphanumeric characters</2><3>begin with an alphabetic character</3>" +
                                            "</1>",
                                        invalidLength: "The name you entered is less than {{ minLength }}" +
                                            " characters. It must be" +
                                            "<3><0>be unique</0><1>contain more than {{ minLength }} and less than" +
                                            " {{ maxLength }} characters</1><2>consist of only lowercase" +
                                            " alphanumeric characters</2><3>begin with an alphabetic character</3>" +
                                            "</3s>"
                                    }
                                }
                            },
                            loaderMessages: {
                                duplicateCheck: "Validating new organization name...",
                                tenantCreate: "Creating the new organization...",
                                tenantSwitch: "Please wait while we redirect you to the new organization..."
                            },
                            messages: {
                                info:
                                    "Think of a good, unique organization name for your new Asgardeo workspace" +
                                    " because you won’t be able to change it later!"
                            }
                        },
                        tooltips: {
                            message: "You will use this URL to access the new organization."
                        }
                    }
                },
                tenantCreationPrompt: {
                    heading: "Create New Organization",
                    subHeading1: "You are accessing Asgardeo in the ",
                    subHeading2: "Sign In ",
                    subHeading3: "to the ",
                    subHeading4: "To continue, create your first organization.",
                    subHeading5: "Alternatively, ",
                    subHeading6: " to ",
                    subHeading7: "region."
                },
                notifications: {
                    addTenant: {
                        error: {
                            description: "{{ description }}",
                            message: "Error Creating Organization"
                        },
                        genericError: {
                            description: "An error occurred while creating the organization.",
                            message: "Error Creating Organization"
                        },
                        limitReachError: {
                            description: "Maximum number of allowed organizations have been reached.",
                            message: "Error Creating Organization"
                        },
                        success: {
                            description: "Successfully created organization {{ tenantName }}.",
                            message: "Organization Created"
                        }
                    },
                    defaultTenant: {
                        genericError: {
                            description: "An error occurred while updating your default organization.",
                            message: "Error Updating Organization"
                        },
                        success: {
                            description: "Successfully set {{ tenantName }} as your default organization.",
                            message: "Updated Default Organization"
                        }
                    },
                    missingClaims: {
                        message: "Some personal info is missing",
                        description:
                            "Please visit the MyAccount application and make sure that your first name," +
                            " last name and primary email have been set in the Personal Info section."
                    },
                    getTenants: {
                        message: "Unable to fetch your organizations",
                        description: "An error occurred while fetching your organizations."
                    }
                }
            },
            user: {
                addUser: {
                    close: "Close",
                    invite: "Invite",
                    finish: "Finish",
                    add: "Add",
                    inviteUserTooltip:
                        "An email with a confirmation link will be sent to the " +
                        "provided email address for the user to set their own password.",
                    inviteUserOfflineTooltip: "You can copy the invitation link or the invitation" +
                        " during the final step to share with the user.",
                    inviteLink: {
                        error: {
                            description: "Unable to fetch invitation",
                            message: "An error occurred while fetching the invitation link."
                        },
                        genericError: {
                            description: "Error getting invitation summary",
                            message: "An error occurred generating the summary."
                        }
                    },
                    summary: {
                        invitation: "Invitation",
                        invitationBody: {
                            accountHasBeenCreated: "An account has been created for the username," +
                                " {{ username }} in the {{ tenantname }} organization.",
                            hi: "Hi,",
                            pleaseFollowTheLink: "Please follow the link below to set the password.",
                            team: "{{ tenantname }} team",
                            thanks: "Thanks"
                        },
                        invitationBodyCopy: {
                            accountHasBeenCreated: "An account has been created for the username, " +
                                "$username in the $tenantname organization.",
                            team: "$tenantname team"
                        },
                        invitationPasswordBody: {
                            accountHasBeenCreated: "An account has been created for you in the {{ tenantname }}" +
                                " organization. Your credentials are as follows.",
                            myAccountLink: "My Account URL",
                            pleaseFollowTheLink: "Please use the credentials to log in to your account by" +
                                " following the link below."
                        },
                        invitationPasswordBodyCopy: {
                            accountHasBeenCreated: "An account has been created for you in the $tenantname " +
                                "organization. Your credentials are as follows."
                        },
                        invitationLink: "Invitation link",
                        inviteWarningMessage: "Make sure to copy the invitation link or the invitation" +
                            " before you proceed. You won't see them again!",
                        password: "Password",
                        passwordWarningMessage: "Make sure to copy the password or the invitation before" +
                            " you proceed. You won't see them again!",
                        username: "Username"
                    },
                    validation: {
                        password:
                            "Your password must contain a minimum of 8 characters including at " +
                            "least one uppercase letter, one lowercase letter, and one number.",
                        passwordCase: "At least {{minUpperCase}} uppercase and {{minLowerCase}} lowercase letters",
                        upperCase: "At least {{minUpperCase}} uppercase letter(s)",
                        lowerCase: "At least {{minLowerCase}} lowercase letter(s)",
                        passwordLength: "Must be between {{min}} and {{max}} characters",
                        passwordNumeric: "At least {{min}} number(s)",
                        specialCharacter: "At least {{specialChr}} special character(s)",
                        uniqueCharacters: "At least {{uniqueChr}} unique character(s)",
                        consecutiveCharacters: "No more than {{repeatedChr}} repeated character(s)",
                        error: {
                            passwordValidation: "The password should satisfy the below constraints."
                        }
                    }
                }
            },
            userStores: {
                configs: {
                    addUserStores: {
                        actionTitle: "Connect user store",
                        subTitle: "There are currently no remote user stores connected. Connect " +
                            "a new user store and onboard the remote user accounts to Asgardeo.",
                        title: "Connect a new user store"
                    }
                },
                create: {
                    pageLayout: {
                        actions: {
                            connectUserStore: "Connect user store"
                        },
                        description: "Onboard the users in your remote user store to Asgardeo.",
                        title: "Remote User Store",
                        steps: {
                            attributeMappings: {
                                subTitle: "Map the attributes defined in the on-prem user store for the username " +
                                    "and user ID so that the users from the on-prem user store that you connect " +
                                    "can log into applications without any issues.",
                                title: "Map Attributes"
                            },
                            generalSettings: {
                                form: {
                                    fields: {
                                        name: {
                                            hint: "This will appear as the name of the  remote user store " +
                                                "that you connect.",
                                            label: "Name",
                                            placeholder: "Enter the name of the user store",
                                            requiredErrorMessage: "This field cannot be empty as this is the unique "+
                                            "identifier of the user store."
                                        },
                                        description: {
                                            label: "Description",
                                            placeholder: "Enter the description of the user store"
                                        },
                                        userStoreType: {
                                            label: "Remote user store type",
                                            message: "You will be only granted READ access to this user store.",
                                            types: {
                                                ldap: {
                                                    label: "LDAP"
                                                },
                                                ad: {
                                                    label: "Active Directory"
                                                }
                                            }
                                        },
                                        accessType: {
                                            label: "Access Type",
                                            types: {
                                                readOnly: {
                                                    label: "Read Only",
                                                    hint: "You will be granted READ-ONLY access to the user store. You will"+
                                                    "not be able to add new users or update any attributes of the user" +
                                                    "accounts you onboard."
                                                },
                                                readWrite: {
                                                    label: "Read/Write",
                                                    hint: "You will be granted READ/WRITE access to the user store. You will "+
                                                    "be able to add new users and update the attributes of the user accounts " +
                                                    "you onboard."
                                                }
                                            }
                                        }
                                    }
                                },
                                title: "General Details"
                            }
                        }
                    }
                },
                delete: {
                    assertionHint: "Please confirm your action."
                },
                edit: {
                    attributeMappings: {
                        description: "Map the attributes of your remote user store with the corresponding default " +
                            "and custom attributes of your organization. The attribute values will be mapped to " +
                            "the default attribute mappings of your organization. ",
                        disable: {
                            buttonDisableHint: "You cannot map attributes as this user store is disabled."
                        },
                        title: "Update Attribute Mappings",
                        subTitle: "Update the attribute mappings you have added for the default and custom attributes.",
                        sections: {
                            custom: "Custom Attributes",
                            local: "Local Attributes"
                        },
                        validations: {
                            empty: "This is a required field."
                        }
                    },
                    general: {
                        connectionsSections: {
                            title: "User Store Agent Connection(s)",
                            agents: {
                                agentOne: {
                                    description: "Users with an account in this user store connected via this " +
                                        "agent, can sign in to the My Account and other business applications " +
                                        "registered in the organization."
                                },
                                agentTwo: {
                                    description: "To maintain high availability for the remote user store, you " +
                                        "can connect a second user store agent. "
                                },
                                buttons: {
                                    disconnect: "Disconnect",
                                    generate: "Generate token",
                                    regenerate: "Regenerate token"
                                }
                            }
                        },
                        disable: {
                            buttonDisableHint: "You cannot update the description as this user store is disabled."
                        },
                        form: {
                            fields: {
                                description: {
                                    label: "Description",
                                    placeholder: "Enter the description of the user store"
                                }
                            },
                            validations: {
                                allSymbolsErrorMessage: "The user store name should have a combination of " +
                                    "alphanumerics and special characters. Please try a different name.",
                                invalidSymbolsErrorMessage: "The name you entered contains disallowed " +
                                    "characters. It can not contain '/' or '_'.",
                                restrictedNamesErrorMessage: "A user store with the name {{name}} already exists." +
                                    " Please try a different name."
                            }
                        },
                        userStoreType: {
                            info: "Note that you will be granted READ ONLY access to the user directory. You will " +
                                "not be able to add new users or update any attributes of the user accounts that you " +
                                "onboard. Users of this user store will be able to log in to the applications in " +
                                "your organization."
                        }
                    },
                    setupGuide: {
                        title: "Connect the remote user store",
                        subTitle: "Follow the steps given below to configure the user store agent, which " +
                            "connects the remote user store to Asgardeo",
                        steps: {
                            configureProperties: {
                                content: {
                                    message: "See the Asgardeo documentation for the complete list of user store " +
                                        "configuration properties."
                                },
                                description: "Configure the properties of the local user store in the " +
                                    "deployment.toml file that is found in the user store agent " +
                                    "distribution depending on your requirements.",
                                title: "Configure user store properties"
                            },
                            downloadAgent: {
                                content: {
                                    buttons: {
                                        download: "Download the agent"
                                    }
                                },
                                description: "Download and unzip the user store agent.",
                                title: "Download the agent"
                            },
                            generateToken: {
                                content: {
                                    buttons: {
                                        generate: "Generate token"
                                    }
                                },
                                description: "Generate a new installation token which will require when you try to " +
                                    "connect your remote user store through the user store agent.",
                                title: "Generate new token"
                            },
                            runAgent: {
                                description: "Execute one of the following commands based on your operating system. " +
                                    "Enter the installation_token on prompt.",
                                title: "Run the agent"
                            },
                            tryAgain: {
                                info: "A user store is not connected, please make sure that you have followed all " +
                                    "the steps of the setup guide properly."
                            }
                        }
                    }
                },
                list: {
                    subTitle: "Connect and manage user stores.",
                    title: "User Stores"
                }
            }
        },
        groups: {
            heading: "Groups",
            subHeading:
                "User groups within your organization are listed here. You can create new groups and assign users.",
            edit: {
                users: {
                    heading: "Users in the Group",
                    description: "User groups within your organization are managed here."
                },
                roles: {
                    title: "Roles",
                    heading: "Roles assigned to the group",
                    description: "Group to role assignments within your organization are managed here.",
                    searchPlaceholder: "Search application roles by application name and role name",
                    addNewModal: {
                        heading: "Manage Application Roles",
                        subHeading: "Select the application roles related to the group."
                    },
                    buttons: {
                        assignRoles: "Assign Roles"
                    },
                    placeHolders: {
                        emptyList: {
                            action: "Assign Roles",
                            subtitles: {
                                0: "There are no roles assigned to the group at the moment."
                            },
                            title: "No Roles Assigned"
                        }
                    },
                    notifications: {
                        updateApplicationRoles: {
                            error: {
                                description: "{{description}}",
                                message: "Error occurred while updating application roles"
                            },
                            genericError: {
                                description: "Error occurred while updating application roles",
                                message: "Something went wrong"
                            },
                            success: {
                                description: "Updating application roles for the group successful.",
                                message: "Update application roles successful"
                            }
                        },
                        fetchApplicationRoles: {
                            error: {
                                description: "{{description}}",
                                message: "Error occurred while fetching the application roles"
                            },
                            genericError: {
                                description: "Error occurred while fetching the application roles.",
                                message: "Something went wrong"
                            }
                        },
                        fetchAssignedApplicationRoles: {
                            error: {
                                description: "{{description}}",
                                message: "Error occurred while fetching the assigned application roles"
                            },
                            genericError: {
                                description: "Error occurred while fetching the assigned application roles.",
                                message: "Something went wrong"
                            }
                        }
                    }
                }
            }
        },
        myAccount: {
            fetchMyAccountData: {
                error: {
                    description: "{{description}}",
                    message: "Retrieval error"
                },
                genericError: {
                    description: "Couldn't retrieve My Account portal data.",
                    message: "Something went wrong"
                }
            },
            fetchMyAccountStatus: {
                error: {
                    description: "{{description}}",
                    message: "Retrieval error"
                },
                genericError: {
                    description: "Couldn't retrieve My Account portal status.",
                    message: "Something went wrong"
                }
            },
            editPage: {
                pageTitle: "My Account",
                description: "Control access to the My Account portal for your users and configure Two-Factor Authentication for the My Account portal.",
                enableEmailOtp: "Enable Email OTP",
                enableSmsOtp: "Enable SMS OTP",
                smsOtpEnableDescription: "To enable the SMS OTP authentication option, you need to set up the SMS OTP authenticator for your organization. <1>Learn more</1>",
                enableTotp: "Enable TOTP",
                mfaDescription: "Select Two-Factor Authentication options you need to configure for the My Account Portal.",
                myAccountUrlDescription: "Share this link with your users to access the My Account Portal."
            },
            pageTitle: "Self-Service Portal",
            description: "Self-service portal for your users.",
            goBackToApplication: "Go back to Applications",
            goBackToMyAccount: "Go back to Self-Service Portal"
        },
        serverConfigurations: {
            accountManagement: {
                accountRecovery: {
                    heading: "Password Recovery",
                    subHeading:
                        "Configure settings for self-service password recovery to let users " +
                        "reset their password using an email.",
                    toggleName: "Enable password recovery"
                }
            },
            accountRecovery: {
                backButton: "Go back to Account Recovery",
                heading: "Account Recovery",
                passwordRecovery: {
                    form: {
                        fields: {
                            enable: {
                                hint: "Enabling this will let the users reset their password using an email.",
                                label: "Enable"
                            },
                            expiryTime: {
                                hint: "Password recovery link expiry time in minutes.",
                                label: "Recovery link expiry time",
                                placeholder: "Enter expiry time",
                                validations: {
                                    invalid: "Recovery link expiry time should be an integer.",
                                    empty: "Recovery link expiry time cannot be empty.",
                                    range:
                                        "Recovery link expiry time should be between 1 minute & 10080 minutes " +
                                        "(7 days).",
                                    maxLengthReached:
                                        "Recovery link expiry time should be a number with 5 or less " + "digits."
                                }
                            },
                            notifySuccess: {
                                hint:
                                    "This specifies whether to notify the user via an email when password " +
                                    "recovery is successful.",
                                label: "Notify on successful recovery"
                            }
                        }
                    },
                    connectorDescription: "Enable self-service password recovery for users " + "on the login page.",
                    heading: "Password Recovery",
                    notification: {
                        error: {
                            description: "Error updating the password recovery configuration.",
                            message: "Error updating configuration"
                        },
                        success: {
                            description: "Successfully updated the password recovery configuration.",
                            message: "Update successful"
                        }
                    },
                    subHeading:
                        "Enable self-service password recovery for users " +
                        "on the login page.\nThe user will receive a password reset link via email upon request."
                },
                subHeading: "Account Recovery related settings."
            },
            accountSecurity: {
                backButton: "Go back to Account Security",
                heading: "Account Security",
                botDetection: {
                    form: {
                        fields: {
                            enable: {
                                hint: "Enabling this will enforce reCaptcha for both login and recovery.",
                                label: "Enable"
                            }
                        }
                    },
                    info: {
                        heading: "This will enforce reCAPTCHA validation in respective UIs of the following flows.",
                        subSection1: "Login to business applications",
                        subSection2: "Recover the password of a user account",
                        subSection3: "Self registration for user accounts"
                    },
                    connectorDescription: "Enable reCAPTCHA for the organization.",
                    heading: "Bot Detection",
                    notification: {
                        error: {
                            description: "Error updating the bot detection configuration.",
                            message: "Error updating configuration"
                        },
                        success: {
                            description: "Successfully updated the bot detection configuration.",
                            message: "Update successful"
                        }
                    },
                    subHeading: "Enable reCAPTCHA for the organization."
                },
                loginAttemptSecurity: {
                    form: {
                        fields: {
                            accountLockIncrementFactor: {
                                hint:
                                    "This specifies the factor by which the account lock duration should " +
                                    "be incremented on further failed login attempts after the account is locked.",
                                label: "Account lock duration increment factor",
                                placeholder: "Enter lock duration increment factor",
                                validations: {
                                    invalid: "Account lock duration increment factor should be an integer.",
                                    range: "Account lock duration increment factor should be between 1 & 10.",
                                    maxLengthReached:
                                        "Account lock duration increment factor should be a number " +
                                        "with 1 or 2 digits."
                                }
                            },
                            accountLockTime: {
                                hint:
                                    "This specifies the initial duration that the account will be locked for. " +
                                    "The account will be automatically unlocked after this time period.",
                                label: "Account lock duration",
                                placeholder: "Enter lock duration",
                                validations: {
                                    invalid: "Account lock duration should be an integer.",
                                    required: "Account lock duration is a required field.",
                                    range: "Account lock duration should be between 1 minute & 1440 minutes (1 day).",
                                    maxLengthReached: "Account lock duration should be a number with 4 or less digits."
                                }
                            },
                            enable: {
                                hint:
                                    "Account locking will result in sending a mail to the user indicating " +
                                    "that the account has been locked.",
                                label: "Enable"
                            },
                            maxFailedAttempts: {
                                hint:
                                    "This specifies the number of consecutive failed login attempts allowed " +
                                    "before the account is locked.",
                                label: "Number of consecutive failed login attempts",
                                placeholder: "Enter max failed attempts",
                                validations: {
                                    invalid: "Max failed attempts should be an integer.",
                                    required: "Max failed attempts is a required field.",
                                    range: "Max failed attempts should be between 1 & 10.",
                                    maxLengthReached: "Max failed attempts should be a number with 1 or 2 digits."
                                }
                            }
                        }
                    },
                    info:
                        "Once the account is locked, the account owner will be informed via email. The account " +
                        "will be automatically activated after the account lock duration.",
                    connectorDescription:
                        "Protect accounts from password brute-force attacks by locking the " +
                        "account on consecutive failed login attempts.",
                    heading: "Login Attempts",
                    notification: {
                        error: {
                            description: "Error updating the login attempts security configuration.",
                            message: "Error updating configuration"
                        },
                        success: {
                            description: "Successfully updated the login attempts security configuration.",
                            message: "Update successful"
                        }
                    },
                    subHeading:
                        "Protect user accounts from password brute-force attacks by locking " +
                        "the account on consecutive failed login attempts.",
                    howItWorks: {
                        correctPassword: {
                            description: "If the user enters the correct password, the user can successfully log in."
                        },
                        example: {
                            description_plural:
                                "That is, the account will be locked for {{ lockIncrementRatio }} x " +
                                " {{ lockDuration }} = {{ lockTotalDuration }} minutes.",
                            description_singular:
                                "That is, the account will be locked for {{ lockIncrementRatio }} " +
                                "x {{ lockDuration }} = {{ lockTotalDuration }} minute."
                        },
                        incorrectPassword: {
                            description_plural:
                                "If the user tries an incorrect password for another " +
                                "{{ maxAttempts }} consecutive attempts the account lock duration will be incremented" +
                                " by {{ lockIncrementRatio }} times the previous lock duration.",
                            description_singular:
                                "If the user tries an incorrect password for another " +
                                "{{ maxAttempts }} consecutive attempt the account lock duration will be incremented " +
                                "by {{ lockIncrementRatio }} times the previous lock duration."
                        }
                    }
                },
                subHeading: "Configure security settings to protect user accounts."
            },
            additionalSettings: "Additional Settings",
            generalBackButton: "Go back",
            generalDisabledLabel: "Disabled",
            generalEnabledLabel: "Enabled",
            passwordHistoryCount: {
                heading: "Password History Count",
                label1: "Must be different from the last",
                label2: "passwords.",
                message: "Specify the number of unique passwords that a user should use before an old password can be reused."
            },
            passwordValidationHeading: "Password Input Validation",
            userOnboarding: {
                backButton: "Go back to Self Registration",
                heading: "Self Registration",
                selfRegistration: {
                    form: {
                        fields: {
                            enable: {
                                hint:
                                    "Allow consumer users to self sign-up for this organization. " +
                                    "When enabled, users will see a link to create an account at the login screen.",
                                label: "Enable"
                            },
                            enableAutoLogin: {
                                label: "Enable auto login",
                                hint:
                                    "If selected, the user will be automatically logged in after registration."
                            },
                            expiryTime: {
                                hint: "The expiry time for the account verification link.",
                                label: "Account verification link expiry time",
                                placeholder: "Enter expiry time",
                                validations: {
                                    invalid: "Expiry time should be an integer.",
                                    empty: "Expiry time cannot be empty.",
                                    range: "Expiry time should be between 1 minute & 10080 minutes (7 days).",
                                    maxLengthReached: "Expiry time should be a number with 5 or less digits."
                                }
                            },
                            activateImmediately: {
                                msg:
                                    "If selected, the new account is activated immediately after registration " +
                                    "without waiting for account confirmation.",
                                hint: "This will enable email verification at the self-registration.",
                                label: "Activate account immediately"
                            },
                            signUpConfirmation: {
                                recommendationMsg:
                                    "It is recommended to enable account verification for " + "self registration.",
                                botMsg: " If not at least enable bot detection.",
                                accountLockMsg:
                                    "Account Verification enables email verification at the " +
                                    "self registration. The new account is activated only after the user verifies " +
                                    "the email",
                                hint: "An email is sent to the self-registered user requesting account verification.",
                                label: "Account verification",
                                confirmation: {
                                    heading: "Are you sure?",
                                    message: "Enable account verification",
                                    content: "Auto login requires account to be activated immediately after the "
                                        + "registration. When you proceed, auto login will be disabled. You can always "
                                        + "re-enable it, when you select <1>Activate account immediately</1> option."
                                }
                            }
                        }
                    },
                    connectorDescription: "Enable self registration for users of the organization.",
                    heading: "Self Registration",
                    notification: {
                        error: {
                            description: "Error updating the self registration configuration.",
                            message: "Error updating configuration"
                        },
                        success: {
                            description: "Successfully updated the self registration configuration.",
                            message: "Update successful"
                        }
                    },
                    subHeading:
                        "When self registration is enabled, users can register via the " +
                        "<1>Create an account</1> link on the application’s login page. This creates a new " +
                        "<3>user</3> account in the organization."
                },
                subHeading: "Self Registration related settings."
            }
        },
        users: {
            administratorSettings: {
                administratorSettingsSubtitle: "Settings related to organizational administrators",
                administratorSettingsTitle: "Administrator Settings",
                backButton: "Go back to administrators",
                disableToggleMessage: "Enable users to manage the organization",
                enableToggleMessage: "Disable users to manage the organization",
                error: {
                    description: "{{description}}",
                    message: "Error while updating the configuration"
                },
                genericError: {
                    description: "Couldn't update the configuration",
                    message: "Something went wrong"
                },
                success: {
                    description: "Successfully updated the configuration.",
                    message: "Configuration update successful"
                },
                toggleHint: "If enabled, users can be assigned with administrative capabilities."
            },
            usersTitle: "Users",
            usersSubTitle: "Users who can access applications within the organization are managed here.",
            collaboratorsTitle: "Organization Administrators",
            collaboratorsSubTitle: "Users who have access to your organization's administrative operations are " +
                "managed here.",
            editUserProfile: {
                userId: "User ID",
                disclaimerMessage:
                    "This user profile belongs to a collaborator or an organization owner. Only the" +
                    " account owner can manage the profile via the My Account app.",
                accountLock: {
                    title: "Lock user",
                    description:
                        "Once you lock the account, the user can no longer sign in to the system. " +
                        "Please be certain."
                }
            },
            buttons: {
                addUserBtn: "Add User",
                addCollaboratorBtn: "Add Administrator"
            },
            collaboratorAccounts: {
                consoleInfo: "Share this link with the users who have administrative priviledges " +
                    "to allow access to Console"
            },
            list: {
                columns: {
                    user: "User",
                    accountType: "Account Type",
                    idpType: "Managed By",
                    userStore: "User Store"
                },
                popups: {
                    content: {
                        AccountTypeContent: "The user's relation to this organization.",
                        idpTypeContent: "The entity that manages the user's identity and credentials.",
                        sourceContent: "The data store where the user information is stored."
                    }
                }
            },
            descriptions: {
                allUser: "All the users within your organization are listed here.",
                consumerAppInfo:
                    "Share this link with your users to allow access to My Account and to manage their accounts.",
                consumerUser:
                    "Users who can access applications within the organization are listed here." +
                    " Admins can onboard users to the organization or the users can sign up if" +
                " Admins can onboard users to the organization or the users can sign up if" +
                    " Admins can onboard users to the organization or the users can sign up if" +
                " Admins can onboard users to the organization or the users can sign up if" +
                    " Admins can onboard users to the organization or the users can sign up if" +
                " Admins can onboard users to the organization or the users can sign up if" +
                    " Admins can onboard users to the organization or the users can sign up if" +
                    " self-registration is enabled.",
                guestUser:
                    "Users who have access to your organization's administrative operations" +
                    " (application onboarding, user management, etc.) are listed here." +
                    " Admins can invite users as administrators to the organization and assign roles.",
                learnMore: "Learn More"
            },
            notifications: {
                addUser: {
                    customerUser: {
                        limitReachError: {
                            description: "Maximum number of allowed users have been reached.",
                            message: "Error adding the new user"
                        }
                    }
                }
            },
            wizard: {
                addAdmin: {
                    external: {
                        subtitle: "Invite an external administrator to manage your organization. This user " +
                            "will receive an email invitation they can accept " +
                            "in order to begin collaborating.",
                        title: "Add Administrator"
                    },
                    internal: {
                        hint: "Only the users listed in the users section can be added as administrators.",
                        searchPlaceholder: "Search by email",
                        emptySearchQueryPlaceholder: "To begin, search users by typing the email. You may have to type the complete email address.",
                        emptySearchResultsPlaceholder: "We couldn't find any results for search. Please try with the complete email address.",
                        selectUser: "Select User",
                        subtitle: "Make existing users administrators of your organization. An email notification " +
                            "will be sent to the users indicating the change.",
                        title: "Add Administrator",
                        updateRole: {
                            error: {
                                description: "{{ description }}",
                                message: "Error Adding Administrator"
                            },
                            genericError: {
                                description: "An error occurred while adding the administrator.",
                                message: "Error Adding Administrator"
                            },
                            success: {
                                description: "Successfully added administrator.",
                                message: "Administrator Added"
                            }
                        }
                    }
                },
                addUser: {
                    subtitle: "Follow the steps to add a new user.",
                    title: "Add User"
                }
            }
        },
        admins: {
            editPage: {
                backButton: "Go back to Admins"
            }
        },
        invite: {
            notifications: {
                sendInvite: {
                    limitReachError: {
                        description: "Maximum number of allowed collaborator users have been reached.",
                        message: "Error while sending the invitation"
                    }
                }
            }
        },
        guest: {
            deleteUser: {
                confirmationModal: {
                    content:
                        "However, the user's account is not permanently deleted from Asgardeo and " +
                        "they will still be able to access other organizations they are associated with.",
                    message:
                        "This action is irreversible and will remove the user's association with " +
                        "this organization."
                }
            },
            editUser: {
                dangerZoneGroup: {
                    deleteUserZone: {
                        subheader:
                            "This action will remove the user's association with this organization. " +
                            "Please be certain before you proceed."
                    }
                }
            }
        },
        sidePanel: {
            categories: {
                attributeManagement: "Attribute Management",
                AccountManagement: "Account Management",
                userManagement: "User Management",
                organizationSettings: "Organization Settings"
            }
        }
    }
};
