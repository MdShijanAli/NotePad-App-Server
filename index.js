const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();


// middleware
app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jqheb6c.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });





async function run() {

    try {
        const usersCollection = client.db("NotePadApp").collection("users");
        const notesCollection = client.db("NotePadApp").collection("notes");
        


      // Note Post

      app.post('/note', async (req, res) => {
        const note = req.body;
        const result = await notesCollection.insertOne(note);
        res.send(result);
    })
      
      
       // get all Notes


       app.get('/notes', async (req, res) => {
        const query = {};
        const result = await notesCollection.find(query).toArray();
        res.send(result);
    })

      
// get single note

        app.get('/note/:id', async (req, res) => {
            const id = req.params;
            const query = { _id: new ObjectId(id) };
            const result = await notesCollection.findOne(query);
            res.send(result);

        })

    //    delete single note

        app.delete('/note/:id', async (req, res) => {
            const id = req.params;
            const filter = { _id: new ObjectId(id) }
            const result = await notesCollection.deleteOne(filter);
            res.send(result);
        })


    //   update note

    app.put('/note/:id', async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) }
        const note = req.body;
        const option = { upsert: true }
        const updateReview = {
            $set: {
                description: note.description
            }
        }
        const result = await notesCollection.updateOne(filter, updateReview, option)
        res.send(result)
    })

        

    }
    finally {

    }


}
run().catch(err => console.log(err));






app.get('/', (req, res) => {
    res.send('NotePad Application Server Api Running')
})


app.listen(port, () => {
    console.log(`NotePadd Application Server is running on: ${port}`)
})