import React, { useEffect, useState } from 'react'
import ConverterSelcted from './ConverterSelcted'
const ConverterFrom = () => {
    const [amount, setAmount] = useState(100);
    const [fromCurrency, setfromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("INR");
    const [result, setresult] = useState("");


    // Swap currency
    const handelSwapCurrency = () => {
        setfromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    }
    const getExchangeRate = async () => {
        const API_KEY = import.meta.env.VITE_API_KEY;
         console.log("API_KEY from .env: ", API_KEY); // This should print your actual API key if loaded correctly

        const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}`;
        
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
    
            const data = await response.json();
            console.log(data); // Check the response structure
            const rate = (data.conversion_rate* amount).toFixed(2);
            setresult(`${amount} ${fromCurrency} = ${rate} ${toCurrency}`);
            console.log(rate);
            
        } catch (error) {
            console.error("Failed to fetch exchange rates:", error.message);
        }
    };
    
// Form submit
const handelformSubmit = (e) => {
    e.preventDefault();
   getExchangeRate();
}

  return (
<form className="converter-form" onSubmit={handelformSubmit}>
        <div className="form-group">
          <label className="form-label">Enter Amount </label>
          <input
            type="number"
            className="form-input"
            placeholder="Enter amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group form-currency-group">
          <div className="form-section">
            <label className="form-label">From</label>
            <ConverterSelcted
            selectedCurrency={fromCurrency}
            handelCurrency={e => setfromCurrency(e.target.value)}
            />
          </div>

          <div className="swap-icon" onClick={handelSwapCurrency}>
            <svg
              width="16"
              viewBox="0 0 20 19"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.13 11.66H.22a.22.22 0 0 0-.22.22v1.62a.22.22 0 0 0 .22.22h16.45l-3.92 4.94a.22.22 0 0 0 .17.35h1.97c.13 0 .25-.06.33-.16l4.59-5.78a.9.9 0 0 0-.7-1.43zM19.78 5.29H3.34L7.26.35A.22.22 0 0 0 7.09 0H5.12a.22.22 0 0 0-.34.16L.19 5.94a.9.9 0 0 0 .68 1.4H19.78a.22.22 0 0 0 .22-.22V5.51a.22.22 0 0 0-.22-.22z"
                fill="#fff"
              />
            </svg>
          </div>
          <div className="form-section">
            <label className="form-label">To</label>
            <ConverterSelcted
            selectedCurrency={toCurrency}
            handelCurrency={e => setToCurrency(e.target.value)}
            />
          </div>
        
        </div> 
         <button type="submit"  className="submit-button">Get Exxhange Rate</button>
        <p className="exchange-rate-result">
            {result}
        </p>
      </form>
  )
}

export default ConverterFrom
