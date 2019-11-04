//gets coords off an event object
export default event => {
    if (!window.cordova) {
        return {
            x: event.clientX,
            y: event.clientY,
        };
    }

    if (event.touches) {
        return {
            x: event.touches[0].clientX,
            y: event.touches[0].clientY,
        };
    }

    if (event.changedTouches) {
        return {
            x: event.changedTouches[0].clientX,
            y: event.changedTouches[0].clientY,
        };
    }

    return {
        x: 0,
        y: 0,
    }
};