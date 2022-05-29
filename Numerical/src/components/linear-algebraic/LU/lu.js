import React, { useState } from "react"
import './lu.css'
import { create, all} from 'mathjs'

const config = { }
const math = create(all, config)
const Lu = () => {
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

        let y1,y2,y3
        let x1,x2,x3
        // if(m === 2){
        // }
        // else if(m === 3){
        // }
        const LYB = () =>{
            y1 = B11/L11
            y2 = (B21-(y1*L21))/L22
            y3 = (B31-((y2*L32)+(y1*L31)))/L33
            console.log(y1.toFixed(6),y2.toFixed(6),y3.toFixed(6))
        }    
        
        const UXY = () =>{
            x3 = y3/U33
            x2 = y2-(x3*U23)
            x1 = y1-((x3*U13)+(x2*U12))
            console.log(x1.toFixed(6),x2.toFixed(6),x3.toFixed(6))
        }
        
        
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
        let L11,L12,L13,L21,L22,L23,L31,L32,L33
        let U11,U12,U13,U21,U22,U23,U31,U32,U33
        L11 = A11
        L21 = A21
        L31 = A31
        U12 = A12/L11
        U13 = A13/L11
        L22 = A22-(L21*U12)
        L32 = A32-(L31*U12)
        U23 = (A23-(L21*U13))/L22
        L33 = A33-(L31*U13)-(L32*U23)
        // L23 = 0
        // L12 = 0
        // L13 = 0
        // U11 = 1
        // U22 = 1
        U33 = 1
        // U21 = 0
        // U31 = 0
        // U32 = 0

        
        LYB()
        UXY()
        setAns({
            X1: x1.toFixed(6),
            X2: x2.toFixed(6),
            X3: x3.toFixed(6)
        })
    }

   

    return (
        <div>
            <div className="head"><h1>LU Decomposition</h1></div>
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
                                <button type="submit" className="btn btn-success mt-3">Select</button>
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

export default Lu