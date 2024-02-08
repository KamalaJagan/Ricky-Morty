import React, { useState, useEffect } from "react";
import PivotTableUI from "react-pivottable/PivotTableUI";
import "react-pivottable/pivottable.css";
import Papa from "papaparse";
import "./pivottable-custom.css";
import { TableRenderers } from "react-pivottable/TableRenderers";

const PivotTable = (props) => {
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
      <h2 className="">Pivot Table</h2>
      <PivotTableUI
        data={data}
        onChange={(s) => console.log(s)}
        style={{ cursor: "pointer" }}
        renderers={Object.assign({}, TableRenderers)}
        {...props}
      />
    </div>
  );
};

export default PivotTable;
