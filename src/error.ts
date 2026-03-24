function isObject(value: unknown): value is Record<string, any> {
  return typeof value === "object" && value !== null;
}

function extractMessage(value: unknown) {
  if (typeof value === "string") return value.trim();
  if (isObject(value) && typeof value.message === "string") {
    return value.message.trim();
  }

  return "";
}

function appendMessage(messages: string[], value: unknown) {
  const message = extractMessage(value);

  if (message) {
    messages.push(message);
  }
}

function extractApiErrorMessage(err: unknown) {
  const response = isObject(err) ? err.response : null;
  const data = isObject(response) ? response.data : null;

  if (typeof data === "string") {
    return extractMessage(data);
  }

  if (isObject(data)) {
    if (typeof data.exceptionMessage === "string") {
      return extractMessage(data.exceptionMessage);
    }

    if (typeof data.message === "string") {
      return extractMessage(data.message);
    }
  }

  return "";
}

class DefaultError extends Error {
  static message(err: any) {
    return extractMessage(err);
  }
}

class DatabaseError extends DefaultError {
  static isSequelizeError(err: any) {
    return Boolean(
      isObject(err) && (err.name === "SequelizeDatabaseError" || err.parent),
    );
  }

  static sequelize(err: any) {
    const errorMessages: string[] = [];
    const parent = isObject(err) ? err.parent : null;

    if (isObject(parent)) {
      appendMessage(errorMessages, parent);

      if (Array.isArray(parent.errors)) {
        for (const error of parent.errors) {
          appendMessage(errorMessages, error);
        }
      }
    }

    return this.message(
      errorMessages.length ? errorMessages.join("\n\n") : err,
    );
  }
}

class ApiError extends DefaultError {
  static status = 500;
  status: number;

  constructor(message: string, status = ApiError.status) {
    super(message);
    this.status = status;
  }

  static isApiError(err: any) {
    return Boolean(isObject(err) && err.response);
  }

  static default(err: any) {
    return this.message(extractApiErrorMessage(err) || err);
  }
}

export { DefaultError, DatabaseError, ApiError };
