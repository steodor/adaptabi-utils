const performance = {
    events: [],
    push: name => performance.events.push({ name, time: Date.now() }),
    log: ({ includeTimestamp } = { includeTimestamp: false }) => {
        let start = performance.events[0].time;
        console.groupCollapsed(`Performance events: [ name ${includeTimestamp ? '| time' : ''} | since init | since previous event ] - times in ms`);
        performance.events.map((e, i) => {
            let fields = [e.name, e.time - start, i > 0 ? e.time - performance.events[i - 1].time : 0];
            if (includeTimestamp) {
                fields.splice(1, 0, e.time);
            }
            console.log('[', fields.join(' | '), ']');
        });
        console.groupEnd();
    },
};

performance.push('init');

export default performance;
