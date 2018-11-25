/* eslint-disable no-console */
import express from 'express';


const app = express();
const port = process.env.PORT || 3000;

app.use('/ireporter/v1/front-end', express.static('UI'));

// server
app.listen(port, () => {
  console.log(`Server Started On Port ${port}`);
});

export default app;
