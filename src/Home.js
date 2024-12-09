import React, { useState, useEffect } from "react";
import { HttpGet } from "./core/httpHelper";


const CurrencyList = [
  'AED', 'ARS', 'AUD', 'BGN', 'BRL', 'BSD', 'CAD', 'CHF', 'CLP', 'CNY', 'COP', 'CZK', 'DKK', 'DOP', 'EGP', 'EUR', 'FJD', 'GBP', 'GTQ', 'HKD', 'HRK', 'HUF', 'IDR', 'ILS', 'INR', 'ISK', 'JPY', 'KRW', 'KZT', 'MXN', 'MYR', 'NOK', 'NZD', 'PAB', 'PEN', 'PHP', 'PKR', 'PLN', 'PYG', 'RON', 'RUB', 'SAR', 'SEK', 'SGD', 'THB', 'TRY', 'TWD', 'UAH', 'USD', 'UYU', 'VND', 'ZAR'
];

export const Home = () => {
  const [currencyOne, setCurrencyOne] = useState("USD");
  const [currencyTwo, setCurrencyTwo] = useState("INR");
  const [amountOne, setAmountOne] = useState(1);
  const [amountTwo, setAmountTwo] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");

  useEffect(() => {
    // Get conversion rates and calculate based on currencie amounts
    const getConversionRates = async () => {
      let conversionRates = await HttpGet(currencyOne);
      let exchangeAmount = conversionRates?.rates[currencyTwo];
      let amtTwo =
        (amountOne >= 0 && (exchangeAmount * amountOne).toFixed(2)) || "";
      setAmountTwo(amtTwo);
      setExchangeRate(exchangeAmount);
    };
    getConversionRates();
  }, [currencyOne, currencyTwo, amountOne]);

  const handleCurrencyOneChange = (e) => {
    setCurrencyOne(e.target.value);
  };

  const handleCurrencyTwoChange = (e) => {
    setCurrencyTwo(e.target.value);
  };

  const handleAmountOneChange = (e) => {
    setAmountOne(e.target.value);
  };

  const toggleCurrency = () => {
    setCurrencyOne(currencyTwo);
    setCurrencyTwo(currencyOne);
  };

  const CurrencyOptions = () => {
    return CurrencyList.map((option, index) => (
      <option key={index}>{option}</option>
    ));
  };

  return (
    <>
      
        <div className="col-md-6 mx-auto">
          <div className="card ">
            <div className="card-header">
              <h1 className="card-title h3">Exchange Rate Calculator</h1>
              <p className="card-text">
                Choose the currency and the amounts to get the exchange rate
              </p>
            </div>
            <div className="card-body">
              <div className="row justify-content-md-center mb-4">
                <div className="col col-lg-3 currency ">
                  <select
                    className="w-50 p-2"
                    value={currencyOne}
                    onChange={handleCurrencyOneChange}
                  >
                    <CurrencyOptions />
                  </select>
                </div>
                <div className="col col-lg-3 currency">
                  <input
                    placeholder="0"
                    type="number"
                    className="w-100 border p-2 text-center"
                    value={amountOne}
                    onChange={handleAmountOneChange}
                  />
                </div>
              </div>

              <div className="row justify-content-md-center">
                <div className="col col-lg-3">
                  <button
                    className="btn btn-md btn-dark background-none border-0 toggle-currency"
                    onClick={toggleCurrency}
                  >
                    &#x0296E;
                  </button>
                </div>
                <div className="col col-lg-3">
                  <p className="rate text-end">
                    1 {currencyOne} = {exchangeRate} {currencyTwo}
                  </p>
                </div>
              </div>

              <div className="row justify-content-md-center mt-4">
                <div className="col col-lg-3 currency">
                  <select
                    className="w-50 p-2"
                    value={currencyTwo}
                    onChange={handleCurrencyTwoChange}
                  >
                    <CurrencyOptions />
                  </select>
                </div>
                <div className="col col-lg-3 currency">
                  <input
                    type="number"
                    className="w-100 p-2 border text-center"
                    value={amountTwo}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
     
    </>
  );
};