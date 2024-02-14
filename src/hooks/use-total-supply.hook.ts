import { useEffect, useState } from "react";
import { GET_TOTAL_SUPPLY } from "../scripts/get-total-supply.script";
import { executeCadenceScript } from "../services/flow.service";
import { SESSION_KEYS } from "../constants/session-keys";
import { sessionService as session } from "../services/session.service";

export default function useTotalSupply() {
    const [totalSupply, setTotalSupply] = useState<number>(null);

    useEffect(() => {
        if (session.hasKey(SESSION_KEYS.TOTAL_SUPPLY)) {
            setTotalSupply(+session.get(SESSION_KEYS.TOTAL_SUPPLY));
        } else {
            executeCadenceScript(GET_TOTAL_SUPPLY)
                .then((res) => {
                    session.set(SESSION_KEYS.TOTAL_SUPPLY, res);
                    setTotalSupply(+res);
                })
                .catch(() => console.log("Error occured in use-total-supply.hook.ts"))
        }
    }, []);

    return [totalSupply];
}
