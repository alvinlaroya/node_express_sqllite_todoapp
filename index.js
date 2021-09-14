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
app.get("/api/todos", (req, res, next) => {
    var sql = "select * from todos"
    db.all(sql, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});


// Request for adding todo
app.post("/api/todo/", (req, res, next) => {
    var data = {
        title: req.body.title,
        desc: req.body.desc,
    }
    var sql ='INSERT INTO todos (title, desc) VALUES (?,?)'
    var params = [data.title, data.desc]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})

// Request for deleting todo
app.delete("/api/todo/remove/:id", (req, res, next) => {
    db.run(
        'DELETE FROM todos WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
    });
})

// Request for updating todo
app.patch("/api/todo/update/:id", (req, res, next) => {
    var data = {
        title: req.body.title,
        desc: req.body.desc,
    }
    db.run(
        `UPDATE todos set 
           title = COALESCE(?,title), 
           desc = COALESCE(?,desc)
           WHERE id = ?`,
        [data.title, data.desc, req.params.id],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
    });
})



// Default response for any other request
app.use(function(req, res){
    res.status(404);
});