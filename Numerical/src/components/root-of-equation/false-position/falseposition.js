/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Desmos from 'desmos'
import './falseposition.css'

import { create, all } from 'mathjs'

import { addStyles, EditableMathField } from 'react-mathquill' //eq input
addStyles()//eq input

const config = { }
const math = create(all, config)

const Falseposition = () => {

    var next = false
    let dataTable = []
    const [data, setData] = useState({
        xL:"",
        xR:"",
        check: false,
        result:0
    })

    const [Fxtext, setFxtext] = useState({
        Fx: "",
        Latex: ""
    })

    const [table,setTable] = useState("")

    const [formErrors,setformErrors] = useState({})
    const [isSubmit,setIsSubmit] = useState(false)

    const handleChange = ({currentTarget: input }) =>{
        setData({ ...data, [input.name]:input.value})
    }

    let scope = {x:0}
    const validate = (values,fxl,fxr) => {
        const errors = {}

        if(!values.xL){
            errors.xL = "กรุณากรอกค่า XL!"
        }
        if(!values.xR){
            errors.xR = "กรุณากรอกค่า XR!"
        }
        else if(fxl<0&&fxr<0){
            errors.xR = "fxl มีค่าน้อยกว่า 0 fxr ต้องมีค่ามากกว่า 0"
        }
        else if(fxl>0&&fxr>0){
            errors.xR = "fxl มีค่ามากกว่า 0 fxr ต้องมีค่าน้อยกว่า 0"
        }
        return errors
    }


    const handleSubmit = async(e) => {
        e.preventDefault()
        const resultFx = Fxtext.Fx
        console.log(resultFx)
        setData({
            xL:data.xL,
            xR:data.xR,
            check:true,
            result:0
        })
        
        const parseFx = math.parse(resultFx)
        const bisectionCompile = parseFx.compile()
        let xL = Number(data.xL),xR = Number(data.xR) ,xM,oxL,oxR
        let fxl,fxr,fxm
        let eps , y = 0.000001
        let loop = true
        let i=0

        const cal = (fxM,fxR) => {
            if(fxM * fxR < 0){
                eps = Math.abs((Number(xM) - Number(xL)) / xM)
                oxL = xL
                xL = xM
                console.log("epsilon = " + eps.toFixed(6) + "\n");
                if(i===0){
                    dataTable.push({
                        L: oxL.toFixed(6),
                        R: xR.toFixed(6),
                        M: xM.toFixed(6),
                        epsilon: '-'
                    })
                }
                else{
                    dataTable.push({
                        L: oxL.toFixed(6),
                        R: xR.toFixed(6),
                        M: xM.toFixed(6),
                        epsilon: eps.toFixed(6)
                    })
                }
            }
            else{ //มากกว่า 0
                eps = Math.abs((Number(xM) - Number(xR)) / xM)
                oxR = xR
                xR = xM
                console.log("epsilon = " + eps.toFixed(6) + "\n");
                if(i===0){
                    dataTable.push({
                        L: xL.toFixed(6),
                        R: oxR.toFixed(6),
                        M: xM.toFixed(6),
                        epsilon: '-'
                    })
                }
                else{
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
        fxl = bisectionCompile.evaluate(scope)
        scope.x = xR
        console.log(xR)
        fxr = bisectionCompile.evaluate(scope)
        if((fxl<0&&fxr>0)||(fxl>0&&fxr<0)){
            next = true
            while(loop){
                console.log('iteration' + i)
                scope.x = xL
                console.log(xL)
                fxl = bisectionCompile.evaluate(scope)
                scope.x = xR
                console.log(xR)
                fxr = bisectionCompile.evaluate(scope)
    
                console.log('fxl = ' + fxl + '\n' , 'fxr = ' + fxr)
                xM = ((xL*fxr)-(xR*fxl))/(fxr-fxl)
                console.log('X1 = ' + xM)
                scope.x = xM
                fxm = bisectionCompile.evaluate(scope)
                console.log('fxm = ' + fxm)
    
                cal(fxm,fxr)
    
                if(eps <= y) loop = false
                i++
            }
            setData({
                xL:data.xL,
                xR:data.xR,
                check:true,
                result:xM.toFixed(6)
            })
            createTable()
        }
        else{
            setData({
                xL:data.xL,
                xR:data.xR,
                check:false,
                result:0
            })
            next = false
        }
        setformErrors(validate(data,fxl,fxr))
        setIsSubmit(true)
        
    }

    const createTable  = () =>{
        setTable(<table className="table">
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
                {dataTable.map((data,i) => {
                    return (
                        <tr>
                            <td>{i+1}</td>
                            <td>{data.L}</td>
                            <td>{data.R}</td>
                            <td>{data.M}</td>
                            <td>{data.epsilon}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>)
    }
    

    useEffect(() => {

        if(data.check){
            const elt = document.getElementById('calculatorgraph')
            elt.innerHTML = ''
            const calculator = Desmos.GraphingCalculator(elt)
            calculator.setExpression({ id: 'graph1', latex: 'y=' + Fxtext.Latex})
            calculator.setExpression({ id: 'graph2', latex: '(' + data.result + ',' + 0 + ')'})
        }

        console.log(formErrors)
        if(Object.keys(formErrors).length === 0 && isSubmit){
            console.log(data)
        }

    },[data,Fxtext,formErrors,isSubmit])
    

    return (
        <div>
            <h2>False-Position</h2>
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
                        <h1 className="mt-3">X = {data.result} </h1>
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

export default Falseposition