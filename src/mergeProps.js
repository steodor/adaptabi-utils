// use this when connect-ing to the Redux store, to pass on any ownProps ("o" below) properly to descendants
export default (s, d, o) => ({ ...s, ...d, ...o });
