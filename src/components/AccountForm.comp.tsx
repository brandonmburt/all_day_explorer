import { useState } from 'react'
import { Row, Form, Button, Spinner } from 'react-bootstrap';
import { TooltipIcon } from './TooltipIcon.comp';

interface AccountFormProps {
    submissionInProgress: boolean;
    handleSubmit: (addr: string) => void;
}

export function AccountForm(props) {

    const [isInvalid, setIsInvalid] = useState(false);

    const handleChange = () => {

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const addr: string = e.currentTarget.addr.value;
        // TODO: Might want to check the chain here
        if (addr.length === 18 && addr.substring(0,2) === "0x") {
            props.handleSubmit(addr)
        } else {
            setIsInvalid(true);
            e.currentTarget.addr.value = '';
        }
    };

    return (
        <Row className=''>
            <Form style={{ maxWidth: '350px' }} className='account-form' onSubmit={handleSubmit}>
                <Form.Group className='mb-3' controlId='addr'>
                    <Form.Label style={{ textAlign: 'center', width: '100%' }}>
                        <span style={{ fontSize: '20px' }}>Flow Address</span>
                        <TooltipIcon text={'Enter your Flow Address to view your collection. Address can be retrived by navigating to your Dapper wallet and clicking on your username if the upper righthand corner.'} />
                    </Form.Label>
                    <Form.Control style={{ padding: '15px' }} isInvalid={isInvalid} type='text' placeholder='Enter Address' />
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid Flow Address
                    </Form.Control.Feedback>
                    <Form.Text className='text-muted' style={{ fontSize: '12px' }}>
                        Ex: 0xed8707e2ae5bba5a or 0x64afebe42165be6e
                    </Form.Text>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Button disabled={props.submissionInProgress} style={{width: '100%'}} variant='primary' type='submit'>
                        {props.submissionInProgress ? (
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        ) :
                            ('Submit')
                        }
                    </Button>
                </Form.Group>
            </Form>
        </Row>
    )

}