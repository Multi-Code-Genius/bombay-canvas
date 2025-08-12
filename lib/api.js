const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function getCookieByKey(key) {
  const name = key + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");
  for (let i = 0; i < cookieArray.length; i++) {
    const cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return undefined;
}

export const api = async (endpoint, config) => {
  const { body, headers = {}, method = "GET", ...customConfig } = config;

  const accessToken = getCookieByKey("accessToken");

  const isFormData = body instanceof FormData;

  const headersObj = {
    Accept: "application/json, text/plain, */*",
    "Accept-Language": "en-GB,en;q=0.9",
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    Authorization: `Bearer ${accessToken || ""}`,
    "Tenant-ID": localStorage.getItem("activeTenantId") || "",
    ...headers,
  };

  if (isFormData) {
    delete headersObj["Content-Type"];
  }

  Object.keys(headersObj).forEach((key) => {
    if (headersObj[key] === undefined) {
      delete headersObj[key];
    }
  });

  const requestConfig = {
    method,
    headers: headersObj,
    credentials: "include",
    body: isFormData
      ? body
      : typeof body === "string"
      ? body
      : body !== undefined
      ? JSON.stringify(body)
      : undefined,
    ...customConfig,
  };

  try {
    const api_url = BASE_URL;

    const response = await fetch(`${api_url}${endpoint}`, requestConfig);

    if (!response.ok) {
      if (response.status === 414) {
        return null;
      }

      const error = await response
        .json()
        .catch(() => ({ message: "Something went wrong" }));
      throw new Error(error.message || "Something went wrong");
    }

    if (response.status === 204) {
      return undefined;
    }

    return response.headers.get("Content-Type")?.includes("application/json")
      ? response.json()
      : response;
  } catch (error) {
    throw error;
  }
};
