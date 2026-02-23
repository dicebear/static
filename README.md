# DiceBear Static

Static assets and JSON schemas for [DiceBear](https://www.dicebear.com).

## Contents

### Images (`src/images/`)

DiceBear SVG logos and favicons in black, blue, and white variants.

### Schemas (`src/schema/`)

> [!NOTE]  
> The schemas are still in beta stage and will only be used in future versions
> of DiceBear.

- **`definition.json`** — Defines the structure of avatar definitions (SVG
  templates), including elements, components, colors, attributes, and metadata.
  Enforces strict security rules (XSS prevention, CSS injection blocking, URL
  validation).
- **`options.json`** — Defines user-facing options for avatar customization at
  generation time (seed, size, colors, rotation, variants, etc.).

All schemas use
[JSON Schema Draft 2020-12](https://json-schema.org/draft/2020-12/schema).

## Development

### Prerequisites

- Node.js 24+

### Setup

```bash
npm install
```

### Scripts

```bash
npm test              # Run all tests
npm run format        # Format code with Prettier
npm run format:check  # Check formatting
```

## Sponsors

Advertisement: Many thanks to our sponsors who provide us with free or
discounted products.

<a href="https://bunny.net/" target="_blank" rel="noopener noreferrer">
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://www.dicebear.com/sponsors/bunny-light.svg">
        <source media="(prefers-color-scheme: light)" srcset="https://www.dicebear.com/sponsors/bunny-dark.svg">
        <img alt="bunny.net" src="https://www.dicebear.com/sponsors/bunny-dark.svg" height="64">
    </picture>
</a>
