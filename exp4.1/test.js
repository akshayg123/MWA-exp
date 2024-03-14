function find_sum(arr) {
    let s = 0;
    for (let i = 0; i < arr.length; i++) {
        s += arr[i];
    }
    return s;
}

function bsort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter numbers separated by comma: ", function(input) {
    let numbers = input.split(',').map(Number);
    
    let sum = find_sum(numbers);
    console.log("Sum:", sum);

    let sorted = bsort(numbers.slice());
    console.log("Sorted:", sorted);

    rl.close();
});
