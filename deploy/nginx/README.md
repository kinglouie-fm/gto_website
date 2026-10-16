# Canonical domain redirect

The preferred domain is `https://gto-luxembourg.lu`. Nginx serves the frontend
directly, so domain redirects belong in Nginx and must apply before static
file handling.

`www-redirect.conf` is a server-scope include for the existing GTO virtual
hosts. It redirects requests for `www.gto-luxembourg.lu` to the preferred
HTTPS domain with HTTP 301, retaining the original path and query string.
Requests to the preferred domain are unaffected.

## Installation

The active server configuration is not stored in this repository. These
instructions must be applied to that configuration; adding this file to the
repository alone does not activate the redirect.

1. Copy `www-redirect.conf` to `/etc/nginx/snippets/gto-www-redirect.conf`.
2. In the HTTP and HTTPS `server` blocks whose `server_name` includes
   `www.gto-luxembourg.lu`, add this include before any existing `return`,
   `rewrite` or host-based redirect:

   ```nginx
   include /etc/nginx/snippets/gto-www-redirect.conf;
   ```

3. Keep the existing TLS certificate, listeners, asset handling and proxy
   configuration. The HTTPS listener needs a valid certificate covering
   `www.gto-luxembourg.lu` so clients can connect before receiving the redirect.
4. Validate with `sudo nginx -t`, then reload with `sudo systemctl reload nginx`.

## Verification

```bash
curl -I 'http://www.gto-luxembourg.lu/events?source=redirect-check'
curl -I 'https://www.gto-luxembourg.lu/events?source=redirect-check'
curl -I 'https://gto-luxembourg.lu/events'
```

Both www requests should return HTTP 301 with
`Location: https://gto-luxembourg.lu/events?source=redirect-check`.
The preferred-domain request should keep its normal page response without
a domain redirect.
