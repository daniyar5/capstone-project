import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"));


app.use(bodyParser.urlencoded({ extended: true }));

var posts = []
var edited = false

app.get("/", (req, res) => {
    res.render("index.ejs", {mylist: posts});
});

app.post("/", (req, res) => {
    var newPost = req.body["newPost"];
    if (newPost) {
        posts.push(newPost);
    }
    res.redirect('/');
});

app.post("/edit", (req, res) => {
    var index = req.body["index"];
    res.render("edit.ejs", { reqIndex: index, postContent: posts[index] });
});

app.post("/update", (req, res) => {
    var index = req.body["index"];
    var updatedPost = req.body["editPost"];
    if (index !== undefined && updatedPost) {
        posts[index] = updatedPost;
    }
    res.redirect('/');
});

app.post("/delete", (req, res) =>{
    var index = req.body["index"];
    posts.splice(index, 1)
    res.redirect('/');

})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});