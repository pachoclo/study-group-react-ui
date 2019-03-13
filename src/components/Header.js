import React from 'react'
import Menu from './Menu'
import { withRouter } from 'react-router-dom'

const Header = props => <Menu {...props} />

export default withRouter(Header)
