import express from 'express';
import { saveResume, getResumes } from '../controllers/resumeControllers.js';

const router = express.Router();

router.post('/create', saveResume);
router.get('/list', getResumes);

export default router;
