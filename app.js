const express = require('express');
const app = express();
const searchRoutes = require('./routes/searchRoutes');

app.use(express.json());
app.use('/api/search', searchRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});