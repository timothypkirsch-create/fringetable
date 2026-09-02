const API_VERSION = 'v26.0';
const pageId = process.env.META_PAGE_ID;
const accessToken = process.env.META_PAGE_ACCESS_TOKEN;
const message = process.env.META_POST_MESSAGE;
const link = process.env.META_POST_LINK || '';

if (!pageId) throw new Error('Missing META_PAGE_ID.');
if (!accessToken) throw new Error('Missing META_PAGE_ACCESS_TOKEN.');
if (!message || !message.trim()) throw new Error('Missing META_POST_MESSAGE.');

const params = new URLSearchParams({
  message: message.trim(),
  access_token: accessToken,
});
if (link.trim()) params.set('link', link.trim());

const response = await fetch(`https://graph.facebook.com/${API_VERSION}/${encodeURIComponent(pageId)}/feed`, {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  body: params,
});

const data = await response.json();
if (!response.ok || data.error) {
  const safe = data?.error ? {
    message: data.error.message,
    type: data.error.type,
    code: data.error.code,
    error_subcode: data.error.error_subcode,
  } : { status: response.status };
  throw new Error(`Meta publish failed: ${JSON.stringify(safe)}`);
}

console.log(`Published Facebook Page post: ${data.id || 'success'}`);
