const getProbs = (lv) => {
    const UPGRADE_PROBS = [
        100, 100, 100, 95, 95, 95, 90, 90, 85, 85, 80, 80, 80, 75, 75, 75, 70,
        70, 70, 65, 65, 60, 60, 55, 50, 45, 40, 35, 30, 20,
    ];
    return UPGRADE_PROBS[lv];
};

const getPrice = (lv) => {
    if (lv === 0) {
        return 0;
    }
    return Math.round(1.4 ** (lv - 1));
};

const upgrade = (lv) => {
    if (Math.random() * 100 <= getProbs(lv)) {
        return "success";
    } else {
        return "fail";
    }
};

export { upgrade, getProbs, getPrice };
