import { useEffect, useState } from "react";
import { GET_ALL_SERIES } from "../scripts/get-all-series.script";
import { Series } from "../models/models";
import { executeCadenceScript } from "../services/flow.service";


export default function useAllSeries() {
  const [series, setSeries] = useState<Map<number, Series>>(null);

  useEffect(() => {
      executeCadenceScript(GET_ALL_SERIES)
      .then((res) => {
          const seriesMap = new Map<number, Series>();
          res.forEach(series => {
            const { id, active, name } = series;
            seriesMap.set(+id, {
                id: +id,
                active,
                name
            });
          });
          setSeries(seriesMap);
      })
      .catch(() => console.log("Error occured in use-all-series.hook.ts"))
  }, []);

  return [series];
}
