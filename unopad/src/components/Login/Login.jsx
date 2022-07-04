import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Row, Col, Button } from 'reactstrap'
import FormControl from './FormControl.jsx'
import { loginUserAction } from '../../store/account/actions/userActions'
import { userSigned } from '../../store/account/actions/userActions'
import { NavLink } from 'react-router-dom'

class Login extends Component {

    state = {
        data: {
            username: '',
            password: ''
        },
        errors: {}
    }
    validate = () => {
        const { data } = this.state
        const errors = {}

        if (data.username === '') errors.username = 'Username cannot be blank.'
        if (data.password === '') errors.password = 'Password cannot be blank.'

        return errors
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { data } = this.state
        const errors = this.validate()

        if (Object.keys(errors).length === 0) {
            this.props.login(data)

            this.setState({
                data: {
                    username: '',
                    password: ''
                },
                errors: {}
            })
        } else {
            this.setState({
                errors
            })
        }
    }
    handleChange = (e) => {
        this.setState({
            data: {
                ...this.state.data,
                [e.target.id]: e.target.value
            },
            errors: {
                ...this.state.errors,
                [e.target.id]: ''
            }
        })
    }
    render() {
        const { data, errors } = this.state

        return (
            <Row style={{justifyContent:"center",marginTop:"30px",padding:"10px",marginBottom:"30px"}}>
                <Col md={4}>
                    <Form id="loginForm" onSubmit={this.handleSubmit} >
                        <FormControl
                            label="Username"
                            type="text"
                            value={data.username}
                            handleChange={this.handleChange}
                            error={errors.username}
                        />
                        <FormControl
                            label="Password"
                            type="password"
                            value={data.password}
                            handleChange={this.handleChange}
                            error={errors.password}
                        />
                    </Form>
                    <div style={{textAlign:"center"}}>
                    <Button form="loginForm" type="submit" style={{backgroundColor: "#365ae1",marginTop:"10px"}}>Login</Button>
                   
                    <Button type="button" onClick={event=> window.location.href='/signup'} style={{backgroundColor: "#365ae1",marginLeft:"10px",marginTop:"10px"}}>SignUp</Button>
                     </div>
                    <NavLink className="navbar-brand" to="/forgotpassword" style={{display:"flex",justifyContent:"center",margin:"auto"}}>
                        Forgot Password?
                    </NavLink>
                </Col>
            </Row>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        login: (creds) => {
            dispatch(loginUserAction(creds))
        },
        sign: () => {
            dispatch(userSigned())
        }
    }
}

export default connect(null, mapDispatchToProps)(Login)