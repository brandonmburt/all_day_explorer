import { useEffect, useState } from "react";
import { GET_ALL_SETS } from "../scripts/get-all-sets.script";
import { Set } from "../models/models";
import { executeCadenceScript } from "../services/flow.service";

export default function useAllSets() {
  const [sets, setSets] = useState<Map<number, Set>>(null);
  
  useEffect(() => {
      executeCadenceScript(GET_ALL_SETS)
      .then((res) => {
          const setMap = new Map<number, Set>();
          res.forEach(set => {
            const { id, name, setPlaysInEditions } = set;
              setMap.set(+id, {
                    id: +id,
                    name,
                    setPlaysInEditions
                });
          });
          setSets(setMap);
      })
      .catch(() => console.log("Error occured in use-all-series.hook.ts"))
  }, []);

  return [sets];
}
