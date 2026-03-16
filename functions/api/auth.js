/**
 * Decap CMS – GitHub OAuth: Step 1
 * Redirects the user to GitHub's login page.
 * Cloudflare Pages runs this at /api/auth
 */
export async function onRequestGet(context) {
  const clientId = context.env.GITHUB_CLIENT_ID;
  const params = new URLSearchParams({
    client_id: clientId,
    scope: 'repo,user',
  });
  return Response.redirect(
    `https://github.com/login/oauth/authorize?${params}`,
    302
  );
}
