import React, { useEffect, useState } from "react";
import Desmos from 'desmos'
import './onepoint.css'

import { create, all } from 'mathjs'

import { addStyles, EditableMathField } from 'react-mathquill' //eq input
addStyles()//eq input

const config = { }
const math = create(all, config)
const Onepoint = () => {
    let dataTable = []
    const [data, setData] = useState({
        x:0,
        Fx:0,
        check: false,
        result:0
    })
    const [Fxtext, setFxtext] = useState({
        Fx: "",
        Latex: ""
    })

    const [table,setTable] = useState("")

    const handleChange = ({currentTarget: input }) =>{
        setData({ ...data, [input.name]:input.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        
        let resultFx = Fxtext.Fx
        setData({
            x:data.x,
            Fx:resultFx,
            check:true,
            result:0
        })
        const parseFx = math.parse(resultFx)
        const onepointCompile = parseFx.compile()
        console.log(onepointCompile)
        let scope = {x:0}
        let x=Number(data.x)
        let y = 0.000001
        let i=0
        
        while(true){
            let oldx = x

            scope.x = x
            x = onepointCompile.evaluate(scope)
           
            let ab = Math.abs((x - oldx) / x)
            console.log(ab)
            if(ab <= y && ab >= -y) {
                console.log("ab = ",ab)
                console.log("x = " ,x)
                if(i===0){
                    dataTable.push({
                        xo: oldx.toFixed(6),
                        xn: x.toFixed(6),
                        epsilon: '-'
                    })
                }
                else{
                    dataTable.push({
                        xo: oldx.toFixed(6),
                        xn: x.toFixed(6),
                        epsilon: ab.toFixed(6)
                    })
                }
                setData({
                    x:data.x,
                    Fx:resultFx,
                    check:true,
                    result:x.toFixed(6)
                })
                break
            }
            else{
                if(i===0){
                    dataTable.push({
                        xo: oldx.toFixed(6),
                        xn: x.toFixed(6),
                        epsilon: '-'
                    })
                }
                else{
                    dataTable.push({
                        xo: oldx.toFixed(6),
                        xn: x.toFixed(6),
                        epsilon: ab.toFixed(6)
                    })
                }
                console.log("ab = ",ab)
                console.log("x = " ,x)
                console.log("round = " ,i++)
            }
        }
        createTable()
    }
    const createTable  = () =>{
        setTable(<table className="table">
            <thead className="table-dark">
                <tr>
                    <th scope="col">Iteration</th>
                    <th scope="col">X old</th>
                    <th scope="col">X new</th>
                    <th scope="col">Epsilon</th>
                </tr>
            </thead>
            <tbody>
                {dataTable.map((data,i) => {
                    return (
                        <tr>
                            <td>{i+1}</td>
                            <td>{data.xo}</td>
                            <td>{data.xn}</td>
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
            calculator.setExpression({ id: 'graph1', latex: 'y=' + Fxtext.Latex + '-x'})
            calculator.setExpression({ id: 'graph2', latex: '(' + data.result + ',' + 0 + ')'})
        }

    })
    

    return (
        <div>
            <h2>One-Point Iteration</h2>
            <div className="container">
                <div className="row">
                    <div className="w-50">
                        <form onSubmit={handleSubmit}>
                        <div className="w-50 ">
                            <div className="col-auto">
                                <label className="col-form-label m-auto">F(x)</label>
                            </div>
                            <div className="calcu">
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
                                <label className="col-form-label m-auto">X</label>
                            </div>
                            <div className="col-auto">
                                <input className="form-control" onChange={handleChange} value={data.x} name="x" placeholder="กรอกค่า X"/>
                            </div>
                        </div>
                        <div className="w-50 ">
                            <div className="col-auto">
                            <button type="submit" class="btn btn-primary">Submit</button>
                                <h1 className="mt-3">X = {data.result} </h1>
                            </div>
                        </div>
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

export default Onepoint