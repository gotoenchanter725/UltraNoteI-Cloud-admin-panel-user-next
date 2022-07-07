import React from 'react'

const Image = props => {
    return (
        <img
            className={props.className ? props.className : null} src={props.src}
            alt={props.alt}
        />
    )
}
export default Image