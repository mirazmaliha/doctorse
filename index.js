const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
const PORT = process.env.PORT || 8080;
const {ObjectId} = require('mongodb');

const app = express();
app.use(cors())
app.use(express.json())
// MongoDB URI
const uri = "mongodb+srv://doctorseproject:doctorse%25Miraz@mongopractis.kqnm9sk.mongodb.net/?retryWrites=true&w=majority&appName=mongoPractis";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
client.connect()
  .then(() => {
    console.log("✅ MongoDB connected successfully!");
    const userAppoitmentCollection = client.db("doctorse").collection("userAppoitment");
  
     app.post('/userAppoitment', (req, res)=> {
        const data = req.body;
        console.log(data)
        userAppoitmentCollection.insertOne(data)
        .then(result => {
            res.json('successfully');
            console.log(result)
        })
        .catch(err => {
            res.status(5000);
        })
     })
       app.get('/myAppoitment', (req, res)=> {
      const email = req.query.email;
      console.log(email)
      userAppoitmentCollection.find({email:email}).toArray()
      .then(result => {
        res.json(result)
      })
      .catch(err => {
        res.status(500)
      })
     })
     
    app.get('/', (req, res)=> {
      res.json({meassage:'welcome'})
    })
   
    // Start server after DB connected
    app.listen(PORT, () => {
      console.log("🚀 Server is running on port 8080");
    });
  })
  .catch(error => {
    console.error("MongoDB connection error:", error);
  });