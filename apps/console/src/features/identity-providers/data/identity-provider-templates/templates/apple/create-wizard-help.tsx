/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { Button, Code, CopyInputField, Message } from "@wso2is/react-components";
import React, { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Progress, Segment, SemanticCOLORS, Sidebar } from "semantic-ui-react";
import { ConfigReducerStateInterface } from "../../../../../core/models";
import { AppState } from "../../../../../core/store";

/**
 * Props for the Apple authentication provider create wizard help component.
 */
interface AppleIdentityProviderCreateWizardHelpProps {
    /**
     * Current step of the wizard.
     * @see [AppleIdentityProviderCreateWizardHelp.defaultProps]
     */
    current: number;
}
const AppleIdentityProviderCreateWizardHelp = ({ current } : AppleIdentityProviderCreateWizardHelpProps) => {
    const { t } = useTranslation();
    const [ useNewConnectionsView ] = useState<boolean>(undefined);
    const config: ConfigReducerStateInterface = useSelector((state: AppState) => state.config);
    const [ currentState, setCurrentState ] = useState<any>();

    useEffect(() => {
        setCurrentState(current);
    }, [ current ]);
    interface Content {
        id: number;
        title?: string;
        body: JSX.Element;
      } 
    const quickHelpContent: Content[] = [
        {
            body: (
                <>
                    <Message
                        type="info"
                        header={
                            t("console:develop.features.authenticationProvider.templates.apple." +
                    "wizardHelp.preRequisites.heading")
                        }
                        content={
                            (<>
                                <p>
                                    <Trans
                                        i18nKey={
                                            "console:develop.features.authenticationProvider.templates.apple." +
                                    "wizardHelp.preRequisites.getCredentials"
                                        }
                                    >
                                Before you begin, create a <strong>Sign in With Apple</strong> enabled 
                                application on <a
                                            href="https://developer.apple.com/"
                                            target="_blank"
                                            rel="noopener noreferrer">
                                Apple Developer Portal
                                        </a> with a <strong>Services ID</strong> and a <strong>Private Key</strong>.
                                    </Trans>
                                </p>
                                <p>
                                    <Trans
                                        i18nKey={
                                            "console:develop.features.authenticationProvider.templates.apple." +
                                    "wizardHelp.preRequisites.configureWebDomain"
                                        }
                                    >
                            Use the following as a <strong>Web Domain</strong>.
                                    </Trans>
                                    <CopyInputField
                                        className="copy-input-dark spaced"
                                        value={ new URL(config?.deployment?.serverOrigin)?.hostname }
                                    />
                                </p>
                                <p>
                                    <Trans
                                        i18nKey={
                                            "console:develop.features.authenticationProvider.templates.apple." +
                                    "wizardHelp.preRequisites.configureReturnURL"
                                        }
                                    >
                            Add the following URL as a <strong>Return URL</strong>.
                                    </Trans>
                                    <CopyInputField
                                        className="copy-input-dark spaced"
                                        value={ config?.deployment?.customServerHost + "/commonauth" }
                                    />
                                    <a
                                        href={
                                            "https://developer.apple.com/documentation/sign_in_with_apple" + 
                                    "/configuring_your_environment_for_sign_in_with_apple"
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        {
                                            t("console:develop.features.authenticationProvider.templates.apple" +
                                    ".wizardHelp.preRequisites.configureAppleSignIn")
                                        }
                                    </a>
                                </p>
                            </>)
                        }
                    />
                </>
            ),
            id: 0
        },
        {
            body:(    
                <p>
                    {
                        useNewConnectionsView
                            ? t("console:develop.features.authenticationProvider.templates.apple." +
                                "wizardHelp.name.connectionDescription")
                            : t("console:develop.features.authenticationProvider.templates.apple." +
                                "wizardHelp.name.idpDescription")
                    }
                </p>              
            ),
            id: 1,
            title:  t("console:develop.features.authenticationProvider.templates.apple" +
            ".wizardHelp.name.heading")
        },
        {
            body:(
                <p>
                    <Trans
                        i18nKey={
                            "console:develop.features.authenticationProvider.templates.apple" +
                            ".wizardHelp.clientId.description"
                        }
                    >
                    Provide the <Code>Services ID</Code> created at Apple.
                    </Trans>
                </p>
            ),
            id: 2,
            title: t("console:develop.features.authenticationProvider." +
            "templates.apple.wizardHelp.clientId.heading")
        },
        {
            body: (
                <p>
                    <Trans
                        i18nKey={
                            "console:develop.features.authenticationProvider.templates.apple." +
                            "wizardHelp.teamId.description"
                        }
                    >
                    Provide the Apple developer <Code>Team ID</Code>.
                    </Trans>
                </p>
            ),
            id: 3,
            title: t("console:develop.features.authenticationProvider.templates.apple" +
            ".wizardHelp.teamId.heading")
        },
        {
            body:(
                <p>
                    <Trans
                        i18nKey={
                            "console:develop.features.authenticationProvider.templates.apple." +
                            "wizardHelp.keyId.description"
                        }
                    >
                    Provide the <Code>Key Identifier</Code> of the private key generated.
                    </Trans>
                </p>
            ),
            id: 4,
            title: t("console:develop.features.authenticationProvider.templates.apple" +
            ".wizardHelp.keyId.heading")
        },
        {
            body: (
                <p>
                    <Trans
                        i18nKey={
                            "console:develop.features.authenticationProvider.templates.apple." +
                            "wizardHelp.privateKey.description"
                        }
                    >
                    Provide the <Code>Private Key</Code> generated for the application.
                    </Trans>
                </p>
            ),
            id: 5,
            title: t("console:develop.features.authenticationProvider.templates.apple" +
            ".wizardHelp.privateKey.heading")
        }
    ];
    const handleClickPrevious = () => {
        setCurrentState(currentState === 0 ? 0 : currentState - 1);
    };
    const handleClickNext = () =>{
        setCurrentState(currentState === 5 ? 5 : currentState + 1);
    };
    const isPreviousButtonDisabled: boolean = currentState === 0;
    const isNextButtonDisabled: boolean = currentState === 5;
    const previousButtonColor: SemanticCOLORS = isPreviousButtonDisabled ? "grey" : "orange";
    const nextButtonColor: SemanticCOLORS = isNextButtonDisabled ? "grey" : "orange";
    const progress: number = (currentState / (5)) * 100;

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
                    { quickHelpContent.map(({ id, title, body }: Content) => (
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
                            color={ previousButtonColor }
                            onClick={ handleClickPrevious }
                            className="idp-sidepanel-button"
                            disabled={ isPreviousButtonDisabled }
                        />
                        <Button
                            icon="chevron right"
                            color={ nextButtonColor }
                            onClick={ handleClickNext }
                            className="idp-sidepanel-button"
                            disabled={ isNextButtonDisabled }
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
AppleIdentityProviderCreateWizardHelp.defaultProps = {
    "data-componentid": "apple-idp-create-wizard-help"
};

/**
 * A default export was added to support React.lazy.
 * TODO: Change this to a named export once react starts supporting named exports for code splitting.
 * @see {@link https://reactjs.org/docs/code-splitting.html#reactlazy}
 */
export default AppleIdentityProviderCreateWizardHelp;
