import { NavDropdown } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import { StatusBadge } from "./badges/StatusBadge";

interface SeriesNavProps {
    id: number;
    name: string;
    active: boolean;
    sets: Set<string>;
}

export function SeriesNav(props: SeriesNavProps) {

    return (
        <NavDropdown title={props.name} id="basic-nav-dropdown">
            <NavDropdown.Item disabled>
                {'Status: '}
                <StatusBadge active={props.active} />
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