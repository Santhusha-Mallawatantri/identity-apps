/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content.
 */

import { hasRequiredScopes } from "@wso2is/core/helpers";
import { IdentifiableComponentInterface, ProfileInfoInterface } from "@wso2is/core/models";
import { ContentLoader, PageLayout } from "@wso2is/react-components";
import React, { FunctionComponent, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import AdvanceUserView from "./components/advance-user-view";
import { NewUserView } from "./components/new-user-view";
import { useApplicationList } from "../../../features/applications/api";
import {
    AppState,
    EventPublisher
} from "../../../features/core";
import { setActiveView } from "../../../features/core/store";
import { AppViewExtensionTypes, ExtendedFeatureConfigInterface } from "../../configs/models";

/**
 * Proptypes for the overview page component.
 */
type GettingStartedPageInterface = IdentifiableComponentInterface;

/**
 * Overview page.
 *
 * @param props - Props injected to the component.
 *
 * @returns Getting started page.
 */
const GettingStartedPage: FunctionComponent<GettingStartedPageInterface> = (
    props: GettingStartedPageInterface
): ReactElement => {

    const {
        ["data-componentid"]: componentId
    } = props;

    const dispatch: Dispatch = useDispatch();

    const profileInfo: ProfileInfoInterface = useSelector((state: AppState) => state.profile.profileInfo);
    const activeView: string = useSelector((state: AppState) => state.global.activeView);
    const allowedScopes: string = useSelector((state: AppState) => state?.auth?.allowedScopes);
    const featureConfig: ExtendedFeatureConfigInterface = useSelector((state: AppState) => state.config.ui.features);

    const [ isApplicationsAvailable, setIsApplicationsAvailable ] = useState<boolean>(undefined);

    const eventPublisher: EventPublisher = EventPublisher.getInstance();

    const {
        data: applicationList,
        isLoading: isApplicationListFetchRequestLoading,
        error: applicationListFetchRequestError
    } = useApplicationList(null, null, null, null);

    /**
     * Make sure `QUICKSTART` tab is highlighed when this page is in use.
     */
    useEffect(() => {

        if (activeView === AppViewExtensionTypes.QUICKSTART) {
            return;
        }

        dispatch(setActiveView(AppViewExtensionTypes.QUICKSTART));
    }, []);


    useEffect(() => {

        if (!applicationList) {
            return;
        }

        setIsApplicationsAvailable(applicationList.totalResults > 0);
    }, [ applicationList ]);

    useEffect(() => {

        // Add debug logs here one a logger is added.
        // Tracked here https://github.com/wso2/product-is/issues/11650.
    }, [ applicationListFetchRequestError ]);

    /**
     * Monitor `profileInfo.id` and publish the event to avoid an event without `UUID`.
     */
    useEffect(() => {

        if (!profileInfo?.id) {
            return;
        }

        // TODO: Move this to the `extensions/configs/common`.
        // Tracked here https://github.com/wso2-enterprise/asgardeo-product/issues/7742#issuecomment-939960128.
        eventPublisher.publish("console-click-getting-started-menu-item");
    }, [ profileInfo?.id ]);

    return (
        <PageLayout
            padded={ false }
            pageTitle="Getting Started"
            contentTopMargin={ false }
            data-componentid={ `${componentId}-layout` }
            className="getting-started-page"
        >
            {
                isApplicationListFetchRequestLoading
                    ? <ContentLoader/>
                    : (
                        isApplicationsAvailable || !hasRequiredScopes(
                            featureConfig?.applications,
                            featureConfig?.applications?.scopes?.create,
                            allowedScopes
                        )
                            ? <AdvanceUserView onApplicationCreate={ () => setIsApplicationsAvailable(true) }/>
                            : (
                                <NewUserView
                                    onApplicationCreate={ () =>  setIsApplicationsAvailable(true) }
                                    applications={ null }
                                />
                            )
                    )
            }
        </PageLayout>
    );
};

/**
 * Default props for the component.
 */
GettingStartedPage.defaultProps = {
    "data-componentid": "getting-started-page"
};

/**
 * A default export was added to support React.lazy.
 * TODO: Change this to a named export once react starts supporting named exports for code splitting.
 * @see {@link https://reactjs.org/docs/code-splitting.html#reactlazy}
 */
export default GettingStartedPage;
