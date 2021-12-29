import React, { useState } from 'react';

const api = {
  key: "1c55bf8a58bc594ab198e08b8ba88db8",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [status, setStatus] = useState('');
  const [background, setBackground] = useState("cold");
 
  const search = async (evt) => {
    if (evt.key === "Enter") {
      let res = await fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`);
      let result = await res.json();
      setWeather(result);
      setQuery('');
      setStatus('resolved');
      changeBackground(result.main.temp);
    }
  }

  const changeBackground = (temps) => {
    (Math.round(temps) > 25) ? setBackground("warm") : setBackground("cold");
  }

  return (
    <div className={background}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(status === "resolved") ? (
          <DataBox {...weather} />
        ) : ('')}
      </main>
    </div>
  );
}

function DataBox(props) {

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date}, ${month} ${year}`
  }

  return(
    <div>
      <div className="location-box">
        <div className="location"> {props.name}, {props.sys.country} </div>
        <div className="date">{dateBuilder(new Date())}</div>
      </div>
      <div className="weather-box">
        <div className="temp">
          {Math.round(props.main.temp)}ºC
        </div>
        <div className="weather">{props.weather[0].main}</div>
      </div>
    </div>
  );
}

export default App;
