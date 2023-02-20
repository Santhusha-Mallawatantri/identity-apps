/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content.
 */

import { IdentifiableComponentInterface } from "@wso2is/core/models";
import {
    GridLayout,
    PageLayout
} from "@wso2is/react-components";
import React, { FunctionComponent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Divider, Grid, Ref } from "semantic-ui-react";
import {
    AppConstants,
    history
} from "../../../../features/core";
import { getSettingsSectionIcons } from "../../../../features/server-configurations/configs";
import { SettingsSection } from "../../governance-connectors/settings/settings-section";

type EventPageInterface = IdentifiableComponentInterface;

/**
 * Event Publishing listing page.
 *
 * @param props - Props injected to the component.
 * @returns Users Page component
 */
const EventsPage: FunctionComponent<EventPageInterface> = (
    props : EventPageInterface
): ReactElement => {

    const {
        [ "data-componentid" ]: componentId
    } = props;

    const { t } = useTranslation();

    /**
     * Handle event configuration selection.
     */
    const handleSelection = () => {
        history.push(AppConstants.getPaths()
            .get("EVENT_EDIT"));
            
    };

    return (
        <PageLayout
            pageTitle={ "Events Publishing" }
            title={ t("extensions:develop.eventPublishing.heading") }
            description={ t("extensions:develop.eventPublishing.subHeading") }
            data-componentid={ `${ componentId }-connectors-layout` }
        >
            <Ref innerRef={ null }>
                <GridLayout
                    isLoading={ false }
                    showTopActionPanel={ false }
                >
                    <Grid.Row columns={ 1 }>
                        <Grid.Column width={ 12 }>
                            <div>
                                <SettingsSection
                                    data-componentid={ `${ componentId }-config-connector-section` }
                                    description={ t("extensions:develop.eventPublishing." +
                                    "connectors.eventsConfiguration.subHeading") }
                                    icon={ getSettingsSectionIcons().eventConfiguration }
                                    header={ t("extensions:develop.eventPublishing." +
                                    "connectors.eventsConfiguration.heading") }
                                    onPrimaryActionClick={ handleSelection }
                                    primaryAction={ "Configure" }
                                >
                                    <Divider hidden/>
                                </SettingsSection>
                                <Divider hidden/>
                            </div>
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
EventsPage.defaultProps = {
    "data-componentid": "events-page"
};

/**
 * A default export was added to support React.lazy.
 * TODO: Change this to a named export once react starts supporting named exports for code splitting.
 * @see {@link https://reactjs.org/docs/code-splitting.html#reactlazy}
 */
export default EventsPage;
