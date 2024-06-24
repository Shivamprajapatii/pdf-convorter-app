const express = require('express')
const multer = require("multer");
const cors = require("cors");
const docToPdf = require("docx-pdf");
const path = require("path");


const app = express()
const port = 3000;

app.use(cors());

// Creating the Storage SeUp
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
})
  
const upload = multer({ storage: storage })

app.post('/word_to_pdf', upload.single('file'), (req, res, next) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                message : "Please Upload the File"
            }) 
        }

        let outpath = path.join(__dirname,"files",`${req.file.originalname}.pdf`);

        docToPdf(req.file.path,outpath,(err,result) =>{
            if(err){
              console.log(err);
              return res.status(500).json({
                message: "Error Converting docx to pdf"
              })
            }
            res.download(outpath, () => {
                console.log("File Downloaded Successfully");
            });
          });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
          })
    }
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})