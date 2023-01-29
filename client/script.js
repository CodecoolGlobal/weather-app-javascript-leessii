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
            `<span id="data-current-clo">100<span class="value-sub-info">&#37</span></span>` +
        `</div>`+
        `<div class="info-group">` +
            `<div class="lable">Wind</div>` +
            `<span id="data-current-wind">9<span class="value-sub-info">kph</span></span>` +
        `</div>`+
        `<div class="info-group">` +
        `<div class="lable">Direction</div>` +
        `<span id="data-current-winddir">SW</span>` +
        `</div>`+
        `<div class="info-group">` +
        `<div class="lable">Humidity</div>` +
        `<span id="data-current-hum">70<span class="value-sub-info">&#37</span></span>` +
        `</div>`+
        `<div class="info-group">` +
        `<div class="lable">Pressure</div>` +
        `<span id="data-current-pres">30.45<span class="value-sub-info">in</span></span>` +
        `</div>`+
        `<div class="info-group">` +
        `<div class="lable">Air</div>` +
        `<span id="data-current-air">277.0<span class="value-sub-info">co</span></span>` +
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
        `<datalist id="city-list"></datalist>` +
    `</div>`+
`</div>`+
`</article>`);

const loadEvent = function() {

    // dummy data
    fetch(`http://api.weatherapi.com/v1/current.json?key=70d9089949764be5abe204549232601&q=vienna&aqi=yes`)
        .then((response) => response.json())
        .then((data) => {

            // weather data 
            document.getElementById("cur-degree").innerText = data.current["temp_c"];
            document.getElementById("data-current-clo").textContent = data.current.cloud;
            document.getElementById("data-current-wind").textContent = data.current["wind_kph"];
            document.getElementById("data-current-winddir").textContent = data.current["wind_dir"];
            document.getElementById("data-current-hum").textContent = data.current["humidity"];
            document.getElementById("data-current-pres").textContent = data.current["pressure_in"].toFixed(2);
            document.getElementById("data-current-air").textContent = data.current["air_quality"]["co"].toFixed(1);

            // date
            let date = data.location.localtime.split(" ");
            document.getElementById("cur-date").textContent = date[0].replace(/-/g, ".");
            document.getElementById("cur-time").textContent = date[1];

            // input
            document.getElementById("cur-location").textContent = data.location.name;
            document.getElementById("img").src = data.current.condition.icon;
            document.getElementById("cur-condition").textContent = data.current.condition.text;
    });

    // autocomplete 3 Letters
    let input = document.querySelector(".city-input");
    input.addEventListener("input", (e)=> {
        if (e.target.value.length === 3) {
            fetch(`https://api.weatherapi.com/v1/current.json?key=70d9089949764be5abe204549232601&q=${e.target.value}&aqi=yes`)
                .then((response) => response.json())
                .then((data) => {
                    
                    // get options
                    let dataListElement = document.getElementById("city-list");
                    dataListElement.insertAdjacentHTML("beforeend", `<option value="${data.location.name}">`);

                    // insert weather data 
                    document.getElementById("cur-degree").innerText = data.current["temp_c"];
                    document.getElementById("data-current-clo").textContent = data.current.cloud;
                    document.getElementById("data-current-wind").textContent = data.current["wind_kph"];
                    document.getElementById("data-current-winddir").textContent = data.current["wind_dir"];
                    document.getElementById("data-current-hum").textContent = data.current["humidity"];
                    document.getElementById("data-current-pres").textContent = data.current["pressure_in"].toFixed(2);
                    document.getElementById("data-current-air").textContent = data.current["air_quality"]["co"].toFixed(1);

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
    });
};

window.addEventListener("load", loadEvent);




