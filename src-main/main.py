import os
import webview

if os.getenv("NODE_ENV") == "development":
    url = "http://localhost:5173"
else:
    base = os.path.dirname(__file__)
    url = os.path.join(base, "ui", "index.html")


class Api:
    def hello(self):
        return "hello world"


webview.create_window(
    title="测试窗口",
    url=url,
    width=640,
    height=480,
    js_api=Api(),
)
webview.start(gui="qt")
