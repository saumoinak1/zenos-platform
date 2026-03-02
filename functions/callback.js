export async function onRequest(context) {
  const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = context.env;
  const url = new URL(context.request.url);
  const code = url.searchParams.get("code");

  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "content-type": "application/json", "accept": "application/json" },
    body: JSON.stringify({ client_id: GITHUB_CLIENT_ID, client_secret: GITHUB_CLIENT_SECRET, code }),
  });

  const result = await response.json();
  
  return new Response(`
    <script>
      const res = ${JSON.stringify({ token: result.access_token, provider: "github" })};
      window.opener.postMessage("authorization:github:success:" + JSON.stringify(res), window.location.origin);
      window.close();
    </script>`, 
    { headers: { "content-type": "text/html" } }
  );
}
