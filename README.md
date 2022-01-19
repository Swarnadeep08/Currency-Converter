# Currency-Converter
Calculate live currency and foreign exchange rates 💸. \
https://swarnadeep08.github.io/Currency-Converter/
\
In the JavaScript file (country-list.js), I stored all possible country code and their currency code as an object. Then in the script.js file, first, I created an options tag and added those currency codes inside each option tag using for-in loop and inserted these tags inside the select tag.
\
After this, I created a function and got the user-entered amount. Then I sent a get request to an exchange rate API ( https://www.exchangerate-api.com/ ) by passing the user selected “from” currency code. API returned an object of the all-country currency conversion rate of the user-selected “from” currency.
\
Then, I got the user selected “to” currency conversion rate, and then I calculate it with the user-entered amount and show it in the exchange rate text. Once it’s done, for swapping the currency codes, I just reversed the “from” currency to “to” currency and then call the function. For flags, I used countryflags.io API ( https://flagpedia.net/ ) to show the user-selected country flag.
