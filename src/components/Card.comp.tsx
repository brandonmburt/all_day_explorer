import { Card } from "react-bootstrap";

export function CardComp(props) {

    return (
        <Card className="shadow" style={{ margin: '30px 10px' }}>
            <Card.Header as="h5">{props.header}</Card.Header>
            <Card.Body>{props.body}</Card.Body>
        </Card>
    )

}