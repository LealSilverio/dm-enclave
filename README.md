# DM-'s Enclave

dev build:

```shell
pnpm i
```

for dev env w/ nodemon:

```shell
pnpm dev
```

for prod startup, there's now a required build step:

```shell
pnpm build
```

```shell
pnpm start
```

For DB integration, a MONGO_ATLAS_URI env var in the format `mongodb+srv://{user}:{url-encoded password}@{cluster}.{domain}/{collection}?retryWrites=true&w=majority&appName={cluster}` is needed.
