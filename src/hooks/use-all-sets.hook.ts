import { useEffect, useState } from "react";
import { GET_ALL_SETS } from "../scripts/get-all-sets.script";
import { Set } from "../models/models";
import { executeCadenceScript } from "../services/flow.service";
import { SESSION_KEYS } from "../constants/session-keys";
import { sessionService as session } from "../services/session.service";

export default function useAllSets() {
    const [sets, setSets] = useState<Map<number, Set>>(null);

    useEffect(() => {
        if (session.hasKey(SESSION_KEYS.SETS)) {
            setSets(new Map<number, Set>(session.get(SESSION_KEYS.SETS)));
        } else {
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
                    session.set(SESSION_KEYS.SETS, Array.from(setMap.entries()));
                    setSets(setMap);
                })
                .catch(() => console.log("Error occured in use-all-series.hook.ts"))
        }
    }, []);

    return [sets];
}
