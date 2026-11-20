FROM ubuntu:24.04

# 设置工作目录
WORKDIR /work

# 环境变量
ENV http_proxy=http://host.docker.internal:1080 \
    https_proxy=http://host.docker.internal:1080 \
    all_proxy=socks5://host.docker.internal:1080 \
    HTTP_PROXY=http://host.docker.internal:1080 \
    HTTPS_PROXY=http://host.docker.internal:1080 \
    ALL_PROXY=socks5://host.docker.internal:1080 \
    DEBIAN_FRONTEND=noninteractive \
    UV_LINK_MODE=copy \
    UV_COMPILE_BYTECODE=1 \
    UV_NO_CACHE=1 \
    PATH="/root/.bun/bin:/root/.deno/bin:/root/.local/bin:${PATH}"

# 安装换源所需工具
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    curl \
    ca-certificates \
    unzip \
    && \
    rm -rf /var/lib/apt/lists/*

# 安装uv
COPY --from=docker.io/astral/uv:latest /uv /uvx /bin/

# 安装Bun
RUN curl -fsSL https://bun.com/install | bash

# 安装Deno
RUN curl -fsSL https://deno.land/install.sh | bash

# 阿里云 Ubuntu 源
RUN curl -fsSL https://linuxmirrors.cn/main.sh | bash -s -- \
    --source mirrors.aliyun.com \
    --protocol https \
    --use-intranet-source false \
    --backup false \
    --upgrade-software false \
    --clean-cache false \
    --ignore-backup-tips

# 安装依赖
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    build-essential \
    pkg-config \
    patchelf \
    gobject-introspection \
    libgirepository-1.0-dev \
    libcairo2-dev \
    libgtk-3-0 \
    libwebkit2gtk-4.1-0 \
    gir1.2-girepository-2.0 \
    gir1.2-glib-2.0 \
    gir1.2-gtk-3.0 \
    gir1.2-webkit2-4.1 \
    && \
    rm -rf /var/lib/apt/lists/*

# 运行bash
CMD ["/bin/bash"]
