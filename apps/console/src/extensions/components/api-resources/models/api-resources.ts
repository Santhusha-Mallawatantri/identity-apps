/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content.
 */

import { LinkInterface } from "@wso2is/core/models";

/**
 *  Captures API resources list properties.
 */
export interface APIResourcesListInterface {
    /**
     * List of roles in API resources.
     */
    roles?: APIResourceRoleInterface[];
    /**
     * List of API resources.
     */
    apiResources: APIResourceInterface[];
    /**
     * Useful links for pagination.
     */
    links?: LinkInterface[];
}

/**
 *  Basic details of an API resource role
 */
export interface APIResourceRoleInterface {
    /**
     * Name of the API resource role
     */
    name: string,
    /**
     * List of permissions associated with the API resource role
     */
    permissions: APIResourcePermissionInterface[]
}

/**
 *  Basic details of an API resource
 */
export interface APIResourceInterface {
    /**
     * ID of the API resource
     */
    id: string;
    /**
     * Display name of the API resource
     */
    displayName: string;
    /**
     * Identifier of the API resource [Usually this is an API endpoint]
     */
    identifier: string;
    /**
     * Gateway name of the API resource
     */
    gwName: string;
    /**
     * List of permissions associate with the API resource
     */
    permissions: APIResourcePermissionInterface[],
    /**
     * List of applications associate with the API resource
     */
    applications?: string[];
    /**
     * Subdirectory of the API resource
     */
    self: string;
}

export interface APIResourcePermissionInterface {
    /**
     * UUID of the API resource permission
     */
    uuid?: string;
    /**
     * Display name of the API resource permission
     */
    displayName: string;
    /**
     * Name of the API resource role
     */
    name: string,
}
