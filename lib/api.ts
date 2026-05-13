const get = async <T>(input: RequestInfo | URL, init?: RequestInit) => {
  const response = await fetch(input, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    ...init,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`${data.message || "API error"}`);
  }

  return data as T;
};

const post = async <T>(input: RequestInfo | URL, init?: RequestInit) => {
  const response = await fetch(input, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    ...init,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`${data.message || "API error"}`);
  }

  return data as T;
};

const put = async <T>(input: RequestInfo | URL, init?: RequestInit) => {
  const response = await fetch(input, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    ...init,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`${data.message || "API error"}`);
  }

  return data as T;
};

const patch = async <T>(input: RequestInfo | URL, init?: RequestInit) => {
  const response = await fetch(input, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    ...init,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`${data.message || "API error"}`);
  }

  return data as T;
};

const remove = async <T>(input: RequestInfo | URL, init?: RequestInit) => {
  const response = await fetch(input, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    ...init,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`${data.message || "API error"}`);
  }

  return data as T;
};

export const api = {
  get,
  post,
  put,
  patch,
  remove,
};
