
from flask import Flask, jsonify, render_template
from datetime import datetime, timezone
import platform

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/health")
def health():
    return jsonify({
        "status": "healthy",
        "service": "Network Monitoring Dashboard",
        "timestamp": datetime.now(timezone.utc).isoformat()
    })


@app.route("/system")
def system():
    return jsonify({
        "operating_system": platform.system(),
        "python_version": platform.python_version()
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
