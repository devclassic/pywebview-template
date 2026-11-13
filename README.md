# pywebview 桌面应用开发模板

uv + vite

## 平台依赖

### Windows

[.NET Desktop Runtime](https://dotnet.microsoft.com/download/dotnet)  
[Webview2](https://developer.microsoft.com/microsoft-edge/webview2)

### Linux

```sh
# 项目依赖
uv add pywebview[gtk]

# 开发依赖完整安装
sudo apt install -y \
  python3-gi \
  python3-gi-cairo \
  gir1.2-gtk-3.0 \
  gir1.2-webkit2-4.1 \
  build-essential \
  pkg-config \
  python3-dev \
  libgirepository1.0-dev \
  libcairo2-dev \
  libgtk-3-dev \
  libwebkit2gtk-4.1-dev

# 运行依赖
sudo apt install -y \
  python3-gi \
  python3-gi-cairo \
  gir1.2-gtk-3.0 \
  gir1.2-webkit2-4.1
```

### MacOS

```sh
# 项目依赖
uv add \
  pyobjc-core \
  pyobjc-framework-Cocoa \
  pyobjc-framework-Quartz \
  pyobjc-framework-WebKit \
  pyobjc-framework-security
```
