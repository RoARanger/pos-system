import { FastifyRequest, FastifyReply } from 'fastify';
import { signup, login } from '../src/controllers/authController';
import { User } from '../src/models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sequelize from '../src/config/database'; // Import the sequelize instance

jest.mock('../src/models');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('Auth Controller', () => {
  let req: Partial<FastifyRequest>;
  let reply: Partial<FastifyReply>;
  let code: jest.Mock;
  let send: jest.Mock;

  beforeAll(async () => {
    await sequelize.sync({ force: true }); // Ensure the database is synchronized before running the tests
  });

  beforeEach(() => {
    send = jest.fn();
    code = jest.fn().mockReturnValue({ send });
    req = { body: {} };
    reply = { code };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await sequelize.close(); // Close the database connection after all tests
  });

  it('should sign up a new user', async () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
    };

    const plaintextPassword = 'password123';
    const hashedPassword = 'hashedpassword';
    const mockToken = 'token';

    (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
    (jwt.sign as jest.Mock).mockReturnValue(mockToken);
    (User.create as jest.Mock).mockResolvedValue(mockUser);

    req.body = {
      email: 'test@example.com',
      password: plaintextPassword,
    };

    await signup(req as FastifyRequest, reply as FastifyReply);

    expect(User.create).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: hashedPassword,
    });

    expect(code).toHaveBeenCalledWith(201);
    expect(send).toHaveBeenCalledWith({
      user: mockUser,
      token: mockToken,
    });
  });

  it('should log in an existing user', async () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      password: 'hashedpassword',
    };

    const plaintextPassword = 'password123';
    const mockToken = 'token';

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue(mockToken);
    (User.findOne as jest.Mock).mockResolvedValue(mockUser);

    req.body = {
      email: 'test@example.com',
      password: plaintextPassword,
    };

    await login(req as FastifyRequest, reply as FastifyReply);

    expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
    expect(bcrypt.compare).toHaveBeenCalledWith(plaintextPassword, mockUser.password);
    expect(jwt.sign).toHaveBeenCalledWith({ id: mockUser.id, email: mockUser.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    expect(code).toHaveBeenCalledWith(200);
    expect(send).toHaveBeenCalledWith({
      token: mockToken,
    });
  });
});
