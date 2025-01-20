import express from 'express';
import { VerifyAdmin } from '../middleware/verifyAdmin.js';
import { deleteDestination, getAllDestinations, newDestination } from '../controller/DestinationController.js';


const router = express.Router();

router.post('/new', VerifyAdmin, newDestination);
router.get('/', getAllDestinations);
router.delete("/delete/:title", deleteDestination)


export default router;
