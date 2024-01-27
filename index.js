const app = require("./app");

const router = require('./routes');

const port = 3100

app.use('/',router)

app.listen(port, () =>{
    console.log(`Server running on port ${port}`)
})