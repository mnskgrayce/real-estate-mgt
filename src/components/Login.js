import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LoginForm from '../components/LoginForm';
import LoginFormError from '../components/LoginFormError';

const Login = () => {
    const adminUser = {
        email: "admin@admin.com",
        password: "admin1234"
    }

    const [users, setUsers] = useState([]);

    // useEffect(() => {
    //     axios.get("http://ec2-3-144-193-66.us-east-2.compute.amazonaws.com:8080/api/v1/users")
    //         .then((res) => {
    //             setUsers(res);
    //         })
    // }, []);

    const [user, setUser] = useState({ email: "", password: "", })
    const [error, setError] = useState(false);

    const Login = (details) => {
        console.log(details)
        users.forEach((u) => { // using forEach instead of map. because don't need to return something
            if (u.email === details.email && u.password === details.password) {
                console.log("Logged In")
                setUser({
                    email: details.email,
                    password: details.password
                })
            } else if (details.email === adminUser.email && details.password === adminUser.password) {
                console.log("Logged In")
                setUser({
                    email: details.email,
                    password: details.password
                })
            } else {
                setError(true);
                console.log("error : " + error);
            }
        })
    }

    return (
        <>
            <LoginForm Login={Login} />
            <LoginFormError show={error} onHide={() => setError(false)} />
        </>
    );
};

export default Login;