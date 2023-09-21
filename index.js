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

      


        app.get('/categories/:id', async (req, res) => {
            const id = req.params;
            const query = { _id: new ObjectId(id) };
            const category = await categoriesCollection.findOne(query);
            res.send(category);

        })







        // post categories



        

       




        app.delete('/costs/:id', async (req, res) => {
            const id = req.params;
            const filter = { _id: new ObjectId(id) }
            const result = await costsCollection.deleteOne(filter);
            res.send(result);
        })

        // get category name data


        app.get('/funds/:category', async (req, res) => {
            const category = req.params.category;
            const filter = { category: category }
            const result = await fundsCollection.find(filter).toArray();
            res.send(result);
        })

        // get categories from email

        app.get('/fundss/:user', async (req, res) => {
            const user = req.params.user;
            const filter = { user: user }
            const result = (await fundsCollection.find(filter).sort({ "_id": -1 }).toArray());
            res.send(result);
        })


       






        app.get('/costs/:category', async (req, res) => {
            const category = req.params.category;
            const filter = { category: category }
            const result = await costsCollection.find(filter).toArray();
            res.send(result);
        })


        // update value



        app.put('/categories/:name/:user', async (req, res) => {
            const name = req.params.name;
            const user = req.params.user;
            const value = req.body;
            const filter = { name: name, user: user };
            const options = { upsert: true }
            const updateDoc = {
                $set: value,
            }
            const result = await categoriesCollection.updateOne(filter, updateDoc, options);

            // console.log(result)

            res.send(result);
        })


        // post new funds

        app.post('/funds', async (req, res) => {
            const category = req.body;
            const result = await fundsCollection.insertOne(category);
            res.send(result);
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