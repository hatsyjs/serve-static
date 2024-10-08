# Static Content Handler

[![NPM][npm-image]][npm-url]
[![Build Status][build-status-img]][build-status-link]
[![Code Quality][quality-img]][quality-link]
[![Coverage][coverage-img]][coverage-link]
[![GitHub Project][github-image]][github-url]
[![API Documentation][api-docs-image]][api documentation]

[npm-image]: https://img.shields.io/npm/v/@hatsy/serve-static.svg?logo=npm
[npm-url]: https://www.npmjs.com/package/@hatsy/serve-static
[build-status-img]: https://github.com/hatsyjs/serve-static/workflows/Build/badge.svg
[build-status-link]: https://github.com/hatsyjs/serve-static/actions?query=workflow:Build
[quality-img]: https://app.codacy.com/project/badge/Grade/605eb2284cdd4152bdc5f7388ac83854
[quality-link]: https://app.codacy.com/gh/hatsyjs/serve-static/dashboard?utm_source=gh&utm_medium=referral&utm_content=hatsyjs/serve-static&utm_campaign=Badge_Grade
[coverage-img]: https://app.codacy.com/project/badge/Coverage/605eb2284cdd4152bdc5f7388ac83854
[coverage-link]: https://app.codacy.com/gh/hatsyjs/serve-static/dashboard?utm_source=gh&utm_medium=referral&utm_content=hatsyjs/serve-static&utm_campaign=Badge_Coverage
[github-image]: https://img.shields.io/static/v1?logo=github&label=GitHub&message=project&color=informational
[github-url]: https://github.com/hatsyjs/serve-static
[api-docs-image]: https://img.shields.io/static/v1?logo=typescript&label=API&message=docs&color=informational
[api documentation]: https://hatsyjs.github.io/serve-static

## serveStatic()

This module contains a [serveStatic()] factory of request handler able to serve static content.

It is based on [send] and can be configured with [similar options][servestaticconfig].

```typescript
import { httpListener } from '@hatsy/hatsy';
import { dispatchByName, Routing } from '@hatsy/router';
import { serveStatic } from '@hatsy/serve-static';
import { createServer } from 'http';

const server = createServer(
  httpListener(
    Routing.for(
      dispatchByName({
        assets: serveStatic('static_html/assets', { extensions: ['png', 'jpeg', 'gif'] }),
      }),
    ),
  ),
);

server.listen(8080);
```

[send]: https://www.npmjs.com/package/send
[serveStatic()]: https://hatsyjs.github.io/serve-static/functions/serveStatic.html
[ServeStaticConfig]: https://hatsyjs.github.io/serve-static/interfaces/ServeStaticConfig.html
