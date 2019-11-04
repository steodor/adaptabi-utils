export default (availableFilters, key, data) => {
    // when copying, do NOT use getDeepClone because it loses functions in json parsing!
    let all = { ...availableFilters, filters: [...availableFilters.filters.map(f => [...f.map(ff => ({ ...ff }))])] },
        k2 = -1,
        k1 = all.filters.findIndex((section, k) => {
            k2 = section.findIndex(filter => filter.key == key);
            return k2 >= 0;
        });
    if (k1 >= 0 && k2 >= 0) {
        all.filters[k1][k2] = { ...all.filters[k1][k2], ...data };
    }
    return all;
};
