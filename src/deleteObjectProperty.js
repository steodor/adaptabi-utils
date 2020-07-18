export default function deleteObjectProperty(object = {}, property = '') {
    let { [property]: deleted, ...result } = object;
    return result;
};
