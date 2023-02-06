import { Router } from 'express';
import { body, validationResult, oneOf, check } from 'express-validator';
import { handleInputErrors } from './modules/errors';
import { getProduct, getProducts, createProduct, updateProduct, deleteProduct } from './handlers/product';
import { createUpdate, deleteUpdate, getUpdate, getUpdates, updateUpdate } from './handlers/update';

const router = Router();

// Products

router.get('/product', getProducts);
router.get('/product/:id', getProduct);
router.post('/product/:id', 
  body('name').isString(), 
  handleInputErrors, 
  createProduct);
router.patch('/product/:id', 
  body('name').isString(), 
  handleInputErrors, 
  updateProduct);
router.delete('/product/:id', deleteProduct);

// Updates
router.get('/update', 
  body('productId'),
  handleInputErrors,
  getUpdates);
router.get('/update/:id', getUpdate);
router.post('/update', 
  body('title').exists().isString, 
  body('body').exists().isString, 
  oneOf([check('status').isIn(['IN_PROGRESS', 'DEPRECATED', 'SHIPPED'])]),
  body('version').optional,
  handleInputErrors,
  createUpdate);
router.put('/update/:id', 
  body('title').optional, 
  body('body').optional, 
  oneOf([check('status').isIn(['IN_PROGRESS', 'DEPRECATED', 'SHIPPED'])]),
  body('version').optional, 
  handleInputErrors,
  updateUpdate);
router.delete('/update/:id', 
  body('id').exists().isString,
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
