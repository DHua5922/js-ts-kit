const DURATION_TO_MS = {
  ms: 1,
  s: 1000,
  m: 60 * 1000,
  h: 60 * 60 * 1000,
  d: 24 * 60 * 60 * 1000,
  y: 365 * 24 * 60 * 60 * 1000,
};

type DurationUnit = keyof typeof DURATION_TO_MS;

function parseDuration(duration: string) {
  const match = duration.match(/^(\d+)(ms|s|m|h|d|y)$/);

  if (!match) {
    return null;
  }

  return {
    amount: Number(match[1]),
    unit: match[2] as DurationUnit,
  };
}

function durationToMilliseconds(amount: number, unit: DurationUnit) {
  return amount * DURATION_TO_MS[unit];
}

function parseCookie(cookieString: string) {
  const parsedCookie: Record<string, string> = {};

  for (const cookiePart of cookieString.split(";")) {
    const trimmedPart = cookiePart.trim();

    if (!trimmedPart) continue;

    const separatorIndex = trimmedPart.indexOf("=");

    if (separatorIndex === -1) continue;

    const name = trimmedPart.slice(0, separatorIndex);
    const value = trimmedPart.slice(separatorIndex + 1);

    parsedCookie[name] = value;
  }

  return parsedCookie;
}

function cookieExpireTime(duration: string) {
  const parsedDuration = parseDuration(duration);

  if (!parsedDuration) {
    return new Date(Date.now());
  }

  return new Date(
    Date.now() +
      durationToMilliseconds(parsedDuration.amount, parsedDuration.unit),
  );
}

export { parseCookie, cookieExpireTime };
