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
import React, { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Button, Divider, Progress, Segment, Sidebar } from "semantic-ui-react";
import { SIWEConstants } from "../../../components/identity-providers/constants";

type props = {
    current: any
}
const SIWEAuthenticationProviderCreateWizardHelp = ({ current } : props) => {
    const { t } = useTranslation();
    const [ useNewConnectionsView, setUseNewConnectionsView ] = useState<boolean>(undefined);
    const config: ConfigReducerStateInterface = useSelector((state: AppState) => state.config);
    const [ currentState, setCurrentState ] = useState <any>();

    useEffect(() => {
        setCurrentState(current);
    }, [ current ]);
    const CONTENTS = [
        {
            id: 0,
            body: (
                <>
                    <Message
                        type="info"
                        header={
                            t("console:develop.features.authenticationProvider.templates.github.wizardHelp." +
                        "preRequisites.heading")
                        }
                        content={ (
                            <>
                                <p>
                                    Before you begin, visit <a href={ "https://oidc.signinwithethereum.org/" }>Sign In With Ethereum website</a>
                                        &nbsp;and setup a compatible wallet from <strong> <Code withBackground={ false }>Coinbase,</Code> 
                                        <Code withBackground={ false }>MetaMask,</Code> <Code withBackground={ false }>WalletConnect,</Code> 
                                        <Code withBackground={ false }>Portis,</Code> <Code withBackground={ false }>Torus,</Code>or   
                                        <Code withBackground={ false }>Fortmatic</Code></strong>
                                </p>
                                <Divider hidden/>
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
                                    href={ "https://docs.login.xyz/" }
                                >
                                    See the official documentation for SIWE and registering a OIDC client.
                                </a>
                            
                            </>)
                        }
                    />
                </>
                    
            )
        },
        {
            id: 1,
            title:  t("extensions:develop.identityProviders.siwe.wizardHelp.name.heading"), 
            body:(    
                          
                <p>
                    {
                        useNewConnectionsView
                            ? t("extensions:develop.identityProviders.siwe.wizardHelp.name.connectionDescription")
                            : t("Provide a unique name for the selected identity provider to be easily identifiable.")
                    }
                </p>               
            )

        },
        {
            id: 2,
            title: t("extensions:develop.identityProviders.siwe.wizardHelp.clientId.heading"),
            body:(
                <>
                    <p>
                        Provide the <Code>client_id</Code> you received from the below&nbsp;
                        <Code>curl</Code> command for your OIDC client registration.
                    </p>
                    <p>
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
                    </p>
                    <p>
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
                    </p>
                </>
            )
        },
        {
            id: 3,
            title: t("extensions:develop.identityProviders.siwe.wizardHelp.clientSecret.heading"),
            body: (
                <>
                    <p>
                        Provide the <Code>client_secret</Code> you received from the below&nbsp;
                        <Code>curl</Code> command for your OIDC client registration.
                    </p>
                    <p>
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
                    </p>
                    <p>
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
                    </p>
                </>
            )
        }
    ];

    const [ currentContent, setCurrentContent ] = useState(0);

    const handleClickLeft = () => {

        setCurrentState(currentState === 0 ?  0 : currentState - 1);
        // setCurrentContent((c) => (c > 0 ? c - 1 : c));
    };
    const handleClickRight = () =>{
        // setCurrentContent((c) => (c < CONTENTS.length - 1 ? c + 1 : c));
        setCurrentState(currentState === 3 ?  3 : currentState + 1);
    };

    const isLeftButtonDisabled = currentState === 0;
    const isRightButtonDisabled = currentState === 3;

    const leftButtonColor = isLeftButtonDisabled ? "grey" : "orange";
    const rightButtonColor = isRightButtonDisabled ? "grey" : "orange";

    const progress = (currentState / (3)) * 100;

    const [ sidebarprogress, setSidebarprogress ] = useState(0);

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
                        <div key={ id } style={ { display: currentState === id ? "block" : "none" } }>
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
                        indicating
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
