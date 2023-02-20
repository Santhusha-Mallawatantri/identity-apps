/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content.
 */

/**
 * Interface to store link data of paginated response.
 */
export interface LinkInterface {
    rel: string;
    href: string;
}

/**
 * Interface to store link data of paginated response.
 */
export interface ApplicationRolesResponseInterface {
    links: LinkInterface[]
    roles: RoleListItemInterface[];
}

/**
 * Interface to store role list item.
 */
export interface RoleListItemInterface {
    name: string;
    permissions: PermissionListItemInterface[];
}

/**
 * Interface to store permission list item.
 */
export interface PermissionListItemInterface {
    name: string;
}

/**
 * Interface to store authorized API list item.
 */
export interface AuthorizedAPIListItemInterface {
    apiId: string;
    apiDisplayName: string;
    permissions: AuthorizedPermissionListItemInterface[];
}

/**
 * Interface to store authorized permission list item.
 */
export interface AuthorizedPermissionListItemInterface {
    id: string;
    displayName: string;
    name: string;
}

/**
 * Interface for create role payload.
 */
export interface CreateRolePayloadInterface {
    name: string;
    permissions: PermissionListItemInterface[];
}

/**
 * Interface for update role payload.
 */
export interface UpdateRolePayloadInterface {
    name: string;
    added_permissions: PermissionListItemInterface[];
    removed_permissions: PermissionListItemInterface[];
}

/**
 * Interface for basic role details.
 */
export interface RoleBasicDetailsInterface {
    basic: RoleNameInterface;
}

/**
 * Interface for role name.
 */
export interface RoleNameInterface {
    roleName: string; 
}
