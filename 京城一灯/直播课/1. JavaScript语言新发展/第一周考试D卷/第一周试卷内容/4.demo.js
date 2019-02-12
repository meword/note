const arr = [4, 4, 5, 6, 7, 8];
arr[Symbol.iterator] = function* () {
    let idx = 1
    console.table(this);
    do {
        yield this[idx];
    } while ((idx += 2) < this.length)
}

for (const v of arr) {
    console.log(v);
}