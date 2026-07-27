import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';

export function mintToken({ 
    sub = crypto.randomUUID(),
    email = 'jwt-helper@example.com',
    sid = crypto.randomUUID(),
    expiresIn = '15m',
    secret = process.env.JWT_SECRET,
    algorithm = 'HS256',
    extraClaims = {}
} = {}) {
    const payload = { sub, email, sid, ...extraClaims };
    const signingKey = algorithm === 'none' ? '' : secret;
    return jwt.sign(payload, signingKey, { expiresIn, algorithm });
}

export function tamperToken(token, {
    payload: payloadChanges,
    header: headerChanges
} = {}) {
    const [headerB64, payloadB64, signatureB64] = token.split('.');
    const decode = (b64) => JSON.parse(Buffer.from(b64, 'base64url').toString('utf8'));
    const encode = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url');
    
    const header = { ...decode(headerB64), ...headerChanges };
    const payload = { ...decode(payloadB64), ...payloadChanges };

    return `${encode(header)}.${encode(payload)}.${signatureB64}`
}