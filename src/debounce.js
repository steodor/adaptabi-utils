// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
export default function debounce(func, wait, immediate) {
    var timeout;
    return (...args) => {
        args[0] && args[0].persist && args[0].persist();
        var later = () => {
            timeout = null;
            !immediate && func.apply(this, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        callNow && func.apply(this, args);
    };
};

// code from https://github.com/sindresorhus/p-debounce
// but the npm package "p-debounce" is not es5 compliant (has arrow functions) and crashes in IE 11
// so we copied the code here to have it transpiled by babel
export const pDebounce = (fn, wait, opts) => {
    if (!Number.isFinite(wait)) {
        throw new TypeError('Expected `wait` to be a finite number');
    }

    opts = opts || {};

    let leadingVal;
    let timer;
    let resolveList = [];

    return function () {
        const ctx = this;
        const args = arguments;

        return new Promise(resolve => {
            const runImmediately = opts.leading && !timer;

            clearTimeout(timer);

            timer = setTimeout(() => {
                timer = null;

                const res = opts.leading ? leadingVal : fn.apply(ctx, args);

                for (resolve of resolveList) {
                    resolve(res);
                }

                resolveList = [];
            }, wait);

            if (runImmediately) {
                leadingVal = fn.apply(ctx, args);
                resolve(leadingVal);
            } else {
                resolveList.push(resolve);
            }
        });
    };
};