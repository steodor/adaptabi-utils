/** 
 * Object merging, but ignoring null/undefined values; they will not override truthy values; 0/false excepted;
 * For example, combineObjects({ a: 1 }, { a: 2 }) = { a: 2 } but combineObjects({ a: 1 }, { a: undefined }) = { a: 1 }.
 * 
 * @param {...object} objects - Objects to combine from left to right. Right-most value for a property wins unless it is null or undefined.
 */
export default function combineObjects(...objects) {
    let target = {};
    objects.map(o => Object.keys(o).map(k => target[k] = (o[k] == null || typeof (o[k]) == 'undefined' ? target[k] : o[k])));
    return target;
};
