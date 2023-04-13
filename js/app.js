/*
    Variables
*/
// Base Url For The Api
let apiBaseUrl = `https://api.breakingbadquotes.xyz/v1/`;
// Endpoints
let quotes = "quotes";
// Character Queries
let characterName = "?name=";
let quoteName = "quote?author=";
let quoteRandom = "quotes/1";
let seriesWrapper = document.querySelector(".series-data");

// Create Header
function createHeader() {
  if (document.querySelector(".header")) {
    return;
  } else {
    return (
      document.body.insertAdjacentHTML(
        "afterbegin",
        `
      <header class="header">
        <div class="logo">
            <a href="index.html">
                <h3>Breaking Bad</h3>
            </a>
        </div>
      </header>
    `
      )
      );
  }
}

// Build Quote HTML Structure Function
function buildQuotes(data) {
  return `
  <div class="quote" id="${data.quote_id}">
    <div class="quote-text">
        <h3>
            ${data.quote}
        </h3>
    </div>
    <div class="quote-info">
        <span class="quote-author">${data.author}</span>
    </div>
  </div>
  `;
}

async function quotesData(
  fetchMethod = `${quotes}`,
  wrapper = seriesWrapper,
) {
  try {
    let response = await fetch(`${apiBaseUrl}${fetchMethod}`);
    if (response.status == 200) {
      let data = await response.json();
      wrapper.innerHTML = "";
      if (data == "") {
        wrapper.innerHTML = noData();
        controlLoader();
      } else {
        data.forEach((element) => {
          wrapper.innerHTML += buildQuotes(element);
        });
        controlLoader();
      }
    }
  } catch (err) {
    wrapper.classList.add("no-grid");
    controlLoader();
  }
}

async function quoteRandoms() {
  controlLoader("!close");
  quotesData((fetchMethod = `${quoteRandom}`));
}

function getRandom() {
  // Random Buttons
  let randomButtons = document.querySelectorAll(".btn-random");
  randomButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let buttonCategory = button.closest("form");
      // Get Random Character
      buttonCategory.classList.contains("form-characters")
        ? characterRandoms()
        : "";
      // Get Random Episode
      buttonCategory.classList.contains("form-episodes")
        ? episodeRandoms()
        : "";
      // Get Random quote
      buttonCategory.classList.contains("form-quotes") ? quoteRandoms() : "";
      // Get Random Dead Character
      buttonCategory.classList.contains("form-dead-characters")
        ? deadCharacterRandoms()
        : "";
    });
  });
}
getRandom();

// Toggle Loading Animation
function controlLoader(status = "close") {
  // controlLoader() || controlLoader(close) ==> Close Loader
  // controlLoader(!close) ==> Open Loader
  status == "close"
    ? document.querySelector(".loader").classList.add("close")
    : document.querySelector(".loader").classList.remove("close");
}

function selectedForDetails(id, destination, type, query = "") {
  sessionStorage.setItem("id", id);
  sessionStorage.setItem("type", type);
  sessionStorage.setItem("query", query);
  window.location = destination;
  return false;
}

// Loop And Remove Classes.
function activeClasses(array, className) {
  array.forEach((element) => {
    element.classList.remove(className);
  });
}