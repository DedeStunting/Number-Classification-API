const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS middleware
app.use(cors());

// Enable JSON middleware
app.use(express.json());

// Helper function to check if a number is prime
function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

// Helper function to check if a number is a perfect number
function isPerfect(num) {
  let sum = 0;
  for (let i = 1; i <= num / 2; i++) {
    if (num % i === 0) sum += i;
  }
  return sum === num;
}

// Helper function to check if a number is Armstrong
function isArmstrong(num) {
  const digits = num.toString().split('');
  const sum = digits.reduce((acc, digit) => acc + Math.pow(Number(digit), digits.length), 0);
  return sum === num;
}

// Function to calculate the digit sum
function digitSum(num) {
  return num.toString().split('').reduce((acc, digit) => acc + Number(digit), 0);
}

// Function to fetch a fun fact from Numbers API
async function getFunFact(num) {
  try {
    const response = await axios.get(`http://numbersapi.com/${num}?json`);
    return response.data.text;
  } catch (error) {
    console.error(`Error fetching fun fact: ${error.message}`);
    return 'No fun fact available.';
  }
}

// Main API endpoint
app.get('/api/classify-number', async (req, res) => {
  const number = Number(req.query.number);

  // Validate input
  if (isNaN(number) || !Number.isInteger(number)) {
    return res.status(400).json({ number: req.query.number, error: true });
  }

  // Determine number properties
  const properties = [];
  if (isArmstrong(number)) properties.push('armstrong');
  properties.push(number % 2 === 0 ? 'even' : 'odd');

  // Fetch fun fact
  const funFact = await getFunFact(number);

  // Construct response
  const response = {
    number,
    is_prime: isPrime(number),
    is_perfect: isPerfect(number),
    properties,
    digit_sum: digitSum(number),
    fun_fact: funFact
  };

  return res.json(response);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
