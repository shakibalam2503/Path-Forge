/**
 * @dependencies All the required dependencies to run the server
 */
require("dotenv").config();
const dbConnect = require("./src/config/database");
const app = require("./src/app");
const {connectRedis} = require("./src/config/redis");

const port_number = process.env.PORT_NUMBER;

dbConnect();
connectRedis();



app.listen(port_number, () => {
  console.log("listening at port 5000");
});
