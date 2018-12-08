/* eslint-disable import/no-unresolved */
import express from 'express';
import User from './src/controllers/user';
import Record from './src/controllers/record';
import Validate from './src/middleware/validate';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/', express.static('UI'));

app.post('/api/v1/user', User.createUser);
app.post('/api/v1/red-flags', Validate.postRecord, Validate.validLocation, Record.createRecord);
app.get('/api/v1/red-flags', Record.getAllRecords);
app.get('/api/v1/red-flags/:id', Validate.isNotValid, Record.getOneRecord);
app.put('/api/v1/red-flags/:id/location', Validate.isNotValid, Validate.validLocation, Record.updatedLocation);
app.put('/api/v1/red-flags/:id/comment', Validate.isNotValid, Record.updatedComment);
app.delete('/api/v1/red-flags/:id', Validate.isNotValid, Record.deleteOneRecord);

// server
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server Started On Port ${port}`);
});

export default app;
