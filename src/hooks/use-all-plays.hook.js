import { useEffect, useState } from "react";
import { query } from "@onflow/fcl";
import { GET_ALL_PLAYS } from "../scripts/get-all-plays.script";

export default function useAllPlays() {
  const [playsMap, setPlaysMap] = useState(null);
  const [playTypes, setPlayTypes] = useState(null);

  const getAllPlays = async () => {
    const res = await query({
      cadence: GET_ALL_PLAYS
    });
    return res;
  }

  useEffect(() => {
      getAllPlays()
      .then((d) => {
          const playsMap = new Map();
          const playTypes = new Set();
          d.forEach(x => {
            let type = x.metadata.playType;
            if (type === "") {
              if (x.classification === "TEAM_MELT") {
                  type = "Team Melt";
              } else if (x.classification === "PLAYER_MELT") {
                  type = "Player Melt";
              } else {
                  console.error("Undefined play type");
              }
              x.metadata.playType = type;
            }
            playTypes.add(type);
            playsMap.set(x.id, x)
          });
          setPlaysMap(playsMap);
          setPlayTypes(Array.from(playTypes));
      })
      .catch(() => console.log("Error occured in use-all-plays.hook.js"))
  }, []);

  return [playsMap, playTypes];
}
