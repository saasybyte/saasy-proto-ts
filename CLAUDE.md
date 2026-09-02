# saasy-proto-ts

## Commands
- `npm run generate` — compile .proto files to `src/generated/bundle.js` + `.d.ts`
- `npm run build` — generate + tsc + copy generated files to dist
- `npm run bump` — `npm version patch`

## Conventions
- **Submodule**: `saasy-proto/` is a git submodule — must be initialized (`git submodule update --init`) before generate will work.
- **Import rewriting**: the generate script copies protos to a temp dir and rewrites `import "protos/..."` to `import "..."` because `pbjs` needs flat relative imports. Do not modify canonical protos in the submodule to "fix" imports.

## Service Boundaries
- **Leaf package** — no internal saasy dependencies.
- **Proto schema from saasy-proto** (git submodule): do not define or modify proto schemas locally.
- **Consumed by saasy-web** and any TypeScript service needing proto types or mediasoup-client converters.
- **Does not own**: proto schema (saasy-proto), mediasoup-client itself (peer dependency).
