import { FastifyRequest, FastifyReply } from 'fastify';
import { Transaction, TransactionProduct, Product } from '../models';

// Create a new transaction
export const createTransaction = async (request: FastifyRequest, reply: FastifyReply) => {
  const { products, totalAmount } = request.body as { products: { productId: number; quantity: number }[]; totalAmount: number };

  try {
    const transaction = await Transaction.create({ totalAmount });

    const transactionProducts = products.map(product => ({
      transactionId: transaction.id,
      productId: product.productId,
      quantity: product.quantity,
    }));

    await TransactionProduct.bulkCreate(transactionProducts);

    for (const product of products) {
      const productRecord = await Product.findByPk(product.productId);

      if (productRecord) {
        productRecord.quantity -= product.quantity;
        await productRecord.save();
      }
    }

    return reply.code(201).send(transaction);
  } catch (error) {
    console.error('Error creating transaction:', (error as Error).message);

    return reply.code(500).send({ message: (error as Error).message });
  }
};

// Retrieve a specific transaction
export const getTransaction = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };

  try {
    const transaction = await Transaction.findByPk(id, {
      include: [
        {
          model: TransactionProduct,
          include: [Product],
        },
      ],
    });

    if (!transaction) {
      return reply.code(404).send({ message: 'Transaction not found' });
    }

    return reply.code(200).send(transaction);
  } catch (error) {
    console.error('Error retrieving transaction:', (error as Error).message);

    return reply.code(500).send({ message: (error as Error).message });
  }
};

// Retrieve all transactions
export const getAllTransactions = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const transactions = await Transaction.findAll({
      include: [
        {
          model: TransactionProduct,
          include: [Product],
        },
      ],
    });

    return reply.code(200).send(transactions);
  } catch (error) {
    console.error('Error retrieving transactions:', (error as Error).message);

    return reply.code(500).send({ message: (error as Error).message });
  }
};
