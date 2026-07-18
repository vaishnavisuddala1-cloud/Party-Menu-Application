const AUTH_URL = 'https://serverless-api-teal.vercel.app/api/auth/signin';

export async function signIn({ email, password }) {
  const response = await fetch(AUTH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Unable to sign in. Please try again.');
  }

  return data;
}
