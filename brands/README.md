# ABRP Mate brand assets

Home Assistant does **not** load an integration's logo from the
`custom_components` folder. The frontend always fetches brand images from the
central [`home-assistant/brands`](https://github.com/home-assistant/brands)
CDN, keyed by the integration `domain`:

```
https://brands.home-assistant.io/abrp_mate/icon.png
https://brands.home-assistant.io/abrp_mate/icon@2x.png
```

So to make the ABRP logo appear next to **ABRP Mate** in *Settings → Devices &
Services* (and on each device card), these images must be merged into the
brands repository.

## What's here

This folder mirrors the exact layout the brands repo expects for a custom
integration, so it can be copied straight into a PR:

```
custom_integrations/abrp_mate/
├── icon.png      # 256×256
└── icon@2x.png   # 512×512
source/
└── abrp_icon_200.png   # original asset, for regenerating if needed
```

The icons are derived from ABRP's own app icon
(`https://abetterrouteplanner.com/icon/abrp_icon.png`, 200×200, the largest
public source available) and upscaled to the required sizes.

## How to publish

1. Fork [`home-assistant/brands`](https://github.com/home-assistant/brands).
2. Copy `custom_integrations/abrp_mate/` from this folder into the fork's
   `custom_integrations/` directory.
3. Open a PR. Once merged, Home Assistant shows the logo automatically — no
   change to `manifest.json` is needed (HA matches on `domain`).

> **Trademark note:** the ABRP shield/logo is property of Iternio AB. These
> assets are reused only to identify the service this community integration
> talks to. Remove them on request from the rights holder.
