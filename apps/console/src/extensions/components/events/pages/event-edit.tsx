/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content.
 */

import { IdentityAppsApiException } from "@wso2is/core/exceptions";
import { hasRequiredScopes } from "@wso2is/core/helpers";
import { AlertLevels } from "@wso2is/core/models";
import { addAlert } from "@wso2is/core/store";
import { Field, FormValue, Forms } from "@wso2is/forms";
import {
    DocumentationLink,
    EmphasizedSegment,
    GridLayout,
    PageLayout,
    Text,
    useDocumentation
} from "@wso2is/react-components";
import React, { 
    FunctionComponent,
    MutableRefObject, 
    ReactElement, 
    useEffect, 
    useMemo, 
    useRef , 
    useState 
} from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { Button, Divider, Grid , Icon, Ref } from "semantic-ui-react";
import {
    AppConstants,
    AppState,
    FeatureConfigInterface,
    history
} from "../../../../features/core";
import { store } from "../../../../features/core/store";
import { updateEventConfigurations, useEventConfig } from "../api";
import { 
    EventPublishingAPIResponseInterface,
    EventsConfigPageInterface,
    eventIconInterface
} from "../models";

const handleBackButtonClick = (): void => {
    history.push(AppConstants.getPaths()
        .get("EVENTS_PATH"));
};

const FORM_ID: string = "event-configuration-edit-form";
const REDIRECT_FORM_ID: string = "event-configuration-choreo-redirect-form";

/**
 * Events Config page.
 *
 * @param props - Props injected to the component.
 * @returns Events config edit page component.
 */
