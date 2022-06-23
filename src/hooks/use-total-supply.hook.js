import { useEffect, useState } from "react";
import { query } from "@onflow/fcl";
import { GET_TOTAL_SUPPLY } from "../scripts/get-total-supply.script";

export default function useTotalSupply() {
  const [totalSupply, setTotalSupply] = useState(null);

  const getTotalSupply = async() => {
    const res = await query({
        cadence: GET_TOTAL_SUPPLY
    });
    return res;
  }

  useEffect(() => {
    getTotalSupply()
    .then((d) => {
        setTotalSupply(d);
    })
    .catch(() => console.log("Error occured in use-total-supply.hook.js"))
  }, []);

  return [totalSupply];
}
