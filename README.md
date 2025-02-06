# Number Classification API 🚀
This API takes a number as input and returns its mathematical properties along with a fun fact.

# 🌍 Live API URL
👉 Base URL: https://number-classification-api-0.onrender.com/api/classify-number?number=371

# 📌 Features
✅ Accepts a number and returns:
Whether it's prime or not,
Whether it's a perfect number,
Whether it's an Armstrong number,
Its parity (even or odd),
The sum of its digits

# ⚙️ API Endpoint
GET /api/classify-number?number=371
✅ Successful Response (200 OK)

{
    "number": 371,
    "is_prime": false,
    "is_perfect": false,
    "properties": ["armstrong", "odd"],
    "digit_sum": 11,
    "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}

❌ Error Response (400 Bad Request)
{
    "number": "alphabet",
    "error": true
}


# 🛠️ Installation & Setup
Prerequisites
Node.js installed (node -v)
Git installed (git --version)
1️⃣ Clone the Repository
git clone https://github.com/dedestunting/number-classification-api.git
cd number-classification-api

2️⃣ Install Dependencies
npm install

3️⃣ Run Locally
node index.js
The server should now be running at:
http://localhost:3000/api/classify-number?number=371

