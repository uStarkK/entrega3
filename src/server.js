const express = require("express")
const app = express()

const PORT = 8080

const ProductManager = require("./class.js")
const products = new ProductManager("./products.json")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get("/", (req, res, next) => {
    res.json("Hola Mundo")
})

app.get("/products", async (req, res, next) => {
    try {
        let limit = req.query.limit
        const data = await products.getAllProducts()
        const filteredData = limit ? data.slice(0, limit) : data
        res.status(200).json(filteredData)
    }
    catch (err) {
        throw new Error(err)
    }
})

app.get("/products/:pid", async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        const filteredData = await products.getProductByid(id);
        res.status(200).send(filteredData);
    } catch (err) {
        console.log(err);
    }
});



app.listen(PORT, () => {
    console.log("Example app1 listening on http://localhost:", PORT)
})
