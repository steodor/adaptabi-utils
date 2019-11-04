//INPUT is a delta, not coords!
//so x = current x coord - initial x coord, same for y
//OUTPUT is { axis, direction, distance }
export default ({ x, y }) => {
    const ax = Math.abs(x), ay = Math.abs(y);
    return {
        axis: ax > ay ? 'horizontal' : (ax < ay ? 'vertical' : 'none'),
        direction: ax > ay ? (x > 0 ? 'right' : 'left') : (ax < ay ? (y > 0 ? 'down' : 'up') : 'none'),
        distance: Math.sqrt(x * x + y * y),
    };
};
