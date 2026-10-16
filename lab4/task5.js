function abs(...nums) {
    if (nums.length == 1) {
        return Math.abs(nums[0]);
    }

    return nums.map(Math.abs);
}

function ceil(...nums) {
    if (nums.length == 1) {
        return Math.ceil(nums[0]);
    }

    return nums.map(Math.ceil);
}

function floor(...nums) {
    if (nums.length == 1) {
        return Math.floor(nums[0]);
    }

    return nums.map(Math.floor);
}

console.log(abs(-4, -7));
console.log(ceil(4.2, 5.6));
console.log(floor(4.8, 5.9));