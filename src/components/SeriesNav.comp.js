import React from "react"
import { SetNav } from "./SetNav.comp";

export function SeriesNav(props) {

    let activeStr = 'closed';
    if (props.active) {
        activeStr = 'active';
    }

    return (
        <div>
            <p>Series: {props.name} - {activeStr}</p>
            {Array.from(props.sets).map((set) => {
                const [id, name] = set.split(":");
                return <SetNav key={id} setID={id} name={name} />
            })}
        </div>
    )

}