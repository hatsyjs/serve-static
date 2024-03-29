import { HttpError, HttpMeans, RequestHandler } from '@hatsy/hatsy';
import type { RouterMeans } from '@hatsy/router';
import { resolve } from 'node:path';
import send from 'send';
import { redirectToDirectory } from './redirect-to-directory.impl.js';
import type { ServeStaticConfig } from './serve-static-config.js';

/**
 * Creates a request handler that serves static content from the given `root` directory.
 *
 * @param root - Root directory to serve files from.
 * @param config - Static contents service configuration.
 *
 * @returns New HTTP route processing handler.
 */
export function serveStatic(
  root: string,
  config: ServeStaticConfig = {},
): RequestHandler<HttpMeans & RouterMeans> {
  const { redirect = true, maxAge = 0 } = config;
  const opts = { ...config, maxAge, root: resolve(root) };

  return async context => {
    const { request, response, route, fullRoute } = context;

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return;
    }

    await new Promise<void>((resolve, reject) => {
      // Ensure the path does not start with `/` unless a directory requested.
      const path = route.path.length ? `/${route.toPathString()}` : fullRoute.dir ? '/' : '';
      const stream = send(request, path, opts);

      stream.on('directory', () => {
        if (!redirect) {
          resolve();
        } else {
          resolve(redirectToDirectory(context));
        }
      });
      stream.on('error', (cause: HttpError) => {
        reject(new HttpError(cause.statusCode, { message: cause.message, cause }));
      });

      stream.on('end', resolve);
      stream.pipe(response);
    });
  };
}
