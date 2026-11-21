# ABRP 8.0.1 compatibility shim (temporary)

Added in integration 1.4.3 (2026-11-21), while ABRP web app **8.0.1 (build
6112)** was only on <https://beta.abetterrouteplanner.com/> and
<https://abetterrouteplanner.com/> still served **8.0.0 (build 6110)**.

## What changed in ABRP

ABRP 8.0.1 renamed its car-brand logo files. Light and dark logos still sit
in separate folders, but the file name lost its `-light` / `-dark` suffix:

| ABRP version | Logo asset path |
| --- | --- |
| ≤ 8.0.0 | `/assets/assets/oem-icons/light/tata-motors-light.<hash>.svg` |
| ≥ 8.0.1 | `/assets/assets/oem-icons/light/tata-motors.<hash>.svg` |

The old pattern finds 0 logos in the 8.0.1 bundle, so without the shim the
Brand sensor and the card's brand logo would go blank the moment 8.0.1 ships.

## The shim

`_OEM_ICON_RE` in
[`custom_components/abrp/metadata.py`](../custom_components/abrp/metadata.py)
accepts both names by making the suffix optional:

```python
_OEM_ICON_RE = re.compile(
    r'"(/assets/assets/oem-icons/(light|dark)/([a-z0-9-]+?)'
    r"(?:-(?:light|dark))?"  # ABRP <= 8.0.0 only
    r'\.[0-9a-f]+\.svg)"'
)
```

Checked against the saved bundles: 100 brands (all with light and dark) on
8.0.0, 104 on 8.0.1, the same brand keys on both.

## Removing it once 8.0.1 is live

1. Confirm the live site serves 8.0.1 or later: the Home Assistant debug log
   prints `ABRP metadata: app_version=…`, or check
   `version:"…",buildNumber:"…"` in the site's `App-*.js` bundle.
2. In `metadata.py`, delete the line marked `# ABRP <= 8.0.0 only` and make
   the name group greedy again:

   ```python
   # e.g. "/assets/assets/oem-icons/light/tata-motors.<hash>.svg"
   _OEM_ICON_RE = re.compile(
       r'"(/assets/assets/oem-icons/(light|dark)/([a-z0-9-]+)\.[0-9a-f]+\.svg)"'
   )
   ```

3. Update the comment above it, and remove the reference to this file.
4. Delete this file.

Not part of the shim: the 1.4.3 change that derives **Plugged in** from the
live stream's charging state works with any ABRP version and stays.
