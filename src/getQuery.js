module.exports = function getQuery(event) {
    let query = '';
    let method = event.requestContext?.http?.method ? event.requestContext.http.method : event.requestContext.httpMethod;

    if (method === 'POST' && event.body) {
        // Check for query parameter in request body
        try {
            // Try parsing body as JSON
            const bodyObj = JSON.parse(event.body);
            if (bodyObj.q) {
                query = bodyObj.q;
            }
        } catch (err) {
            // Body is not JSON, try parsing as URL-encoded form data
            const formData = new URLSearchParams(event.body);
            if (formData.get('q')) {
                query = formData.get('q');
            }
        }

        if (!query) {
            // Body is not URL-encoded form data either, try parsing as multipart/form-data
            const contentType = event.headers['Content-Type'];
            if (contentType && contentType.match(/boundary=(.*)/)) {
                const boundary = contentType.match(/boundary=(.*)/)[1];
                const parts = event.body.split(`--${boundary}`);
                for (const part of parts) {
                    if (part.includes('name="q"')) {
                        query = part.split('\r\n\r\n')[1].trim();
                        break;
                    }
                }
            }
        }
    } else if (method === 'GET' && event.queryStringParameters && event.queryStringParameters.q) {
        // Check for query parameter in URL
        query = event.queryStringParameters.q;
    }

    return query;
}