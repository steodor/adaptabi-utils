export default (object) => {
    if (typeof (object) == 'undefined') { return undefined; } // otherwise JSON.stringify yields undefined and JSON.parse crashes on that
    return JSON.parse(JSON.stringify(object));
}
