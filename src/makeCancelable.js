export default function makeCancelable(promise = new Promise()) {
    let isCanceled = false;

    const wrappedPromise = new Promise((resolve, reject) => {
        promise.then(
            val => isCanceled ? reject({ isCanceled, val }) : resolve(val),
            error => isCanceled ? reject({ isCanceled, error }) : reject(error)
        ).catch(error => isCanceled ? reject({ isCanceled, error }) : reject(error));
    });

    return {
        promise: wrappedPromise,
        cancel() {
            isCanceled = true;
        },
    };
};