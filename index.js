const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const app = express()
const port = 5000

// Middleware
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const uri = "mongodb+srv://zillurhero40:wUFi7nB9M8P2mGeb@cluster0.vwebhjn.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        console.log('database is connected succeessfully 🔥');
        const coffeesCollection = client.db("Coffee-Buddy").collection("coffees")
        const reviewsCollection = client.db("Coffee-Buddy").collection("reviews")

        // Api
        // get all coffees
        app.get('/coffees', async (req, res) => {
            const query = {}
            const cursor = coffeesCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })

        // get coffees by id
        app.get('/coffees/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const coffee = await coffeesCollection.findOne(query)
            res.send(coffee)
        })



        // get all reviews
        app.get('/reviews', async (req, res) => {
            const query = {}
            const cursor = reviewsCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })
    } catch (err) {
        console.log(err);
    }
}
run()

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})