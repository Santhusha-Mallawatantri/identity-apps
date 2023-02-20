/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content.
 */

import { AsgardeoSPAClient, HttpClientInstance } from "@asgardeo/auth-react";
import { IdentityAppsApiException } from "@wso2is/core/exceptions";
import { HttpMethods } from "@wso2is/core/models";
import useRequest, { 
    RequestErrorInterface, 
    RequestResultInterface 
} from "apps/console/src/features/core/hooks/use-request";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { store } from "../../../../features/core/store";
import { APIResourcesConstants } from "../constants";
import { APIResourceInterface, APIResourcesListInterface } from "../models";

/**
 * Get an axios instance.
 */
const httpClient: HttpClientInstance = AsgardeoSPAClient.getInstance()
    .httpRequest.bind(AsgardeoSPAClient.getInstance());

/**
 * Get API resources.
 *
 * @param after - after.
 * @param before - before.
 * @returns `Promise<APIResourcesListInterface>`
 * @throws `IdentityAppsApiException`
 */
export const useAPIResources = <Data = APIResourcesListInterface, Error = RequestErrorInterface>(
    after?: string,
    before?: string
): RequestResultInterface<Data, Error> => {

    const requestConfig: AxiosRequestConfig = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method: HttpMethods.GET,
        params: {
            after,
            before
        },
        url: `${store.getState().config.endpoints.authzEndpoint}/${APIResourcesConstants.API_RESOURCE_DIR}`
    };

    const { data, error, isValidating, mutate } = useRequest<Data, Error>(requestConfig);

    return {
        data,
        error: error,
        isLoading: !error && !data,
        isValidating,
        mutate
    };
};

/**
 * 
 * @param apiResourceId - id of the API resource
 * @returns `Promise<APIResourceInterface>`
 * @throws `IdentityAppsApiException`
 */
export const useAPIResourceDetails = <Data = APIResourceInterface, Error = RequestErrorInterface>(
    apiResourceId: string
): RequestResultInterface<Data, Error> => {

    const requestConfig: AxiosRequestConfig = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method: HttpMethods.GET,
        url: apiResourceId ? `${store.getState().config.endpoints.authzEndpoint}` + 
            `/${APIResourcesConstants.API_RESOURCE_DIR}/` + `${apiResourceId}` 
            : null
    };

    const { data, error, isValidating, mutate } = useRequest<Data, Error>(requestConfig);

    return {
        data,
        error: error,
        isLoading: !error && !data,
        isValidating,
        mutate
    };
};

/**
 * Delete an API resource.
 *
 * @param apiResourceId - UUID of the API resource that needed to be deleted.
 * @returns `Promise<null | IdentityAppsApiException>`
 * @throws `IdentityAppsApiException`
 */
export const deleteAPIResource = (apiResourceId: string): Promise<null | IdentityAppsApiException> => {

    const requestConfig: AxiosRequestConfig = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method: HttpMethods.DELETE,
        url: `${store.getState().config.endpoints.authzEndpoint}/${APIResourcesConstants.API_RESOURCE_DIR}/` + 
            `${apiResourceId}`
    };

    return httpClient(requestConfig)
        .then((response: AxiosResponse) => {
            if (response.status !== 204) {
                throw new IdentityAppsApiException(
                    response.data.description,
                    null,
                    response.status,
                    response.request,
                    response,
                    response.config);
            }

            return Promise.resolve(response.data);
        }).catch((error: AxiosError) => {
            throw new IdentityAppsApiException(
                error.message,
                error.stack,
                error.response?.data?.code,
                error.request,
                error.response,
                error.config);
        });
};
