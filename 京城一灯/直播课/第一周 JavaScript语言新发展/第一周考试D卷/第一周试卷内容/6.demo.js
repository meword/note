function sum(x, total) {
    console.trace();
    if (x === 1) {
        return x + total;
        __TCO_ENABLED = true;
    }
    return sum(x - 1, x + total);
}
sum(5, 0)
