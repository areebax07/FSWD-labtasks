function phoneNumber(arr) {
    return "(" + arr.slice(0, 3).join("") + ") " +
        arr.slice(3, 6).join("") + "-" +
        arr.slice(6, 10).join("");
}

console.log(phoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]));