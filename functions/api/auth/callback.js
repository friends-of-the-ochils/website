/**
 * Decap CMS – GitHub OAuth: Step 2
 * GitHub redirects here after login. We exchange the code for a token
 * and post it back to the CMS window.
 * Cloudflare Pages runs this at /api/auth/callback
 */
export async function onRequestGet(context) {
  const { searchParams } = new URL(context.request.url);
  const code = searchParams.get('code');

  if (!code) {
    return new Response('Missing code parameter', { status: 400 });
  }

  const clientId     = context.env.GITHUB_CLIENT_ID;
  const clientSecret = context.env.GITHUB_CLIENT_SECRET;

  // Exchange code for access token
  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
  });

  const tokenData = await tokenRes.json();

  if (tokenData.error) {
    return new Response(`GitHub OAuth error: ${tokenData.error_description}`, { status: 400 });
  }

  const token    = tokenData.access_token;
  const provider = 'github';

  // Post the token back to the Decap CMS window via postMessage
  const html = `<!DOCTYPE html>
<html>
<head><title>Authorising…</title></head>
<body>
<p>Authorising, please wait…</p>
<script>
  (function() {
    function receiveMessage(e) {
      console.log('receiveMessage %o', e);
      window.opener.postMessage(
        'authorization:${provider}:success:${JSON.stringify({ token, provider })}',
        e.origin
      );
    }
    window.addEventListener('message', receiveMessage, false);
    window.opener.postMessage('authorizing:${provider}', '*');
  })();
</script>
</body>
</html>`;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}
