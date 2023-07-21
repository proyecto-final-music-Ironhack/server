const app = require("./app");

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5005
const PORT = process.env.PORT || 8080;

let server = app.listen(PORT, "0.0.0.0", function () {
  console.log("App listening on port " + server.address().port);
});
