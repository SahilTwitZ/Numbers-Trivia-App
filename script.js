let getFactBtn = document.getElementById("get-fact-btn");
let ranFactBtn = document.getElementById("get-rand-fact-btn");
let fact = document.querySelector(".fact");

let fetchFact = (num) => {
    // Using API Ninjas Number Facts API
    const apiKey = 'XxUzAsORCcQZAT4ZXnEcEA==PDr6GpaQv4HHnM9p';
    
    fetch(`https://api.api-ninjas.com/v1/numberfact?number=${num}`, {
        headers: {
            'X-Api-Key': apiKey
        }
    })
        .then(response => response.json())
        .then(data => {
            fact.style.display = "block";
            fact.innerHTML = `<h2>${num}</h2>
            <p>${data.fact}</p>`;
            document.querySelector(".container").append(fact);
        })
        .catch(error => {
            // Fallback to generate mathematical facts if API fails
            const mathFact = generateMathFact(num);
            fact.style.display = "block";
            fact.innerHTML = `<h2>${num}</h2>
            <p>${mathFact}</p>`;
        });
};

// Fallback function to generate mathematical facts
function generateMathFact(num) {
    const facts = [
        `${num} squared is ${num * num}`,
        `The square root of ${num} is approximately ${Math.sqrt(num).toFixed(2)}`,
        `${num} is a ${num % 2 === 0 ? 'even' : 'odd'} number`,
        `${num} factorial is ${calculateFactorial(num)}`,
        `${num} in binary is ${num.toString(2)}`,
        `The factors of ${num} are: ${getFactors(num).join(', ')}`
    ];
    return facts[Math.floor(Math.random() * facts.length)];
}

function calculateFactorial(num) {
    if (num === 0) return 1;
    if (num > 20) return "too large to calculate";
    let result = 1;
    for (let i = 2; i <= num; i++) result *= i;
    return result;
}

function getFactors(num) {
    const factors = [];
    for (let i = 1; i <= num; i++) {
        if (num % i === 0) {
            factors.push(i);
        }
    }
    return factors;
}

let getFact = () => {
    let num = document.getElementById("num").value;
    if (num) {
        if (num >= 0 && num <= 300) {
            fetchFact(num);
        }
        else {
            fact.style.display = "block";
            fact.innerHTML = `<p class="msg"> Please enter a number between 0 to 300.</p>`;
        }
    }
    else {
        fact.style.display = "block";
        fact.innerHTML = `<p class="msg">The input field cannot be empty</p>`;
    }
};

let getRandomFact = () => {
    let num = Math.floor(Math.random()*301);
    fetchFact(num);
};

getFactBtn.addEventListener("click", getFact);
ranFactBtn.addEventListener("click", getRandomFact);