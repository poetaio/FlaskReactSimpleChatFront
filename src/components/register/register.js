import React from "react";
import Loader from "react-loader-spinner";
import { Navigate } from "react-router-dom";

const Register = () => {
    if (this.state.redirect) 
        return (<Navigate to="/"/>)
        
    return (
        (this.state.loading === true) ?
        <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={3000}/>  :
        <form className="login__form" onSubmit={this.handleSubmit}>
        {this.state.errors.map((error, i) => 
            <div key={i} className="alert alert-danger" role="alert">{error}</div>)}
            <div className="form-group  col-md-4  login__input">
                <label className="form-label">
                    Username
                </label>
                <input className="form-control" type="text" name="username" value={this.state.username} onChange={this.handleChange} required/>
            </div>

            <div className="form-group  col-md-4 login__input">
                <label className="form-lable">
                    Password
                </label>
                <input className="form-control" type="password" name="password" value={this.state.password} onChange={this.handleChange} required/>
            </div>

            <div className="col-md-4">
                <input className="btn  btn-primary" type="submit" value="Login"/>
            </div>
        </form>
    );
}

export default Register;