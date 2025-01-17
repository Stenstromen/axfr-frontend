export async function onRequest({ request, params }) {
  // Get the path from params
  const path = params.path || [];
  
  // Construct the API URL
  const apiUrl = new URL(path.join('/'), 'https://api.axfr.se/');
  apiUrl.search = new URL(request.url).search;
  
  // Forward the request
  const apiRequest = new Request(apiUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body,
  });

  return fetch(apiRequest);
} 