export interface JwtOptions {
  expiresIn?: string | number;
  audience?: string | string[];
  issuer?: string;
  jwtid?: string;
  subject?: string;
  notBefore?: string | number;
  algorithm?: string;
  headers?: object;
  [key: string]: any;
}

export interface JwtTokenPayload {
  [key: string]: any;
  iat?: number;
  exp?: number;
}

export class JwtToken {
  jwt: any;
  secret: string;

  constructor(jwt: any, secret: string);

  create(payload: JwtTokenPayload, options?: JwtOptions): string;

  decode(token: string, options?: JwtOptions): JwtTokenPayload | string;
}
