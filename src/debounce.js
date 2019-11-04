// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
export default (func, wait, immediate) => {
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
