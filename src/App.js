import "./App.css";
import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_NAME": {
      return { ...state, fields: { ...state.fields, name: action.payload } };
    }
    case "CHANGE_CUISINE": {
      return { ...state, fields: { ...state.fields, cuisine: action.payload } };
    }
    case "CHANGE_RATING": {
      return { ...state, fields: { ...state.fields, rating: action.payload } };
    }
    case "CHANGE_PRICE": {
      return { ...state, fields: { ...state.fields, price: action.payload } };
    }
    case "CHANGE_DISTANCE": {
      return {
        ...state,
        fields: { ...state.fields, distance: action.payload },
      };
    }
    case "LOAD_DATA": {
      return { ...state, results: action.payload };
    }

    default: {
      return state;
    }
  }
};

const fieldNames = ["name", "cuisine", "rating", "price", "distance"];

function App() {
  const [state, dispatch] = useReducer(reducer, {
    fields: { name: "", cuisine: "", rating: 0, price: 0, distance: 0 },
    results: [],
  });
  return (
    <div className="App">
      <InputTable state={state} dispatch={dispatch} />
      <Results results={state.results} />
    </div>
  );
}

const Results = ({ results }) => {
  return (
    <table className={"output-table"}>
      <tbody>
        <tr>
          <th colSpan="2">{results[0] && <h3>Best Matches:</h3>}</th>
        </tr>
        <tr>
          {results[0] &&
            Object.keys(results[0]).map((key) => (
              <th key={key}>
                <h5>{key}</h5>
              </th>
            ))}
        </tr>
        {results.map((res) => (
          <tr key={res.name}>
            {Object.entries(res).map(([k, v]) => (
              <td key={k}>{v}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const InputTable = ({ state, dispatch }) => {
  return (
    <table className={"input-table"}>
      <tbody>
        <tr>
          <th colSpan="2">
            <h1>Restaurant Finder</h1>
          </th>
        </tr>
        <Fields fields={state.fields} dispatch={dispatch} />
        <tr>
          <td></td>
          <td>
            <button onClick={() => getDataFromApi(state.fields, dispatch)}>
              Search
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const Fields = ({ fields, dispatch }) => {
  return fieldNames.map((field) => (
    <tr key={field}>
      <td>{field}: </td>
      <td>
        <input
          type="text"
          value={fields[field]}
          onChange={(e) =>
            dispatch({
              type: "CHANGE_" + field.toUpperCase(),
              payload: e.target.value,
            })
          }
        />
      </td>
    </tr>
  ));
};

const getDataFromApi = async (fields, dispatch) => {

  const axios = require("axios");
  const results = await axios.get(
    `http://localhost:8080/restaurant/api/restaurants?rating=${fields.rating}&cuisine=${fields.cuisine}&distance=${fields.distance}&price=${fields.price}&name=${fields.name}`
  );
  if (!results.data.restaurants) {
    return;
  }
  dispatch({ type: "LOAD_DATA", payload: results.data.restaurants });
};

export default App;
