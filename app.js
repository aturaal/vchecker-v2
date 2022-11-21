const { Console } = require('console');
const express = require('express')
const app = express();
const fileUpload = require('express-fileupload')
const path = require('path')
const csv = require('csv-parser')
const fs = require('fs')
const results = []



app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "html.html"));
});

app.post('/upload',
    fileUpload({ createParentPath: true }),
    (req, res) => {
        const files = req.files
        console.log(files)

        Object.keys(files).forEach(key => {
            const filepath = path.join(__dirname, 'files', files[key].name)
            files[key].mv(filepath, (err) => {
                if (err) return res.status(500).json({ status: "error", message: err })
            })
        })
        
    
        

        return res.json({ status: 'success', message: results , message: Object.keys(files).toString() })
     

    }
)

const PORT = process.env.PORT || 3110

app.listen(PORT, () => console.log(`This seğver is listening on: ${PORT}`));



