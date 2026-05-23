const app = require("./src/app");
const connectDatabase = require("./src/config/connectDatabse");
const config = require('./src/config/config');
connectDatabase();
app.listen(config.PORT,  () => {
  console.log(`Server running on port ${config.PORT}`);
});