 
const handleResponse = async (res) => {
  if (res.status === 401) {
    localStorage.removeItem("authToken");
     throw new Error("Unauthorized - please login again.");
  }
  if (!res.ok) {
    const errorText = await res.text();
    let errorData;
    
    try {
      errorData = JSON.parse(errorText);
    } catch (e) {
      throw new Error(errorText);
    }
    
     const error = new Error(errorData.message || "Request failed");
    error.response = {
      status: res.status,
      data: errorData
    };
    throw error;
  }

  return res.json();
};

export const ApiGetServiceWrapper = async ({ url = "", headers = {} }) => {
  const res = await fetch(url, {
    method: "GET",
    headers: {
       "Content-Type": "application/json",
      "Cache-Control": "no-cache",    
      Pragma: "no-cache",
      ...headers,
    },
  });
  return handleResponse(res);
};

export const ApiGetServiceWrapperBlob = async ({ url = "", headers = {} }) => {
  const res = await fetch(url, {
    method: "GET",
    headers: {
       "Cache-Control": "no-cache",    
      Pragma: "no-cache",
      ...headers,
    },
  });
  if (res.status === 401) {
     window.location.href = "/login";
    throw new Error("Unauthorized - please login again.");
  }
  return res; 
};

export const ApiPostServiceWrapper = async ({ url = "", headers = {}, body = {} }) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
    //   Authorization: "Bearer " + getToken(),
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      ...headers,
    },
    body: JSON.stringify(body),
  });
  return handleResponse(res);
};

export const ApiPutServiceWrapper = async ({ url = "", headers = {}, body = {} }) => {
  const res = await fetch(url, {
    method: "PUT",
    headers: {
       "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      ...headers,
    },
    body: JSON.stringify(body),
  });
  return handleResponse(res);
};

export const ApiPatchServiceWrapper = async ({ url = "", headers = {}, body = {} }) => {
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
       "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      ...headers,
    },
    body: JSON.stringify(body),
  });
  return handleResponse(res);
};
