FROM ubuntu:24.04

# 设置工作目录
WORKDIR /work

# 构建期可覆盖的宿主机代理地址（默认 1080）
ARG PROXY_HOST=host.docker.internal:1080
ARG APT_MIRROR=mirrors.aliyun.com

# 环境变量
ENV http_proxy=http://${PROXY_HOST} \
    https_proxy=http://${PROXY_HOST} \
    all_proxy=socks5://${PROXY_HOST} \
    HTTP_PROXY=http://${PROXY_HOST} \
    HTTPS_PROXY=http://${PROXY_HOST} \
    ALL_PROXY=socks5://${PROXY_HOST} \
    DEBIAN_FRONTEND=noninteractive \
    UV_LINK_MODE=copy \
    UV_COMPILE_BYTECODE=1 \
    UV_CACHE_DIR=/root/.local/share/uv/cache \
    PATH="/root/.bun/bin:/root/.deno/bin:/root/.local/bin:${PATH}"

# 换源 + 安装依赖
RUN sed -i "s|http://archive.ubuntu.com/ubuntu/|http://${APT_MIRROR}/ubuntu/|g; \
    s|http://security.ubuntu.com/ubuntu/|http://${APT_MIRROR}/ubuntu/|g" \
    /etc/apt/sources.list.d/ubuntu.sources && \
    printf 'Acquire::http::Proxy "DIRECT";\nAcquire::https::Proxy "DIRECT";\n' \
    > /etc/apt/apt.conf.d/99-direct && \
    apt-get update && \
    apt-get install -y --no-install-recommends \
    curl \
    ca-certificates \
    unzip \
    build-essential \
    patchelf \
    libgirepository-1.0-dev \
    libcairo2-dev \
    libwebkit2gtk-4.1-0 \
    gir1.2-webkit2-4.1 \
    gir1.2-girepository-2.0 \
    && rm -rf /var/lib/apt/lists/*

# 安装uv
COPY --from=docker.io/astral/uv:latest /uv /uvx /bin/

# 安装Bun
RUN curl -fsSL https://bun.com/install | bash

# 安装Deno
RUN curl -fsSL https://deno.land/install.sh | bash

# 运行bash
CMD ["/bin/bash"]
