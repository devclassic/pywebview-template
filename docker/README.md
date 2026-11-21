**构建**

```bash
docker build --no-cache -t dev .
```

**使用**

```bash
docker run --rm -v .:/work -v uv:/root/.local/share/uv dev bash -c 'bun build:i'
```

**清理磁盘缓存**

```bash
docker volume rm uv
```
