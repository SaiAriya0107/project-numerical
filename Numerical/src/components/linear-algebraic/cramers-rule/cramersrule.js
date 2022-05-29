import React, { useState } from "react"
import './cramersrule.css'
import { create, all} from 'mathjs'

const config = { }
const math = create(all, config)
const Cramer = () => {
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

        if(m === 2){
            console.log("data.matrix = 2")
            const A = [[data.A11,data.A12],[data.A21,data.A22]]
            const detX1 = [[data.B11,data.A12],[data.B21,data.A22]]
            const detX2 = [[data.A11,data.B11],[data.A21,data.B21]]
            const X1 = math.det(detX1)/math.det(A)
            const X2 = math.det(detX2)/math.det(A)
            setAns({
                X1: X1.toFixed(6),
                X2: X2.toFixed(6)
            })
        }
        else if(m === 3){
            console.log("data.matrix = 3")
            const A = [[data.A11,data.A12,data.A13],[data.A21,data.A22,data.A23],[data.A31,data.A32,data.A33]]
            const detX1 = [[data.B11,data.A12,data.A13],[data.B21,data.A22,data.A23],[data.B31,data.A32,data.A33]]
            const detX2 = [[data.A11,data.B11,data.A13],[data.A21,data.B21,data.A23],[data.A31,data.B31,data.A33]]
            const detX3 = [[data.A11,data.A12,data.B11],[data.A21,data.A22,data.B21],[data.A31,data.A32,data.B31]]
            const X1 = math.det(detX1)/math.det(A)
            const X2 = math.det(detX2)/math.det(A)
            const X3 = math.det(detX3)/math.det(A)
            setAns({
                X1: X1.toFixed(6),
                X2: X2.toFixed(6),
                X3: X3.toFixed(6)
            })
        }
        console.log(ans)
    }

   

    return (
        <div>
            <div className="head"><h1>Cramer's Rule</h1></div>
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

export default Cramer