export default {
    serverColorIntToRGBA: num => {
        num >>>= 0;
        const b = num & 0xFF,
            g = (num & 0xFF00) >>> 8,
            r = (num & 0xFF0000) >>> 16,
            a = ((num & 0xFF000000) >>> 24) / 255;
        return `rgba(${[r, g, b, a].join(',')})`;
    },
};