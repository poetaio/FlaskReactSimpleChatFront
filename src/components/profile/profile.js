import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import "./profile.css";

const Profile = () => {
    const [username, setUsername] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    
    useEffect(() => {
        fetch("/api/profile").then(
            res => res.json()
        ).then((data) => {
            setUsername(data.username);
            setFirstName(data.firstName);
            setLastName(data.lastName);
        });
    }, []);

    return (
        (!username || !firstName || !lastName) ?
        <Loader 
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={100000}/> :
        <div className="profile">
            <h3>Profile</h3>
            <div className="profile__info">
                <div className="form-group  col-md-4  profile__info_item">
                    <h5 className="form-label  profile__info_item_header">
                        Username
                    </h5>
                    <div className="">{username}</div>
                </div>
                
                <div className="form-group  col-md-4  profile__info_item">
                    <h5 className="form-label  profile__info_item_header">
                        First Name
                    </h5>
                    <div className="">{firstName}</div>
                </div>
                
                <div className="form-group  col-md-4  profile__info_item">
                    <h5 className="form-label  profile__info_item_header">
                        Last Name
                    </h5>
                    <div className="">{lastName}</div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
