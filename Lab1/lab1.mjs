export const questionOne = (arr) => {
  let sum_of_cubes = 0;
  let isPrime = false;
  for (const element of arr) {
    sum_of_cubes += element ** 3;
  }
  for (let i = 2; i < sum_of_cubes; i++) {
    if (sum_of_cubes % i === 0) {
      isPrime = false;
      break;
    } else {
      isPrime = true;
    }
  }
  let result = {};
  result[sum_of_cubes] = isPrime;
  return result;
};

export const questionTwo = (numArray) => {
  let firstIndex;
  let lastIndex;
  let isAscending = true;
  for (let i = 0; i < numArray.length - 1; i++) {
    if (numArray[i + 1] < numArray[i]) {
      isAscending = false;
      firstIndex = i;
      break;
    }
  }
  if (!isAscending) {
    for (let i = numArray.length - 1; i >= 0; i--) {
      if (numArray[i] < numArray[i - 1]) {
        lastIndex = i;
        break;
      }
    }
  }
  if (isAscending) {
    return [true];
  } else return [false, firstIndex, lastIndex];
};

export const questionThree = (obj1, obj2) => {
  const keys = [...Object.keys(obj1), ...Object.keys(obj2)];
  return keys.reduce((result, key) => {
    result[key] = obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key);
    return result;
  }, {});
};

export const questionFour = (string) => {
  let result = [];
  let lines = string.split("\n");
  for (const element of lines) {
    result.push(element.split(","));
  }
  return result;
};

export const studentInfo = {
  firstName: "Maheshwarswami",
  lastName: "Hiremath",
  studentId: "20015431",
};
