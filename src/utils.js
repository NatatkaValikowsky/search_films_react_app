const getCutText = (text, textLength) => {
    if (text.length <= textLength) return text;

    if (text[textLength - 1] === ' ') {
        return `${text.slice(0, textLength - 1)} ...`;
    }

    let finishSymbol = textLength - 1;
    while (text[finishSymbol] !== ' ') {
        finishSymbol -= 1;
    }

    return `${text.slice(0, finishSymbol)} ...`;
};

export default getCutText;
