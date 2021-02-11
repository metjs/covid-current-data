/* Selectors */
let confirmed = document.querySelector(".confirmed");
let recovered = document.querySelector(".recovered");
let critical = document.querySelector(".critical");
let deaths = document.querySelector(".deaths");
let lastUpdateInfo = document.querySelector(".last-update-info");
let button = document.querySelector(".btn-primary");
/* Selectors -end */
let covidData;


function checkLocalStorage() { 
    /*   
    data control when the page is loaded
    */
  if (localStorage.getItem("covidData") === null) {
    covidData = [];
    localStorage.setItem("covidData", JSON.stringify(covidData));
    confirmed.innerHTML = "0";
    critical.innerHTML = "0";
    recovered.innerHTML = "0";
    deaths.innerHTML = "0";
    lastUpdateInfo.innerHTML = "";
    button.innerHTML = "Get";
  } else {
    let dataFromLocalStorage = JSON.parse(localStorage.getItem("covidData"));

    confirmed.innerHTML = dataFromLocalStorage["confirmed"];
    critical.innerHTML = dataFromLocalStorage["critical"];
    recovered.innerHTML = dataFromLocalStorage["recovered"];
    deaths.innerHTML = dataFromLocalStorage["deaths"];
    lastUpdateInfo.innerHTML = dataFromLocalStorage["lastUpdate"];
    button.innerHTML = "Update";
  }
}


function setDataToLocalStorage(arr) {
  localStorage.setItem("covidData", JSON.stringify(arr));
}
async function getDataFromAPI() {
   
  const response = await fetch("https://covid-19-data.p.rapidapi.com/totals", {
    method: "GET",
    headers: {
      "x-rapidapi-key": "84d50e7fc1msh67e169cdfcdba58p152004jsnc49ca9bde3e9", // add your own key from https://rapidapi.com/Gramzivi/api/covid-19-data/endpoints
      "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
    },
  });
  const data = await response.json();
  return data;
}

button.addEventListener("click",btnClick);
function btnClick(e){
    getDataFromAPI().then((response) => setDataToLocalStorage(response[0]));
    
}

