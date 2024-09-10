const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const amountInput = document.getElementById('amount');
const convertBtn = document.getElementById('convertBtn');
const resultDisplay = document.getElementById('result');

const apiKey = 'TU_API_KEY';  // Reemplaza con tu propia API Key
const apiURL = 'https://api.exchangerate-api.com/v4/latest/HNL';

let currencies = [];

async function fetchCurrencies() {
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        currencies = Object.keys(data.rates);

        populateCurrencySelects();
    } catch (error) {
        console.error('Error fetching currencies:', error);
        alert('Error al obtener tipos de cambio.');
    }
}

function populateCurrencySelects() {
    currencies.forEach(currency => {
        const optionFrom = document.createElement('option');
        optionFrom.value = currency;
        optionFrom.textContent = currency;
        fromCurrencySelect.appendChild(optionFrom);

        const optionTo = document.createElement('option');
        optionTo.value = currency;
        optionTo.textContent = currency;
        toCurrencySelect.appendChild(optionTo);
    });
}

async function convertCurrency() {
    const amount = amountInput.value;
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    if (amount === '' || isNaN(amount)) {
        alert('Por favor, introduce una cantidad válida.');
        return;
    }

    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        const rate = data.rates[toCurrency] / data.rates[fromCurrency];

        const result = (amount * rate).toFixed(2);
        resultDisplay.textContent = `${amount} ${fromCurrency} = ${result} ${toCurrency}`;
    } catch (error) {
        console.error('Error converting currency:', error);
        alert('Error al realizar la conversión.');
    }
}

convertBtn.addEventListener('click', convertCurrency);
window.onload = fetchCurrencies;
