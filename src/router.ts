import { Router } from 'express';
import { body, validationResult, oneOf, check, query, param } from 'express-validator';
import { handleInputErrors } from './modules/errors';
import { getProduct, getProducts, createProduct, updateProduct, deleteProduct } from './handlers/product';
import { createUpdate, deleteUpdate, getUpdate, getUpdates, updateUpdate } from './handlers/update';

const router = Router();

// Products

router.get('/product', getProducts);
router.get('/product/:id', param('id').exists(), handleInputErrors, getProduct);
router.post('/product', 
  body('name').isString(), 
  handleInputErrors, 
  createProduct);
router.put('/product/:id', 
  body('name').isString(), 
  handleInputErrors, 
  updateProduct);
router.delete('/product/:id', deleteProduct);

// Updates
router.get('/update', 
  body('productId'),
  handleInputErrors,
  getUpdates);
router.get('/update/:id', param('id').exists().isString(), getUpdate);
router.post('/update', 
  body('title').exists().isString(), 
  body('status').isIn(['IN_PROGRESS', 'DEPRECATED', 'SHIPPED']).optional(),
  body('version').optional(),
  body('productId').exists().isString(),
  handleInputErrors,
  createUpdate);
router.put('/update/:id', 
  body('title').optional(), 
  body('status').isIn(['IN_PROGRESS', 'DEPRECATED', 'SHIPPED']).optional(),
  body('version').optional(), 
  handleInputErrors,
  updateUpdate);
router.delete('/update/:id', 
  body('id').exists().isString(),
  handleInputErrors,
  deleteUpdate);

//  Update Points
router.get('/updatepoint', (req, res) => {});
router.get('/updatepoint/:id', (req, res) => {});
router.put('/updatepoint', 
  body('name').optional().isString(), 
  body('description').optional().isString(),
  handleInputErrors,
  (req, res) => {});
router.patch('/updatepoint/:id', 
body('name').isString(), 
body('description').isString(),
body('updatedId').isString().exists(),
(req, res) => {});
router.delete('/updatepoint/:id', (req, res) => {});

export default router;
