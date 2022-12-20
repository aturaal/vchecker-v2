const express = require('express')
const app = express();
const path = require('path')
const multer = require('multer');
const fs = require('fs');
const { json } = require('express');
const results = []
const upload = multer();
const papa = require('papaparse');
const csvFilePath = 'files/csvfile.csv'
const { emitWarning } = require('process');
const knex = require("knex");
const bodyParser = require("body-parser");
const checkResults = []

app.use(bodyParser.json({
  limit: "11MB"
}));
app.use(bodyParser.urlencoded({ extended: false }));


const server = require("http").createServer(app);



const database = knex({
  client: "postgresql",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "annen12",
    database: "postgres",
    port: "5432",
  },
  useNullAsDefault: true,
});

const router = express.Router();
module.exports = router;




app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "html.html"));
});



app.post('/upload',
    upload.any('files', 10),
    (req, res) => {
    	
        const files = req.files
        files.map((file, index) => {
          let csv = new Buffer(files[0].buffer, 'base64').toString('ascii');
          fs.writeFile('files/csvfile.csv' , files[0].buffer, 'utf8' , function(err, files) {
            if (err) console.log('error', err);

          })
          
          const content = file.buffer.toString("utf-8");
          
          papa.parse(content, {
	    header: true,
	    complete: results => {
	      console.log (content)
	    }
      
          });
        })

    }
    
)

app.get('/deneme' , (req, res) => {

  res.send(results)
})




const PORT = process.env.PORT || 3110

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



