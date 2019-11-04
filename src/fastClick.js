import cancelEvent from './cancelEvent';
import getTime from './getTime';

const threshold = {
    distance: 5, //distance in px; if user moves finger more than this on any axis, it's not a tap
    time: 2500, //ms; if user holds finger longer than this, it's not a tap
    pressTime: 75, //ms; only show "pressing" state after this much time
};
let initial = {}, pressing = false, showingPressedState = false, events = null;

export default (cb, { triggerInstantly = false, bubble = true, allowOnClick = false, hideKeyboard = true, preventIOSAutofocus = false, showPressing = true } = {}) => {
    if (!cb) { return; }
    if (preventIOSAutofocus && window.device && window.device.platform == 'iOS') {
        return { onClick: cb };
    }
    if (!events) {
        events = window.device
            ? { start: 'onTouchStart', move: 'onTouchMove', end: 'onTouchEnd' }
            : { start: 'onMouseDown', move: 'onMouseMove', end: 'onMouseUp' };
    }
    let attrs = {};
    if (triggerInstantly) {
        attrs[events.start] = e => {
            cb(e);
            hideKeyboard && window.currentlyFocused && currentlyFocused.blur && currentlyFocused.blur();
            return cancelEvent(e);
        };
        attrs['onClick'] = cancelEvent;
    } else {
        attrs[events.start] = event => {
            !bubble && cancelEvent(event);
            clearTimeout(initial.pressingTimeout);
            clearTimeout(initial.endTimeout);
            event.persist && event.persist();
            initial = { event, time: getTime(), x: getX(event), y: getY(event), currentTarget: event.currentTarget };
            pressing = true;
            showingPressedState = false;
            initial.pressingTimeout = setTimeout(() => showPressing && !showingPressedState && initial.currentTarget && initial.currentTarget.classList && initial.currentTarget.classList.add('pressing'), threshold.pressTime)
            initial.endTimeout = setTimeout(attrs[events.end], threshold.time);
            return bubble;
        };
        attrs[events.move] = event => {
            if (!pressing) { return true; }
            if (!showingPressedState && getTime() - initial.time > threshold.pressTime) {
                showPressing && initial.currentTarget && initial.currentTarget.classList && initial.currentTarget.classList.add('pressing');
                showingPressedState = true;
            }
            if (showingPressedState && getTime() - initial.time > threshold.time
                || Math.abs(getX(event) - initial.x) > threshold.distance
                || Math.abs(getY(event) - initial.y) > threshold.distance) {
                pressing = false;
                showPressing && initial.currentTarget && initial.currentTarget.classList && initial.currentTarget.classList.remove('pressing');
            }
            return true;
        };
        attrs[events.end] = () => {
            clearTimeout(initial.pressingTimeout);
            clearTimeout(initial.endTimeout);
            showPressing && initial.currentTarget && initial.currentTarget.classList && initial.currentTarget.classList.remove('pressing');
            if (!pressing || getTime() - initial.time > threshold.time) { return true; }
            cb(initial.event);
            hideKeyboard && window.currentlyFocused && currentlyFocused.blur && currentlyFocused.blur();
            pressing = false;
            return true;
        };

        !allowOnClick && (attrs['onClick'] = cancelEvent);
    }
    return attrs;
};

function getX(event) {
    return window.cordova ? event.touches[0].clientX : event.clientX;
}
function getY(event) {
    return window.cordova ? event.touches[0].clientY : event.clientY;
}
