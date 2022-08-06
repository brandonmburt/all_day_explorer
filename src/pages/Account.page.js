import React, { useState, useEffect } from "react"
import { Container, Row } from "react-bootstrap";
import { query } from "@onflow/fcl";
import { GET_ACCOUNT } from "../scripts/get-account.script";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function Account() {

    const [address, setAddress] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const addr = event.currentTarget.addr.value;
        if (addr.length === 18 && addr.substr(0,2) === "0x") {
            setAddress(addr);
        } else if (addr.length === 16) {
            setAddress("0x" + addr);
        } else {
            event.currentTarget.addr.value = '';
        }
    };

    return (
        <Container>
            <Row>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="addr">
                        <Form.Label>Flow Address</Form.Label>
                        <Form.Control type="text" placeholder="Ex: 0x1e2af8107033fc12" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                {address && 
                    <h5>Address: {address}</h5>
                }
            </Row>
        </Container>
    )

}