const dropList = document.querySelectorAll('.drop-list select'),
fromCurrency = document.querySelector('.from select'),
toCurrency = document.querySelector('.to select'),
getButton = document.querySelector("form button");

for (var i = 0; i < dropList.length; i++) {
  for (var currency_code in country_list) {
     // selecting the defalut currencies
     let selected;
     if(i == 0){
       selected = currency_code == "USD" ? "selected" : "";
     }
     else if(i == 1){
       selected = currency_code == "INR" ? "selected" : "";
     }
     // creating option tag with passing currency code as a text and a value
     let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
     // inserting options tag inside select tag
     dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }
  dropList[i].addEventListener("change", e => {
    // calling function loadFlag with passing target element as an argument
    loadFlag(e.target);
  });
}

function loadFlag(element){
    for(let code in country_list){
        if(code == element.value){
            let imgTag = element.parentElement.querySelector("img");
            // passing country code of a selected currency code in a image url
            imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
        }
    }
}

getButton.addEventListener("click", e => {
  e.preventDefault(); // preventing form from submitting
  getExchangeRate();
});

const exchangeIcon = document.querySelector("form .icon");
exchangeIcon.addEventListener("click", () => {
  let tempCode = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = tempCode;
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  getExchangeRate();
});

function getExchangeRate(){
  const amount = document.querySelector(".amount input");
  const exchangeRateTxt = document.querySelector("form .exchange-rate");
  let amountVal = amount.value;
  // selecting 1 as the default value
  if(amountVal == "" || amountVal == "0"){
    amount.value = "1";
    amountVal = 1;
  }
  exchangeRateTxt.innerText = "Getting exchange rate...";
  let url = `https://v6.exchangerate-api.com/v6/f8a08af85c9ed507db739020/latest/${fromCurrency.value}`;
  // fetching api response and returning it with parsing into js obj
  // and in another then mothod recieving that obj
  fetch(url).then(response => response.json()).then(result => {
    let exchangeRate = result.conversion_rates[toCurrency.value];
    let totalExRate = (amountVal * exchangeRate).toFixed(2);
    exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`
    console.log(totalExRate);
  }).catch( () => {
    exchangeRateTxt.innerText = "Something went wrong";
  });
}

window.addEventListener("load", ()=>{
    getExchangeRate();
});
