// VERSION A

"use strict";

// 1A
function filterSingleOccurrence(originalArray) {
  const uniqueArray = [];
  const counter = {}; // the object that will hold encountered elements as keys
  let uniqueIndex = 0;
  // count occurrences
  for (let i = 0; i < originalArray.length; i++) {
    const num = originalArray[i];
    if (num in counter) { // update counter when seen num before
      counter[num]++;
    } else { // initialize count when seeing num for first time
      counter[num] = 1;
    }
  }
  // build unique array, iterate over elements of original
  for (let n of originalArray) {
    const count = counter[n];
    // avoiding including elements that occur more than once in new array
    if (count === 1) {
      // parsing string key to int before adding to array
      uniqueArray[uniqueIndex] = +n;
      uniqueIndex++;
    }
  }
  return uniqueArray;
}

// 2A
function getPassedAndFailedAvgs(marks) {
  let sumFailed = 0;
  let sumPassed = 0;
  let countFailed = 0;
  let countPassed = 0;
  for (let i = 0; i < marks.length; i++) {
    const mark = marks[i];
    if (mark < 50) {
      sumFailed += mark;
      countFailed++;
    } else {
      sumPassed += mark;
      countPassed++;
    }
  }
  const avgFailed = (countFailed !== 0) ? sumFailed / countFailed : -1;
  const avgPassed = (countPassed !== 0) ? sumPassed / countPassed : -1;
  // rounding numbers using bit or
  const avgFailedRounded = (avgFailed % 1 < 0.5) ? avgFailed | 0 : avgFailed + 1 | 0;
  const avgPassedRounded = (avgPassed % 1 < 0.5) ? avgPassed | 0 : avgPassed + 1 | 0;
  return [avgFailedRounded, avgPassedRounded];
}

// 3A
function validateDate(date) {
  const months = {
    "January": 31,
    "February": 28,
    "March": 31,
    "April": 30,
    "May": 31,
    "June": 30,
    "July": 31,
    "August": 31,
    "September": 30,
    "October": 31,
    "November": 30,
    "December": 31,
  };

  let hasSeenMonth = false;
  let month = "";
  let day = "";
  for (let char of date) {
    // checking for empty space
    if (char === ' ') {
      // checking to see that the month has been built
      if (month !== "") {
        hasSeenMonth = true;
      }
    } else if (!hasSeenMonth) { // composing the month
      month += char;
    } else { // composing the day
      day += char;
    }
  }


  // checking day is a number
  const validDigits = "0123456789";
  for (let i = 0; i < day.length; i++) {
    let digit = day[i];
    let isValidDigit = false;
    for (let validDigit of validDigits) {
      if (digit === validDigit) {
        // it is valid when the first element isn't zero
        if (i !== 0 || digit !== '0') {
          isValidDigit = true;
          break;
        }
      }
    }
    if (!isValidDigit) return false; // found invalidity in day
  }

  const intDay = +day;

  // date is valid when month is a valid key and the day is in the range of the value at this month
  return (month in months && intDay <= months[month]);
}

// 4A
function differenceOfDays(dateString1, dateString2) {
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);

  // getting the difference in days after converting from milliseconds to days
  const millisecondsDifference = date2 - date1;
  const daysDifference = millisecondsDifference / (1000 * 60 * 60 * 24);
  // always return the absolute value of the days difference
  return daysDifference > 0 ? daysDifference : -1 * daysDifference;

}

// 5A
function swapCharactersInString(sentence, c1, c2) { // seems like the * isn't recognize
  let updated = "";
  for (let char of sentence) {
    if (char === (c1 + '')) { // cast c1 as a string before comparing
      updated += c2;
    } else if (char === (c2 + '')) { // cast c2 as a string before comparing
      updated += c1;
    } else {
      updated += char;
    }
  }
  return updated;
}

