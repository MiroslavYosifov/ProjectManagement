// Minimal Express req/res/next stubs for unit-testing middleware/validators in
// isolation — no HTTP server, no supertest. A validator only touches req.body,
// req.params, res.status().json(), and next(), so we fake exactly those.

export function mockReq({ body, params, query, headers, user } = {}) {
    return {
        body: body ?? {},
        params: params ?? {},
        query: query ?? {},
        headers: headers ?? {},
        user,
    };
}

// res.status(code).json(payload) is chainable in Express, so status() returns
// `this`. We record what was sent so the test can assert on it.
export function mockRes() {
    return {
        statusCode: undefined,
        body: undefined,
        status(code) {
            this.statusCode = code;
            return this;
        },
        json(payload) {
            this.body = payload;
            return this;
        },
    };
}

// next() stub that remembers whether it was called and with what error.
export function mockNext() {
    const fn = (err) => {
        fn.called = true;
        fn.error = err;
    };
    fn.called = false;
    fn.error = undefined;
    return fn;
}
