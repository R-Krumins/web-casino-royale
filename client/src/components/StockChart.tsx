import { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-stockcharts";

const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

// moved index.cs :root variables here
// because canvasJS is an entitled prick
const style = {
  primary: "white",
  accent1: "#7cb9e8",
  lighter: "#4b4d48",
  dark: "#3d3e3b",
  darker: "#373835",
  fontFamily: "Arial",
};

type Props = {
  symbol: string;
  fromDate: string;
  toDate: string;
};

function StockChart({ symbol, fromDate, toDate }: Props) {
  const [data, setData] = useState<any[] | null>(null);

  useEffect(() => {
    if (symbol === "") return;
    fetchData();
  }, [symbol]);

  async function fetchData() {
    const data = await fetch(
      `/api/stocks/${symbol}?from=${fromDate}&to=${toDate}`
    );
    const json = await data.json();

    const procData = json.data.map((x: any) => {
      return {
        x: new Date(x.date),
        y: x.close,
      };
    });
    setData(procData);
  }

  // options for chart - formating and data
  const options = {
    backgroundColor: style.lighter,
    charts: [
      {
        axisX: {
          lineThickness: 5,
          tickLength: 0,
          labelFormatter: function () {
            return "";
          },
          crosshair: { enabled: true, snapToDataPoint: true },
        },
        axisY: {
          prefix: "$",
          tickLength: 0,
          labelFontColor: style.primary,
        },
        data: [
          {
            name: "Price (in USD)",
            yValueFormatString: "$#,###.##",
            type: "area",
            dataPoints: data,
          },
        ],
      },
    ],
    navigator: {
      data: [
        {
          dataPoints: data,
          color: style.accent1,
        },
      ],
      slider: {
        minimum: new Date(fromDate),
        maximum: new Date(toDate),
      },
      backgroundColor: style.lighter,
    },

    rangeSelector: {
      buttonStyle: {
        backgroundColor: style.lighter,
        labelFontColor: style.primary,
        borderColor: style.primary,
        spacing: 10,
      },

      inputFields: {
        style: {
          backgroundColor: style.lighter,
          borderColor: style.primary,
          fontColor: style.primary,
        },
      },
    },
  };

  return data ? (
    <CanvasJSStockChart options={options} />
  ) : (
    <p>Loading chart...</p>
  );
}

export default StockChart;
