import React, { useState, useEffect } from "react";
import PivotTableUI from "react-pivottable/PivotTableUI";
import "react-pivottable/pivottable.css";
import Papa from "papaparse";

const PivotTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/mokeData.csv");
      const csvData = await response.text();
      const parsedData = Papa.parse(csvData, {
        header: true,
        dynamicTyping: true,
      });

      setData(parsedData.data);
    };

    fetchData();
  }, []);

  return (
    <div className={PivotTable}>
      <h2>Pivot Table</h2>
      <PivotTableUI
        data={data}
        onChange={(s) => console.log(s)}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};

export default PivotTable;
