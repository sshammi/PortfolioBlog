import express from 'express'
import validateRequest from '../../middlewares/validateRequest';
import { ProjectValidation } from './order.validation';
import { OrderController } from './order.controller';

const router=express.Router();

router.post('',validateRequest(ProjectValidation.ProjectCreateValidationSchema),OrderController.createOrder)

// router.get('/myOrders',auth('customer'),OrderController.getOrdersByEmail)

// router.get('/verify', auth('customer'), OrderController.verifyPayment);

router.patch('/update/:id',OrderController.updateOrder)

router.get('/:id',OrderController.getSingleOrder)

router.delete('/:id',OrderController.deleteOrder)


router.get('',OrderController.getAllOrders)



export const OrderRoutes=router;