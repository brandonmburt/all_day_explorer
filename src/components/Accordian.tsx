import { Accordion, Row } from "react-bootstrap"

export function Accordian(props) {

    return (
        <Row className='accordian-container'>
            <Accordion>
                {props.items.map(([header, body], i) => {
                    return (
                        <Accordion.Item key={i} eventKey={i}>
                            <Accordion.Header>{header}</Accordion.Header>
                            <Accordion.Body className='accordian-content'>{body}</Accordion.Body>
                        </Accordion.Item>
                    )
                })}
            </Accordion>
        </Row>
    )

}