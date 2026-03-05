export const apiUrl =
  //process.env.REACT_APP_API_URL || "http://localhost:3333/api";
  process.env.REACT_APP_API_URL || "https://back-vinx.onrender.com/api";

export const uploadUrl =
  //process.env.REACT_APP_UPLOAD_URL || "http://localhost:3333/uploads";
  process.env.REACT_APP_UPLOAD_URL || "https://back-vinx.onrender.com/uploads";

export const requestConfig = (method, data, token = null, image = null) => {
  let config;

  if (image) {
    config = {
      method,
      body: data,
      headers: {},
    };
  } else if (method === "DELETE" || data === null) {
    config = {
      method,
      headers: {},
    };
  } else {
    config = {
      method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};