export const ok = (body: object) => ({
  statusCode: 200,
  body: JSON.stringify(body),
});

export const created = (body: object) => ({
  statusCode: 201,
  body: JSON.stringify(body),
});

export const badRequest = (message: string) => ({
  statusCode: 400,
  body: JSON.stringify({ message }),
});

export const internalError = (message: string) => ({
  statusCode: 500,
  body: JSON.stringify({ message }),
});
