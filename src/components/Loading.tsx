import ReactLoading from "react-loading";

export function Loading() {

    return (
        <div className="loading-container">
            <ReactLoading type="spin" color="gray" height="100px" width="130px" delay={100} />
        </div>
    )

}