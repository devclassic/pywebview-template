# pywebview 桌面应用开发模板

uv + vite

## 平台依赖

### Windows

[.NET Desktop Runtime](https://dotnet.microsoft.com/download/dotnet)  
[Webview2](https://developer.microsoft.com/microsoft-edge/webview2)

### Linux

#### 开发依赖

```sh
# deb (Ubuntu 24.04+)
sudo apt update && \
sudo apt install -y \
     build-essential \
     patchelf \
     libgirepository-1.0-dev \
     libcairo2-dev \
     libwebkit2gtk-4.1-0 \
     gir1.2-webkit2-4.1 \
     gir1.2-girepository-2.0

# rhel (RHEL / Rocky 10+ / Fedora 40+)
sudo dnf install -y epel-release && \
sudo dnf groupinstall -y "Development Tools" && \
sudo dnf install -y \
     patchelf \
     pkgconf-pkg-config \
     glib2-devel \
     cairo-devel \
     gtk3-devel \
     webkit2gtk4.1-devel
```

#### 运行依赖

```sh
# deb
sudo apt update && \
sudo apt install -y \
     libglib2.0-0t64 \
     libgirepository-1.0-1 \
     libwebkit2gtk-4.1-0 \
     fonts-wqy-zenhei

# rhel
sudo dnf install -y epel-release && \
sudo dnf install -y \
     glib2 \
     gobject-introspection \
     webkit2gtk4.1 \
     wqy-zenhei-fonts
```
