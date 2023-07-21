import { EmailData } from './email';

export async function sendContactEmail(email: EmailData) {
  const response = await fetch('http://localhost:3000/api/contact', {
    method: 'POST',
    body: JSON.stringify(email),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'failed to request to server');
  }

  return data;
}
