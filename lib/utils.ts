const generateRandom = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
};

const debounce = (func: Function, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;

    return (...args: any[]) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};


export { generateRandom, debounce }