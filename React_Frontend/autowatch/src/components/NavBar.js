import React from 'react'

import 'font-awesome/css/font-awesome.min.css';

const Navbar = () => {
    const notebook = () => {
      window.open("https://colab.research.google.com/drive/1CVFrpYuIYopKpIVUDYA1nMjvJ700eBJw?usp=sharing");
    };

    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">AutoWatch</a>
      
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <a class="nav-link active" aria-current="page" href="/">Home</a>
              <a class="nav-link active" href="price">Price Recommendor</a>
              <a class="nav-link active" href="/" target="_blank" onClick={notebook} >View notebook</a>

            </div>
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
