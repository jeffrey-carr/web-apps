export const debounce = <T extends Function>(cb: T, wait = 20) => {
    let h: ReturnType<typeof setTimeout>
    let callable = (...args: any) => {
        clearTimeout(h);
        h = setTimeout(() => cb(...args), wait);
    };
    return <T>(<any>callable);
};