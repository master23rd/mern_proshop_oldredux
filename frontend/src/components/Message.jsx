import React from 'react'
import { Alert } from 'react-bootstrap'
import PropTypes from 'prop-types'

const Message = ({ variant, children }) => {
  //const Message = (props) => {
  return <Alert variant={variant}>{children}</Alert>
}

Message.defaultProps = {
  variant: 'info',
}

Message.propType = {
  variant: PropTypes.string.isRequired,
}

export default Message
