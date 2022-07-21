import React from "react"
import ReactLoading from "react-loading";

export function Loading() {

    return (
        <div style={{margin: '30px 10px'}}>
            <ReactLoading type="spin" color="gray" height="130px" width="130px" delay="100" />
            <h5 style={{marginTop: '20px'}}>Fetching Data</h5>
        </div>
    )

}