export class DefaultError extends Error {
  static message(err: any): string;
}

export class DatabaseError extends DefaultError {
  static isSequelizeError(err: any): boolean;
  static sequelize(err: any): string;
}

export class ApiError extends DefaultError {
  static status: number;
  status: number;

  constructor(message: string, status?: number);

  static isApiError(err: any): boolean;
  static default(err: any): string;
}
