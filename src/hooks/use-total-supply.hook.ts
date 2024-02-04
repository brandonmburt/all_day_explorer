import { useEffect, useState } from "react";
import { GET_TOTAL_SUPPLY } from "../scripts/get-total-supply.script";
import { executeCadenceScript } from "../services/flow.service";

export default function useTotalSupply() {
  const [totalSupply, setTotalSupply] = useState<number>(null);

  useEffect(() => {
    executeCadenceScript(GET_TOTAL_SUPPLY)
    .then((res) => {
        setTotalSupply(+res);
    })
    .catch(() => console.log("Error occured in use-total-supply.hook.ts"))
  }, []);

  return [totalSupply];
}
