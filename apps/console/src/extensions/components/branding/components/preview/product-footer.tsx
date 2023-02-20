/**
 * Copyright (c) 2022, WSO2 LLC. (http://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content."
 */

import { IdentifiableComponentInterface } from "@wso2is/core/models";
import isEmpty from "lodash-es/isEmpty";
import React, {
    Fragment,
    FunctionComponent,
    ReactElement
} from "react";
import { BrandingPreferencesConstants } from "../../constants";
import { BrandingPreferenceMeta } from "../../meta";
import { BrandingPreferenceInterface } from "../../models";

/**
 * Proptypes for the product footer component of login screen skeleton.
 */
interface ProductFooterInterface extends IdentifiableComponentInterface {
    /**
     * Branding preferences object.
     */
    brandingPreference: BrandingPreferenceInterface;
}

/**
 * Product Footer Component.
 *
 * @param {ProductFooterInterface} props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */
export const ProductFooter: FunctionComponent<ProductFooterInterface> = (
    props: ProductFooterInterface
): ReactElement => {

    const {
        ["data-componentid"]: componentId,
        brandingPreference
    } = props;

    return (
        <div data-componentid = { componentId } className="footer">
            <div className="ui container fluid">
                <div className="ui text menu">
                    <div className="left menu">
                        <a className="item no-hover" id="copyright">
                            <span>{ brandingPreference.organizationDetails.copyrightText }</span>
                            {
                                (brandingPreference.configs?.removeAsgardeoBranding === false) && (
                                    <Fragment>
                                        <div className="powered-by-logo-divider">|</div>
                                            Powered by <div className="powered-by-logo">
                                            <img
                                                width="80"
                                                height="20"
                                                src={
                                                    Object.prototype.hasOwnProperty.call(
                                                        BrandingPreferenceMeta
                                                            .getBrandingPreferenceInternalFallbacks()
                                                            .theme,
                                                        brandingPreference.theme.activeTheme
                                                    )
                                                        ? BrandingPreferenceMeta
                                                            .getBrandingPreferenceInternalFallbacks()
                                                            .theme[
                                                                brandingPreference.theme.activeTheme
                                                            ].images.logo.imgURL
                                                        : BrandingPreferenceMeta
                                                            .getBrandingPreferenceInternalFallbacks()
                                                            .theme[
                                                                BrandingPreferencesConstants.DEFAULT_THEME
                                                            ].images.logo.imgURL
                                                }
                                                alt="Asgardeo Logo"
                                            />
                                        </div>
                                    </Fragment>
                                )
                            }
                        </a>
                    </div>
                    <div className="right menu">
                        {
                            !isEmpty(brandingPreference.urls?.privacyPolicyURL) && (
                                <a
                                    id="privacy-policy"
                                    className="item"
                                    href={ brandingPreference.urls.privacyPolicyURL }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-testid="login-page-privacy-policy-link"
                                >
                                        Privacy Policy
                                </a>
                            )
                        }
                        {
                            !isEmpty(brandingPreference.urls?.termsOfUseURL) && (
                                <a
                                    id="terms-of-service"
                                    className="item"
                                    href={ brandingPreference.urls.termsOfUseURL }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-testid="login-page-privacy-policy-link"
                                >
                                        Terms of Service
                                </a>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 * Default props for the component.
 */
ProductFooter.defaultProps = {
    "data-componentid": "login-screen-skeleton-product-footer"
};
