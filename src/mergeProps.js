// use this when connect-ing to the Redux store, to pass on any ownProps ("o" below) properly to descendants
export default function mergeProps(s, d, o) {
    return { ...s, ...d, ...o };
};
