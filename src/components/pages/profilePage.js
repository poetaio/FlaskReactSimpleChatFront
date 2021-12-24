import React from "react";
import AuthWrapper from "../auth-wrapper/auth-wrapper";
import NavBar from "../navbar";
import Profile from "../profile";

function ProfilePage() {
    return (
        <AuthWrapper>
            <NavBar activeHeader={"Profile"}/>
            <Profile/>
        </AuthWrapper>
    );
};

export default ProfilePage;