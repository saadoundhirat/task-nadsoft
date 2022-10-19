import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [url, setUrl] = useState("https://restcountries.com/v3.1/all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (url) {
      setLoading(true);
      fetch(url)
        .then((res) => res.json())
        .then((data) => (data.length > 0 ? setData([...data]) : setData([])))
        .catch((err) => setError(err));
      setLoading(false);
    }
  }, [url]);

  const searchChangeHandler = (e) => {
    setSearch(e.target.value);
    if (e.target.value) {
      setUrl(`https://restcountries.com/v3.1/name/${e.target.value}`);
    } else {
      setUrl("https://restcountries.com/v3.1/all");
    }
  };

  if (loading) {
    return <h2> loading... </h2>;
  }

  if (error) {
    return <h2> there is an error {JSON.stringify(error)} </h2>;
  }

  return (
    <div className="App">
      <h1>Search countries </h1>
      <input
        id="countries"
        list="countries"
        type="text"
        value={search}
        onChange={(e) => searchChangeHandler(e)}
        autoComplete="on"
      />

      <datalist id="countries">
        {data.map((con, inx) => {
          return (
            <option key={inx}>
              {" "}
              <span>{con?.name.common}</span>{" "}
            </option>
          );
        })}
      </datalist>

      {data && (
        <ul l>
          {data.map((con, inx) => {
            return (
              <li key={inx}>
                {" "}
                <span>{con?.name.common}</span>{" "}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
