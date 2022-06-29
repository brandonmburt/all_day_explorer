import { useEffect, useState } from "react";
import { query } from "@onflow/fcl";
import { GET_ALL_PLAYS } from "../scripts/get-all-plays.script";

export default function useAllPlays() {
  const [plays, setPlays] = useState(null);

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
          d.forEach(x => {
            playsMap.set(x.id, x)
          });
          setPlays(playsMap);
      })
      .catch(() => console.log("Error occured in use-all-plays.hook.js"))
  }, []);


  return [plays];
}
