export default promise => {
    let hasCanceled_ = false;

    const wrappedPromise = new Promise((resolve, reject) => {
        promise.then(
            val => hasCanceled_ ? reject({ isCanceled: true, val }) : resolve(val),
            error => hasCanceled_ ? reject({ isCanceled: true, error }) : reject(error)
        ).catch(error => hasCanceled_ ? reject({ isCanceled: true, error }) : reject(error));
    });

    return {
        promise: wrappedPromise,
        cancel() {
            hasCanceled_ = true;
        },
    };
};