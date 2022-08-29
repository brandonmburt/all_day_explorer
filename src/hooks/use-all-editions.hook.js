import { useEffect, useState } from "react";
import { query } from "@onflow/fcl";
import { GET_ALL_EDITIONS } from "../scripts/get-all-editions.script";

export default function useAllEditions() {
  const [editionsMap, setEditionsMap] = useState(null);

  const getAllEditions = async () => {
    const res = await query({
      cadence: GET_ALL_EDITIONS
    });
    return res;
  }

  useEffect(() => {
      getAllEditions()
      .then((d) => {
          const editionsMap = new Map();
          d.forEach(x => {
            editionsMap.set(x.id, x)
          });
          setEditionsMap(editionsMap);
      })
      .catch(() => console.log("Error occured in use-all-editions.hook.js"))
  }, []);


  return [editionsMap];
}
