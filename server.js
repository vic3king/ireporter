/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
import express from 'express';
import User from './src/controllers/user';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/', express.static('UI'));

app.post('/api/v1/user', User.createUser);
app.post('/api/v1/record', User.createRecord);
app.get('/api/v1/records', User.getAllRecords);
app.get('/api/v1/records/:id', User.getOneRecord);
app.put('/api/v1/:id/location', User.updatedLocation);
app.put('/api/v1/:id/comment', User.updatedComment);
// server
app.listen(port, () => {
  console.log(`Server Started On Port ${port}`);
});

export default app;
