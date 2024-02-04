import { useEffect, useState } from "react";
import { GET_ALL_EDITIONS } from "../scripts/get-all-editions.script";
import { Edition } from "../models/models";
import { executeCadenceScript } from "../services/flow.service";

export default function useAllEditions() {
  const [editionsMap, setEditionsMap] = useState<Map<number, Edition>>(null);

  useEffect(() => {
    executeCadenceScript(GET_ALL_EDITIONS)
      .then((res) => {
          const editionsMap = new Map<number, Edition>();
          res.forEach(edition => {
            const { id, maxMintSize, numMinted, playID, seriesID, setID, tier } = edition;
            editionsMap.set(+id, {
                id: +id,
                maxMintSize: +maxMintSize,
                numMinted: +numMinted,
                playID: +playID,
                seriesID: +seriesID,
                setID: +setID,
                tier
            });
          });
          setEditionsMap(editionsMap);
      })
      .catch(() => console.log("Error occured in use-all-editions.hook.ts"))
  }, []);

  return [editionsMap];
}
