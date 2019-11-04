let cancelEvent = (event = {}) => {
    event.preventDefault && event.preventDefault();
    event.stopPropagation && event.stopPropagation();
    event.stopImmediatePropagation && event.stopImmediatePropagation();
    event.nativeEvent && event.nativeEvent.preventDefault && event.nativeEvent.preventDefault();
    event.nativeEvent && event.nativeEvent.stopPropagation && event.nativeEvent.stopPropagation();
    event.nativeEvent && event.nativeEvent.stopImmediatePropagation && event.nativeEvent.stopImmediatePropagation();
    return false;
};

cancelEvent.all = window.device ? {
    onTouchStart: cancelEvent,
    onTouchMove: cancelEvent,
    onTouchEnd: cancelEvent,
    onClick: cancelEvent,
} : {
    onMouseDown: cancelEvent,
    onMouseMove: cancelEvent,
    onMouseUp: cancelEvent,
    onClick: cancelEvent,
};

export default cancelEvent;