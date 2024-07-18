import { FastifyRequest, FastifyReply } from 'fastify';
import { Product } from '../models';

export const createProduct = async (request: FastifyRequest, reply: FastifyReply) => {
  const { name, price, description, quantity } = request.body as { name: string; price: number; description: string; quantity: number };
  try {
    const product = await Product.create({ name, price, description, quantity });
    reply.code(201).send(product);
  } catch (error) {
    reply.code(500).send({ message: (error as Error).message });
  }
};

export const getProducts = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const products = await Product.findAll();
    reply.code(200).send(products);
  } catch (error) {
    reply.code(500).send({ message: (error as Error).message });
  }
};

export const updateProduct = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const { name, price, description, quantity } = request.body as { name: string; price: number; description: string; quantity: number };
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return reply.code(404).send({ message: 'Product not found' });
    }
    await product.update({ name, price, description, quantity });
    reply.code(200).send(product);
  } catch (error) {
    reply.code(500).send({ message: (error as Error).message });
  }
};

export const deleteProduct = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return reply.code(404).send({ message: 'Product not found' });
    }
    await product.destroy();
    reply.code(200).send({ message: 'Product deleted successfully' });
  } catch (error) {
    reply.code(500).send({ message: (error as Error).message });
  }
};
