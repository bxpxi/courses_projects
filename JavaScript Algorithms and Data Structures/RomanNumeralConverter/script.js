const input = document.getElementById("number");
const btn = document.getElementById("convert-btn");
const output = document.getElementById("output");

const arabicToRoman=(num)=>{
  const numbers = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const roman = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
  let romanizedNumerals = '';
  numbers.forEach((number, i) => {
    while (number <= num) {
      romanizedNumerals += roman[i];
      num -= number;
    }
  });
  return romanizedNumerals;
}

btn.addEventListener("click", ()=>{
  const inputValue = input.value;
  if (inputValue.length === 0) {
    return output.innerHTML = "Please enter a valid number";
  }
  if(inputValue<1){
    return output.innerHTML = "Please enter a number greater than or equal to 1";
  }
  if(inputValue>3999){
    return output.innerHTML = "Please enter a number less than or equal to 3999";
  }
  output.innerHTML=arabicToRoman(inputValue);
  input.value="";
});
