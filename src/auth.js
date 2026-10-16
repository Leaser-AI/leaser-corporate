const challengeHeaders = {
  'WWW-Authenticate': 'Basic realm="Leaser AI", charset="UTF-8"',
  'Cache-Control': 'private, no-store',
  'Content-Type': 'text/plain; charset=UTF-8',
};

async function sameSecret(provided, expected) {
  const encoder = new TextEncoder();
  const [providedHash, expectedHash] = await Promise.all([
    crypto.subtle.digest('SHA-256', encoder.encode(provided)),
    crypto.subtle.digest('SHA-256', encoder.encode(expected)),
  ]);
  return crypto.subtle.timingSafeEqual(providedHash, expectedHash);
}

async function authorized(request, env) {
  if (!env.BASIC_AUTH_USERNAME || !env.BASIC_AUTH_PASSWORD) return false;
  const authorization = request.headers.get('Authorization');
  if (!authorization?.startsWith('Basic ')) return false;

  let credentials;
  try {
    credentials = atob(authorization.slice(6));
  } catch {
    return false;
  }
  const separator = credentials.indexOf(':');
  if (separator < 0) return false;

  const username = credentials.slice(0, separator);
  const password = credentials.slice(separator + 1);
  const [usernameMatches, passwordMatches] = await Promise.all([
    sameSecret(username, env.BASIC_AUTH_USERNAME),
    sameSecret(password, env.BASIC_AUTH_PASSWORD),
  ]);
  return usernameMatches && passwordMatches;
}

export default {
  async fetch(request, env) {
    if (!(await authorized(request, env))) {
      return new Response('Authentication required.\n', {
        status: 401,
        headers: challengeHeaders,
      });
    }

    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);
    headers.set('Cache-Control', 'private, no-store');
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
