import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./login.css";

class Login extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            username: '',
            password: ''
        };

    }
    handleChange() {

    }

    handleSubmit() {

    }

    render() {
        return (
            <form className="login__form" onSubmit={this.handleSubmit}>
                <div className="form-group  col-md-4  login__input">
                    <label className="form-label">
                        Username
                    </label>
                    <input className="form-control" type="text" name="username" value={this.state.username} onChange={this.handleChange()} required/>
                </div>

                <div className="form-group  col-md-4 login__input">
                    <label className="form-lable">
                        Password
                    </label>
                    <input className="form-control" type="password" name="password" value={this.state.password} onChange={this.handleChange()} required/>
                </div>

                <div className="col-md-4">
                    <button className="btn  btn-primary" type="submit" value="Login">Login</button>
                </div>
            </form>
        );
    }
}

export default Login;