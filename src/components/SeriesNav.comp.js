import React from "react"
import { NavDropdown } from "react-bootstrap"
import { LinkContainer } from 'react-router-bootstrap'

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
                return (
                    <LinkContainer key={id} to={"/editions/" + props.id + "/" + id}>
                        <NavDropdown.Item>
                            {id}: {name}
                        </NavDropdown.Item>
                    </LinkContainer>
                )
            })}
        </NavDropdown>
    )

}