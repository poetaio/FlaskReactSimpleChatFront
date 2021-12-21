import React from "react";
import { Navigate } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./login.css";

class Login extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            username: '',
            password: '',
            redirect: false,
            errors: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.valuesValid = this.valuesValid.bind(this);

    }
    handleChange(e) {
        if (this.state.errors.length !== 0) {
            this.setState({
                errors: []
            });
        }

        this.setState({
            [e.target.name]: e.target.value
        });
    }

    valuesValid() {
        let res = true;
        if (this.state.username.length === 0) {
            this.setState({
                errors: ["Username must not be empty"]
            });
            res = false;
        }

        if (this.state.password.length === 0) {
            let errors = this.state.errors;
            this.setState({
                errors: errors + "Password must not be empty"
            });
            res = false;
        }

        return res;
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.valuesValid()) {
            return;
        }

        let url = `/api/login?username=${this.state.username}&password=${this.state.password}`;

        fetch(url, {
            method: "POST"
        }).then((response) => {
            if (response.status !== 200) {
                this.setState({
                    errors: ["Invalid username or password"]
                });
                
                return;
            } 

            this.setState({
                redirect: true
            });
        });
    }

    render() {
        if (this.state.redirect) 
            return (<Navigate to="/"/>)
        
        return (
            <div>
            {this.state.errors.map((error, i) => 
                <div key={i} className="alert alert-danger" role="alert">{error}</div>)}
            <form className="login__form" onSubmit={this.handleSubmit}>
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
            </div>
        );
    }
}

export default Login;