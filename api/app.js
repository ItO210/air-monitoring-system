const express = require('express')
const envData = require('./routes/envData.js')
const userData = require('./routes/userData.js')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000

//se encarga de que el app reconozca el formato json en los datos de request
app.use(express.json())

app.use(cors({
    origin: (origin, callback) => {
        const VALID_DOMAINS =[
            "http://127.0.0.1:5501",
            "http://127.0.0.1:5500"
        ]

        if(VALID_DOMAINS.includes(origin)){
            return callback(null, true)
        }

        if(!origin){
            return callback(null, true)
        }

        return callback(new Error("No permitido"))
    }
}))

app.use('/envData', envData)
app.use('/userData', userData)

app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`)
})