import { FastifyInstance } from 'fastify';
import { linkUpsellProduct, getUpsellProducts, removeUpsellProduct } from '../controllers/upsellController';
import { authMiddleware } from '../middlewares/authMiddleware';

export default async function (fastify: FastifyInstance) {
  fastify.post('/link', { preHandler: [authMiddleware] }, linkUpsellProduct);
  fastify.get('/:productId', { preHandler: [authMiddleware] }, getUpsellProducts);
  fastify.delete('/remove', { preHandler: [authMiddleware] }, removeUpsellProduct);
}