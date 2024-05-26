import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-stockcharts";

const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

type Props = {
    symbol: string
    fromDate: string;
    toDate: string;
};

function StockChart({symbol, fromDate, toDate}: Props) {
  // IMPORTANT: right now chart is set to "area" type, but
  // data is configured for "candlestick" type
  // when a final decision is made on chart type,
  // data refactor is needed - "area" type only needs
  // short data for both chart parts
  const [data, setData] = useState({short: null, full: null})

    useEffect(() => {
      if(symbol === "") return;
      fetchData()
    }, [symbol]);

    async function fetchData() {
        const data = await fetch(`/api/stocks/${symbol}?from=${fromDate}&to=${toDate}`);
        const json = await data.json();
    
        const short: any = []; //for lower time scroll part
        const full: any = []; //for candlestick part
        
        json.data.forEach((i:any) => {
            const date  = new Date(i.date),
                  open  = Number(i.open),
                  low   = Number(i.low),
                  high  = Number(i.high),
                  close = Number(i.close)
    
            full.push({x: date, y: close});
            short.push({x: date, y: close})
        });
    
        setData({short, full})
    }
    
    
    // options for chart - formating and data
    const options = {
        theme: "dark2",
        charts: [
          {
            axisX: {
              lineThickness: 5,
              tickLength: 0,
              labelFormatter: function (e: any) {
                return "";
              },
              crosshair: { enabled: true, snapToDataPoint: true},
            },
            axisY: {
              prefix: "$",
              tickLength: 0,
            },
            data: [
              {
                name: "Price (in USD)",
                yValueFormatString: "$#,###.##",
                type: "area",
                dataPoints: data.full,
              },
            ],
          },
        ],
        navigator: {
          data: [
            {
              dataPoints: data.short,
            },
          ],
          slider: {
            minimum: new Date(fromDate),
            maximum: new Date(toDate),
          },
        },
    };


    return (
        data
            ? <CanvasJSStockChart options={options} />
            : <p>Loading chart...</p>      
    )
}

export default StockChart;
