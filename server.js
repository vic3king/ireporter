/* eslint-disable import/no-unresolved */
import express from 'express';
import 'babel-polyfill';
import dbRecordsController from './src/usingDB/controllers/records';
import User from './src/usingDB/controllers/user';
// import User from './src/controllers/user';
// import Record from './src/controllers/record';
import Validate from './src/middleware/validate';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/', express.static('UI'));

app.post('/api/v2/incidents/', Validate.postRecord, Validate.validLocation, dbRecordsController.createRecord);
app.get('/api/v2/incidents/', dbRecordsController.getAllRecords);
app.get('/api/v2/incidents/:id', dbRecordsController.getOneRecord);
app.put('/api/v2/incidents/:id/location', Validate.validLocation, dbRecordsController.updateLocation);
app.put('/api/v2/incidents/:id/comment', dbRecordsController.updateComment);
app.delete('/api/v2/incidents/:id', dbRecordsController.delete);
app.post('/api/v1/user', User.createUser);
app.all('*', (req, res) => {
  res.status(400).send({
    status: 400,
    message: 'invalid route',
  });
});
// app.post('/api/v1/red-flags', Validate.postRecord, Validate.validLocation, Record.createRecord);
// app.get('/api/v1/red-flags', Record.getAllRecords);
// app.get('/api/v1/red-flags/:id', Validate.isNotValid, Record.getOneRecord);
// app.put('/api/v1/red-flags/:id/location', Validate.isNotValid, Validate.validLocation, Record.updatedLocation);
// app.put('/api/v1/red-flags/:id/comment', Validate.isNotValid, Record.updatedComment);
// app.delete('/api/v1/red-flags/:id', Validate.isNotValid, Record.deleteOneRecord);

// server
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server Started On Port ${port}`);
});

export default app;
