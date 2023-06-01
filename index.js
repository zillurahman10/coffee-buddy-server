const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000

// Middleware
app.use(express.json())
app.use(cors())


const uri = process.env.PORT;

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
    } catch (err) {
        console.log(err);
    }
}
run().catch(console.dir);


// zillurhero40
// wUFi7nB9M8P2mGeb