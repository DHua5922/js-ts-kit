function isObject(value: unknown): value is Record<string, any> {
  return typeof value === "object" && value !== null;
}

function isError(value: unknown): value is Error {
  return value instanceof Error;
}

const ERROR_MESSAGE_KEYS = ["exceptionMessage", "message"] as const;

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

function collectDirectMessages(
  value: Record<string, unknown>,
  messages: string[],
) {
  for (const key of ERROR_MESSAGE_KEYS) {
    if (typeof value[key] === "string") {
      appendMessage(messages, value[key]);
    }
  }
}

function extractApiErrorMessage(err: unknown) {
  const response = isObject(err) ? err.response : null;
  const data = isObject(response) ? response.data : null;

  if (typeof data === "string") {
    return extractMessage(data);
  }

  if (isObject(data)) {
    for (const key of ERROR_MESSAGE_KEYS) {
      const message = extractMessage(data[key]);

      if (message) {
        return message;
      }
    }
  }

  return "";
}

function collectJsonMessages(
  value: unknown,
  messages: string[],
  seen: WeakSet<object>,
): void {
  if (typeof value === "string") {
    appendMessage(messages, value);
    return;
  }

  if (!isObject(value)) {
    return;
  }

  if (isError(value)) {
    appendMessage(messages, value);
  }

  if (seen.has(value)) {
    return;
  }

  seen.add(value);

  if (Array.isArray(value)) {
    for (const item of value) {
      collectJsonMessages(item, messages, seen);
    }
  } else {
    const objectValue = value as Record<string, unknown>;

    collectDirectMessages(objectValue, messages);

    for (const [key, nestedValue] of Object.entries(objectValue)) {
      if (ERROR_MESSAGE_KEYS.indexOf(key as (typeof ERROR_MESSAGE_KEYS)[number]) !== -1) {
        continue;
      }

      collectJsonMessages(nestedValue, messages, seen);
    }
  }

  seen.delete(value);
}

class DefaultError extends Error {
  static message(err: any) {
    return extractMessage(err);
  }

  static json(err: any) {
    const messages: string[] = [];

    collectJsonMessages(err, messages, new WeakSet());

    return this.message(messages.length ? messages.join("\n\n") : err);
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
