/* eslint-disable no-unused-vars */
import React, {useEffect , useState } from  "react";
import Desmos from 'desmos'
import './secant.css'

import { create, all } from 'mathjs'

import { addStyles, EditableMathField } from 'react-mathquill' //eq input
addStyles()//eq input

const config = {}
const math = create(all, config)



const Secant = () =>{

    var next = false
    let cx0 = true, cx1 = true
    let dataTable = []
    const [table,setTable] = useState("")
    const [formErrors,setformErrors] = useState({})
    const [isSubmit,setIsSubmit] = useState(false)
    const [data ,setData] = useState({
        x0:"",
        x1:"",
        Fx:"",
        result:false,
        sum:0
    })

    const [Fxtext, setFxtext] = useState({
        Fx: "",
        Latex: ""
    })

    const handleChange = ({ currentTarget: input}) =>{
        setData({ ...data,[input.name]: input.value})
    }

    let scope = {x:0}

    const validate = (values) =>{
        const errors = {}

        if(!values.x0){
            errors.x0 = "กรุณากรอกค่า X(0)!"
            cx0 = false
        }
        if(!values.x1){
            errors.x1 = "กรุณากรอกค่า X(1)!"
            cx1 = false
        }
        return errors
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const resultFx = Fxtext.Fx
        const parseFx = math.parse(resultFx)
        const secantCompile = parseFx.compile()

        setformErrors(validate(data))
        setIsSubmit(true)
        const findx = (x0,x1) =>{
            scope.x = x0
            let fx0 = secantCompile.evaluate(scope)
            scope.x = x1
            let fx1 = secantCompile.evaluate(scope)
            return (x0-(fx0*(x0-x1)))/(fx0-fx1)
        }
        let x0 = Number(data.x0)
        let x1 = Number(data.x1)
        let y = 0.000001
        let xnew = 0
        let check = 0
        let x00 = 0
        if(cx0 && cx1){
            do{
                xnew = findx(x0,x1)
                x00 = x0
                x0 = x1
                scope.x = xnew
                check = Math.abs(secantCompile.evaluate(scope))
                dataTable.push({
                    x0: x00.toFixed(6),
                    x1: x1.toFixed(6),
                    X: xnew.toFixed(6),
                    epsilon: check.toFixed(6)
                })
            }while(check > y)
            setData({
                x0: data.x0,
                x1: data.x1,
                Fx: resultFx,
                result: true,
                sum: xnew.toFixed(6)
            })
            next = true
            createTable()
        }
        else{
            setData({
                x0: data.x0,
                x1: data.x1,
                Fx: resultFx,
                result: false,
                sum: 0
            })
            next = false
        }
        
    }

    const createTable = () => {
        setTable(<table className="table">
            <thead className="table-dark">
                <tr>
                    <th scope="col">Iteration</th>
                    <th scope="col">X(0)</th>
                    <th scope="col">X(1)</th>
                    <th scope="col">X</th>
                    <th scope="col">Epsilon</th>
                </tr>
            </thead>
            <tbody>
                {dataTable.map((data,i)=>{
                    return (
                        <tr>
                            <td>{i+1}</td>
                            <td>{data.x0}</td>
                            <td>{data.x1}</td>
                            <td>{data.X}</td>
                            <td>{data.epsilon}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>)
    }


    useEffect(() => {

        if(data.result){
            const elt = document.getElementById('calculatorgraph')
            elt.innerHTML = ''
            const calculator = Desmos.GraphingCalculator(elt)
            const fx = 'y=' + Fxtext.Latex
            calculator.setExpression({id: 'graph1', latex: fx})
            calculator.setExpression({id: 'point', latex: '(' + data.sum + ',' + 0 + ')'})
        }

        console.log(formErrors)
        if(Object.keys(formErrors).length === 0 && isSubmit){
            console.log(data)
        }
    },[data,Fxtext,formErrors,isSubmit])

    return (
        <div>
            <h2>Secant</h2>
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
                                <label className="col-form-label m-auto">X0</label>
                            </div>
                            <div className="col-auto">
                                <input className="form-control" onChange={handleChange} value={data.x0} name="x0" placeholder="กรอกค่า X0"/>
                            </div>
                        </div>
                        <p>{formErrors.x0}</p>
                        <div className="w-50 ">
                            <div className="col-auto">
                                <label className="col-form-label">X1</label>
                            </div>
                            <div className="col-auto">
                                <input className="form-control" onChange={handleChange} value={data.x1} name="x1" placeholder="กรอกค่า X1"/>
                            </div>
                        </div>
                        <p>{formErrors.x1}</p>
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

export default Secant
