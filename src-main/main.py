import os
import webview

if os.getenv("NODE_ENV") == "development":
    url = "http://localhost:5173"
else:
    base = os.path.dirname(__file__)
    url = os.path.join(base, "ui", "index.html")

width, height = 640, 480


class Api:
    def hello(self):
        return "hello world"


def on_loaded(window):
    if webview.renderer != "qtwebengine":
        screen = webview.screens[0]
        x, y = (screen.width - width) / 2, (screen.height - height) / 2
        window.move(x, y)

    window.show()


window = webview.create_window(
    title="测试窗口",
    url=url,
    width=width,
    height=height,
    js_api=Api(),
    hidden=True,
)

window.events.loaded += on_loaded

webview.start(gui="qt")
