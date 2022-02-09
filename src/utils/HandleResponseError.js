import _ from "lodash";
import { ToastNotifier } from "./ToastNotifier";

export const handleResponseError = (error) => {
    const errorResponse = error.response;
    const statusCode = _.get(errorResponse, "status");

    let errorMessage;
    if (statusCode === 404) {
        errorMessage = "API not found.";
    } else if ([200, 400].includes(statusCode)) {
        errorMessage = _.get(errorResponse, "data.message");
    } else {
        errorMessage = "Internal server error. Please try again.";
    }

    ToastNotifier({
        message: errorMessage,
    });
};
