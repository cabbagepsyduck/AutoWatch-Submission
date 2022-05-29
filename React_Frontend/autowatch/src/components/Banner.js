import React from 'react'
import { useNavigate } from 'react-router'
import "../styles/main.css"
function Banner() {

    let history = useNavigate()

    const priceRedirect = () => {
        history("/price")
    }

    // const placeHolder = () => {
    //     history("/placeholder")
    // }
    const placeHolder = () => {
        window.open("https://colab.research.google.com/drive/1CVFrpYuIYopKpIVUDYA1nMjvJ700eBJw?usp=sharing");
      };

     
    return (
            <div className="position-absolute top-50 start-50 translate-middle text-bg-dark p-1"> 
                <div className="h1 fw-bolder text-center" > <strong>AutoWatch</strong> </div>
                <div className="banner_title_tail">
                    <div className="h4">A Machine Learning based Web Application for market price recommendation of cars</div>

                </div>
                <div className="banner__buttons text-center">
                        <button onClick={priceRedirect} type="button" class="btn btn-outline-dark btn-lg">Price Recommender</button>&nbsp;&nbsp;&nbsp;
                        <button onClick={placeHolder} type="button" class="btn btn-outline-dark btn-lg">View notebook</button>

                </div>

            </div>
    )
}

export default Banner