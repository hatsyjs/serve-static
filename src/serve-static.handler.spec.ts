import { httpListener, HttpMeans } from '@hatsy/hatsy';
import { Logging } from '@hatsy/hatsy/core';
import { suppressedLog, TestHttpServer } from '@hatsy/hatsy/testing';
import { dispatchByName, RouterMeans, Routing } from '@hatsy/router';
import type { ServeStaticConfig } from './serve-static-config';
import { serveStatic } from './serve-static.handler';

describe('serveStatic', () => {

  let server: TestHttpServer;

  beforeAll(async () => {
    server = await TestHttpServer.start();
  });
  afterAll(async () => {
    await server.stop();
  });

  beforeEach(() => {
    setup();
  });

  function setup(config?: ServeStaticConfig): void {
    server.listener.mockImplementation(httpListener(
        {
          handleBy(handler) {
            return Logging.logBy(suppressedLog).for(handler);
          },
        },
        Routing.for(dispatchByName<HttpMeans & RouterMeans>({
          root: serveStatic('src/spec/root', config),
        })),
    ));
  }

  it('serves static file', async () => {

    const response = await server.get('/root/file.html');

    expect(response.statusCode).toBe(200);
    expect(await response.body()).toContain('TEST FILE');
  });
  it('does not serve absent file', async () => {

    const response = await server.get('/root/non-existing/.html');

    expect(response.statusCode).toBe(404);
  });
  it('responds on HEAD request', async () => {

    const response = await server.get('/root/file.html', { method: 'HEAD' });

    expect(response.statusCode).toBe(200);
    expect(await response.body()).toBe('');
  });
  it('does not respond on non-GET request', async () => {

    const response = await server.post('/root/file.html');

    expect(response.statusCode).toBe(404);
  });
  it('redirects to root directory index', async () => {

    const response = await server.get('/root');

    expect(response.statusCode).toBe(301);
    expect(response.headers.location).toBe('/root/');
  });
  it('redirects to nested directory index', async () => {

    const response = await server.get('/root/dir?param=value');

    expect(response.statusCode).toBe(301);
    expect(response.headers.location).toBe('/root/dir/?param=value');
  });
  it('does not redirect to root directory index when disabled', async () => {
    setup({ redirect: false });

    const response = await server.get('/root');

    expect(response.statusCode).toBe(404);
  });
  it('does not redirect to nested directory index when disabled', async () => {
    setup({ redirect: false });

    const response = await server.get('/root/dir');

    expect(response.statusCode).toBe(404);
  });
  it('responds with root directory index', async () => {

    const response = await server.get('/root/');

    expect(response.statusCode).toBe(200);
    expect(await response.body()).toContain('ROOT INDEX');
  });
  it('responds with nested directory index', async () => {

    const response = await server.get('/root/dir/');

    expect(response.statusCode).toBe(200);
    expect(await response.body()).toContain('DIR INDEX');
  });
});
