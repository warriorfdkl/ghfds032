from flask import Flask, send_from_directory
from whitenoise import WhiteNoise
import os

app = Flask(__name__)

# Настраиваем WhiteNoise для раздачи статических файлов
app.wsgi_app = WhiteNoise(
    app.wsgi_app,
    root=os.path.join(os.path.dirname(__file__), "frontend", "dist"),
    prefix="/",
    index_file=True,
    autorefresh=True
)

@app.route("/")
def serve_index():
    return send_from_directory(os.path.join(os.path.dirname(__file__), "frontend", "dist"), "index.html")

@app.route("/<path:path>")
def serve_file(path):
    return send_from_directory(os.path.join(os.path.dirname(__file__), "frontend", "dist"), path)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port) 