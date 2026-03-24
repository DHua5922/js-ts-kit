interface QueryOptions {
  replacements?: Record<string, any>;
  type?: string;
  [key: string]: any;
}

const DEFAULT_SEQUELIZE_OPTIONS = {
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

class Mongoose {
  uri: string;
  mongoose: any;

  constructor(uri: string, mongoose: any) {
    this.uri = uri;
    this.mongoose = mongoose;
  }

  connectToMongoDb(options = {}) {
    return this.mongoose.connect(this.uri, options);
  }

  defineSchema(json: Record<string, any>) {
    return this.mongoose.Schema(json);
  }

  createModel(name: string, schema: Record<string, any>) {
    const mongooseSchema =
      schema instanceof this.mongoose.Schema
        ? schema
        : this.defineSchema(schema);

    return this.mongoose.model(name, mongooseSchema);
  }
}

class Sequelize {
  sequelize: any;

  constructor(
    sequelize: any,
    host: string,
    database: string,
    username: string,
    password: string,
    options = {},
  ) {
    const sequelizeOptions = {
      ...DEFAULT_SEQUELIZE_OPTIONS,
      ...options,
      host,
      database,
      username,
      password,
    };

    this.sequelize = new sequelize.Sequelize(sequelizeOptions);
  }

  authenticate() {
    return this.sequelize.authenticate();
  }

  executeSQL(sqlString: string, options: QueryOptions) {
    return this.sequelize.query(sqlString, options);
  }

  executeStoredProcedure(
    sqlString: string,
    valuesJson: Record<string, any>,
    queryType: string,
  ) {
    const queryOptions = {
      replacements: valuesJson,
      type: queryType,
    };

    return this.executeSQL(sqlString, queryOptions);
  }
}

export { Mongoose, Sequelize };
