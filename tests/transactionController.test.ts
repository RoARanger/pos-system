import { FastifyRequest, FastifyReply } from 'fastify';
import { createTransaction, getTransaction, getAllTransactions } from '../src/controllers/transactionController';
import { Transaction, TransactionProduct, Product } from '../src/models';

jest.mock('../src/models');

describe('Transaction Controller', () => {
  let req: Partial<FastifyRequest>;
  let reply: Partial<FastifyReply>;
  let code: jest.Mock;
  let send: jest.Mock;

  beforeEach(() => {
    send = jest.fn();
    code = jest.fn().mockReturnValue({ send });
    req = { body: {}, params: {} };
    reply = { code, send };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new transaction', async () => {
    const mockTransaction = {
      id: 2,
      totalAmount: 300,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    req.body = {
      products: [
        { productId: 1, quantity: 2 },
        { productId: 2, quantity: 1 },
      ],
      totalAmount: 300,
    };

    (Transaction.create as jest.Mock).mockResolvedValue(mockTransaction);
    (TransactionProduct.bulkCreate as jest.Mock).mockResolvedValue(true);
    (Product.findByPk as jest.Mock).mockResolvedValue({
      id: 1,
      name: 'Product 1',
      price: 100,
      description: 'A product',
      quantity: 10,
      save: jest.fn(),
    });

    await createTransaction(req as FastifyRequest, reply as FastifyReply);

    expect(Transaction.create).toHaveBeenCalledWith({ totalAmount: 300 });
    expect(TransactionProduct.bulkCreate).toHaveBeenCalledWith([
      { transactionId: 2, productId: 1, quantity: 2 },
      { transactionId: 2, productId: 2, quantity: 1 },
    ]);

    expect(code).toHaveBeenCalledWith(201);
    expect(send).toHaveBeenCalledWith(mockTransaction);
  });

  it('should retrieve a specific transaction', async () => {
    const mockTransaction = {
      id: 1,
      totalAmount: 300,
      createdAt: new Date(),
      updatedAt: new Date(),
      TransactionProducts: [
        {
          id: 1,
          transactionId: 1,
          productId: 1,
          quantity: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
          Product: {
            id: 1,
            name: 'Product 1',
            price: 100,
            description: 'A product',
            quantity: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      ],
    };

    req.params = { id: 1 };

    (Transaction.findByPk as jest.Mock).mockResolvedValue(mockTransaction);

    await getTransaction(req as FastifyRequest, reply as FastifyReply);

    expect(Transaction.findByPk).toHaveBeenCalledWith(1, {
      include: [
        {
          model: TransactionProduct,
          include: [Product],
        },
      ],
    });
    expect(code).toHaveBeenCalledWith(200);
    expect(send).toHaveBeenCalledWith(mockTransaction);
  });

  it('should retrieve all transactions', async () => {
    const mockTransactions = [
      {
        id: 1,
        totalAmount: 300,
        createdAt: new Date(),
        updatedAt: new Date(),
        TransactionProducts: [
          {
            id: 1,
            transactionId: 1,
            productId: 1,
            quantity: 2,
            createdAt: new Date(),
            updatedAt: new Date(),
            Product: {
              id: 1,
              name: 'Product 1',
              price: 100,
              description: 'A product',
              quantity: 10,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          },
        ],
      },
    ];

    (Transaction.findAll as jest.Mock).mockResolvedValue(mockTransactions);

    await getAllTransactions(req as FastifyRequest, reply as FastifyReply);

    expect(Transaction.findAll).toHaveBeenCalledWith({
      include: [
        {
          model: TransactionProduct,
          include: [Product],
        },
      ],
    });
    expect(code).toHaveBeenCalledWith(200);
    expect(send).toHaveBeenCalledWith(mockTransactions);
  });
});
