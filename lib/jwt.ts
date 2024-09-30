import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

const secret = process.env.JWT_SECRET;

export async function signToken(payload: object): Promise<string> {

    return new SignJWT({ payload })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt()
        .setExpirationTime('30d')
        .sign(new TextEncoder().encode(secret));
}

export async function verifyToken(token: string): Promise<JWTPayload> {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    // run some checks on the returned payload, perhaps you expect some specific values

    // if its all good, return it, or perhaps just return a boolean
    return payload;
}