/*~~~~~~~~$ main selectors $~~~~~~~~*/
const similarityForm = document.querySelector("form");
const input1 = document.getElementById("string1") as HTMLInputElement;
const input2 = document.getElementById("string2") as HTMLInputElement;
const similarityResult = document.getElementById("similarity-result");

similarityForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  /*~~~~~~~~$ [1] take values of inputs $~~~~~~~~*/
  const inputValue1 = input1.value.toLowerCase();
  const inputValue2 = input2.value.toLowerCase();

  if (inputsValidator(inputValue1, inputValue2)) {
    /*~~~~~~~~$ [2] do splite to both strings $~~~~~~~~*/
    const inputArray1: string[] = inputValue1.split(" ");
    const inputArray2: string[] = inputValue2.split(" ");

    /*~~~~~~~~$ [3] take union of tow inputs array $~~~~~~~~*/
    const unionArray = new Set([...inputArray1, ...inputArray2]);

    /*~~~~~~~~$ [4] compare union array with both of inputs arrays $~~~~~~~~*/
    const vector1: number[] = [];
    const vector2: number[] = [];

    unionArray.forEach((e) => {
      inputArray1.includes(e) ? vector1.push(1) : vector1.push(0);
      inputArray2.includes(e) ? vector2.push(1) : vector2.push(0);
    });

    /*~~~~~~~~$ [5] apply similarty algorithm (cosine) $~~~~~~~~*/
    const similartyRate: number =
      getDotProduct(vector1, vector2) /
      (getMagnitude(vector1) * getMagnitude(vector2));

    /*~~~~~~~~$ [6] display results $~~~~~~~~*/
    if (similarityResult) {
      similarityResult.innerText = `similarity rate is ${similartyRate}%`;
    }
  }
});

/*~~~~~~~~$ inputs validator function $~~~~~~~~*/
function inputsValidator(str1: string, str2: string): boolean {
  // regex support only english and arabic letters and numbers
  let regex = /^[(a-zA-Zء-ي\d)]+(?: [a-zA-Zء-ي\d',.-]+)*$/;

  if (!regex.test(str1) || !regex.test(str2)) {
    alert("Enter A Valid Task Please ! \n only characters and numbers allowed");
    return false;
  }
  return true;
}

/*~~~~~~~~$ find don product function $~~~~~~~~*/
function getDotProduct(arr1: number[], arr2: number[]): number {
  let doProductResult: number = 0;
  for (let i = 0; i < arr1.length; i++) {
    doProductResult += arr1[i] * arr2[i];
  }
  return doProductResult;
}

/*~~~~~~~~$ find magnitude function $~~~~~~~~*/
function getMagnitude(arr: number[]): number {
  let magnitudeResult = arr.reduce(
    (prev: number, curr: number) => prev + Math.pow(curr, 2),
    0
  );
  input1.value = "";
  input2.value = "";
  return Math.sqrt(magnitudeResult);
}
