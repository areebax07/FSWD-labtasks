let num = 11;
let next = num + 1;

while (true) {
    let prime = true;

    for (let i = 2; i < next; i++) {
        if (next % i == 0) {
            prime = false;
            break;
        }
    }

    if (prime) {
        console.log(next);
        break;
    }

    next++;
}