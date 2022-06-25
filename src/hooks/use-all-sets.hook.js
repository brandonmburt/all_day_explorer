import { useEffect, useState } from "react";
import { query } from "@onflow/fcl";
import { GET_ALL_SETS } from "../scripts/get-all-sets.script";

export default function useAllSets() {
  const [sets, setSets] = useState([]);

  const getAllSets = async () => {
    const res = await query({
      cadence: GET_ALL_SETS
    });
    return res;
  }

  useEffect(() => {
      getAllSets()
      .then((d) => {
          const setMap = new Map();
          d.forEach(x => {
              setMap.set(x.id, x)
          });
          setSets(setMap);
      })
      .catch(() => console.log("Error occured in use-all-series.hook.js"))
  }, []);

  return [sets];
}
