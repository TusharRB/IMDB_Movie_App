
let SEARCH_TERM = "";
let API_KEY = "";

const searchButtonElement = document.getElementById("search");

searchButtonElement.addEventListener("click", () => {
  let apikeyValue = document.getElementById("api-key").value;
  let searchValue = document.getElementById("search-box").value;
  console.log(apikeyValue);
  if (apikeyValue !== "") {
    API_KEY = apikeyValue;
  } else {
    alert("Please enter valid API");
  }
  if (searchValue.length < 2) {
    document.querySelector(".warning").innerHTML = "";
    const warning = document.querySelector(".warning");

    //warning text
    warning.innerText = "Search term should be at least of 2 characters";

  } else {
    SEARCH_TERM = searchValue;
  }
  if (apikeyValue !== "" && searchValue.length >= 3) {
    fetchData();
  }
});

async function fetchData() {
  document.querySelector(".cards-container").innerHTML = "";
  let number = 0;
  const endPoint = `https://www.omdbapi.com/?s=${SEARCH_TERM}&apikey=${API_KEY}`;
  document.querySelector(".cards-container").style.display = "none";
  try {
    document.querySelector(".spinner-container").style.display = "flex";
    const response = await fetch(endPoint);
    const result = await response.json();
    try {
      console.log(result.Error);
      if (result.Error === "Invalid API key!") {
        const warningContainer = document.createElement("p");
        warningContainer.className = "api-failed";
        warningContainer.innerText =
          "You are entered incorrect API \uD83D\uDE13";
        document.querySelector(
        ".cards-container"
        ).style.display = "flex";
        document.querySelector(".spinner-container").style.display = "none";
        document.querySelector(".cards-container").appendChild(warningContainer);
        console.log("executed!");
        return;
      }else if (result.Error === "Movie not found!") {
        const warningContainer = document.createElement("p");
        warningContainer.className = "api-failed";
        warningContainer.innerText =
          "Movie Not Found \uD83D\uDE13";
        document.querySelector(".cards-container").style.display = "flex";
        document.querySelector(".spinner-container").style.display = "none";
        document
          .querySelector(".cards-container")
          .appendChild(warningContainer);
        console.log("executed!");
      }
    } catch (error) {console.log(error)}
    console.log(result);
    console.log(result.Search);
    result.Search.forEach((element) => {
      const card = document.createElement("div");
      card.className = "card";
      if (element.Poster === "N/A"){
        card.innerHTML = `<img src="poster.jpg" id="image-title" alt=""> 
            <div class="details">
                <p id="number">${(number = number + 1)}</p>
                <p id="movie-name">
                    ${element.Title}
                </p>
            </div>
                `;
      }else{
                card.innerHTML = `<img src="${
                  element.Poster
                }" id="image-title" alt=""> 
            <div class="details">
                <p id="number">${(number = number + 1)}</p>
                <p id="movie-name">
                    ${element.Title}
                </p>
            </div>
                `;
      }

      document.querySelector(".cards-container").appendChild(card);
    });
    document.querySelector(".spinner-container").style.display = "none";
    document.querySelector(".cards-container").style.display = "flex";
  } catch (error) {
    console.log(error);
  }
}
