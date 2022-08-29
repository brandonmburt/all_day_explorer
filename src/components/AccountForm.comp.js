import React, { useState } from 'react'
import { Row, Form, Button } from 'react-bootstrap';

export function AccountForm(props) {

    const [isInvalid, setIsInvalid] = useState(false);

    const validateSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const addr = event.currentTarget.addr.value;
        if (addr.length === 18 || addr.length === 16) {
            // TODO: Might want to check the chain here
            props.onSubmit(event)
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
                    <Form.Text className='text-muted'>
                        Ex: 0x1e2af8107033fc12 or 1f357456f8615df2
                    </Form.Text>
                </Form.Group>
                <Button variant='primary' type='submit'>
                    Submit
                </Button>
            </Form>
        </Row>
    )

}