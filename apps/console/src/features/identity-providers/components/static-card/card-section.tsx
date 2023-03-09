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

import { GenericIconProps, GenericIconSizes, GridLayout } from "@wso2is/react-components";
import { IdentifiableComponentInterface, TestableComponentInterface } from "modules/core/src/models";
import BiometricIcon from "modules/theme/src/themes/default/assets/images/icons/fingerprint.svg";
import MagicLinkIcon from "modules/theme/src/themes/default/assets/images/icons/magic-link-icon.svg";
import TOTPIcon from "modules/theme/src/themes/default/assets/images/icons/outline-icons/clock-outline.svg";
import EmailIcon from "modules/theme/src/themes/default/assets/images/icons/solid-icons/email-solid.svg";
import SMSIcon from "modules/theme/src/themes/default/assets/images/icons/solid-icons/sms-solid.svg";
import React, { ReactNode } from "react";
import { Card, CardProps, Label } from "semantic-ui-react";

/**
 * Proptypes for the info card component.
 */
export interface InfoCardPropsInterface extends CardProps, IdentifiableComponentInterface, TestableComponentInterface {

    /**
     * Action for the card
     */
    action?: ReactNode;
    /**
     * Is card disabled.
     */
    disabled?: boolean;
    /**
     * Side of the image.
     */
    fluidImageSize?: GenericIconSizes;
    /**
     * Is card used to display a github repo info.
     */
    githubRepoCard?: boolean;
    /**
     * Id for the card.
     */
    id?: string;
    /**
     * Image for the card.
     */
    image?: any;
    /**
     * Side of the image.
     */
    imageSize?: GenericIconSizes;
    /**
     * Extra options for the card image.
     */
    imageOptions?: Omit<GenericIconProps, "icon" | "size">;
    /**
     * Disable hovering effect.
     */
    noHover?: boolean;
    /**
     * If the card is selected.
     */
    selected?: boolean;
    /**
     * Card sub header.
     */
    subHeader?: string;
    /**
     * Show an attached label as a ribbon.
     */
    ribbon?: ReactNode;
    /**
     * Set of tags.
     */
    tags?: string[];
    /**
     * Text alignment.
     */
    textAlign?: "center" | "left" | "right";
    /**
     * If the card should be inline.
     */
    inline?: boolean;
    /**
     * Show/Hide tooltips.
     */
    showTooltips?: boolean | { header:boolean; description:boolean; };
}

export type DataType = {
    title:string;
    subtitle:string;
    description:string;
    tag:string;
    image:any;

}

export const CardData : DataType[] = [
    {
        description:"Two-factor authentication using one-time passcode sent via email.",
        image: TOTPIcon,
        subtitle:"Predefined",
        tag:"#MFA ",
        title:"TOTP"
          
    },
    {
        description:"Two-factor authentication using Time-Based One Time passcode.",
        image:EmailIcon,
        subtitle:"Predefined",
        tag:"#MFA ",
        title:"Email OTP"      
    },
    {
        description:"Provide secure and fast passwordless login experience using FIDO2.",
        image:SMSIcon,
        subtitle:"Predefined",
        tag:"#MFA",  
        title:"SMS OTP"
    },
    {
        description:"Provides an email that uses a magic link to log into passwordless",
        image:MagicLinkIcon,
        subtitle:"Predefined",
        tag:"#Passwordless",  
        title:"Magic Link"       
    },
    {
        description:"Provide secure and fast passwordless login experience using FIDO2.",
        image:BiometricIcon,
        subtitle:"Predefined",
        tag:"#Passwordless",   
        title:"Security Key/Biometrics"
        
    }    
];

const CardSection = () => {
    return (
        <div className="card-grid">
            <div className="static-standard-title">
                Standard Intergrations
            </div>
            <div className="grid-container-section">
                
                { /* // style={ { display:"grid", gap:"14px", gridTemplateColumns: "1fr 1fr 1fr 1fr",
                //     marginBottom:"20px",width:"330px" } } > */ }
                { CardData.map(( items , i )=>{
                    return(
                        <GridLayout key={ i } className="standard-card-grid">
                            <Card  className="card-container">
                                
                                <Card.Header className="static-card-header">
                                    <div className="static-card-icon">
                                        <img src={ items.image } alt="icon"></img>
                                    </div>
                                    { items.title }
                                </Card.Header>
                                <Card.Meta className="card-static-meta">{ items.subtitle }</Card.Meta>
                                <Card.Description className="card-static-description"> 
                                    { items.description }
                                </Card.Description>
                                <Label className="card-static-label">
                                    { items.tag } 
                                </Label>
                            </Card>
                        </GridLayout>
                    );
                }) }
                
            </div>
            
        </div>
    );
};

export default CardSection;
