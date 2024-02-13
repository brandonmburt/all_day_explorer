import { NavDropdown, Badge } from "react-bootstrap"
import { LinkContainer } from 'react-router-bootstrap'

export function SeriesNav(props : { id: number, name: string, active: boolean, sets: Set<string> }) {

    let badge = props.active ?
        <Badge pill bg="success">Active</Badge> :
        <Badge pill bg="danger">Closed</Badge>;
    

    return (
        <NavDropdown title={props.name} id="basic-nav-dropdown">
            <NavDropdown.Item disabled>
                Status: {badge}
            </NavDropdown.Item>
            <NavDropdown.Divider />
            {Array.from(props.sets).map((set) => {
                const [id, name] = set.split(":");
                return (
                    <LinkContainer key={id} to={"/set/" + props.id + "/" + id}>
                        <NavDropdown.Item>
                            {id}: {name}
                        </NavDropdown.Item>
                    </LinkContainer>
                )
            })}
        </NavDropdown>
    )

}