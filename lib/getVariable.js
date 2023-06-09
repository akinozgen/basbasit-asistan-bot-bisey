export function getVariable(event, key) {
  let query = '';
  let method = event.requestContext?.http?.method
    ? event.requestContext.http.method
    : event.requestContext.httpMethod;

  if (method === 'POST' && event.body) {
    try {
      const bodyObj = JSON.parse(event.body);
      if (bodyObj[key]) {
        query = bodyObj[key];
      }
    } catch (err) {
      // eslint-disable-next-line node/no-unsupported-features/node-builtins
      const formData = new URLSearchParams(event.body);
      if (formData.get(key)) {
        query = formData.get(key);
      }
    }

    if (!query) {
      // Body is not URL-encoded form data either, try parsing as multipart/form-data
      const contentType = event.headers['Content-Type'];
      if (contentType && contentType.match(/boundary=(.*)/)) {
        const boundary = contentType.match(/boundary=(.*)/)[1];
        const parts = event.body.split(`--${boundary}`);
        for (const part of parts) {
          if (part.includes(`name="${key}"`)) {
            query = part.split('\r\n\r\n')[1].trim();
            break;
          }
        }
      }
    }
  } else if (method === 'GET' && event.queryStringParameters && event.queryStringParameters[key]) {
    // Check for query parameter in URL
    query = event.queryStringParameters[key];
  }

  return query;
}
