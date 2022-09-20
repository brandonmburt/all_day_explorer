import React from "react"
import { Accordion, Row } from "react-bootstrap"

export function Accordian(props) {

    return (
        <Row style={{margin: '25px 0px'}}>
            <Accordion>
                {props.items.map((item, i) => {
                    const [header, body] = item;
                    return (
                        <Accordion.Item eventKey={i}>
                            <Accordion.Header>{header}</Accordion.Header>
                            <Accordion.Body>{body}</Accordion.Body>
                        </Accordion.Item>
                    )
                })}
            </Accordion>
        </Row>
    )

}