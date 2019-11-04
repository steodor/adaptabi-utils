//gets a deep property off an object via a string path
export default (obj, path) => {
    if (!path || !path.length) { return obj; }
    let parts = path.split('.'), rv, index;
    for (rv = obj, index = 0; rv && index < parts.length; ++index) {
        let part = parts[index],
            brac = part.split('[');
        if (brac.length == 2) {
            rv = rv[brac[0]][brac[1].slice(0, -1)];
        } else {
            if (part && part.length) {
                rv = rv[part];
            }
        }
    }
    return rv;
};
