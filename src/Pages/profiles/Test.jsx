import React from 'react'
const array = [1,2,3,4,5,6,7,8,9,10]

let result = [];
let temp = [];

array.forEach((item, index) => {
  if (temp.length === 4) {
      result.push(temp);
      temp = []
  }

  temp.push(item);

  if (index === array.length - 1) {
      result.push(temp);
      temp = []
  }
})

console.log(result);

const Test = () => {
  return (
    <div>{result[0]}</div>
  )
}

export default Test