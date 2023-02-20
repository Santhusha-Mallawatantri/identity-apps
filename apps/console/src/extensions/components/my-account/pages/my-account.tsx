/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content.
 */

import { AlertLevels, IdentifiableComponentInterface } from "@wso2is/core/models";
import { addAlert } from "@wso2is/core/store";
import { GridLayout, PageLayout, Section } from "@wso2is/react-components";
import React, { FunctionComponent, ReactElement, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Divider, Grid, Label, Ref } from "semantic-ui-react";
import { AppConstants, history } from "../../../../features/core";
import { useMyAccountStatus } from "../api";

/**
 * Props for my account settings page.
 */
type MyAccountSettingsPageInterface = IdentifiableComponentInterface;

/**
 * Governance connector listing page.
 *
 * @param props - Props injected to the component.
 * @returns Governance connector listing page component.
 */
export const MyAccountSettingsPage: FunctionComponent<MyAccountSettingsPageInterface> = (
    props: MyAccountSettingsPageInterface
): ReactElement => {
    const { [ "data-componentid" ]: componentId } = props;

    const dispatch = useDispatch();
    const pageContextRef = useRef(null);

    const { t } = useTranslation();

    const [ isLoadingForTheFirstTime, setIsLoadingForTheFirstTime ] = useState<boolean>(true);
    const [ isMyAccountEnabled, setMyAccountEnabled ] = useState<boolean>(AppConstants.DEFAULT_MY_ACCOUNT_STATUS);

    const {
        data: myAccountStatus,
        isLoading: isMyAccountStatusLoading,
        error: myAccountStatusFetchRequestError
    } = useMyAccountStatus();

    /**
     * Handles the my account status fetch request error.
     */
    useEffect(() => {

        if (!myAccountStatusFetchRequestError) {
            return;
        }

        if (myAccountStatusFetchRequestError.response
            && myAccountStatusFetchRequestError.response.data
            && myAccountStatusFetchRequestError.response.data.description) {
            if (myAccountStatusFetchRequestError.response.status === 404) {
                return;
            }
            dispatch(addAlert({
                description: myAccountStatusFetchRequestError.response.data.description ??
                    t("console:develop.features.applications.myaccount.fetchMyAccountStatus.error.description"),
                level: AlertLevels.ERROR,
                message: t("console:develop.features.applications.myaccount.fetchMyAccountStatus.error.message")
            }));

            return;
        }

        dispatch(addAlert({
            description: t("console:develop.features.applications.myaccount.fetchMyAccountStatus" +
                ".genericError.description"),
            level: AlertLevels.ERROR,
            message: t("console:develop.features.applications.myaccount.fetchMyAccountStatus" +
                ".genericError.message")
        }));
    }, [ myAccountStatusFetchRequestError ]);

    /**
     * Sets the initial spinner.
     * TODO: Remove this once the loaders are finalized.
     */
    useEffect(() => {
        if (isMyAccountStatusLoading === false
            && isLoadingForTheFirstTime === true) {
            let status: boolean = AppConstants.DEFAULT_MY_ACCOUNT_STATUS;

            if (myAccountStatus) {
                const enableProperty = myAccountStatus["value"];

                if (enableProperty && enableProperty === "false") {
                    status = false;
                }
            }
            setMyAccountEnabled(status);
            setIsLoadingForTheFirstTime(false);
        }
    }, [ isMyAccountStatusLoading, isLoadingForTheFirstTime ]);

    /**
     * Handle connector advance setting selection.
     */
    const handleSelection = () => {
        history.push(AppConstants.getPaths().get("MY_ACCOUNT_EDIT"));
    };

    return (
        <PageLayout
            pageTitle={ t("extensions:manage.myAccount.pageTitle") }
            title={ (
                <>
                    { t("extensions:manage.myAccount.pageTitle") }
                    <Label size="medium" className="preview-label ml-2">
                        { t("common:preview") }
                    </Label>
                </>
            ) }
            description={ t("extensions:manage.myAccount.description") }
            data-componentid={ `${ componentId }-page-layout` }
        >
            <Ref innerRef={ pageContextRef }>
                <GridLayout
                    isLoading={ isMyAccountStatusLoading }
                    showTopActionPanel={ false }
                >
                    <Grid.Row columns={ 1 }>
                        <Grid.Column width={ 12 }>
                            <Section
                                data-componentid={ `${componentId}-settings-section` }
                                description={ "Self-service portal for your users." }
                                icon={ null }
                                header={ "My Account" }
                                onPrimaryActionClick={ handleSelection }
                                primaryAction={ "Configure" }
                                connectorEnabled={ isMyAccountEnabled }
                            >
                                <Divider hidden/>
                            </Section>      
                        </Grid.Column>
                    </Grid.Row>
                </GridLayout>
            </Ref>
        </PageLayout>
    );
};

/**
 * Default props for the component.
 */
MyAccountSettingsPage.defaultProps = {
    "data-componentid": "my-account-settings-page"
};

/**
 * A default export was added to support React.lazy.
 * TODO: Change this to a named export once react starts supporting named exports for code splitting.
 * @see {@link https://reactjs.org/docs/code-splitting.html#reactlazy}
 */
export default MyAccountSettingsPage;
