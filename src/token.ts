interface JwtTokenPayload {
  [key: string]: any;
  iat?: number;
  exp?: number;
}

class JwtToken {
  secret: string;
  jwt: any;

  constructor(jwt: any, secret: string) {
    this.jwt = jwt;
    this.secret = secret;
  }

  create({ iat, exp, ...payload }: JwtTokenPayload, options = {}) {
    return this.jwt.sign(payload, this.secret, options);
  }

  decode(token: string, options = {}) {
    return this.jwt.verify(token, this.secret, options);
  }
}

export { JwtToken };
