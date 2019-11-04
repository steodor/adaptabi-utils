var langT = (key) => global.Utils.lang.t(key);

export default {
    formatChildren: childrenList => {
        let childList = childrenList;
        if (typeof childrenList === 'string') {
            childList = childrenList ? langT(childrenList) : '';
        } else if (typeof childrenList === 'object' && typeof childrenList.length === 'number') {
            childList = [];
            for (var i = 0; i < childrenList.length; i++) {
                if (typeof childrenList[i] === 'string') {
                    childList[i] = childrenList[i] ? langT(childrenList[i]) : '';
                } else {
                    childList[i] = childrenList[i];
                }
            }
        }
        return childList;
    },
};