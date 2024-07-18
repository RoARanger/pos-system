import { FastifyRequest, FastifyReply } from 'fastify';

export const basicAuthMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
  const authHeader = request.headers['authorization'];

  if (!authHeader) {
    return reply.status(401).send({ message: 'No authorization header' });
  }

  const [type, credentials] = authHeader.split(' ');

  if (type !== 'Basic' || !credentials) {
    return reply.status(401).send({ message: 'Invalid authorization format' });
  }

  const decodedCredentials = Buffer.from(credentials, 'base64').toString('ascii');
  const [username, password] = decodedCredentials.split(':');

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return reply.status(401).send({ message: 'Invalid username or password' });
  }

  // Add admin user to request
  (request as any).admin = { username };
};
