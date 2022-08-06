import React, { useState, useEffect } from "react"
import { Container, Row } from "react-bootstrap";
import { query } from "@onflow/fcl";
import { GET_COLLECTION_IDS } from "../scripts/get-collection-ids.script";
import { GET_COLLECTION_MOMENTS } from "../scripts/get-collection-moments.script";
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
            getCollectionIDs(addr);
        } else if (addr.length === 16) {
            setAddress("0x" + addr);
            getCollectionIDs("0x" + addr);
        } else {
            event.currentTarget.addr.value = '';
        }
    };

    const getCollectionIDs = async (address) => {
        const ids = await query({
            cadence: GET_COLLECTION_IDS,
            args: (arg, t) => [arg(address, t.Address)]
        }).catch(() => console.log("Error occured getting collection IDs"));
        console.log("IDs:" + ids);
        setColectionIDs((prev) => ids);
        getCollectionMoments(address, ids);
    }
    
    // Moment objects have id, editionID, and serialNumber (all strings)
    const getCollectionMoments = async (address, momentIDs) => {
        if (momentIDs && momentIDs.length === 0) {
            return;
        }
        const moments = await query({
            cadence: GET_COLLECTION_MOMENTS,
            args: (arg, t) => [arg(address, t.Address), arg(momentIDs, t.Array(t.UInt64))]
        }).catch(() => console.log("Error occured getting collection moments"));
        console.log("Moments:" + moments);
        moments.forEach(m => console.log(m));
        setColectionMoments((prev) => moments);
    }

    const [collectionIDs, setColectionIDs] = useState();
    const [collectionMoments, setColectionMoments] = useState();

    return (
        <Container>
            <Row>
                <p>For Testing: 0x1e2af8107033fc12, 0x1f357456f8615df2</p>
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