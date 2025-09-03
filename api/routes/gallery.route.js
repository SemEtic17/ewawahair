import express from 'express';
import { getGallerys, createGallery, updateGallery, deleteGallery } from '../controllers/gallery.controller.js';

const router = express.Router();


// Gallery CRUD for admin
router.get('/getgallerys', getGallerys);
router.post('/', createGallery);
router.put('/:id', updateGallery);
router.delete('/:id', deleteGallery);

export default router;