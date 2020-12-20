/**
 * @packageDocumentation
 * @module @hatsy/serve-static
 */
/**
 * Static contents service configuration.
 */
export interface ServeStaticConfig {

  /**
   * Whether ranged requests accepted.
   *
   * Disabling this will not send [Accept-Ranges] and ignore the contents of the [Range] request header.
   *
   * [Accept-Ranges]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Ranges
   * [Range]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Range
   *
   * @default `true`
   */
  readonly acceptRanges?: boolean;

  /**
   * Whether to set [Cache-Control] response header.
   *
   * Disabling this will ignore the {@link immutable} and {@link maxAge} options.
   *
   * [Cache-Control]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
   *
   * @default `true`
   */
  readonly cacheControl?: boolean;

  /**
   * How "dotfiles" are treated when encountered.
   *
   * A dotfile is a file or directory that begins with a dot (`.`).
   *
   * This check is done on the path itself without checking if the path actually exists on the disk.
   * If root is specified, only the dotfiles above the root are checked (i.e. the root itself can be within a
   * dotfile when when set to "deny").
   *
   * Possible values:
   * - `'allow'` No special treatment for dotfiles
   * - `'deny'` Send a 403 for any request for a dotfile
   * - `'ignore'` (the default) Pretend like the dotfile does not exist and call next()
   *
   * @default `ignore`
   */
  readonly dotfiles?: 'allow' | 'deny' | 'ignore';

  /**
   * Whether to generate [ETag] response headers.
   *
   * [ETag]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag
   *
   * @default `true`
   */
  readonly etag?: boolean;

  /**
   * File extension fallbacks.
   *
   * When set, if a file is not found, the given extensions will be added to the file name and search for.
   *
   * The first that exists will be served. Example: `['html', 'htm']`.
   *
   * @default `false`.
   */
  readonly extensions?: string[] | false;

  /**
   * Whether to add the `immutable` directive in the [Cache-Control] response header.
   *
   * If enabled, the {@link maxAge} option should also be specified to enable caching. The `immutable` directive will
   * prevent supported clients from making conditional requests during the life of the {@link maxAge} option to check if
   * the file has changed.
   *
   * [Cache-Control]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
   */
  readonly immutable?: boolean;

  /**
   * Whether to send `index.html` file in response to a request on a directory.
   *
   * Possible values:
   * - `true` - to send `index.html` files.
   * - `false` - to disable directory index.
   * - string or array of strings containing index file names.
   *
   * @default `true`.
   */
  readonly index?: boolean | string | string[];

  /**
   * Whether to send a [Last-Modified] header.
   *
   * Uses the file system's last modified value.
   *
   * [Last-Modified]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Last-Modified
   *
   * @default `true`
   */
  readonly lastModified?: boolean;

  /**
   * Provide a max-age in milliseconds for http caching.
   *
   * This can also be a string accepted by the ms module.
   *
   * @default `0`
   */
  readonly maxAge?: number | string;

  /**
   * Redirect to trailing `/` when the pathname is a dir.
   *
   * @default `true`
   */
  readonly redirect?: boolean;

}
