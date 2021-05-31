import React from 'react'
import { Redirect } from 'react-router'

function Logout() {
    // TODO: tokeni sil
    return <Redirect to="/login" />
}

export default Logout
