//if n < 0 => (n)
export default (number) => number
    ? (number + "").split(",").map(aa => parseFloat(aa) < 0 ? ('(' + aa + ')').replace('-', '') : '' + aa).join('')
    : number;