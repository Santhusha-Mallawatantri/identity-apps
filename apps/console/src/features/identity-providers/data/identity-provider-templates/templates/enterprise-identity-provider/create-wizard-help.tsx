/**
 * Copyright (c) 2021, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
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
import { Button } from "@wso2is/react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Progress, Segment, SemanticCOLORS, Sidebar } from "semantic-ui-react";

/**
 * Props for the Custom authentication provider create wizard help component.
 */
interface CustomIdentityProviderCreateWizardHelpProps {
    /**
     * Current step of the wizard.
     * @see [CustomIdentityProviderCreateWizardHelp.defaultProps]
     */
    current: number;
}
const CustomIdentityProviderCreateWizardHelp = ({ current } : CustomIdentityProviderCreateWizardHelpProps) => {
    const { t } = useTranslation();
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
            body:(    
                <>
                    <p>
                        Provide a unique name for the enterprise authentication 
                        provider so that it can be easily identified.
                    </p>
                    <p>E.g., MyEnterpriseAuthProvider.</p>
                </>              
            ),
            id: 1,
            title:  t("Name")
        }
    ];
    const handleClickPrevious = () => {
        setCurrentState(currentState === 0 ?  0 : currentState - 1);
    };
    const handleClickNext = () =>{
        setCurrentState(currentState === 0 ?  0 : currentState + 1);
    };
    const isPreviousButtonDisabled: boolean = currentState === 0;
    const isNextButtonDisabled: boolean = currentState === 0;
    const previousButtonColor: SemanticCOLORS = isPreviousButtonDisabled ? "grey" : "orange";
    const nextButtonColor: SemanticCOLORS = isNextButtonDisabled ? "grey" : "orange";
    const progress: number = (currentState / (0)) * 100;

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
CustomIdentityProviderCreateWizardHelp.defaultProps = {
    "data-testid": "custom-app-create-wizard-help"
};

/**
 * A default export was added to support React.lazy.
 * TODO: Change this to a named export once react starts supporting named exports for code splitting.
 * @see {@link https://reactjs.org/docs/code-splitting.html#reactlazy}
 */
export default CustomIdentityProviderCreateWizardHelp;
