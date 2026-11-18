
from flask import Flask, jsonify
from datetime import datetime, timezone
import platform

app = Flask(__name__)

@app.route("/")
def home():
    return """
    <html>
    <head>
        <title>Network Monitoring Dashboard</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: #111827;
                color: white;
                text-align: center;
                padding: 60px;
            }
            .card {
                background: #1f2937;
                padding: 30px;
                border-radius: 12px;
                max-width: 600px;
                margin: auto;
            }
            h1 { color: #38bdf8; }
        </style>
    </head>
    <body>
        <div class="card">
            <h1>Network Monitoring Dashboard</h1>
            <h2>CI/CD Cloud Deployment Project</h2>
            <p>Application Status: Running</p>
            <p>Developed using Python Flask and Docker</p>
        </div>
    </body>
    </html>
    """

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
