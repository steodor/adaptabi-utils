import { bindActionCreators } from 'redux';

const bindActions = (actions, dispatch) => Object.keys(actions)
    .reduce((bound, name) => (bound[name] = bindActionCreators(actions[name], dispatch), bound), {});

export default (actions, dispatch = false) => dispatch ? bindActions(actions, dispatch) : dispatch => bindActions(actions, dispatch);
