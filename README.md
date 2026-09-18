# Nook grocery demo

A responsive, browser-local single-store grocery delivery demo. Simulated browser-local login; no backend, payment credentials, or real orders.

## Run locally

Clone this repository, open a terminal in its folder, and run:

```sh
python3 -m http.server 4173 --directory dist
```

Open http://localhost:4173 in a browser. No build or package installation is needed. Stop the server with Ctrl+C.

## Client walkthrough

1. Browse the 20 products; try search and category chips.
2. Add products, adjust quantities, and open the basket.
3. Select Home (2.4 km), Office (5.6 km), or Outside delivery area (10.2 km) using the address selector. Custom addresses accept a simulated distance.
4. Checkout is blocked outside the configured radius. The initial radius is 8 km.
5. Pick cash, UPI, or card. All payment methods are mockups and collect no payment information.
6. Place a demo order and view confirmation and tracking.
7. Open Store demo to change stock, prices, service radius, and order status. Stock decreases when orders are placed. Order progress can move forward to Delivered.
8. Return to My orders to see the updated tracking state. Orders also synchronize between tabs on the same origin.

Delivery is ₹25, or free for an item subtotal of ₹299 or above. Displayed arrival times and distances are simulated, not GPS or routing calculations. Product artwork uses intentional emoji placeholders. The promotional image is stored locally.

## Data and customization

Data is saved only to the current browser's local storage under `nook-demo-v1`. A different browser or preview URL has separate data. To reset, clear this site's browser storage.

- `dist/app.js`: seed products, initial radius, sample addresses, brand constant, cart and order logic.
- `dist/index.html`: header wordmark, title, description and favicon.
- `dist/style.css`: shared colors, typography and responsive layouts.

Replace Nook in these three files to rebrand. Google Fonts loads optionally online; system sans-serif fonts are used as fallback. All store data and the banner photograph are local.

Photo: Tom Paolini / Unsplash, https://unsplash.com/photos/a-basket-filled-with-lots-of-different-types-of-vegetables-nXKDqpmdx_8 (Unsplash License).

## Demo login

Choose **Log in**, enter a sample name and 10-digit Indian mobile number (e.g. 9876543210), then enter **123456**. No SMS is sent. Checkout asks guests to log in, then resumes with the existing basket. **My account** provides order history and logout. The profile survives refresh in this browser; logout removes the active profile. Orders are grouped by the supplied mobile number. Earlier anonymous orders remain in the store demo.

This is a UI simulation, not secure authentication or verified identity. The store demo remains openly accessible for presentations. Profiles use `nook-customer-v1` in local storage; all data is accessible locally.

## Separate store operations app

Open `/operations/` on the same server. Use Orders to accept and pack incoming orders, mark them out for delivery, then delivered. Add a sample order for a walkthrough (this consumes stock). Products & stock supports adding products, searching inventory, and changing price/quantity. Store settings controls the service radius.

The customer and store apps share local storage on the same origin and browser profile; open both in separate tabs to demonstrate live updates. Different phones, browser profiles and installations do not share demo orders. This is not a secure staff portal or a production order system.

## Customer app installation and QR

Open `/install/` for mobile installation instructions and the QR. In store operations, select Customer app QR to download the counter QR image. The QR points to the hosted `/install/` page. The hosted site currently requires the owner's access while its sharing is private.

The customer app includes a web app manifest, 192px and 512px icons, and a network-only service worker. Supported browsers can install it as a standalone web app. On Android use Chrome's Install / Add to Home screen; on iPhone use Safari → Share → Add to Home Screen. Browser installation prompts vary; the page always provides instructions. This is not an APK or App Store package. HTTPS (or localhost) and network access are required; private hosting sign-in may affect browser install eligibility. No offline order submission is provided.

`dist/operations/` contains the store interface. `dist/install/`, `dist/install.js`, `dist/manifest.webmanifest` and `dist/sw.js` provide installation support. If the deployment address changes, regenerate `dist/customer-app-qr.png` for the new install URL.
