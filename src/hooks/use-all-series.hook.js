import { useEffect, useState } from "react";
import { query } from "@onflow/fcl";
import { GET_ALL_SERIES } from "../scripts/get-all-series.script";

export default function useAllSeries() {
  const [series, setSeries] = useState([]);

  const getAllSeries = async () => {
    const res = await query({
      cadence: GET_ALL_SERIES
    });
    return res;
  }

  useEffect(() => {
      getAllSeries()
      .then((d) => {
          const seriesMap = new Map();
          d.forEach(x => {
            seriesMap.set(x.id, x)
          });
          setSeries(seriesMap);
      })
      .catch(() => console.log("Error occured in use-all-series.hook.js"))
  }, []);


  return [series];
}
