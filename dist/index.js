"use strict";
const similarityForm = document.querySelector("form");
const input1 = document.getElementById("string1");
const input2 = document.getElementById("string2");
const similarityResult = document.getElementById("similarity-result");
similarityForm === null || similarityForm === void 0 ? void 0 : similarityForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue1 = input1.value.toLowerCase();
    const inputValue2 = input2.value.toLowerCase();
    if (inputsValidator(inputValue1, inputValue2)) {
        const inputArray1 = inputValue1.split(" ");
        const inputArray2 = inputValue2.split(" ");
        const unionArray = new Set([...inputArray1, ...inputArray2]);
        const vector1 = [];
        const vector2 = [];
        unionArray.forEach((e) => {
            inputArray1.includes(e) ? vector1.push(1) : vector1.push(0);
            inputArray2.includes(e) ? vector2.push(1) : vector2.push(0);
        });
        const similartyRate = getDotProduct(vector1, vector2) /
            (getMagnitude(vector1) * getMagnitude(vector2));
        if (similarityResult) {
            similarityResult.innerText = `similarity rate is ${similartyRate}%`;
        }
    }
});
function inputsValidator(str1, str2) {
    let regex = /^[(a-zA-Zء-ي\d)]+(?: [a-zA-Zء-ي\d',.-]+)*$/;
    if (!regex.test(str1) || !regex.test(str2)) {
        alert("Enter A Valid Task Please ! \n only characters and numbers allowed");
        return false;
    }
    return true;
}
function getDotProduct(arr1, arr2) {
    let doProductResult = 0;
    for (let i = 0; i < arr1.length; i++) {
        doProductResult += arr1[i] * arr2[i];
    }
    return doProductResult;
}
function getMagnitude(arr) {
    let magnitudeResult = arr.reduce((prev, curr) => prev + Math.pow(curr, 2), 0);
    input1.value = "";
    input2.value = "";
    return Math.sqrt(magnitudeResult);
}
