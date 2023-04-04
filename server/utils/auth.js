import pkg from 'jsonwebtoken';
const { verify, sign } = pkg;
// import { verify, sign } from 'jsonwebtoken';

const secret = 'mysecretsshhhhh';
const expiration = '2h';

export function authMiddleware({ req }) {
  // allows token to be sent via req.body, req.query, or headers
  let token = req.body.token || req.query.token || req.headers.authorization;

  // ["Bearer", "<tokenvalue>"]
  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return req;
  }

  try {
    const { data } = verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch {
    console.log('Invalid token');
  }

  return req;
}
export function signToken({ username, email, _id }) {
  const payload = { username, email, _id };

  return sign({ data: payload }, secret, { expiresIn: expiration });
}