import express from 'express';
import Validate from '../middleware/validate';
import dbRecordsController from '../controllers/records';
import Auth from '../middleware/auth';
import User from '../controllers/user';

const router = express.Router();

const postMiddleware = [
  Validate.postRecord,
  Validate.validLocation,
  Auth.verifyToken,
];

router.post('/api/v2/incidents', postMiddleware, dbRecordsController.createRecord);

const getMiddleware = [
  Auth.verifyToken,
  Validate.isAdmin,
];
router.get('/api/v2/incidents/', getMiddleware, dbRecordsController.getAllRecords);

router.get('/api/v2/incidents/mine', Auth.verifyToken, dbRecordsController.getAllRecordsMine);

router.get('/api/v2/incidents/type/:type', getMiddleware, dbRecordsController.findByType);

router.get('/api/v2/incidents/:id', Auth.verifyToken, dbRecordsController.getOneRecord);

router.put('/api/v2/incidents/:id/location', Validate.validLocation, Auth.verifyToken, dbRecordsController.updateLocation);

router.put('/api/v2/incidents/:id/comment', Auth.verifyToken, dbRecordsController.updateComment);

router.put('/api/v2/incidents/:id/status', Auth.verifyToken, Validate.isAdmin, dbRecordsController.updateStatus);

router.delete('/api/v2/incidents/:id', Auth.verifyToken, dbRecordsController.delete);

router.post('/api/v2/auth/signup', Validate.isValidInput, User.createUser);

router.post('/api/v2/auth/login', User.login);

router.all('*', (req, res) => {
  res.status(400).send({
    status: 400,
    message: 'invalid route',
  });
});

export default router;
