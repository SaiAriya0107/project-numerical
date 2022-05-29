import './App.css';
import Navbar from './components/mainpage/topbar'
import Mainpage from './components/mainpage/mainpage'
import Bisection from './components/root-of-equation/bisection/bisection'
import Falseposition from './components/root-of-equation/false-position/falseposition'
import Onepoint from './components/root-of-equation/one-point/onepoint'
import Newton from './components/root-of-equation/newton-raphson/newton';
import Secant from './components/root-of-equation/secant/secant';
import Cramer from './components/linear-algebraic/cramers-rule/cramersrule';
import Gausselimination from './components/linear-algebraic/gauss-elimination/gausselimination'
import Gaussjordan from './components/linear-algebraic/gauss-jordan/gaussjordan';
import Lu from './components/linear-algebraic/LU/lu';
import Jacobi from './components/linear-algebraic/jacobi/jacobi';
import { Route , Routes } from 'react-router-dom'
import React from 'react'; 
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/bisection" element={<Bisection />} />
        <Route path="/falseposition" element={<Falseposition />} />
        <Route path="/onepoint" element={<Onepoint/>}/>
        <Route path="/newtonraphson" element={<Newton/>}/>
        <Route path="/secant" element={<Secant/>}/>
        <Route path="/cramers-ruls" element={<Cramer/>}/>
        <Route path="/gauss-elimination" element={<Gausselimination/>}/>
        <Route path="/gauss-jordan" element={<Gaussjordan/>}/>
        <Route path="/lu-decomposition" element={<Lu/>}/>
        <Route path="/jacobi-iteration" element={<Jacobi/>}/>
      </Routes>
    </div>
  );
}

export default App;
