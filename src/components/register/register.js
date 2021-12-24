import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { Link, Navigate } from "react-router-dom";

const Register = () => {
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        fetch("/api/login_verify").then((resp) => {
            setRedirect(resp.status === 302);
            setLoading(false);
        });
    }, []);

    function validate() {
        if (password !== confirmPassword) {
            setErrors(["Passwords do not match"]);
            return false;
        }
        return true;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!validate()) {
            return
        }
        let url = `/api/register?username=${username}&password=${password}&firstName=${firstName}&lastName=${lastName}`;

        fetch(url, {
            method: "POST"
        }).then((response) => {
            if (response.status !== 200) {
                setErrors(["User already exists"]);
                return;
            } 
            setRedirect(true);
        });
    }

    if (redirect) 
        return (<Navigate to="/login"/>)
        
    return (
        (loading === true) ?
        <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={3000}/>  :
        <form className="login__form" onSubmit={handleSubmit}>

            <h3 className="md-3">Register</h3>
            {errors.map((error, i) => 
                <div key={i} className="alert alert-danger" role="alert">{error}</div>
            )}
            <div className="form-group  col-md-4  login__input">
                <label className="form-label">
                    First Name
                </label>
                <input className="form-control" type="text" name="username" value={firstName} onChange={e => {setErrors([]); setFirstName(e.target.value);}} required/>
            </div>

            <div className="form-group  col-md-4  login__input">
                <label className="form-label">
                    Last Name
                </label>
                <input className="form-control" type="text" name="username" value={lastName} onChange={e => {setErrors([]); setLastName(e.target.value);}} required/>
            </div>

            <div className="form-group  col-md-4  login__input">
                <label className="form-label">
                    Username
                </label>
                <input className="form-control" type="text" name="username" value={username} onChange={e => {setErrors([]); setUsername(e.target.value);}} required/>
            </div>

            <div className="form-group  col-md-4 login__input">
                <label className="form-lable">
                    Password
                </label>
                <input className="form-control" type="password" name="password" value={password} onChange={e => {setErrors([]); setPassword(e.target.value);}} required/>
            </div>

            <div className="form-group  col-md-4 login__input">
                <label className="form-lable">
                    Confirm Password
                </label>
                <input className="form-control" type="password" name="confirmPassword" value={confirmPassword} onChange={e => {setErrors([]); setConfirmPassword(e.target.value);}} required/>
            </div>

            <div className="col-md-4  login__button_wrapper">
                <div className="">
                    <Link to="/login" className="btn  btn-primary">Go to Login</Link>
                </div>
                <div className="">
                    <input className="btn  btn-primary" type="submit" value="Register"/>
                </div>
            </div>
        </form>
    );
}

export default Register;