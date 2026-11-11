# pywebview 桌面应用开发模板

uv + vite

## 平台依赖

### Windows

<a href="https://dotnet.microsoft.com/download/dotnet" target="_blank">
  .NET Desktop Runtime
</a>
<br/>
<a href="https://developer.microsoft.com/microsoft-edge/webview2" target="_blank">
  Webview2
</a>

### Linux

```sh
# 项目依赖
uv add pywebview[gtk]

# 系统依赖
sudo apt install -y \
  build-essential \
  pkg-config \
  gir1.2-gtk-3.0 \
  gir1.2-webkit2-4.1 \
  libgirepository1.0-dev \
  libcairo2-dev
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
