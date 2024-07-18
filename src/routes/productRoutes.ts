import { FastifyInstance } from 'fastify';
import { createProduct, getProducts, updateProduct, deleteProduct } from '../controllers/productController';
import { authMiddleware } from '../middlewares/authMiddleware';

export default async function (fastify: FastifyInstance) {
  fastify.post('/', { preHandler: [authMiddleware] }, createProduct);
  fastify.get('/', { preHandler: [authMiddleware] }, getProducts);
  fastify.put('/:id', { preHandler: [authMiddleware] }, updateProduct);
  fastify.delete('/:id', { preHandler: [authMiddleware] }, deleteProduct);
}