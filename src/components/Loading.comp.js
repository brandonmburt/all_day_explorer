import React from "react"
import ReactLoading from "react-loading";

export function Loading() {

    return (
        <>
            <div style={{marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <ReactLoading type="spin" color="gray" height="130px" width="130px" delay={100} />            
            </div>
            <div style={{marginTop: '20px', width: '100%', textAlign: 'center'}}>
                <h5>Fetching Data</h5>
            </div>
        </>
    )

}