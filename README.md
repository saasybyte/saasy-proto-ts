# saasy-proto-ts

Generated TypeScript proto types for [SaasyByte](https://github.com/saasybyte/saasybyte), an open-source real-time AI voice platform.

Published to npm as [`@saasybyte/saasy-proto-ts`](https://www.npmjs.com/package/@saasybyte/saasy-proto-ts). Compiles the canonical `.proto` files from the [saasy-proto](https://github.com/saasybyte/saasy-proto) submodule into a protobufjs bundle with TypeScript declarations, plus converters for mediasoup-client (peer dependency). Consumed by saasy-web.

## Use

```bash
npm install @saasybyte/saasy-proto-ts mediasoup-client
```

## Develop

```bash
git submodule update --init   # saasy-proto (required before generate)
npm ci
npm run generate   # compile .proto to src/generated/
npm run build      # generate + tsc + copy to dist/
```

Proto schemas are never defined or modified here; update them in saasy-proto, then pull the submodule forward.

## License

Apache-2.0, see [LICENSE](LICENSE).
