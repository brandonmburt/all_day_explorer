import { useEffect, useState } from "react";
import { GET_ALL_EDITIONS } from "../scripts/get-all-editions.script";
import { Edition } from "../models/models";
import { executeCadenceScript } from "../services/flow.service";
import { SESSION_KEYS } from "../constants/session-keys";
import { sessionService as session } from "../services/session.service";

export default function useAllEditions() {
  const [editionsMap, setEditionsMap] = useState<Map<number, Edition>>(null);

  useEffect(() => {
    if (session.hasKey(SESSION_KEYS.EDITIONS)) {
        setEditionsMap(new Map<number, Edition>(session.get(SESSION_KEYS.EDITIONS)));
    } else {
        executeCadenceScript(GET_ALL_EDITIONS)
        .then((res) => {
            const eMap = new Map<number, Edition>();
            res.forEach(edition => {
                const { id, maxMintSize, numMinted, playID, seriesID, setID, tier } = edition;
                eMap.set(+id, {
                    id: +id,
                    maxMintSize: +maxMintSize,
                    numMinted: +numMinted,
                    playID: +playID,
                    seriesID: +seriesID,
                    setID: +setID,
                    tier
                });
            });
            session.set(SESSION_KEYS.EDITIONS, Array.from(eMap.entries()));
            setEditionsMap(eMap);
        })
        .catch(() => console.log("Error occured in use-all-editions.hook.ts"))
    }
  }, []);

  return [editionsMap];
}
