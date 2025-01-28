let getFactBtn = document.getElementById("get-fact-btn");
let ranFactBtn = document.getElementById("get-rand-fact-btn");
let fact = document.querySelector(".fact");

let fetchFact = (num) => {
    fetch(`https://numbersapi.p.rapidapi.com/${num}/math`, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '954ef36b54msh32fa03564487500p1bcce9jsnadbe72e93cde', // Sign up at rapidapi.com for free API key
            'X-RapidAPI-Host': 'numbersapi.p.rapidapi.com'
        }
    })
        .then(response => response.text())
        .then(data => {
            fact.style.display = "block";
            fact.innerHTML = `<h2>${num}</h2>
            <p>${data}</p>`;
            document.querySelector(".container").append(fact);
        })
        .catch(error => {
            console.error('Error:', error);
            fact.style.display = "block";
            fact.innerHTML = `<p class="msg">Unable to fetch fact. Please try again later.</p>`;
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