import express from 'express';
import { VerifyAdmin } from '../middleware/verifyAdmin.js';
import { deleteDestination, getAllDestinations, newDestination, updateDestination } from '../controller/DestinationController.js';


const router = express.Router();

router.post('/new', VerifyAdmin, newDestination);
router.get('/', getAllDestinations);
router.delete("/delete/:title", VerifyAdmin, deleteDestination)
router.patch("/update/:title", VerifyAdmin, updateDestination)


export default router;
