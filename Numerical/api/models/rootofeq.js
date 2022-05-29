const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const rootofEQSchema = new mongoose.Schema({
    Title: { type: String, required: true },
    Fx: { type: String, required: true },
    Latex: { type: String, required: true }
}, { collection: 'randomfx' })

rootofEQSchema.methods.generateJWT = function () {
    const token = jwt.sign({ _id: this._id, Title: this.Title, Fx: this.Fx, Latex: this.Latex }, process.env.JWTPRIVATEKEY, { expiresIn: '3m'})
    return token
}

module.exports = mongoose.model('rootofEQSchema', rootofEQSchema)