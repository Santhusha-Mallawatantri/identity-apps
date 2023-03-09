/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable sort-keys */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/typedef */
/* eslint-disable header/header */
/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com) All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content.
 */
import { Code, CodeEditor, CopyInputField, Heading, Message } from "@wso2is/react-components";
import { AppState, ConfigReducerStateInterface } from "apps/console/src/features/core";
import { IdentityProviderManagementUtils } from "apps/console/src/features/identity-providers";
import React, { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Button, Divider, Progress, Segment, Sidebar } from "semantic-ui-react";
import { SIWEConstants } from "../../../components/identity-providers/constants";

const SIWEAuthenticationProviderCreateWizardHelp = () => {
    const { t } = useTranslation();
    const [ useNewConnectionsView, setUseNewConnectionsView ] = useState<boolean>(undefined);
    const config: ConfigReducerStateInterface = useSelector((state: AppState) => state.config);

    const CONTENTS = [
        {
            id: 0,
            body: (
                <><Message
                    type="info"
                    header={
                        t("console:develop.features.authenticationProvider.templates.github.wizardHelp." +
                    "preRequisites.heading")
                    }
                    content={ (
                        <>
                            <p>
                                { /* <Trans
                                    i18nKey={
                                        "extensions:develop.identityProviders.siwe.wizardHelp." +
                                    "preRequisites.getCredentials"
                                    }
                                > */ }
                                Register an <strong>OIDC client</strong> using the following 
                                <Code withBackground={ false }>curl</Code> command and obtain a <strong>client ID & secret</strong>.
                                { /* </Trans> */ }
                                <Divider hidden />
                                <div className="swe-codemirror-wrapper">
                                    <CodeEditor
                                        oneLiner
                                        readOnly="nocursor"
                                        withClipboardCopy
                                        showLineNumbers={ false }
                                        language="shell"
                                        options={ {
                                            lineWrapping: true
                                        } }
                                        height="100%"
                                        theme="dark"
                                        sourceCode={
                                            SIWEConstants.SIWE_CLIENT_REGISTRATION_CURL_COMMAND
                                                .replace(
                                                    "${commonauth}",
                                                    IdentityProviderManagementUtils.getCommonAuthEndpoint()
                                                )
                                        }
                                    />
                                </div>
                            </p>                        
                        </>)
                    }
                />
                </>
            )
        },
        {
            id: 1,
            body: (
                <><Message
                    type="info"
                    header={
                        t("console:develop.features.authenticationProvider.templates.github.wizardHelp." +
                    "preRequisites.heading")
                    }
                    content={ (
                        <>
                            <p>
                                <Trans
                                    i18nKey={
                                        "extensions:develop.identityProviders.siwe.wizardHelp." +
                                    ".preRequisites.configureRedirectURI"
                                    }
                                >
                                The following URL has to be set as the <strong>Redirect URI</strong>.
                                </Trans>
                                
                                <CopyInputField
                                    className="copy-input-dark spaced"
                                    value={ IdentityProviderManagementUtils.getCommonAuthEndpoint() }
                                />
                            </p>
                            <a
                                href={ SIWEConstants.SIWE_CLIENT_REGISTRATION_DOCS_URL }
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {
                                    t("extensions:develop.identityProviders.siwe.wizardHelp" +
                                ".preRequisites.clientRegistrationDocs")
                                }
                            </a>
                            <p>
                                { /* <Trans
                                    i18nKey={
                                        "extensions:develop.identityProviders.siwe.wizardHelp." +
                                        "preRequisites.getCredentials"
                                    }
                                > */ }
                                    After registering an <strong>OIDC client</strong> , using <Code withBackground={ false }>
                                        oidc.signinwithethereum.org
                                </Code>, connect your preferred <strong>Ethereum Wallet</strong> to start using <strong><Code>Sign In With Ethereum</Code></strong>.
                                { /* </Trans> */ }
                            </p>
                        
                        </>)
                    }
                />
                </>
            )
        },
        {
            id: 2,
            title:  t("extensions:develop.identityProviders.siwe.wizardHelp.name.heading"),
    
            body:(    
                t("Provide a unique name for the selected identity provider to be easily identifiable.")            
                // <p>
                //     {
                //         useNewConnectionsView
                //             ? t("extensions:develop.identityProviders.siwe.wizardHelp.name.connectionDescription")
                //             : t("extensions:develop.identityProviders.siwe.wizardHelp.name.idpDescription")
                //     }
                // </p>       
            )
        },
        {
            id: 3,
            title: t("extensions:develop.identityProviders.siwe.wizardHelp.clientId.heading"),
            body:(
                <p>
                    <Trans
                        i18nKey={
                            "extensions:develop.identityProviders.siwe.wizardHelp.clientId.description"
                        }
                    >
                        Provide the <Code>client_id</Code> you received from
                        <Code>oidc.signinwithethereum.org</Code> for your OIDC client or from the <code>curl</code> command.
                    </Trans>
                </p>
            )
        },
        {
            id: 4,
            title: t("extensions:develop.identityProviders.siwe.wizardHelp.clientSecret.heading"),
            body: (
                <p>
                    <Trans
                        i18nKey={
                            "extensions:develop.identityProviders.siwe.wizardHelp.clientSecret.description"
                        }
                    >
                        Provide the <Code>client_secret</Code> you received from
                        <Code>oidc.signinwithethereum.org</Code> for your OIDC client or from the <code>curl</code> command..
                    </Trans>
                </p>
            )
        }
    ];

    const [ currentContent, setCurrentContent ] = useState(0);

    const handleClickLeft = () => setCurrentContent((c) => (c > 0 ? c - 1 : c));
    const handleClickRight = () =>
        setCurrentContent((c) => (c < CONTENTS.length - 1 ? c + 1 : c));

    const isLeftButtonDisabled = currentContent === 0;
    const isRightButtonDisabled = currentContent === CONTENTS.length - 1;

    const leftButtonColor = isLeftButtonDisabled ? "grey" : "orange";
    const rightButtonColor = isRightButtonDisabled ? "grey" : "orange";

    const progress = (currentContent / (CONTENTS.length - 1)) * 100;

    return (
        <Sidebar.Pushable>
            <Sidebar
                as={ Segment }
                animation="overlay"
                direction="left"
                visible
                icon="labeled"
                vertical
                className="idp-sidepanel-sidebar"
            >
                <div className="idp-sidepanel-content">
                    { CONTENTS.map(({ id, title, body }) => (
                        <div key={ id } style={ { display: currentContent === id ? "block" : "none" } }>
                            <Segment
                                className="idp-sidepanel-segment">
                                <h2>{ title }</h2>
                                <p>{ body }</p>
                            </Segment>
                        </div>
                    )) }
                </div>
                <div className="idp-sidepanel-footer">
                    <Progress
                        percent={ progress }
                        progress
                        className="idp-sidepanel-progress"
                        color="orange"
                        size="tiny"
                    />
                    <div className="idp-sidepanel-buttons">
                        <Button
                            icon="chevron left"
                            color={ leftButtonColor }
                            onClick={ handleClickLeft }
                            className="idp-sidepanel-button"
                            disabled={ isLeftButtonDisabled }
                        />
                        <Button
                            icon="chevron right"
                            color={ rightButtonColor }
                            onClick={ handleClickRight }
                            className="idp-sidepanel-button"
                            disabled={ isRightButtonDisabled }
                        >
                        </Button>
                    </div>
                </div>
            </Sidebar>
        </Sidebar.Pushable>
    );
};

/**
 * Default props for the component
 */
SIWEAuthenticationProviderCreateWizardHelp.defaultProps = {
    "data-testid": "google-idp-create-wizard-help"
};

/**
 * A default export was added to support React.lazy.
 * TODO: Change this to a named export once react starts supporting named exports for code splitting.
 * @see {@link https://reactjs.org/docs/code-splitting.html#reactlazy}
 */
export default SIWEAuthenticationProviderCreateWizardHelp;
