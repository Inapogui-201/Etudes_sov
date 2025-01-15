import express from 'express';
import { getAllDestinations, getDestinationByTitle, newDestination, updateDestination, deleteDestination } from '../controllers/destination/DestinationController.js';
import { verifyAdmin } from '../middleware/verify.js';

const router = express.Router();

router.get('/', getAllDestinations);
router.get('/:title', verifyAdmin, getDestinationByTitle);
router.post('/new', verifyAdmin, newDestination);
router.put('/:title', verifyAdmin, updateDestination);
router.delete('/:title', verifyAdmin, deleteDestination);

export default router;
