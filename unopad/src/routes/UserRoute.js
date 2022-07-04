import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch ,Redirect} from "react-router-dom";

const UserRoute = props => {
    if (props.user) {
        return <Route {...props} />
    } else {
        return <Redirect to="/" />
    }
}

export default connect(
    ({ user }) => ({ user })
)(UserRoute)