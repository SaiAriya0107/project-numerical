import React, { useState } from "react"
import './gaussjordan.css'
// import { create, all} from 'mathjs'

// const config = { }
// const math = create(all, config)
const Gaussjordan = () => {
    const [data,setData] = useState({
        A11: "",
        A12: "",
        A13: "",
        A21: "",
        A22: "",
        A23: "",
        A31: "",
        A32: "",
        A33: "",
        B11: "",
        B21: "",
        B31: "",
        result: false,
        matrix: ""
    })

    const [ans,setAns] = useState({
        X1: "",
        X2: "",
        X3: ""
    })


    const handleChange = ({ currentTarget: input}) =>{
        setData({ ...data,[input.name]: input.value})  
    }

    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setData({
            A11: data.A11,
            A12: data.A12,
            A13: data.A13,
            A21: data.A21,
            A22: data.A22,
            A23: data.A23,
            A31: data.A31,
            A32: data.A32,
            A33: data.A33,
            B11: data.B11,
            B21: data.B21,
            B31: data.B31,
            result: false,
            matrix: data.matrix
        })
        let m = Number(data.matrix)
        console.log("m  = " + m)

        // if(m === 2){
            
        // }
        // else if(m === 3){
            
        // }
        let A11 = Number(data.A11)
        let A12 = Number(data.A12)
        let A13 = Number(data.A13)
        let A21 = Number(data.A21)
        let A22 = Number(data.A22)
        let A23 = Number(data.A23)
        let A31 = Number(data.A31)
        let A32 = Number(data.A32)
        let A33 = Number(data.A33)
        let B11 = Number(data.B11)
        let B21 = Number(data.B21)
        let B31 = Number(data.B31)
        for(let i=0;i<3;i++){
            if(A21!==0||A21!==(-0)){
                let a11,a12,a13,a21,a22,a23
                let b11,b21
                a11 = A11*A21
                a12 = A12*A21
                a13 = A13*A21
                b11 = B11*A21
                a21 = A21*A11
                a22 = A22*A11
                a23 = A23*A11
                b21 = B21*A11
                A21 = a11-a21
                A22 = a12-a22
                A23 = a13-a23
                B21 = b11-b21
                console.log(A21,A22,A23,B21)
            }
            else if(A31!==0||A31!==(-0)){
                let a11,a12,a13,a31,a32,a33
                let b11,b31
                a11 = A11*A31
                a12 = A12*A31
                a13 = A13*A31
                b11 = B11*A31
                a31 = A31*A11
                a32 = A32*A11
                a33 = A33*A11
                b31 = B31*A11
                A31 = a11-a31
                A32 = a12-a32
                A33 = a13-a33
                B31 = b11-b31
                console.log(A31,A32,A33,B31)
            }
            else if(A32!==0||A32!==(-0)){
                let a21,a22,a23,a31,a32,a33
                let b21,b31
                a21 = A21*A32
                a22 = A22*A32
                a23 = A23*A32
                b21 = B21*A32
                a31 = A31*A22
                a32 = A32*A22
                a33 = A33*A22
                b31 = B31*A22
                A31 = a21-a31
                A32 = a22-a32
                A33 = a23-a33
                B31 = b21-b31 
                console.log(A31,A32,A33,B31)
            }
        }
        for(let j=0; j<3 ; j++){
            if(A23!==0||A23!==(-0)){
                let a33,a22,a23
                let b31,b21
                a33 = A33*A23
                b31 = B31*A23
                a23 = A23*A33
                a22 = A22*A33
                b21 = B21*A33
                A22 = 0-a22
                A23 = a33-a23
                B21 = b31-b21
                console.log(A21,A22,A23,B21)
            }
            else if(A13!==0||A13!==(-0)){
                let a11,a12,a13,a33
                let b11,b31
                a11 = A11*A33
                a12 = A12*A33
                a13 = A13*A33
                b11 = B11*A33
                a33 = A33*A13
                b31 = B31*A13
                A11 = 0-a11
                A12 = 0-a12
                A13 = a33-a13
                B11 = b31-b11
                console.log(A11,A12,A13,B11)
            }
            else if(A12!==0||A12!==(-0)){
                let a22,a11,a12,a13
                let b21,b11
                a22 = A22*A12
                b21 = B21*A12
                a11 = A11*A22
                a12 = A12*A22
                a13 = A13*A22
                b11 = B11*A22
                A11 = 0-a11
                A12 = a22-a12
                A13 = 0-a13
                B11 = b21-b11 
                console.log(A11,A12,A13,B11)
        
            }
        }
        setAns({
            X3: B31/A33,
            X2: B21/A22,
            X1: B11/A11
        })
    }

   

    return (
        <div>
            <br />
            <form onSubmit={handleSubmit}>
                <div className="container">
                    <div>Matrix</div>
                    <div className="row w-25 m-3">
                        <div className="col">
                            <input className="form-control" onChange={handleChange} value={data.matrix} name="matrix" placeholder=""/>
                        </div>
                    </div>
                    <div>A</div>
                    <div className="row w-25 m-3">
                        <div className="col">
                            <input className="form-control" onChange={handleChange} value={data.A11} name="A11" placeholder=""/>
                        </div>
                        <div className="col">
                            <input className="form-control" onChange={handleChange} value={data.A12} name="A12" placeholder=""/>
                        </div>
                        <div className="col">
                            <input className="form-control" onChange={handleChange} value={data.A13} name="A13" placeholder=""/>
                        </div>
                    </div>
                    <div className="row w-25 m-3">
                        <div className="col">
                            <input className="form-control" onChange={handleChange} value={data.A21} name="A21" placeholder=""/>
                        </div>
                        <div className="col">
                            <input className="form-control" onChange={handleChange} value={data.A22} name="A22" placeholder=""/>
                        </div>
                        <div className="col">
                            <input className="form-control" onChange={handleChange} value={data.A23} name="A23" placeholder=""/>
                        </div>
                    </div>
                    <div className="row w-25 m-3">
                        <div className="col">
                            <input className="form-control" onChange={handleChange} value={data.A31} name="A31" placeholder=""/>
                        </div>
                        <div className="col">
                            <input className="form-control" onChange={handleChange} value={data.A32} name="A32" placeholder=""/>
                        </div>
                        <div className="col">
                            <input className="form-control" onChange={handleChange} value={data.A33} name="A33" placeholder=""/>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div>B</div>
                    <div className="colB">
                        <div className="col">
                            <div className="row">
                                <input className="form-control" onChange={handleChange} value={data.B11} name="B11" placeholder=""/>
                            </div>
                            <div className="row">
                                <input className="form-control" onChange={handleChange} value={data.B21} name="B21" placeholder=""/>
                            </div>
                            <div className="row">
                                <input className="form-control" onChange={handleChange} value={data.B31} name="B31" placeholder=""/>
                                <button type="submit" className="btn btn-success mt-3">CAL</button>
                            </div>
                        </div>
                    </div> 
                    <h3 className="mt-3">X1 = {ans.X1} </h3>
                    <h3 className="mt-3">X2 = {ans.X2} </h3>
                    <h3 className="mt-3">X3 = {ans.X3} </h3>
                </div>
            </form>     
        </div>
    )
}

export default Gaussjordan