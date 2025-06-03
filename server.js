const app = require('./app');
const connectDB = require('./config/db');
const cors=require('cors');

const PORT = process.env.PORT || 5000;

app.use(cors());

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
