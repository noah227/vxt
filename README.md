# vxt

vxt mono repo

## build

* build all

```shell
npm run build
```

* build specific package

```shell
# E.g. build cli
npm run build cli
```

## publish

```shell
pnpm publish --filter <package-name>
#e.g.
pnpm publish --filter cli
```