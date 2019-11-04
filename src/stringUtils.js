const stringUtils = {
    toFirstUpper: (str) => {
        if (!str || str.length <= 0) {
            return '';
        }
        return str[0].toUpperCase() + str.substring(1).toLowerCase();
    },
    toFirstUpperEachWord: (str) => {
        return str.split(' ').map(word => stringUtils.toFirstUpper(word)).join(' ');
    },
    getFirstNChars: (str, charsCount = 60) => {
        if (str) {
            if (str.length >= charsCount) {
                return str.substring(0, charsCount) + '...';
            }
            else {
                return str;
            }
        }
        return '';
    },
    getFirst30Chars: (str) => {
        return stringUtils.getFirstNChars(str, 30);
    },
    splitCamelCase: (str) => {
        return str.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
    },
    replaceNewLineWithBR: (str) => {
        return str && str.replace(/(?:\r\n|\r|\n)/g, '<br/>') || '';
    },
};

export default stringUtils;
