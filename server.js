import express from 'express';
import 'babel-polyfill';
import routes from './src/routes/route';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/', express.static('UI'));

app.use(routes);

// server
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server Started On Port ${port}`);
});

export default app;
