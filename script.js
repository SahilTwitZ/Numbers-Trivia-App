let getFactBtn = document.getElementById("get-fact-btn");
let ranFactBtn = document.getElementById("get-rand-fact-btn");
let fact = document.querySelector(".fact");

let fetchFact = (num) => {
    // Using the Numbers API with JSON endpoint and JSONP
    let finalUrl = `http://numbersapi.com/${num}/math?json`;
    
    fetch(finalUrl)
        .then((response) => response.json())
        .then((data) => {
            fact.style.display = "block";
            fact.innerHTML = `<h2>${num}</h2>
            <p>${data.text}</p>`;
            document.querySelector(".container").append(fact);
        })
        .catch((error) => {
            // If the first API fails, try a backup API
            fetch(`https://api.math.tools/numbers/nod/${num}`)
                .then((response) => response.json())
                .then((data) => {
                    fact.style.display = "block";
                    fact.innerHTML = `<h2>${num}</h2>
                    <p>Number ${num} has ${data.result} divisors.</p>`;
                })
                .catch((err) => {
                    fact.style.display = "block";
                    fact.innerHTML = `<p class="msg">Unable to fetch fact. Please try again later.</p>`;
                    console.error('Error:', err);
                });
        });
};

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