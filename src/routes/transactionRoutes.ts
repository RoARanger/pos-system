import { FastifyInstance } from 'fastify';
import { createTransaction, getTransaction, getAllTransactions } from '../controllers/transactionController';
import { authMiddleware } from '../middlewares/authMiddleware';

export default async function (fastify: FastifyInstance) {
  fastify.post('/', { preHandler: [authMiddleware] }, createTransaction);
  fastify.get('/', { preHandler: [authMiddleware] }, getAllTransactions);
  fastify.get('/:id', { preHandler: [authMiddleware] }, getTransaction);
}