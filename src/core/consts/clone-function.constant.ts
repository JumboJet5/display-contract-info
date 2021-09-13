export const cloneFunction = <T extends Function>(fn: T) => fn.bind({});
