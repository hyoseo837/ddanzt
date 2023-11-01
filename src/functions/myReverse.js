function myReverse(array) {
    let tmp = [];
    for (let i = 0; i < array.length; i++) {
        tmp.unshift(array[i]);
    }
    return tmp;
}

export default myReverse;
