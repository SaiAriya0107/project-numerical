import React, { useEffect, useState } from "react";

import Desmos from 'desmos'//กราฟ
import './bisection.css'
import { create, all } from 'mathjs'//แปลงสมการ

import { addStyles, EditableMathField } from 'react-mathquill' //eq input
import axios from "axios" //ดึง API (volley)
addStyles()//eq input

const config = {}
const math = create(all, config)//mathjs

const Bisection = () => {
    let dataTable = []
    const [table, setTable] = useState("")
    const [formErrors, setformErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    //สำหรับคำนวน
    const [data, setData] = useState({
        xL: "",
        xR: "",
        result: false,
        sum: 0,
    })

    //สำหรับtoken
    const [Fxtext, setFxtext] = useState({
        Title: "Bisection",
        Fx: "",
        Latex: ""
    })

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    let scope = { x: 0 }
    const validate = (values, fxl, fxr) => {
        const errors = {}

        if (!values.xL) {
            errors.xL = "กรุณากรอกค่า XL!"
        }
        if (!values.xR) {
            errors.xR = "กรุณากรอกค่า XR!"
        }
        else if (fxl < 0 && fxr < 0) {
            errors.xR = "fxl มีค่าน้อยกว่า 0 fxr ต้องมีค่ามากกว่า 0"
        }
        else if (fxr > 0 && fxl > 0) {
            errors.xR = "fxl มีค่ามากกว่า 0 fxr ต้องมีค่าน้อยกว่า 0"
        }
        return errors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const resultFx = Fxtext.Fx
        setData({
            xL: data.xL,
            xR: data.xR,
            result: true,
            sum: 0,
        })
        const parseFx = math.parse(resultFx) //parseFx : x ^ 4 - 13
        const bisectionCompile = parseFx.compile()

        console.log("parseFx : "+parseFx);
        console.log("bisectionCompile : "+bisectionCompile);

        let xL = Number(data.xL), xR = Number(data.xR), xM, oxL, oxR
        let fxL, fxR, fxM
        let eps, y = 0.000001
        let loop = true
        let i = 0
        const cal = (fxM, fxR) => {
            if (fxM * fxR < 0) {
                eps = Math.abs((Number(xM) - Number(xL)) / xM)
                oxL = xL
                xL = xM
                console.log("epsilon = " + eps.toFixed(6) + "\n");
                if (i === 0) {
                    dataTable.push({
                        L: oxL.toFixed(6),
                        R: xR.toFixed(6),
                        M: xM.toFixed(6),
                        epsilon: '-'
                    })
                }
                else {
                    dataTable.push({
                        L: oxL.toFixed(6),
                        R: xR.toFixed(6),
                        M: xM.toFixed(6),
                        epsilon: eps.toFixed(6)
                    })
                }
            }
            else { //มากกว่า 0
                eps = Math.abs((Number(xM) - Number(xR)) / xM)
                oxR = xR
                xR = xM
                console.log("epsilon = " + eps.toFixed(6) + "\n");
                if (i === 0) {
                    dataTable.push({
                        L: xL.toFixed(6),
                        R: oxR.toFixed(6),
                        M: xM.toFixed(6),
                        epsilon: '-'
                    })
                }
                else {
                    dataTable.push({
                        L: xL.toFixed(6),
                        R: oxR.toFixed(6),
                        M: xM.toFixed(6),
                        epsilon: eps.toFixed(6)
                    })
                }
            }
        }
        scope.x = xL
        console.log(xL)
        fxL = bisectionCompile.evaluate(scope) //แทนค่าscopeลงในสมการ
        scope.x = xR
        console.log(xR)
        fxR = bisectionCompile.evaluate(scope)
        if ((fxL < 0 && fxR > 0) || (fxL > 0 && fxR < 0)) {
            console.log("fxL = " + fxL + " and fxR = " + fxR + "")
            while (loop) {
                console.log("Interation: " + i);
                scope.x = xL
                console.log(xL)
                fxL = bisectionCompile.evaluate(scope)
                scope.x = xR
                console.log(xR)
                fxR = bisectionCompile.evaluate(scope)

                console.log("f(xL) = " + fxL.toFixed(6) + "\n", "f(xR) = " + fxR.toFixed(6))

                xM = (Number(xL) + Number(xR)) / 2;
                console.log("xM = " + xM.toFixed(6));

                scope.x = xM
                fxM = bisectionCompile.evaluate(scope)
                console.log("f(xM) = " + fxM.toFixed(6));

                cal(fxM, fxR)

                if (eps >= ((-1) * y) && eps <= y) loop = false
                i++
                console.log(" ");
                console.log(" ");
            }

            setData({
                xL: data.xL,
                xR: data.xR,
                result: true,
                sum: xM.toFixed(6),
            })
            createTable()
        } else if (fxL === 0) {
            setData({
                xL: data.xL,
                xR: data.xR,
                result: true,
                sum: xL.toFixed(6),
            })
        }
        else if (fxR === 0) {
            setData({
                xL: data.xL,
                xR: data.xR,
                result: true,
                sum: xR.toFixed(6),
            })
        }
        else {
            setData({
                xL: data.xL,
                xR: data.xR,
                result: false,
                sum: 0,
            })
        }

        setformErrors(validate(data, fxL, fxR))
        setIsSubmit(true)
        const resdata = ({
            Title: "Bisection",
            Fx: resultFx,
            Latex: Fxtext.Latex
        })
        console.log(resdata.Fx, resdata.Latex)

        console.log(resdata)
        try {
            const url = "http://localhost:4000/api/rootofeq/savefx"
            const { data: res } = await axios.post(url, resdata)
            console.log(res)

        } catch (error) {
            if (
                error.response.status >= 400 &&
                error.response.status <= 500
            ) console.log(error.response.data)
        }
    }
    const createTable = () => {
        setTable(
            <div>
                <table class="table table-sm">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">Iteration</th>
                            <th scope="col">XL</th>
                            <th scope="col">XR</th>
                            <th scope="col">XM</th>
                            <th scope="col">Epsilon</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataTable.map((data, i) => {
                            return (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{data.L}</td>
                                    <td>{data.R}</td>
                                    <td>{data.M}</td>
                                    <td>{data.epsilon}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
    useEffect(() => {
        AuthToken()
        if(data.result){
            const elt = document.getElementById('calculatorgraph')
            elt.innerHTML = ''
            const calculator = Desmos.GraphingCalculator(elt)
            const fx = 'y=' + Fxtext.Latex
            console.log("useef fx: "+ fx)
            calculator.setExpression({ id: 'graph1', latex: fx})
            calculator.setExpression({ id: 'graph2', latex: '(' + data.sum + ',' + 0 + ')'})

        }
        console.log(formErrors)
        if(Object.keys(formErrors).length === 0 && isSubmit){
            console.log(data)
        }
    },[data,Fxtext, formErrors, isSubmit])

    
    const AuthToken = async () => {
        try {
            const data_token = localStorage.getItem('data_token')
            console.log(data_token);
            const url = "http://localhost:4000/api/rootofeq/authtoken_data"
            const { data: res } = await axios.post(url, { token: data_token })

            setFxtext({
                Title: res.token.Title,
                Fx: res.token.Fx,
                Latex: res.token.Latex,
                fxrand: true
            })

        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                localStorage.removeItem("data_token")
                // Swal.fire('Token หมดอายุ')
            }
        }

    }

    const handleRandom = async (e) => {
        e.preventDefault()
        try {
            const url = "http://localhost:4000/api/rootofeq/randomfx/Bisection"
            const { data: res } = await axios.get(url, Fxtext)
            console.log(res)
            localStorage.setItem("data_token", res.token)
            // AuthToken()
            setFxtext({
                Title: res.data.Title,
                Fx: res.data.Fx,
                Latex: res.data.Latex
            })
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                console.log(error.response.data)
            }
        }
    }

    return (
        <div>
            <h2>Bisection</h2>
            <div className="container">
                <div className="row">
                    <div className="w-50">
                        <form onSubmit={handleSubmit}>
                            <div className="w-50 ">
                                <div className="col-auto">
                                    <label className="col-form-label m-auto">F(x)</label>
                                </div>
                                <div className="col-auto">
                                    <EditableMathField
                                        className="mathquill-example-field MathField-class w-75 p-2  border border-dark"
                                        latex={Fxtext.Latex}
                                        onChange={(mathField) => {
                                            setFxtext({
                                                Fx: mathField.text(),
                                                Latex: mathField.latex()
                                            })
                                        }}
                                        mathquillDidMount={(mathField) => {
                                            setFxtext({
                                                Fx: mathField.text(),
                                                Latex: mathField.latex()
                                            })
                                        }}
                                        style={{border: "0px", margin: "auto"}}
                                    />
                                    <button type="button" onClick={handleRandom} className="btn btn-success mt-3">Random</button>
                                </div>
                            </div>
                            <div className="w-50 ">
                                <div className="col-auto">
                                    <label className="col-form-label m-auto">XL</label>
                                </div>
                                <div className="col-auto">
                                    <input className="form-control" onChange={handleChange} value={data.xL} name="xL" placeholder="กรอกค่า XL"/>
                                </div>
                            </div>
                            <p>{formErrors.xL}</p>
                            <div className="w-50 ">
                                <div className="col-auto">
                                    <label className="col-form-label">XR</label>
                                </div>
                                <div className="col-auto">
                                    <input className="form-control" onChange={handleChange} value={data.xR} name="xR" placeholder="กรอกค่า XR"/>
                                </div>
                            </div>
                            <p>{formErrors.xR}</p>
                            <button type="submit" class="btn btn-primary">Submit</button>
                            <h1 className="mt-3">X = {data.sum} </h1>
                        </form>
                        
                    </div>
                    <div className="col w-25 ">
                        <div id="calculatorgraph" className="graph "></div><br />
                    </div>   
                </div>
            </div>
            
            <div className="container">
                <div className="row">  
                    <div className="col w-25 ">
                        {table}
                    </div> 
                </div>        
            </div>      
        </div>
    )
}

export default Bisection

