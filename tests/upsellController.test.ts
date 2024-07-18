import { FastifyRequest, FastifyReply } from 'fastify';
import { linkUpsellProduct, getUpsellProducts, removeUpsellProduct } from '../src/controllers/upsellController';
import { Product, Upsell } from '../src/models';

jest.mock('../src/models');

describe('Upsell Controller', () => {
  let req: Partial<FastifyRequest>;
  let reply: Partial<FastifyReply>;
  let code: jest.Mock;
  let send: jest.Mock;

  beforeEach(() => {
    send = jest.fn();
    code = jest.fn().mockReturnValue({ send });
    req = { body: {} };
    reply = { code };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should link an upsell product', async () => {
    const mockProduct = { id: 1, name: 'Test Product' };

    (Product.findByPk as jest.Mock).mockResolvedValue(mockProduct);
    (Upsell.create as jest.Mock).mockResolvedValue({
      id: 1,
      productId: 1,
      upsellProductId: 2,
    });

    req.body = {
      productId: 1,
      upsellProductId: 2,
    };

    await linkUpsellProduct(req as FastifyRequest, reply as FastifyReply);

    expect(Product.findByPk).toHaveBeenCalledWith(1);
    expect(Product.findByPk).toHaveBeenCalledWith(2);
    expect(Upsell.create).toHaveBeenCalledWith({ productId: 1, upsellProductId: 2 });
    expect(code).toHaveBeenCalledWith(201);
    expect(send).toHaveBeenCalledWith({
      id: 1,
      productId: 1,
      upsellProductId: 2,
    });
  });

  it('should retrieve upsell products', async () => {
    const mockUpsell = [
      {
        id: 1,
        productId: 1,
        upsellProductId: 2,
        product: { id: 1, name: 'Test Product' },
        upsellProduct: { id: 2, name: 'Upsell Product' },
      },
    ];

    (Upsell.findAll as jest.Mock).mockResolvedValue(mockUpsell);

    req.params = { productId: 1 };

    await getUpsellProducts(req as FastifyRequest, reply as FastifyReply);

    expect(Upsell.findAll).toHaveBeenCalledWith({
      where: { productId: 1 },
      include: [
        { model: Product, as: 'product' },
        { model: Product, as: 'upsellProduct' },
      ],
    });
    expect(code).toHaveBeenCalledWith(200);
    expect(send).toHaveBeenCalledWith(mockUpsell);
  });

  it('should remove an upsell product', async () => {
    const mockUpsell = {
      id: 1,
      productId: 1,
      upsellProductId: 2,
      destroy: jest.fn(),
    };

    (Upsell.findOne as jest.Mock).mockResolvedValue(mockUpsell);

    req.query = { productId: 1, upsellProductId: 2 };

    await removeUpsellProduct(req as FastifyRequest, reply as FastifyReply);

    expect(Upsell.findOne).toHaveBeenCalledWith({
      where: { productId: 1, upsellProductId: 2 },
    });
    expect(mockUpsell.destroy).toHaveBeenCalled();
    expect(code).toHaveBeenCalledWith(200);
    expect(send).toHaveBeenCalledWith({ message: 'Upsell product removed successfully' });
  });
});
