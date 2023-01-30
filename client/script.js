// create html structure
let rootElement = document.getElementById("root");
rootElement.insertAdjacentHTML("beforeend", 
`<article class="widget">` +
`<div class="weather data">`+
    `<div class="left">` +
        `<div class="temperature">` +
            `<span id="cur-degree">35</span>&deg` +
        `</div>`+
    `</div>`+
    `<div class="right">` +
        `<div class="info-group">` +
            `<div class="lable">Cloudy</div>` +
            `<span id="data-current-clo">100&#37</span>` +
        `</div>`+
        `<div class="info-group">` +
            `<div class="lable">Wind</div>` +
            `<span id="data-current-wind">9kph</span>` +
        `</div>`+
        `<div class="info-group">` +
        `<div class="lable">Direction</div>` +
        `<span id="data-current-winddir">SW</span>` +
        `</div>`+
        `<div class="info-group">` +
        `<div class="lable">Humidity</div>` +
        `<span id="data-current-hum">70&#37</span>` +
        `</div>`+
        `<div class="info-group">` +
        `<div class="lable">Pressure</div>` +
        `<span id="data-current-pres">30.45in</span>` +
        `</div>`+
        `<div class="info-group">` +
        `<div class="lable">Air</div>` +
        `<span id="data-current-air">277.0co</span>` +
        `</div>`+
    `</div>`+
`</div>` +
`<div class="weather date">` +
    `<div class="local-time">` +
        `<span id="cur-date">2023.01.29</span>` +
        `<span id="cur-time">1:02</span>` +
    `</div>`+
`</div>` +
`<div class="input-section">` +
    `<div class="icon">`+
        `<img id="img" src="//cdn.weatherapi.com/weather/64x64/day/116.png">` +
    `</div>`+
    `<div class="location">`+
        `<span id="cur-location">Vienna</span>` +
    `</div>`+
    `<div class="location text">`+
        `<span id="cur-condition">Partly cloudy</span>` +
    `</div>`+
    `<div class="input">`+
            `<input placeholder="Search..." list="city-list" class="city-input"></input>` +
            `<button type="submit" class="search"><i class="fa-solid fa-magnifying-glass"></i></button>` +
            `<div hidden id="spinner"></div>` +
            `<datalist id="city-list"></datalist>` +
`</div>`+
`</article>`);

const loadEvent = function() {

    // dummy data
    setWeatherForecast("vienna");

    let input = document.querySelector(".city-input");
    let dataListElement = document.getElementById("city-list");

    input.addEventListener("input", e => {
        let val = e.target.value

        // clear options
        if (val.length < 3) {
            dataListElement.innerHTML = "";
        }

        // autocomplete 3 Letters
        if (val.length >= 3) {  
             // search cities  
             let options = Object.keys(cities).filter((key) => key.toLowerCase().startsWith(e.target.value.toLowerCase()));
            
            for (let option of options) {
                // load option
                if (!dataListElement.innerHTML.includes(option)) {
                    dataListElement.insertAdjacentHTML('beforeEnd', `<option value="${option}"/>`);
                }
            }  
        } 
    });

    // search
    let searchButton = document.querySelector(".search");
    searchButton.addEventListener("click", () => {

        // spinner for loading
        spinner.removeAttribute('hidden');
        fetch('https://www.mocky.io/v2/5185415ba171ea3a00704eed?mocky-delay=500ms')
            .then(response => response.json())
            .then(data => {

        spinner.setAttribute('hidden', '');
        setWeatherForecast(document.querySelector(".city-input").value);
        });
    })
};

// get data
const setWeatherForecast = (city) => {
        fetch(`https://api.weatherapi.com/v1/current.json?key=70d9089949764be5abe204549232601&q=${city}&aqi=yes`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    document.getElementById("cur-condition").innerText = "Ups...we can not find this country";
                }})
            .then((data) => {

                // insert weather data 
                document.getElementById("cur-degree").innerText = data.current["temp_c"];
                document.getElementById("data-current-clo").innerHTML = `${data.current.cloud} &#37`;
                document.getElementById("data-current-wind").innerHTML = `${data.current["wind_kph"]} kph`;
                document.getElementById("data-current-winddir").textContent = data.current["wind_dir"];
                document.getElementById("data-current-hum").textContent = data.current["humidity"] + " %";
                document.getElementById("data-current-pres").textContent = data.current["pressure_in"].toFixed(2) + " in";
                document.getElementById("data-current-air").textContent = data.current["air_quality"]["co"].toFixed(1) + " co";

                // insert date
                let date = data.location.localtime.split(" ");
                document.getElementById("cur-date").textContent = date[0].replace(/-/g, ".");
                document.getElementById("cur-time").textContent = date[1];

                // input
                document.getElementById("cur-location").textContent = data.location.name;
                document.getElementById("img").src = data.current.condition.icon;
                document.getElementById("cur-condition").textContent = data.current.condition.text;
        });
}

window.addEventListener("load", loadEvent);