// 6A
function moveLowerAndUpper(word) {
  const lowerAlphabet = "abcdefghijklmnopqurstuvwxyz";
  let upperCase = "";
  let lowerCase = "";
  // loop over the word and find uppercase letters
  for (let char of word) {
    let isLower = false;
    for (let lowerCaseChar of lowerAlphabet) {
      if (char === lowerCaseChar) {
        isLower = true;
        break;
      }
    }
    if (isLower) {
      lowerCase += char;
    } else {
      upperCase += char;
    }
  }
  return upperCase + lowerCase;
}

// 6A
function removeLeadingAndTrailingZeros(numberStr) {

  let startIndex = 0;
  let endIndex = 0;
  let seenStartDigit = false;
  let seenDecimal = false;
  for (let i = 0; i < numberStr.length; i++) {
    const current = numberStr[i]
    if (current === '.') {
      seenDecimal = true;
      // edge cases to keep in mind:
      // 0.1
      if (!seenStartDigit) {
        startIndex = i - 1;
        seenStartDigit = true;
      }
    } else if (!seenStartDigit && current !== '0') {
      seenStartDigit = true;
      startIndex = i;
      endIndex = i;
    } else if (seenStartDigit && !seenDecimal && current !== '.') {
      endIndex = i;
    } else if (seenStartDigit && seenDecimal && current !== '0') {
      endIndex = i;
    }

  }
  let cleanedNumber = "";
  for (let j = startIndex; j <= endIndex; j++) {
    cleanedNumber += numberStr[j];
  }
  return cleanedNumber;
}

// 8A
function sortArray(arr, criteria) {
  // Bubble Sort Algorithm being applied
  // making passes on the array
  while (criteria !== "None") {
    let swaps = 0;
    // perform a pass
    // loop until the second last element to be abel to compare with the element in the front of it
    for (let i = 0; i < arr.length - 1; i++) {
      // check for swapping based on the criteria
      if ((criteria === "Asc" && arr[i] > arr[i + 1]) || (criteria === "Des" && arr[i] < arr[i + 1])) {
        const temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        swaps++;
      }
    }
    // when finished a pass check how many swaps happened
    if (swaps === 0) {
      break;
    }
  }
  return arr;
}

// 9A
function findRepeatedCharacter(text) {
  // loop over each character in the text
  for (let i = 0; i < text.length; i++) {
    // nest loop and iterate over each character
    for (let j = i + 1; j < text.length; j++) {
      // compare the character from outer loop with character in inner loop
      // return when characters are the same and index is different
      if (text[i] === text[j]) {
        return text[i];
      }
    }
  }
  // return -1 when finished looping
  return '-1';
}

// A10
function capitalizeWordFirstLetter(sentence) {

  const lowerToUpper = {
    'a': 'A',
    'b': 'B',
    'c': 'C',
    'd': 'D',
    'e': 'E',
    'f': 'F',
    'g': 'G',
    'h': 'H',
    'i': 'I',
    'j': 'J',
    'k': 'K',
    'l': 'L',
    'm': 'M',
    'n': 'N',
    'o': 'O',
    'p': 'P',
    'q': 'Q',
    'r': 'R',
    's': 'S',
    't': 'T',
    'u': 'U',
    'v': 'V',
    'w': 'W',
    'x': 'X',
    'y': 'Y',
    'z': 'Z'
  }

  let newSentence = "";
  let prevChar = ' ';
  // loop over each character in the sentence string.
  for (let currChar of sentence) {
    // when the previous character is a space and
    // the current character isn't a space
    // add the capitalized character to the new string
    // when we don't capitalize, add the original character to the string
    if (prevChar === ' ' && currChar !== ' ' && currChar in lowerToUpper) {
      // check if we can capitalize the character
      newSentence += lowerToUpper[currChar];
    } else {
      newSentence += currChar;
    }
    // update the previous character
    prevChar = currChar;
  }
  // return new string
  return newSentence;
}
