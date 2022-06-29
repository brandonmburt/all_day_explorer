import React from "react"
import { NavDropdown } from "react-bootstrap"

export function SeriesNav(props) {

    let activeStr = 'closed';
    if (props.active) {
        activeStr = 'active';
    }

    return (
        // {props.name} ({activeStr})
        <NavDropdown title={props.name} id="basic-nav-dropdown">
            {Array.from(props.sets).map((set) => {
                const [id, name] = set.split(":");
                return <NavDropdown.Item key={id} href={"/editions/" + props.id + "/" + id}>{id}: {name}</NavDropdown.Item>
            })}
        </NavDropdown>
    )

}