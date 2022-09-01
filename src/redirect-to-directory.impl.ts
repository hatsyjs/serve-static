import type { HttpMeans, RequestContext } from '@hatsy/hatsy';
import type { RouterMeans } from '@hatsy/router';

/**
 * @internal
 */
export function redirectToDirectory({
  fullRoute,
  response,
}: RequestContext<HttpMeans & RouterMeans>): void {
  const { url } = fullRoute;

  // send redirect response
  response.statusCode = 301;
  response.setHeader('Content-Type', 'text/html; charset=UTF-8');
  response.setHeader('Content-Security-Policy', "default-src 'none'");
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('Location', `${url.pathname}/${url.search}`);

  response.end();
}
