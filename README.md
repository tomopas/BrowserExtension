# Browser Extension for HashPasswordGenerator

This browser extension is a component of the HashPasswordGenerator project, designed to provide users with a convenient way to generate secure, hashed passwords directly within their browser.

## Features

- Generate hashed passwords based on various algorithms.
- Easy integration with your browser for quick access.
- User-friendly interface.

## Installation (for development)

1. Open Google Chrome (or any Chromium-based browser) and navigate to `chrome://extensions`.
2. Enable 'Developer mode' by toggling the switch in the top right corner.
3. Click on 'Load unpacked' and select this `BrowserExtension/` directory.

## Usage

Once installed, a new icon will appear in your browser's toolbar. Click on this icon to open the extension's popup. From there, you can configure your password generation preferences and generate passwords.

## Files Overview

- `manifest.json`: The manifest file for the Chrome extension.
- `popup.html`: The HTML file for the extension's popup interface.
- `popup.js`: The JavaScript logic for the popup.
- `background.js`: Background script for handling events.
- `content.js`: Content script for interacting with web pages.
- `export.html`, `export.js`: Files related to exporting generated passwords.
- `qrcode.min.js`: Library for QR code generation (if used for secure transfer).
- `welcome.html`, `welcome.js`, `uninstall.html`: Pages for welcome and uninstall flows.
