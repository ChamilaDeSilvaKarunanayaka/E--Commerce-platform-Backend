import express from 'express';
import { getStudents, saveSTudents } from '../controllers/studentController.js';

const studentRouter = express.Router();

studentRouter.get("/", getStudents)

studentRouter.post("/", saveSTudents)

export default studentRouter;