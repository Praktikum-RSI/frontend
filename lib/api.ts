const get = async <T>(input: RequestInfo | URL, init?: RequestInit) => {
  const response = await fetch(input, {
    method: "GET",
    ...init,
  });
  return (await response.json()) as T;
};

const post = async <T>(
  input: RequestInfo | URL,
  { arg }: { arg: any },
  init?: RequestInit,
) => {
  const response = await fetch(input, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    body: JSON.stringify(arg),
    ...init,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return (await response.json()) as T;
};

const put = async <T>(input: RequestInfo | URL, init?: RequestInit) => {
  const response = await fetch(input, {
    method: "PUT",
    ...init,
  });
  return (await response.json()) as T;
};

const patch = async <T>(input: RequestInfo | URL, init?: RequestInit) => {
  const response = await fetch(input, {
    method: "PATCH",
    ...init,
  });
  return (await response.json()) as T;
};

const remove = async <T>(input: RequestInfo | URL, init?: RequestInit) => {
  const response = await fetch(input, {
    method: "DELETE",
    ...init,
  });
  return (await response.json()) as T;
};

export const api = {
  get,
  post,
  put,
  patch,
  remove,
};
