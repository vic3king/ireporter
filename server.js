/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
import express from 'express';
import User from './src/controllers/user';
import Record from './src/controllers/record';
import Validate from './src/middleware/validate';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/', express.static('UI'));

app.post('/api/v1/user', User.createUser);
app.post('/api/v1/record', Validate.postRecord, Record.createRecord);
app.get('/api/v1/records', Record.getAllRecords);
app.get('/api/v1/records/:id', Validate.getArecord, Record.getOneRecord);
app.put('/api/v1/:id/location', Validate.updateLocation, Record.updatedLocation);
app.put('/api/v1/:id/comment', Validate.updateComment, Record.updatedComment);
app.delete('/api/v1/record/:id', Validate.deleteOneRecord, Record.deleteOneRecord);

// server
app.listen(port, () => {
  console.log(`Server Started On Port ${port}`);
});

export default app;
