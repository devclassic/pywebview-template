import os
import webview

if os.getenv("NODE_ENV") == "development":
    url = "http://localhost:5173"
else:
    base = os.path.dirname(__file__)
    url = os.path.join(base, "ui", "index.html")

width, height = 640, 480
screen = webview.screens[0]
x = (screen.width - width) / 2
y = (screen.height - height) / 2


class Api:
    def hello(self):
        return "hello world"


def on_loaded(window):
    window.show()


window = webview.create_window(
    title="测试窗口",
    url=url,
    width=width,
    height=height,
    x=x,
    y=y,
    js_api=Api(),
)

window.events.loaded += on_loaded

webview.start()
