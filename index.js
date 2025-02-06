const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Enable CORS

// Helper function to check if a number is prime
function isPrime(num) {
    if (num <= 1) return false;  
    if (num === 2) return true;  
    if (num % 2 === 0) return false;  

    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        if (num % i === 0) return false;
    }
    return true;
}

// Helper function to check if a number is a perfect number
function isPerfect(num) {
    if (num <= 0) return false; // Perfect numbers are positive
    let sum = 0;
    for (let i = 1; i <= num / 2; i++) {
        if (num % i === 0) sum += i;
    }
    return sum === num;
}

// Helper function to check if a number is an Armstrong number
function isArmstrong(num) {
    if (num < 0) return false; // Armstrong numbers are only positive
    const digits = num.toString().split('');
    const sum = digits.reduce((acc, digit) => acc + Math.pow(Number(digit), digits.length), 0);
    return sum === num;
}

// Function to calculate the digit sum (absolute value for negative numbers)
function digitSum(num) {
    return Math.abs(num)
        .toString()
        .split('')
        .reduce((acc, digit) => acc + Number(digit), 0);
}

// Function to fetch a fun fact from Numbers API
async function getFunFact(num) {
    try {
        const response = await axios.get(`http://numbersapi.com/${num}?json`);
        return response.data.text;
    } catch (error) {
        return 'No fun fact available.';
    }
}

// Main API Endpoint
app.get('/api/classify-number', async (req, res) => {
    const { number } = req.query;

    // Validate input
    if (number === undefined || number.trim() === "") {
        return res.status(400).json({ error: true, number: "" });
    }

    const parsedNumber = Number(number);

    if (!Number.isInteger(parsedNumber)) {
        return res.status(400).json({ error: true, number });
    }

    const properties = [];
    if (isArmstrong(parsedNumber)) properties.push('armstrong');
    if (parsedNumber % 2 === 0) properties.push('even');
    else properties.push('odd');

    const funFact = await getFunFact(parsedNumber);

    const response = {
        number: parsedNumber,
        is_prime: isPrime(parsedNumber),
        is_perfect: isPerfect(parsedNumber),
        properties,
        digit_sum: digitSum(parsedNumber),
        fun_fact: funFact
    };

    return res.json(response);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