const EventsEditPage: FunctionComponent<EventsConfigPageInterface> = (
    props : EventsConfigPageInterface
): ReactElement => {

    const {
        ["data-componentid"]: componentId
    } = props;
    //External link to redirect user to Choreo
    const choreoEventingUrl : string = store.getState().config.endpoints.choreoEventingEndpoint;
    const dispatch : Dispatch<any> = useDispatch();
    const { t } = useTranslation();
    const { getLink } = useDocumentation();
    const [ eventCategories, setEventCategories ] = useState<string[]>(undefined);
    const [ eventList , setEventList ] = useState<EventPublishingAPIResponseInterface[]>(undefined);	
    const [ selectedEvents , setSelectedEvents ] = useState<string[]>(undefined);	
    const [ isSubmitting , setIsSubmitting ] = useState<boolean>(undefined);
    const featureConfig : FeatureConfigInterface = useSelector((state: AppState) => state.config.ui.features);
    const tenantName: string = useSelector((state: AppState) => state.config.deployment.tenant);
    const allowedScopes : string = useSelector((state: AppState) => state?.auth?.allowedScopes);
    const pageContextRef : MutableRefObject<HTMLElement> = useRef(null); 
    const checkboxRef : MutableRefObject<HTMLElement> = useRef<HTMLElement>();

    const isReadOnly : boolean = useMemo(() => !hasRequiredScopes(
        featureConfig?.eventPublishing,
        featureConfig?.eventPublishing?.scopes?.update,
        allowedScopes
    ), [ featureConfig, allowedScopes ]); 
    const {
        data: originalEventList,
        isLoading: isEventConfigFetchRequestLoading,
        error: eventConfigFetchRequestError
    } = useEventConfig();

    useEffect(() => {
        if (!originalEventList) {
            return;
        }
    }, [ originalEventList ]);
    
    /**
     * Displays the error banner when unable to fetch event configurations.
     */
    const handleRetrieveError = (): void => {
        dispatch(
            addAlert({
                description: t("extensions:develop.eventPublishing." +
                "notifications.getConfiguration.error.description"),
                level: AlertLevels.ERROR,
                message: t("extensions:develop.eventPublishing." +
                "notifications.getConfiguration.error.message")
            })
        );
    };

    useEffect(() => {
        if (!originalEventList) {
            return;
        }

        if (originalEventList instanceof IdentityAppsApiException) {
            handleRetrieveError();
            
            return;
        }

        if (eventConfigFetchRequestError){
            return;
        }

        setEventList(originalEventList);
        setEventList(originalEventList);
            
        const categories : string[] = [];
        const selectedEventsList : string[] = [];

        for (const eventType of originalEventList){ 
            if (!categories.includes(eventType.category)) {
                categories.push(eventType.category);
            }
            if (eventType.publish) {
                selectedEventsList.push(eventType.displayName);
            }
        }
        setSelectedEvents(selectedEventsList);
        setEventCategories(categories);
    },[ originalEventList ]);

    useEffect(() => {
        if (eventConfigFetchRequestError) {
            handleRetrieveError();
        }
    },[ eventConfigFetchRequestError ]);
    
    const isConfigurationsLoading: boolean = useMemo(
        () =>
            isEventConfigFetchRequestLoading === undefined ||
                isConfigurationsLoading === true,
        [ isEventConfigFetchRequestLoading ]
    );

    /**
     * Handles the event selection when checkboxes are ticked.
     */
    const handleEventChange = (values: Map<string, FormValue>) => {
        const events: string[] = values.get("events-configuration") as string[];
    
        setSelectedEvents(events);
    };
    
    /**
     * Displays the error banner when event configurations are updated.
     */
    const handleUpdateSuccess = () => {
        dispatch(
            addAlert({
                description: t("extensions:develop.eventPublishing." +
                "notifications.updateConfiguration.success.description"),
                level: AlertLevels.SUCCESS,
                message: t("extensions:develop.eventPublishing." +
                "notifications.updateConfiguration.success.message")
            })
        );
    };

    /**
     * Displays the error banner when unable to update event configurations.
     */
    const handleUpdateError = () => {
        dispatch(
            addAlert({
                description: t("extensions:develop.eventPublishing." +
                "notifications.updateConfiguration.error.description"),
                level: AlertLevels.ERROR,
                message: t("extensions:develop.eventPublishing." +
                "notifications.updateConfiguration.error.message")
            })
        );
    };
    
    /**
     * Handles updating the event configurations.
     */
    const handleSubmit = (values : Map<string, FormValue>) => {

        const events: string[] = values.get("events-configuration") as string[];

        const updatedEventList: EventPublishingAPIResponseInterface[] = [];
    
        for (const event of eventList) { 
            
            let enabledEvent : EventPublishingAPIResponseInterface;

            try {
                enabledEvent= JSON.parse(JSON.stringify(event));
            } catch (ex: any) {
                return;
            }

            if (events.includes(event.displayName)) {
                enabledEvent.publish = true;	
            } else {
                enabledEvent.publish = false;
            }
            updatedEventList.push(enabledEvent);
        }
    
        setIsSubmitting(true);
        updateEventConfigurations(updatedEventList)
            .then(() => {
                handleUpdateSuccess();
            })
            .catch(() => {
                handleUpdateError();
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    /**
     * Get events belonging to a given category.
     * 
     * @param category - The event category.
     * @param eventList - The event configuration list.
     * @returns the events belonging to the given category.
     */
    const getEventsofCategory = (
        category : string,
        eventList : EventPublishingAPIResponseInterface[]
    ): eventIconInterface[] => {
        const eventsInCategory : eventIconInterface[] = [];	
        
        for (const eventType of eventList){ 
            if (eventType.category == category) {
            
                const event : eventIconInterface = {
                    label: eventType.displayName,
                    value: eventType.displayName
                };
                
                eventsInCategory.push(event);
            }	
        }

        return eventsInCategory; 
    };

    const resolvePageDescription = () : ReactElement => {
        return (
            <div style={ { whiteSpace: "pre-line" } }>
                {
                    t("extensions:develop.eventPublishing.eventsConfiguration.subHeading")
                }
                <DocumentationLink
                    link={ getLink("develop.eventPublishing.learnMore") }
                >
                    { t("extensions:common.learnMore") }
                </DocumentationLink>
            </div>
        );
    };

    const onClickNavigateToChoreo = () : void => {
        window.open(`${ choreoEventingUrl }organizations/${ tenantName }`, "_blank", "noopener,noreferrer");
    };

    const ChoreoNavigationButton = () : ReactElement => {
        if (!choreoEventingUrl) {

            return (null); 
        }

        return (
            <div>
                <br/>
                <EmphasizedSegment className="form-wrapper" padded={ "very" }>
                    <Forms
                        id={ REDIRECT_FORM_ID }
                        uncontrolledForm={ false }
                    >
                        <Text className="mb-1"> { t("extensions:develop.eventPublishing." +
                                    "eventsConfiguration.navigateToChoreo.description") }
                        </Text>
                        <br/>
                        <Button
                            primary
                            size="small"
                            className="form-button navigate-to-choreo-button"
                            onClick= { () => onClickNavigateToChoreo() } 
                            data-componentid = { `${ componentId }-redirect-button` }
                            disabled={ false }
                            loading={ false }
                        >
                            <Icon className="ml-1" name="external alternate"/>
                            { t("extensions:develop.eventPublishing." +
                                    "eventsConfiguration.navigateToChoreo.navigateButton") }
                        </Button>
                    </Forms>
                </EmphasizedSegment>
            </div>        
        ); 
    };

    if (isConfigurationsLoading || !eventList) {
        return (
            (<GridLayout
                isLoading={ isConfigurationsLoading }
                className={ "pt-5" }
            />)
        );
    }

    return (
        <PageLayout
            title={ t("extensions:develop.eventPublishing.eventsConfiguration.heading") }
            description={ resolvePageDescription() }
            backButton={ {
                "data-componentid": `${ componentId }-back-button`,
                onClick: handleBackButtonClick,
                text: t("extensions:develop.eventPublishing.eventsConfiguration.backButton") 
            } }
            bottomMargin={ false }
            contentTopMargin={ true }
            pageHeaderMaxWidth={ true }
            data-componentid={ `${ componentId }-form-layout` }
        >
            <Ref innerRef={ pageContextRef }>
                <Grid className={ "mt-3" } >
                    <Grid.Row columns={ 1 }>
                        <Grid.Column width={ 16 }>
                            <EmphasizedSegment className="form-wrapper" padded={ "very" }>
                                <Forms
                                    id={ FORM_ID }
                                    uncontrolledForm={ false }
                                    onSubmit={ handleSubmit }
                                >
                                    {
                                        eventCategories?.map((category : string , index : number ) => {
    
                                            return (
                                                <div key={ index }>
                                                    <Text className="mb-1"> { category } </Text>
                                                    <Field
                                                        ref={ checkboxRef }
                                                        className="mb-3 ml-3"
                                                        name="events-configuration"
                                                        type="checkbox"
                                                        required={ false }
                                                        children= { getEventsofCategory(category,eventList) }
                                                        value= { selectedEvents }
                                                        readOnly={ isReadOnly }
                                                        enableReinitialize={ true }
                                                        listen=
                                                            { (values : 
                                                            Map<string, FormValue>) => handleEventChange(values) 
                                                            }
                                                        data-componentid={
                                                            `${ category }-edit-section` }
                                                    />
                                                </div>
                                            );
                                        })
                                    }
                                    <Divider hidden />
                                    <Grid.Row columns={ 1 }>
                                        <Grid.Column mobile={ 16 } tablet={ 16 } computer={ 16 }>
                                            <Button
                                                primary
                                                type="submit"
                                                size="small"
                                                className="form-button"
                                                data-componentid = { `${ componentId }-update-button` }
                                                disabled={ isReadOnly }
                                                loading={ isSubmitting }
                                            >
                                                { t("extensions:develop.eventPublishing." +
                                                "eventsConfiguration.form.updateButton") }
                                            </Button>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Forms>
                            </EmphasizedSegment>
                            <ChoreoNavigationButton/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Ref> 
        </PageLayout>
    );
};

/**
 * Default props for the component.
 */
EventsEditPage.defaultProps = {
    "data-componentid": "events-config-page"
};

/**
 * A default export was added to support React.lazy.
 * TODO: Change this to a named export once react starts supporting named exports for code splitting.
 * @see {@link https://reactjs.org/docs/code-splitting.html#reactlazy}
 */
export default EventsEditPage;
