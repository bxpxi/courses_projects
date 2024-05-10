const textInput = document.getElementById("text-input");
const checkBtn = document.getElementById("check-btn");
const resultElm = document.getElementById("result");

function palindrome(str) {
  var re = /[\W_]/g;
  var lowRegStr = str.toLowerCase().replace(re, '');
  var reverseStr = lowRegStr.split('').reverse().join(''); 
  return reverseStr === lowRegStr;
}

function addHtmlResult(text) {
    let elmHtml = document.createElement("p")
    elmHtml.innerText = text;
    elmHtml.style.backgroundColor='#F2F7F5';
    elmHtml.style.color='#021B12';
    elmHtml.style.padding=0;
    resultElm.innerHTML = "";
    resultElm.appendChild(elmHtml);
}

checkBtn.addEventListener('click', () => {
    let text = textInput.value;
    if (!text) {
        alert("Please input a value");
        return;
    }
    let result = text;
    result += palindrome(text) ? " is a palindrome." : " is not a palindrome.";
    addHtmlResult(result);
});
