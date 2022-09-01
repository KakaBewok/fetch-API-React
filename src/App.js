import React, { useState, useEffect } from "react";
import Select from "react-select";

const App = () => {
  // setting state
  const [data, setData] = useState([]);
  const [showData, setShowData] = useState("");
  const [isShow, setIsShow] = useState(false);

  // styling dasar
  const styleBasic = {
    width: "70%",
    margin: "50px auto",
    fontFamily: "calibri",
    color: "black",
  };

  //   fungsi untuk hit API
  const getData = async () => {
    const berries = await fetch("https://pokeapi.co/api/v2/berry/");
    const values = await berries.json();
    let result = values.results.map((berry) => {
      return {
        label: berry.name,
        value: berry.name,
      };
    });

    // method localeCompare untuk mensortir agar urutan data menjadi ascending
    setData(result.sort((a, b) => a.label.localeCompare(b.label)));
  };

  //   hooks untuk merender fungsi getData()
  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = () => {
    setIsShow((state) => !state);
  };

  const handleChange = (value) => {
    setShowData(value);
  };

  //   fungsi untuk menampilkan UI
  return (
    <div>
      <div className="dropdownList" style={styleBasic}>
        <h1>{isShow ? showData : "..."}</h1>
        <button onClick={() => handleSubmit()} disabled={!showData}>
          {isShow ? "Hide" : "Show"}
        </button>
        <br />
        <br />
        <Select options={data} onChange={(e) => handleChange(e.value)} />
      </div>
    </div>
  );
};

export default App;
