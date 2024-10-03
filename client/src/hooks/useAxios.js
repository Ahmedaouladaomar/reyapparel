import React, { useState } from 'react';
import { client } from '@/axios';
import { nprogress } from '@mantine/nprogress';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

// methods 
export const POST = 'post';
export const PATCH = 'patch';
export const PUT = 'put';
export const GET = 'get';
export const DELETE = 'delete';

// notification colors
export const GREEN = 'green';
export const RED = 'red';

/**
 * @param {string} path 
 * @param {string} method http method to be used
 * @param {object} options 
 * @param {boolean} options.withProgressBar top linear progress bar
 * @param {boolean} options.withNotification pop-over notifications
 * @returns
 **/
const useAxios = (path, method, { withProgressBar, withNotification } = {}) => {
    // state
    const [response, setResponse] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState();
    // icons
    const IconFailure = React.createElement(IconX);
    const IconSuccess = React.createElement(IconCheck);

    function delay(ms){
        return new Promise((resolve) => setTimeout(() => {
            resolve()
        }, ms))
    }

    async function _call(newPath = null, newMethod = null, body, signal = null, delayMs = null) {
        newPath && (path = newPath);
        newMethod && (method = newMethod);
        // delay for animation purpose
        delayMs && await delay(delayMs);
        // verify method
        if(method && [POST, PATCH, PUT, GET, DELETE].includes(method)){
            return client[method](path, body, { signal: signal });
        }
        throw new Error(`The ${method} method is not supported`);
    }

    const call = async function ({ newPath, newMethod, body, withNotificationOption, delayMs, signal } = {}) {
        let res, errorCatch;
        try {
            withProgressBar && nprogress.start();
            setLoading(true);
            res = await _call(newPath, newMethod, body, signal, delayMs);
            setResponse(res);
            return res;
        } catch (err) {
            errorCatch = err;
            setError(err);
            // notification display
            (withNotification || withNotificationOption) &&
            notifications.show({
                message: err.response?.data?.message,
                color: RED,
                icon: IconFailure
            });
        } finally {
            const failure =  res?.data?.error;
            const success  = res?.data?.success;
            // notification display
            (!errorCatch && (withNotification || withNotificationOption)) &&
            notifications.show({
                message: failure ? failure : success,
                color: failure ? RED : GREEN,
                icon: failure ? IconFailure : IconSuccess
            });
            // progress bar
            withProgressBar && nprogress.complete();
            setLoading(false);
        }
    }

    return { response, error, loading, call };
};

export default useAxios;