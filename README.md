Static Content Handler
======================

[![NPM][npm-image]][npm-url]
[![Build Status][build-status-img]][build-status-link]
[![codecov][codecov-image]][codecov-url]
[![GitHub Project][github-image]][github-url]
[![API Documentation][api-docs-image]][API documentation]

[npm-image]: https://img.shields.io/npm/v/@hatsy/serve-static.svg?logo=npm
[npm-url]: https://www.npmjs.com/package/@hatsy/serve-static
[build-status-img]: https://github.com/hatsyjs/serve-static:Build/badge.svg
[build-status-link]: https://github.com/hatsyjs/serve-static/actions?query=workflow:Build
[codecov-image]: https://codecov.io/gh/hatsyjs/serve-statis/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/hatsyjs/serve-static
[github-image]: https://img.shields.io/static/v1?logo=github&label=GitHub&message=project&color=informational
[github-url]: https://github.com/hatsyjs/serve-static
[api-docs-image]: https://img.shields.io/static/v1?logo=typescript&label=API&message=docs&color=informational
[API documentation]: https://hatsyjs.github.io/serve-static


serveStatic()
-------------

This module contains a [serveStatic()] factory of request handler able to serve static content.

It is based on [send] and can be configured with [similar options][ServeStaticConfig].

```typescript
import { httpListener } from '@hatsy/hatsy';
import { dispatchByName, Routing } from '@hatsy/router';
import { serveStatic } from '@hatsy/serve-static';
import { createServer } from 'http';

const server = createServer(httpListener(
    Routing.for(dispatchByName({
        assets: serveStatic('static_html/assets', { extensions: ['png', 'jpeg', 'gif'] }),
    })),
));

server.listen(8080);
```

[send]: https://www.npmjs.com/package/send 
[serveStatic()]: https://hatsyjs.github.io/kit/modules/@hatsy_serve-static.html#serveStatic
[ServeStaticConfig]: https://hatsyjs.github.io/kit/interfaces/@hatsy_serve-static.ServeStaticConfig.html
