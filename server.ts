import express from 'express'

const app = express()

app.use('/',
    express.static('./dist')
)

app
    .listen(process.env.PORT || 3000, (err) => {
        if(err) console.error(err)

        console.log(`Frontend iniciado`)
    })