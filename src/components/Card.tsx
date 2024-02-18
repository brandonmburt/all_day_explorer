import { Card } from "react-bootstrap";

interface CardCompProps {
    header: string;
    body: any;
    mb?: string;
}

export function CardComp(props: CardCompProps) {

    return (
        <Card className="shadow" style={{ margin: `${props.mb || '50px'} 10px` }}>
            <Card.Header className="header-color" as="h5">{props.header}</Card.Header>
            <Card.Body>{props.body}</Card.Body>
        </Card>
    )

}