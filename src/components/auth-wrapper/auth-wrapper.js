import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Loader from "react-loader-spinner";

function AuthWrapper(props) {
    const [verification, setVerification] = useState(0);

    useEffect(() => {
        fetch("/api/verify").then((resp) => {
            setInterval(() =>
            setVerification(resp.status), 300);
        }
        );
    }, []);

    return (
        <div className="main-wrapper">
            {(verification === 0) ?
                <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={3000}/> :
                (
                    verification === 200 ? 
                        (props.children) :
                        (<Navigate to="/login"/>)
                    )
            }
        </div>
);
};

export default AuthWrapper;
