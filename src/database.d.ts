export interface SequelizePoolOptions {
  max?: number;
  min?: number;
  acquire?: number;
  idle?: number;
}

export interface SequelizeOptions {
  dialect: string;
  pool?: SequelizePoolOptions;
  port?: number;
  [key: string]: any;
}

export interface QueryOptions {
  replacements?: Record<string, any>;
  type?: string;
  [key: string]: any;
}

export type SchemaDefinition = Record<string, any>;
export type StoredProcedureValues = Record<string, any>;

export class Mongoose {
  constructor(uri: string, mongoose: any);

  uri: string;
  mongoose: any;

  connectToMongoDb(options?: Record<string, any>): Promise<any>;

  defineSchema(json: SchemaDefinition): any;

  createModel(name: string, schema: SchemaDefinition): any;
}

export class Sequelize {
  constructor(
    sequelize: any,
    host: string,
    database: string,
    username: string,
    password: string,
    options?: SequelizeOptions,
  );

  sequelize: any;

  authenticate(): Promise<void>;

  executeSQL(sqlString: string, options: QueryOptions): Promise<any>;

  executeStoredProcedure(
    sqlString: string,
    valuesJson: StoredProcedureValues,
    queryType: string,
  ): Promise<any>;
}
