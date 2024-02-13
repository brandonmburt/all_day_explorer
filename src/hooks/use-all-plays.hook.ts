import { useEffect, useState } from "react";
import { GET_ALL_PLAYS } from "../scripts/get-all-plays.script";
import { Play } from "../models/models";
import { executeCadenceScript } from "../services/flow.service";
import { SESSION_KEYS } from "../constants/session-keys";
import { sessionService as session } from "../services/session.service";

type ReturnVals = readonly [Map<number, Play>, string[]]; // TODO

export default function useAllPlays(): ReturnVals {

    const [playsMap, setPlaysMap] = useState<Map<number, Play>>(null);
    const [playTypes, setPlayTypes] = useState<string[]>(null);

  useEffect(() => {
    if (session.hasKey(SESSION_KEYS.PLAYS)) {
        setPlaysMap(new Map<number, Play>(session.get(SESSION_KEYS.PLAYS)));
        setPlayTypes(Array.from(session.get(SESSION_KEYS.PLAY_TYPES)));
    } else {
        executeCadenceScript(GET_ALL_PLAYS)
        .then((res) => {
            const playsMap = new Map<number, Play>();
            const playTypes = new Set<string>();
            res.forEach(play => {
                const { id, classification, metadata } = play;
                const { awayTeamName, awayTeamScore, description, gameDate, homeTeamName, homeTeamScore, playType, playerFirstName, playerLastName, playerNumber, playerPosition, teamName } = metadata;
                let type = playType
                if (type === "") {
                if (classification === "TEAM_MELT") {
                    type = "Team Melt";
                } else if (classification === "PLAYER_MELT") {
                    type = "Player Melt";
                } else {
                    console.error("Undefined play type");
                }
                }
                playTypes.add(type);
                playsMap.set(+id, {
                    id: +id,
                    classification,
                    metadata: {
                    awayTeamName,
                    awayTeamScore: +awayTeamScore,
                    description,
                    gameDate,
                    homeTeamName,
                    homeTeamScore: +homeTeamScore,
                    playType: type,
                    playerFirstName,
                    playerLastName,
                    playerNumber: +playerNumber,
                    playerPosition,
                    teamName
                    }
                });
            });
            session.set(SESSION_KEYS.PLAYS, Array.from(playsMap.entries()));
            session.set(SESSION_KEYS.PLAY_TYPES, Array.from(playTypes));
            setPlaysMap(playsMap);
            setPlayTypes(Array.from(playTypes));
        })
        .catch(() => console.log("Error occured in use-all-plays.hook.ts"))
    }
  }, []);

  return [playsMap, playTypes];
}
