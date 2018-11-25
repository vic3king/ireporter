/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
import express from 'express';
import User from './src/controllers/User';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/ireporter/v1/front-end', express.static('UI'));

app.post('/api/v1/user', User.create);

// server
app.listen(port, () => {
  console.log(`Server Started On Port ${port}`);
});

export default app;
