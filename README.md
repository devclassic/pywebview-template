# pywebview 桌面应用开发模板

uv + vite

## 平台依赖

### Windows

[.NET Desktop Runtime](https://dotnet.microsoft.com/download/dotnet)  
[Webview2](https://developer.microsoft.com/microsoft-edge/webview2)

### Linux

```sh
# deb
sudo apt update && \
sudo apt install -y \
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
     gir1.2-webkit2-4.1

# rhel
sudo sudo dnf update -y && \
sudo dnf install -y sudo dnf-plugins-core && \
sudo dnf config-manager --set-enabled crb && \
sudo dnf install -y epel-release && \
sudo dnf groupinstall -y "Development Tools" && \
sudo dnf install -y \
     pkgconf-pkg-config \
     patchelf \
     gobject-introspection \
     gobject-introspection-devel \
     cairo-devel \
     gtk3 \
     webkit2gtk4.1 \
     webkit2gtk4.1-devel
```
