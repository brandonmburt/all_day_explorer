import { Card } from "react-bootstrap";
import { TooltipIcon } from '../components/TooltipIcon';

interface CardCompProps {
    header: string;
    body: any;
    mb?: string;
    tooltip?: string;
}

export function CardComp(props: CardCompProps) {

    const HEADER = props.tooltip ? (
            <>{props.header} <TooltipIcon pixels='26px' paddingBottom='2px' text={props.tooltip} /></>
        ) :  <>{props.header}</>;

    return (
        <Card className="shadow" style={{ margin: `${props.mb || '50px'} 10px` }}>
            <Card.Header className="header-color" as="h5">{HEADER}</Card.Header>
            <Card.Body>{props.body}</Card.Body>
        </Card>
    )

}