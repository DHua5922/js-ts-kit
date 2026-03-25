import { Mongoose, Sequelize } from "../../src/database";

describe("Mongoose", () => {
  it("connects using the configured URI", () => {
    const connect = jest.fn();
    const Schema = function Schema(this: any, definition: Record<string, any>) {
      this.definition = definition;
    } as any;
    const model = jest.fn();
    const mongoose = new Mongoose("mongodb://localhost/test", {
      connect,
      Schema,
      model,
    });

    mongoose.connectToMongoDb({ useUnifiedTopology: true });

    expect(connect).toHaveBeenCalledWith("mongodb://localhost/test", {
      useUnifiedTopology: true,
    });
  });

  it("creates a model from a plain schema definition", () => {
    const connect = jest.fn();
    const Schema = function Schema(this: any, definition: Record<string, any>) {
      this.definition = definition;
    } as any;
    const model = jest.fn();
    const mongoose = new Mongoose("mongodb://localhost/test", {
      connect,
      Schema,
      model,
    });

    mongoose.createModel("User", { name: String });

    expect(model).toHaveBeenCalledWith(
      "User",
      expect.objectContaining({
        definition: { name: String },
      }),
    );
  });

  it("reuses an existing schema instance", () => {
    const Schema = function Schema(this: any, definition: Record<string, any>) {
      this.definition = definition;
    } as any;
    const model = jest.fn();
    const existingSchema = new Schema({ email: String });
    const mongoose = new Mongoose("mongodb://localhost/test", {
      connect: jest.fn(),
      Schema,
      model,
    });

    mongoose.createModel("User", existingSchema);

    expect(model).toHaveBeenCalledWith("User", existingSchema);
  });
});

describe("Sequelize", () => {
  it("constructs a sequelize instance with defaults and overrides", () => {
    const SequelizeConstructor = jest.fn();
    const sequelizeModule = {
      Sequelize: SequelizeConstructor,
    };

    new Sequelize(
      sequelizeModule,
      "db-host",
      "app_db",
      "db-user",
      "db-pass",
      { logging: false },
    );

    expect(SequelizeConstructor).toHaveBeenCalledWith({
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      host: "db-host",
      database: "app_db",
      username: "db-user",
      password: "db-pass",
      logging: false,
    });
  });

  it("delegates authenticate and query calls", async () => {
    const authenticate = jest.fn().mockResolvedValue(undefined);
    const query = jest.fn().mockResolvedValue(["row"]);
    const sequelizeInstance = { authenticate, query };
    const SequelizeConstructor = jest.fn().mockReturnValue(sequelizeInstance);
    const sequelizeModule = {
      Sequelize: SequelizeConstructor,
    };
    const sequelize = new Sequelize(
      sequelizeModule,
      "db-host",
      "app_db",
      "db-user",
      "db-pass",
    );

    await expect(sequelize.authenticate()).resolves.toBeUndefined();
    await expect(
      sequelize.executeSQL("SELECT 1", { type: "SELECT" }),
    ).resolves.toEqual(["row"]);

    expect(query).toHaveBeenCalledWith("SELECT 1", { type: "SELECT" });
  });

  it("builds stored procedure query options from values and type", async () => {
    const query = jest.fn().mockResolvedValue(["ok"]);
    const SequelizeConstructor = jest.fn().mockReturnValue({
      authenticate: jest.fn(),
      query,
    });
    const sequelize = new Sequelize(
      { Sequelize: SequelizeConstructor },
      "db-host",
      "app_db",
      "db-user",
      "db-pass",
    );

    await sequelize.executeStoredProcedure(
      "EXEC user_get :id",
      { id: 1 },
      "SELECT",
    );

    expect(query).toHaveBeenCalledWith("EXEC user_get :id", {
      replacements: { id: 1 },
      type: "SELECT",
    });
  });
});
