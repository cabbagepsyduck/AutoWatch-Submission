import React from 'react'
import "../styles/main.css"

function Loading() {
    return (
        <div style={{marginTop:'10rem'}}>
            <center>
                <img className="loading_image" src={`${process.env.PUBLIC_URL + '/assets/ajax-loader.gif'}`} alt="Loading" />
            </center>
        </div>
    )
}

export default Loading
