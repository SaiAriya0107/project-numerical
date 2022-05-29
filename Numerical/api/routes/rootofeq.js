const router = require('express').Router()
const rootofEQSchema = require('../models/rootofeq')
const jwt = require('jsonwebtoken')

router.post('/auth_datatoken', async (req, res) => {
    try{
        const jwt_res = jwt.verify(req.body.token,process.env.JWTPRIVATEKEY)
        return res.status(200).send({token: jwt_res})
    }catch (error) {
        return res.status(404).send('token_exp')
    }
})

router.get('/randomfx/:Title', async (req, res) => {
    const getRootofeq = await rootofEQSchema.aggregate(
        [
            { $match: { Title: req.params.Title}},
            { $sample: { size: 1 } }
        ]
    )
    if(getRootofeq.length > 0) {
        const find_ = await rootofEQSchema.findOne({
            _id: getRootofeq[0]._id
        })
        if(find_){
            const token = find_.generateJWT()
            return res.status(200).send({token: token, data: find_})
        }
    }
    else{
        return res.status(200).send("token")
    }  
})

router.post('/savefx', async (req, res) => {
    const { Title ,Fx, Latex } = req.body
    console.log(req.body)
    const rootofChecking = await rootofEQSchema.findOne({
        Title: Title,
        Fx: Fx,
        Latex: Latex
    })

    if(rootofChecking) res.status(409).send({ message: 'สมการนี้ถูกบันทึกอยู่ประวัติเรียบร้อยแล้ว' })
    else {
        const result = await rootofEQSchema.create({
            Title,
            Fx,
            Latex
        })

        return res.status(200).send(result)
    }
})

module.exports = router