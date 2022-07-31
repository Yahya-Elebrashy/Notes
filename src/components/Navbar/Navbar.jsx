import React from 'react'
import { Link,useLocation } from 'react-router-dom'

export default function Navbar({loginData,logOut}) {
  let location=useLocation();
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
            <Link className="navbar-brand" to="home">Notes</Link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto">
                    {location.pathname=='/home' ?
                    <>
                     <li className="nav-item">
                    <a className="nav-link" onClick={logOut}>Logout</a>
                </li>
                    </>
                :
                <>
                <li className="nav-item">
                <Link className="nav-link" to="register">Register</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="login">Login</Link>
            </li>
            </>
                }
                </ul>
            </div>
        </div>
    </nav>
    </>
  )
}
