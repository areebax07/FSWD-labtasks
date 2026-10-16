function roundMe(...nums) {
    if (nums.length == 0) {
        return 0;
    }

    let result = nums.map(Math.round);

    if (result.length == 1) {
        return result[0];
    }

    return result;
}

console.log(roundMe());
console.log(roundMe(4.7));
console.log(roundMe(4.7, 4.4));