export default () => window.performance && performance.now() || new Date().getTime();
