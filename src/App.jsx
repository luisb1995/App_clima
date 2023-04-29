import { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [buscador, setBuscador] = useState("maracaibo");
  const [error, setError] = useState("");

  const getWeatherData = () => {
    const API_KEY = "b80caf5f2cd742b889000347232904";
    const API_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${buscador}&aqi=no`;

    setError("");
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setCity(data.location.name);
        setCountry(data.location.country);
        setTemperature(data.current.temp_c);
        setDescription(data.current.condition.text);
        setIcon(data.current.condition.icon);
      })
      .catch((error) => {
        setError(error);
      });
  };

  useEffect(() => {
    getWeatherData();
  }, []);

  function handlechange(event) {
    setBuscador(event.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    getWeatherData();
  }
  return (
    <main className="contenedor">
      <h1> Wheather App</h1>
      <section>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Escribe tu ciudad..."
            type="text"
            name="buscar"
            minLength="4"
            required={true}
            value={buscador}
            onChange={handlechange}
          />

          <button className="btn btn-primary" type="submit">
            Buscar
          </button>
        </form>
        {error ? (
          <h2>Error no se pudo encontrar</h2>
        ) : (
          <>
            <h2>
              {city && city},{country}
            </h2>
            <figure>
              <img src={icon} alt={city} />
            </figure>

            <h2>{temperature && temperature} °C</h2>

            <h2>{description && description}</h2>
          </>
        )}
      </section>
      <h3>
        {" "}
        Powered by{" "}
        <a href="https://www.weatherapi.com/" title="Free Weather API">
          WeatherAPI.com
        </a>
      </h3>
    </main>
  );
}

export default App;
