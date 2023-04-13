let apiBaseUrl = `https://api.breakingbadquotes.xyz/v1/`;
let quotes = "quotes/5";
let characterName = "?name=";
let quoteName = "quote?author=";
let quoteRandom = "quotes/5";
let seriesWrapper = document.querySelector(".quotes-data");

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
    let randomButtons = document.querySelectorAll(".btn");
    randomButtons.forEach((button) => {
      button.addEventListener("click", () => {
        let buttonCategory = button.closest("form");
        buttonCategory.classList.contains("form-quotes") ? quoteRandoms() : "";
      });
    });
  }
  
getRandom();

function controlLoader(status = "close") {
  status == "close"
    ? document.querySelector(".loader").classList.add("close")
    : document.querySelector(".loader").classList.remove("close");
}