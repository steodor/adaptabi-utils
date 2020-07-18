export default function callAsync(fn = () => { }, ...args) {
    if (!fn || !fn.call) {
        throw new Error('[callAsync] First argument must be a callable function');
    }

    setTimeout(() => fn(...args), 0);
};
