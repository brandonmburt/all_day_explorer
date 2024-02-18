import { Accordion, Row } from "react-bootstrap"

export function Accordian(props) {

    return (
        <Row style={{ margin: '25px 0px' }}>
            <Accordion>
                {props.items.map((item, i) => {
                    const [header, body] = item;
                    return (
                        <Accordion.Item key={i} eventKey={i}>
                            <Accordion.Header>{header}</Accordion.Header>
                            <Accordion.Body style={{ margin: 0, padding: 0 }}>{body}</Accordion.Body>
                        </Accordion.Item>
                    )
                })}
            </Accordion>
        </Row>
    )

}