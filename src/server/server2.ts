import Fastify from 'fastify';
import sequelize from '../config/database';
import authRoutes from '../routes/authRoutes';
import productRoutes from '../routes/productRoutes';
import transactionRoutes from '../routes/transactionRoutes';
import upsellRoutes from '../routes/upsellRoutes';
import { basicAuthMiddleware } from '../middlewares/basicAuthMiddleware';
import dotenv from 'dotenv';

dotenv.config();

const fastify = Fastify();

// Register routes
fastify.register(authRoutes, { prefix: '/auth' });
fastify.register(productRoutes, { prefix: '/products' });
fastify.register(transactionRoutes, { prefix: '/transactions' });
fastify.register(upsellRoutes, { prefix: '/upsell' });

// Apply middleware to all routes
fastify.addHook('onRequest', basicAuthMiddleware);

sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch((error: any) => {
    console.error('Unable to connect to the database:', error);
  });

const start = async () => {
  try {
    await sequelize.sync();
    const port = parseInt(process.env.PORT || '3000', 10);
    await fastify.listen(port);
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
