import { useState } from 'react'
import { Row, Form, Button, Spinner } from 'react-bootstrap';
import { TooltipIcon } from './TooltipIcon';
import { addressIsValid } from '../utils/account';
import { TOOLTIPS } from '../constants/tooltips';

interface AccountFormProps {
    submissionInProgress: boolean;
    handleSubmit: (addr: string) => void;
}

export function AccountForm(props: AccountFormProps) {

    const [isInvalid, setIsInvalid] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const addr: string = (e.currentTarget.addr.value || '').toLowerCase();
        if (addressIsValid(addr)) {
            props.handleSubmit(addr);
        } else {
            setIsInvalid(true);
            e.currentTarget.addr.value = '';
        }
    };

    const EXAMPLES = (<>  
        {'Ex: '}<span className='ex-address'>0xed8707e2ae5bba5a</span>
        {' or '}<span className='ex-address'>0x64afebe42165be6e</span>
    </>);

    return (
        <Row className='centered'>
            <Form id='account-form' onSubmit={handleSubmit}>
                <Form.Group className='mb-4' controlId='addr'>

                    <Form.Label className='centered mb-4'>
                        <span className='header-color' style={{ fontSize: '24px' }}>Account Lookup</span>
                        <TooltipIcon marginLeft='5px' text={TOOLTIPS.ACCOUNT_LOOKUP} />
                    </Form.Label>

                    <Form.Control
                        onChange={() => setIsInvalid(false)}
                        style={{ padding: '15px' }}
                        isInvalid={isInvalid}
                        type='text'
                        placeholder='Enter Flow Address'
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid Flow Address
                    </Form.Control.Feedback>

                    <Form.Text className='text-muted' style={{ fontSize: '12px' }}>
                        {EXAMPLES}
                    </Form.Text>

                </Form.Group>

                <Form.Group className='mb-3'>
                    <Button disabled={props.submissionInProgress || isInvalid} style={{ width: '100%' }} variant='primary' type='submit'>
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