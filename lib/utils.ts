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

const calculateRating = (tapCount: {
    correctTap: number;
    missedTap: number;
    wrongTap: number;
}) => {
    const totalTaps =
        tapCount.correctTap + tapCount.missedTap + tapCount.wrongTap;
    let ratingPercentage = 0;

    if (totalTaps > 0) {
        ratingPercentage = Math.round((tapCount.correctTap / totalTaps) * 100);
    }

    return ratingPercentage;
};


export { generateRandom, debounce, calculateRating }