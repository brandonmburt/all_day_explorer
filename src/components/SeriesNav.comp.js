import React from "react"
import { NavDropdown, Badge } from "react-bootstrap"
import { LinkContainer } from 'react-router-bootstrap'

export function SeriesNav(props) {

    let badge = props.active ?
        <Badge pill bg="success">Active</Badge> :
        <Badge pill bg="danger">Locked</Badge>;
    

    return (
        <NavDropdown title={props.name} id="basic-nav-dropdown">
            <NavDropdown.Item disabled>
                Status: {badge}
            </NavDropdown.Item>
            <NavDropdown.Divider />
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