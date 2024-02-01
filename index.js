import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = process.env.PORT || 3000;
const API_URL = "https://ifsc.razorpay.com";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    res.render("index.ejs");
});

app.post("/getdetails", async (req, res)=>{
    const myIfsc = req.body.ifsc;
    try {
    const response = await axios.get(`${API_URL}/${myIfsc}`);
    res.render("index.ejs", {content: response.data});
    }
    catch(error){
        console.log(error);
        res.render("index.ejs", {error: "Please enter a valid IFS Code."});
    }
})

app.listen(port, ()=>{
    console.log(`Server started on port ${port};`);
});