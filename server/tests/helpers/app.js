// Re-exports the Express app for supertest. Tests import `app` from here so
// there's a single place to wrap/configure it later if needed. Importing this
// pulls in db/prisma.js, which is why the test runner must be started with the
// .env.test environment loaded (see the "test" script in package.json).
export { default as app } from '../../app.js';
