const readline = require('readline');

function grade(marks) {
    if (marks > 90) {
        return 'A';
    } else if (marks >= 80) {
        return 'B';
    } else if (marks >= 70) {
        return 'C';
    } else if (marks >= 60) {
        return 'D';
    } else {
        return 'F';
    }
}

function avg(arr) {
    let s = 0;
    for (let i = 0; i < arr.length; i++) {
        s += arr[i];
    }
    return s / arr.length;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter the number of students: ", function(numStudents) {
    let arr = [];
    let count = 0;

    function getMarks() {
        rl.question("Enter marks for student " + (count + 1) + ": ", function(marks) {
            marks = parseFloat(marks);
            arr.push(marks);
            count++;
            if (count < numStudents) {
                getMarks();
            } else {
                rl.close();
                displayGrades(arr);
            }
        });
    }

    getMarks();
});

function displayGrades(arr) {
    console.log("\nGrades of Students:");
    for (let i = 0; i < arr.length; i++) {
        let g = grade(arr[i]);
        console.log("Student " + (i + 1) + ": " + g);
    }

    let averageGrade = grade(avg(arr));
    console.log("\nAverage Grade of the Class:");
    console.log("Average Grade: " + averageGrade);
}
