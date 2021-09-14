// Create express app
var express = require("express")
var app = express()
var db = require("./database.js")
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// Server port
var HTTP_PORT = process.env.PORT || 5050; 
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

// Insert here other API endpoints

// Request for fetching todos




// Default response for any other request
app.use(function(req, res){
    res.status(404);
});