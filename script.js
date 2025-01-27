let getFactBtn = document.getElementById("get-fact-btn");
let ranFactBtn = document.getElementById("get-rand-fact-btn");
let fact = document.querySelector(".fact");

// Use AllOrigins proxy to bypass CORS restrictions
let url = "https://api.allorigins.win/get?url=" + encodeURIComponent("http://numbersapi.com/");

let fetchFact = (num) => {
  // Create the full URL to fetch the fact
  let finalUrl = num ? `${url}${num}/trivia` : `${url}random/trivia`;

  // Fetch the fact
  fetch(finalUrl)
    .then((resp) => resp.json()) // Get JSON response
    .then((data) => {
      let factData = data.contents; // Extract fact from response
      fact.style.display = "block";
      fact.innerHTML = `<h2>${num === "random" ? "Random" : num}</h2><p>${factData}</p>`;
      document.querySelector(".container").append(fact);
    })
    .catch((err) => {
      // If error occurs, show a message
      fact.style.display = "block";
      fact.innerHTML = `<p class="msg">An error occurred: ${err.message}</p>`;
    });
};

// Get fact based on user input
let getFact = () => {
  let num = document.getElementById("num").value;
  if (num) {
    if (num >= 0 && num <= 300) {
      fetchFact(num); // Fetch fact for the number
    }
    else {
      // Show a message if number is out of range
      fact.style.display = "block";
      fact.innerHTML = `<p class="msg"> Please enter a number between 0 to 300.</p>`;
    }
  }
  else {
    // Show a message if input is empty
    fact.style.display = "block";
    fact.innerHTML = `<p class="msg">The input field cannot be empty</p>`;
  }
};

// Get random fact
let getRandomFact = () => {
  let num = Math.floor(Math.random()*301);
  fetchFact(num);
};

getFactBtn.addEventListener("click", getFact); // Event listener for the 'Get Fact' button
ranFactBtn.addEventListener("click", getRandomFact); // Event listener for the 'Get Random Fact' button
