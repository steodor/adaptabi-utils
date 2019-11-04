//group an array of objects by 'key'
export default (list, key) => {
    if (!list) {
        return [];
    }
    let listRed = list.reduce((rv, x) => ((rv[x[key]] = rv[x[key]] || []).push(x), rv), {}),
        result = [];
    Object.keys(listRed).map(item => result.push({
        value: item,
        list: listRed[item],
    }));
    return result;
};