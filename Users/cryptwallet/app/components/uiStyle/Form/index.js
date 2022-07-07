import React from 'react'

const Form = ({ children, onSubmit, className }) => {
    return (<form className={className} onSubmit={onSubmit}>{children}</form>)
}
export default Form