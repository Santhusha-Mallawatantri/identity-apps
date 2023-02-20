/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content.
 */

import { AsgardeoSPAClient, HttpClientInstance } from "@asgardeo/auth-react";
import { HttpMethods } from "@wso2is/core/models";
import { store } from "apps/console/src/features/core";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { 
    ApplicationRolesResponseInterface, 
    AuthorizedAPIListItemInterface, 
    CreateRolePayloadInterface, 
    UpdateRolePayloadInterface
} from "../models";

/**
 * Initialize an axios Http client.
 */
const httpClient: HttpClientInstance = AsgardeoSPAClient.getInstance()
    .httpRequest.bind(AsgardeoSPAClient.getInstance())
    .bind(AsgardeoSPAClient.getInstance());

/**
 * Get the application roles of the application.
 *
 * @param appId - Application ID.
 * @param before - Before link.
 * @param after - After link.
 * @param filter - Filter query.
 * @param limit - Limit.
 * 
 * @returns A promise containing the response.
 */
export const getApplicationRolesList = (
    appId: string,
    before: string,
    after: string,
    filter: string,
    limit: number
):Promise<ApplicationRolesResponseInterface> => {

    const requestConfig: AxiosRequestConfig = {
        method: HttpMethods.GET,
        params: {
            after,
            before,
            filter,
            limit
        },
        url:  `${ store.getState().config.endpoints.authzEndpoint }/applications/${ appId }/roles`
    };

    return httpClient(requestConfig)
        .then((response: AxiosResponse) => {
            return Promise.resolve(response.data as ApplicationRolesResponseInterface);
        })
        .catch((error: AxiosError) => {
            return Promise.reject(error);
        });
};

/**
 * Get the authorized APIs of the application with authorized permissions.
 *
 * @param appId - Application ID.
 * 
 * @returns A promise containing the response.
 */
export const getAuthorizedAPIList = (appId: string):Promise<AuthorizedAPIListItemInterface[]> => {
    const requestConfig: AxiosRequestConfig = {
        method: HttpMethods.GET,
        url: `${ store.getState().config.endpoints.authzEndpoint }/applications/${ appId }/authorized-apis`
    };

    return httpClient(requestConfig)
        .then((response: AxiosResponse) => {
            return Promise.resolve(response.data as AuthorizedAPIListItemInterface[]);
        })
        .catch((error: AxiosError) => {
            return Promise.reject(error);
        });
};

/**
 * Create an application roles for the application.
 *
 * @param appId - Application ID.
 * @param payload - Application role creation payload.
 * 
 * @returns A promise containing the response.
 */
export const createRole = (appId: string, payload: CreateRolePayloadInterface):Promise<any> => {
    const requestConfig: AxiosRequestConfig = {
        data: payload,
        method: HttpMethods.POST,
        url:  `${ store.getState().config.endpoints.authzEndpoint }/applications/${ appId }/roles`
    };

    return httpClient(requestConfig)
        .then((response: AxiosResponse) => {
            return Promise.resolve(response);
        })
        .catch((error: AxiosError) => {
            return Promise.reject(error);
        });
};

/**
 * Update the selected application role.
 *
 * @param appId - Application ID.
 * @param roleName - Selected role name.
 * @param payload - Application role creation payload.
 * 
 * @returns A promise containing the response.
 */
export const updateRolePermissions = ( 
    appId: string, 
    roleName: string, 
    payload: UpdateRolePayloadInterface
):Promise<any> => {
    const requestConfig: AxiosRequestConfig = {
        data: payload,
        method: HttpMethods.PATCH,
        url:  `${ store.getState().config.endpoints.authzEndpoint }/applications/${ appId }/roles/${ roleName }`
    };

    return httpClient(requestConfig)
        .then((response: AxiosResponse) => {
            return Promise.resolve(response);
        })
        .catch((error: AxiosError) => {
            return Promise.reject(error);
        });
};

/**
 * Delete the selected application role.
 *
 * @param appId - Application ID.
 * @param roleName - Selected role name.
 * 
 * @returns A promise containing the response.
 */
export const deleteRole = (appId: string, roleName: string):Promise<any> => {
    const requestConfig: AxiosRequestConfig = {
        method: HttpMethods.DELETE,
        url:  `${ store.getState().config.endpoints.authzEndpoint }/applications/${ appId }/roles/${ roleName }`
    };

    return httpClient(requestConfig)
        .then((response: AxiosResponse) => {
            return Promise.resolve(response);
        })
        .catch((error: AxiosError) => {
            return Promise.reject(error);
        });
};
