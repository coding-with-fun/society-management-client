import axios from "axios";
import _ from "lodash";

// A request interceptor
axios.interceptors.request.use(
    function (config) {
        // To do something before request is sent.
        return config;
    },

    function (error) {
        // To do something with request error.
        return Promise.reject(error);
    }
);

// A response interceptor
axios.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx will cause this function to trigger.
        // To do something with response data.
        if (!response.data.success) {
            const error = {
                response,
            };
            throw error;
        } else {
            const userToken = _.get(response, "data.data.token");
            localStorage.setItem("dhc-token", userToken);

            return response;
        }
    },

    function (error) {
        // Any status codes that falls outside the range of 2xx will cause this function to trigger.
        // To do something with response error.
        return Promise.reject(error);
    }
);

export const request = async ({
    url,
    method = "GET",
    params,
    body,
    headers,
}) => {
    const BASE_URL = process.env.REACT_APP_BACKEND_URL + "/api/v1";
    const res = await axios.request({
        url: BASE_URL + url,
        method,
        params,
        data: body,
        headers,
    });

    return res;
};
