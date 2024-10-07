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

const calculateRating = (tapCountAny: any) => {
    const tapCount = typeof tapCountAny === 'string' ? JSON.parse(tapCountAny) : tapCountAny;
    const totalTaps =
        tapCount.correctTap + tapCount.missedTap + tapCount.wrongTap;
    let ratingPercentage = 0;

    if (totalTaps > 0) {
        ratingPercentage = Math.round((tapCount.correctTap / totalTaps) * 100);
    }

    return ratingPercentage;
};

const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

export { generateRandom, debounce, calculateRating, toBase64 }

