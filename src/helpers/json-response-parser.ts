
export const jsonResponseParser = async (response: Promise<Response>, onError?: (e: any) => any) => {
  try {
    const res = await response;
    const contentType = res.headers["content-type"] || (res.headers.get && res.headers.get("content-type")) || "";
    if (/application\/json/.test(contentType)) {
      const jsonResponse = await res.json();
      if (res.ok) {
        return jsonResponse;
      } else if (onError) {
        return onError(jsonResponse);
      }
    }
  } catch (e) {
    if (onError) {
      return onError(e);
    }
  }
  return null;
};
