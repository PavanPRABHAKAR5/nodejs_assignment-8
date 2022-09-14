const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
const studentArray = require("./InitialData");
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// your code goes here

let id = studentArray.length + 1;
app.get("/api/student", async (req, res) => {
  try {
    res.status(200).json({
      status: "successful",
      studentArray,
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
});

app.get("/api/student/:id", (req, res) => {
  try {
    const idx = studentArray.findIndex((obj) => 
    obj.id == req.params.id);
    if (idx == -1) {
      return res.status(404).json({
        status: "Failed",
        message: "id is invalid",
      });
    }

    res.status(200).json({
      status: "Successful",
      Data: studentArray[idx],
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
});

app.post("/api/student", (req, res) => {
  try {
    if (!req.body.name || !req.body.currentClass
       || !req.body.division) {
      return res.status(400).json({
        status: "Failed",
        message: "Incomplete data submitted",
      });
    }

        studentArray.push({
        id:id,
        name: req.body.name,
        currentClass: req.body.currentClass,
        division: req.body.division
    })
    id++;

    res.status(200).json({
        status: "Successful",
        id: id
    })

  } catch (err) {
    res.status(400).json({
        status: "Failed",
        message: err.message
    })
  }
});


app.put("/api/student/:id", (req, res) => {
    try {
      const idx = studentArray.findIndex((obj) => obj.id == req.params.id);
      if (idx == -1) {
        return res.status(404).json({
          status: "Failed",
          message: "id is invalid",
        });
      }

      if(req.body.name){
        studentArray[idx].name = req.body.name
      }
      if(req.body.currentClass){
        studentArray[idx].currentClass = req.body.currentClass
      }
      if(req.body.division){
        studentArray[idx].division = req.body.division
      }

      res.status(200).json({
        status: "Successful",
        name: studentArray[idx].name,
      });
    } catch (err) {
      res.status(400).json({
        status: "Failed",
        message: err.message,
      });
    }
  });
  
  app.delete("/api/student/:id", (req, res) => {
    try {
      const idx = studentArray.findIndex((obj) => obj.id == req.params.id);
      if (idx == -1) {
        return res.status(404).json({
          status: "Failed",
          message: "id is invalid",
        });
      }

      studentArray.splice(idx,1)
      res.status(200).json({
        status: "Successful",
        message: "Deleted Successfully",
      });
    } catch (err) {
      res.status(404).json({
        status: "Failed",
        message: err.message,
      });
    }
  });


app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
