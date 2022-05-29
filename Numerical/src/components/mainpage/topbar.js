import React from 'react'
import '../../App.css'
import { Link } from 'react-router-dom'
const Navbar = () => {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-warning" >
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        <div>
            <nav role="navigation" className="primary-navigation" >
                <ul>
                <li><Link to="/">Home</Link></li>
                <li >Root of Equation
                    <ul className="dropdown">
                    <li><Link to="/bisection">Bisection</Link></li>
                    <li><Link to="/falseposition">False-Position</Link></li>
                    <li><Link to="/onepoint">One-Point Iteration</Link></li>
                    <li><Link to="/newtonraphson">Newton-Raphson</Link></li>
                    <li><Link to="/secant">Secant</Link></li>
                    </ul>
                </li>
                <li>Linear Algebraic Equation
                    <ul className="dropdown">
                    <li><Link to="/cramers-ruls">Cramer's Rule</Link></li>
                    <li><Link to="/gauss-elimination">Gauss Elimination</Link></li>
                    <li><Link to="/gauss-jordan">Gauss-Jodan</Link></li>
                    <li><Link to="/lu-decomposition">LU Decomposition</Link></li>
                    <li><Link to="/cholesky-decomposition">Cholesky decomposition</Link></li>
                    <li><Link to="/jacobi-iteration">Jacobi Iteration</Link></li>
                    <li><Link to="/gauss-seidel">Gauss-Seidel Iteration</Link></li>
                    <li><Link to="/conjugate-gradient">Conjugate Gradient</Link></li>
                    </ul>
                </li>
                </ul>
            </nav>
        </div>
    </nav>
    );
}

export default Navbar