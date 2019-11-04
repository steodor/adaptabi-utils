import getTime from './getTime';

// Adapted from here: https://stackoverflow.com/a/27078401/334110
export default (func, wait, options) => {
    let timeout = null, previous = 0;
    if (!options) options = {};
    return (...args) => {
        let now = getTime();
        if (!previous && options.leading === false) previous = now;
        let remaining = wait - (now - previous);
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(null, args);
            if (!timeout) args = null;
        } else if (options.trailing !== false) {
            args[0] && args[0].persist && args[0].persist();
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(() => {
                previous = options.leading === false ? 0 : getTime();
                timeout = null;
                func.apply(null, args);
                if (!timeout) args = null;
            }, remaining);
        }
    };
};
