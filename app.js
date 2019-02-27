const express = require('express')
const submit = require('./routes/submit')

const app = express()
const PORT = process.env.PORT || 4012
app.use(express.json())

app.use('/', submit)


app.listen(PORT, () => console.log(`Running on port ${PORT}`))
