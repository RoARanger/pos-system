import { FastifyRequest, FastifyReply } from 'fastify';
import { createProduct, getProducts, updateProduct, deleteProduct } from '../src/controllers/productController';
import { Product } from '../src/models';

jest.mock('../src/models');

describe('Product Controller', () => {
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

  it('should create a new product', async () => {
    const mockProduct = {
      id: 3,
      name: 'Test Product 6',
      price: 100,
      description: 'A test product',
      quantity: 10,
      updatedAt: '2024-07-17T22:22:56.591Z',
      createdAt: '2024-07-17T22:22:56.591Z',
    };

    (Product.create as jest.Mock).mockResolvedValue(mockProduct);

    req.body = {
      name: 'Test Product 6',
      price: 100,
      description: 'A test product',
      quantity: 10,
    };

    await createProduct(req as FastifyRequest, reply as FastifyReply);

    expect(Product.create).toHaveBeenCalledWith({
      name: 'Test Product 6',
      price: 100,
      description: 'A test product',
      quantity: 10,
    });

    expect(code).toHaveBeenCalledWith(201);
    expect(send).toHaveBeenCalledWith(mockProduct);
  });

  it('should retrieve all products', async () => {
    const mockProducts = [
      {
        id: 1,
        name: 'Updated Product 1',
        price: 150,
        description: 'An updated product',
        quantity: 20,
        createdAt: '2024-07-17T22:06:05.000Z',
        updatedAt: '2024-07-17T22:23:02.000Z',
      },
      {
        id: 2,
        name: 'Test Product 6',
        price: 100,
        description: 'A test product',
        quantity: 9,
        createdAt: '2024-07-17T22:20:55.000Z',
        updatedAt: '2024-07-17T22:21:19.000Z',
      },
    ];

    (Product.findAll as jest.Mock).mockResolvedValue(mockProducts);

    await getProducts(req as FastifyRequest, reply as FastifyReply);

    expect(Product.findAll).toHaveBeenCalled();
    expect(code).toHaveBeenCalledWith(200);
    expect(send).toHaveBeenCalledWith(mockProducts);
  });

  it('should update a product', async () => {
    const mockProduct = {
      id: 1,
      name: 'Updated Product 1',
      price: 150,
      description: 'An updated product',
      quantity: 20,
      createdAt: '2024-07-17T22:06:05.000Z',
      updatedAt: '2024-07-17T22:23:02.687Z',
      update: jest.fn().mockResolvedValue(true),
    };

    (Product.findByPk as jest.Mock).mockResolvedValue(mockProduct);

    req.params = { id: 1 };
    req.body = {
      name: 'Updated Product 1',
      price: 150,
      description: 'An updated product',
      quantity: 20,
    };

    await updateProduct(req as FastifyRequest, reply as FastifyReply);

    expect(Product.findByPk).toHaveBeenCalledWith(1);
    expect(mockProduct.update).toHaveBeenCalledWith({
      name: 'Updated Product 1',
      price: 150,
      description: 'An updated product',
      quantity: 20,
    });

    expect(code).toHaveBeenCalledWith(200);
    expect(send).toHaveBeenCalledWith(mockProduct);
  });

  it('should delete a product', async () => {
    const mockProduct = {
      id: 1,
      name: 'Updated Product 1',
      price: 150,
      description: 'An updated product',
      quantity: 20,
      createdAt: '2024-07-17T22:06:05.000Z',
      updatedAt: '2024-07-17T22:23:02.687Z',
      destroy: jest.fn().mockResolvedValue(true),
    };

    (Product.findByPk as jest.Mock).mockResolvedValue(mockProduct);

    req.params = { id: 1 };

    await deleteProduct(req as FastifyRequest, reply as FastifyReply);

    expect(Product.findByPk).toHaveBeenCalledWith(1);
    expect(mockProduct.destroy).toHaveBeenCalled();

    expect(code).toHaveBeenCalledWith(200);
    expect(send).toHaveBeenCalledWith({ message: 'Product deleted successfully' });
  });
});
