import _ from "lodash";
import { ToastNotifier } from "./ToastNotifier";

export const HandleResponseSuccess = (response) => {
    const successResponse = response;
    const successMessage = _.get(successResponse, "data.message");

    ToastNotifier({
        message: successMessage,
        type: "success",
    });
};
