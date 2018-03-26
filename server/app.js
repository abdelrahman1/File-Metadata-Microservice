import express from "express"
import bodyParse from "body-parser"
import logger from "morgan"
import path from "path"
import multer from "multer"

/* App Init */
const app = express()
const upload = multer()

/* Middleware */

//static folder
app.use(express.static(path.join(__dirname, "../public")))

//logger
if (process.env.NODE_ENV === "dev") app.use(logger("dev"))

//routes
app.get("/", (req, res, next) => {
  res.sendFile("index.html")
})

app.post("/getfilesize", upload.single("file"), (req, res, next) => {
  res.status(200).json({
    size: req.file.size || null
  })
})

//catch 404 && handleError
app.use((req,res,next)=>{
  const err = new Error("Not Found")
  err.status = 404
  next(err)
}, (req,res,next)=>{
  res.status(err.status || 500).json({
    error: {
      message: err.message
    }
  })
  if (process.env.NODE_ENV === "dev") console.log(`error: ${err.message}`)
})

export default app
