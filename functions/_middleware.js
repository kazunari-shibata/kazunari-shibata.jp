// Canonicalize the apex domain and the production *.pages.dev alias to
// https://www.kazunari-shibata.jp. Per-deployment preview URLs
// (e.g. 7e51694e.kazunari-shibata-jp.pages.dev) are intentionally left
// alone so individual deployments stay previewable.
// Pages _redirects can't match on hostname, so this runs as middleware.
const CANONICAL_HOST = "www.kazunari-shibata.jp";
const REDIRECT_HOSTS = new Set([
  "kazunari-shibata.jp",
  "kazunari-shibata-jp.pages.dev",
]);

export async function onRequest(context) {
  const url = new URL(context.request.url);

  if (REDIRECT_HOSTS.has(url.hostname)) {
    url.hostname = CANONICAL_HOST;
    url.protocol = "https:";
    url.port = "";
    return Response.redirect(url.toString(), 301);
  }

  return context.next();
}
