# Enable Google checking for GTO Lens on Lightsail

Selecting **Identify this car** starts the OpenAI identification and Google web check together. If Google is unavailable, visitors can still get the initial photo match and add a rear photo.

## 1. Create the Google key

1. Select a Google Cloud project for GTO Lens and link its billing account. Enable the **Cloud Vision API**. [Open the API in Google Cloud](https://console.cloud.google.com/apis/library/vision.googleapis.com)
2. In **APIs & Services → Credentials**, create an API key. Under **Application restrictions**, choose **IP addresses** and enter the Lightsail server’s static public outbound IP address. Under **API restrictions**, choose **Restrict key → Cloud Vision API**. Save the restrictions. [Open Credentials](https://console.cloud.google.com/apis/credentials)
3. Copy the key directly into the backend configuration on Ubuntu in the next step. Keep the key out of chat, Git, the Vue frontend and Nginx.

## 2. Configure Ubuntu

Over SSH, run `sudoedit /opt/gto-backend/.env`. Add this line alongside your existing OpenAI settings, replacing the placeholder.

```dotenv
GOOGLE_VISION_API_KEY=your_restricted_google_key
```

Use the same file ownership and private read permissions as the existing OpenAI key. The deployment workflow preserves this file. The key can be added after deployment without rebuilding the frontend.

Run `sudo systemctl edit gto-backend` and add the following service override. It gives the running service a persistent, private directory for its usage counter outside the deployment folder.

```ini
[Service]
StateDirectory=gto-lens
StateDirectoryMode=0700
```

After deploying the new backend, apply the settings.

```sh
sudo systemctl daemon-reload
sudo systemctl restart gto-backend
curl --fail http://127.0.0.1:8000/api/lens/options
```

Expect `{"googleAvailable":true}`. This checks that the key is configured. The first scan tests billing, key restrictions and the writable counter. To turn Google off, remove its key from the backend environment and restart the service.

## 3. Check Nginx

The live Nginx site configuration is managed on the server. In the existing HTTPS site, check that `/api/lens/` reaches the same backend as `/api/analyze`, with the original URI. Preserve the rate limits and forwarding settings used for the original endpoint. If an existing `location /api/` already does this, adjust the size and timeout there as needed. If only the original endpoint is proxied, add a sibling location using its proxy settings. For example:

```nginx
location /api/lens/ {
    client_max_body_size 12m;
    proxy_read_timeout 65s;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_pass http://127.0.0.1:8000;
}
```

The two-photo request can contain two JPEGs of up to 5 MiB each. Apply Nginx edits with `sudo nginx -t && sudo systemctl reload nginx`. Then check the public route:

```sh
curl --fail https://gto-luxembourg.lu/api/lens/options
```

It should return the same JSON as the local check. HTML or a 404 here while the local check succeeds points to Nginx routing. A 413 on a two-photo request points to the upload-size limit.

## 4. Try a real scan

Select **Identify this car**. Lens displays the vehicle specifications directly. When Google returns identifying clues, Lens requests a second OpenAI review to combine them with the photo before displaying the result. Open **Refine this match** to add a rear photo and review both photos with the saved clues. Reloading the results or reviewing a rear photo does not start another Google lookup.

The server reserves at most 500 Google Web Detection attempts per UTC calendar month on this Lightsail instance. The counter is stored in `/var/lib/gto-lens/google-usage.sqlite3`. Keep that file across restarts and releases. If the counter cannot be written, Lens stops Google lookups. Google currently lists the first 1,000 monthly Web Detection units as free. The application limit covers this instance’s requests only. Other projects, callers or services sharing billing can affect the invoice. [Cloud Vision pricing](https://cloud.google.com/vision/pricing)
