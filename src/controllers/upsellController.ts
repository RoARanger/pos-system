import { FastifyRequest, FastifyReply } from 'fastify';
import { Product, Upsell } from '../models';

export const linkUpsellProduct = async (request: FastifyRequest, reply: FastifyReply) => {
  const { productId, upsellProductId } = request.body as { productId: number; upsellProductId: number };

  try {
    const product = await Product.findByPk(productId);
    const upsellProduct = await Product.findByPk(upsellProductId);

    if (!product || !upsellProduct) {
      return reply.code(404).send({ message: 'Product or Upsell Product not found' });
    }

    const upsell = await Upsell.create({ productId, upsellProductId });

    return reply.code(201).send(upsell);
  } catch (error) {
    console.error('Error linking upsell product:', (error as Error).message);

    return reply.code(500).send({ message: (error as Error).message });
  }
};

export const getUpsellProducts = async (request: FastifyRequest, reply: FastifyReply) => {
  const { productId } = request.params as { productId: number };

  try {
    const upsells = await Upsell.findAll({
      where: { productId },
      include: [
        { model: Product, as: 'product' },
        { model: Product, as: 'upsellProduct' },
      ],
    });

    return reply.code(200).send(upsells);
  } catch (error) {
    console.error('Error retrieving upsell products:', (error as Error).message);

    return reply.code(500).send({ message: (error as Error).message });
  }
};

export const removeUpsellProduct = async (request: FastifyRequest, reply: FastifyReply) => {
  const { productId, upsellProductId } = request.query as { productId: number; upsellProductId: number };

  try {
    const upsell = await Upsell.findOne({ where: { productId, upsellProductId } });

    if (!upsell) {
      return reply.code(404).send({ message: 'Upsell product not found' });
    }

    await upsell.destroy();

    return reply.code(200).send({ message: 'Upsell product removed successfully' });
  } catch (error) {
    console.error('Error removing upsell product:', (error as Error).message);

    return reply.code(500).send({ message: (error as Error).message });
  }
};
