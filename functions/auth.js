export async function onRequest(context) {
  const { GITHUB_CLIENT_ID } = context.env;
  return Response.redirect(
    `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=repo,user`,
    302
  );
}
