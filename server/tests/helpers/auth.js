import request from 'supertest';

let counter = 0;

// Registers a fresh user and logs them in through the REAL endpoints, so test
// setup exercises the same code path as production instead of inserting rows
// by hand. Returns the tokens plus the public user object.
//
// Pass a distinct `email` when a test needs two specific users (e.g. an owner
// and an invitee); otherwise a unique address is generated per call.
export async function registerAndLogin(app, { email, password = 'password123', username } = {}) {
    const userEmail = email ?? `user${Date.now()}_${counter++}@example.com`;

    const registerRes = await request(app)
        .post('/api/auth/register')
        .send({ email: userEmail, password, username });

    if (registerRes.status !== 201) {
        throw new Error(`registerAndLogin: register failed (${registerRes.status}): ${registerRes.text}`);
    }

    const loginRes = await request(app)
        .post('/api/auth/login')
        .send({ email: userEmail, password });

    if (loginRes.status !== 200) {
        throw new Error(`registerAndLogin: login failed (${loginRes.status}): ${loginRes.text}`);
    }

    return {
        user: loginRes.body.user,
        accessToken: loginRes.body.accessToken,
        refreshToken: loginRes.body.refreshToken,
    };
}

// Small helper so tests read `.set(...authHeader(token))` instead of repeating
// the Bearer string everywhere.
export function authHeader(token) {
    return ['Authorization', `Bearer ${token}`];
}
