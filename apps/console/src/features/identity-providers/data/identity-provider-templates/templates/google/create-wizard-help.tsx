/**
 * Copyright (c) 2021, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
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

import { Code, CopyInputField, Message } from "@wso2is/react-components";
import React, { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Button, Progress, Segment, Sidebar } from "semantic-ui-react";
import { ConfigReducerStateInterface } from "../../../../../core/models";
import { AppState } from "../../../../../core/store";

/**
 * Help content for the Google IDP template creation wizard.
 *
 * @param props - Props injected into the component.
 *
 *  @returns React Element
 */
type props = {
    current: any
}

const GoogleIDPCreateWizardHelp = ({ current } : props) => {
    
    const { t } = useTranslation();
    const [ useNewConnectionsView ] = useState<boolean>(undefined);
    const config: ConfigReducerStateInterface = useSelector((state: AppState) => state.config);
    const [ currentState, setCurrentState ] = useState <any>();

    useEffect(() => {
        setCurrentState(current);
    }, [ current ]);

    interface Content {
        id: number;
        title?: string;
        body: JSX.Element;
      }
      
    const CONTENTS: Content[] = [
        {
            body: (
                <>
                    <Message
                        type="info"
                        header={
                            t("console:develop.features.authenticationProvider.templates.google.wizardHelp." +
                        "preRequisites.heading")
                        }
                        content={
                            (<>
                                <p>
                                    <Trans
                                        i18nKey={
                                            "console:develop.features.authenticationProvider.templates.google.wizardHelp." +
                                    "preRequisites.getCredentials"
                                        }
                                    >
                                Before you begin, create an <strong>OAuth credential</strong> on the <a
                                            href="https://console.developers.google.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        > 
                                        Google developer console</a>, and obtain a <strong>Client ID & secret</strong>.
                                    </Trans>
                                </p>
                                <p>

                                    <Trans
                                        i18nKey={
                                            "console:develop.features.authenticationProvider.templates.google.wizardHelp" +
                                    ".preRequisites.configureRedirectURL"
                                        }
                                    >
                                Use the following URL as the <strong>Authorized Redirect URI</strong>.
                                    </Trans>

                                    <CopyInputField
                                        className="copy-input-dark spaced"
                                        value={ config?.deployment?.customServerHost + "/commonauth" }
                                    />

                                    <a
                                        href="https://support.google.com/googleapi/answer/6158849"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        {
                                            t("console:develop.features.authenticationProvider.templates.google.wizardHelp." +
                                        "preRequisites.configureOAuthApps")
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
                            ? t("console:develop.features.authenticationProvider.templates.google." +
                            "wizardHelp.name.connectionDescription")
                            : t("console:develop.features.authenticationProvider.templates.google." +
                            "wizardHelp.name.idpDescription")
                    }
                </p>            
            ),
            id: 1,
            title:  t("console:develop.features.authenticationProvider.templates.google" +
            ".wizardHelp.name.heading")
        },
        {
            body:(
                <p>
                    <Trans
                        i18nKey={
                            "console:develop.features.authenticationProvider.templates.google" +
                        ".wizardHelp.clientId.description"
                        }
                    >
                    Provide the <Code>Client ID</Code> obtained from Google.
                    </Trans>
                </p>
            ),
            id: 2,
            title: t("console:develop.features.authenticationProvider.templates.google.wizardHelp.clientId.heading")
        },
        {
            body: (
                <p>
                    <Trans
                        i18nKey={
                            "console:develop.features.authenticationProvider.templates.google" +
                        ".wizardHelp.clientSecret.description"
                        }
                    >
                    Provide the <Code>Client Secret</Code> obtained from Google.
                    </Trans>
                </p>
            ),
            id: 3,
            title: t("console:develop.features.authenticationProvider.templates.google" +
            ".wizardHelp.clientSecret.heading")
        }
    ];

    const handleClickLeft = () => {

        setCurrentState(currentState === 0 ?  0 : currentState - 1);
        // setCurrentContent((c) => (c > 0 ? c - 1 : c));
    };
    const handleClickRight = () =>{
        // setCurrentContent((c) => (c < CONTENTS.length - 1 ? c + 1 : c));
        setCurrentState(currentState === 3 ?  3 : currentState + 1);
    };

    const isLeftButtonDisabled:boolean = currentState === 0;
    const isRightButtonDisabled:boolean = currentState === 3;

    const leftButtonColor:any = isLeftButtonDisabled ? "grey" : "orange";
    const rightButtonColor:any = isRightButtonDisabled ? "grey" : "orange";

    const progress:number = (currentState / (3)) * 100;

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

                    { CONTENTS.map(({ id, title, body }: Content) => (
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
GoogleIDPCreateWizardHelp.defaultProps = {
    "data-testid": "google-idp-create-wizard-help"
};

/**
 * A default export was added to support React.lazy.
 * TODO: Change this to a named export once react starts supporting named exports for code splitting.
 * @see {@link https://reactjs.org/docs/code-splitting.html#reactlazy}
 */
export default GoogleIDPCreateWizardHelp;
