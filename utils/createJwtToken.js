import jwt from 'jsonwebtoken';

export const createJWTtoken = (id) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        data: { id },
      },
      process.env.JWT_SECRET || '',
      {
        expiresIn: process.env.JWT_MAX_AGE,
        algorithm: 'HS256',
      },
      (err, token) => {
        if (err) {
          return reject(err);
        }
        resolve(token);
      }
    );
  });
};
