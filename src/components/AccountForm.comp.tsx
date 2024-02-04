import React, { useState } from 'react'
import { Row, Form, Button } from 'react-bootstrap';

export function AccountForm(props) {

    const [isInvalid, setIsInvalid] = useState(false);

    const validateSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const addr = event.currentTarget.addr.value;
        // TODO: Might want to check the chain here
        if (addr.length === 18 && addr.substr(0,2) === "0x") {
            props.processSubmit(addr)
        } else {
            setIsInvalid(true);
            event.currentTarget.addr.value = '';
        }
    };

    return (
        <Row>
            <Form className='account-form' onSubmit={validateSubmit}>
                <Form.Group className='mb-3' controlId='addr'>
                    <Form.Label>Flow Address</Form.Label>
                    <Form.Control isInvalid={isInvalid} type='text' placeholder='Enter Address' />
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid Flow Address
                    </Form.Control.Feedback>
                    <Form.Text className='text-muted' style={{fontSize: '12px'}}>
                        Ex: 0xed8707e2ae5bba5a or 0x64afebe42165be6e
                    </Form.Text>
                </Form.Group>
                <Button variant='primary' type='submit'>
                    Submit
                </Button>
            </Form>
        </Row>
    )

}