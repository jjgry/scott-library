const host = "http://localhost:8080";

export const httpGet = async <T>(path: string): Promise<T> => {
  const response = await fetch(`${host}${path}`);
  return await response.json();
};

export const httpPut = async <T>(path: string, body: T): Promise<T> => {
  const response = await fetch(`${host}${path}`, {
    body: JSON.stringify(body),
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
};

export const httpDelete = async <T>(path: string): Promise<T> => {
  const response = await fetch(`${host}${path}`, { method: "DELETE" });
  return await response.json();
};
