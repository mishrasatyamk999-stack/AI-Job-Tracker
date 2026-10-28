from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)


def get_db():
    conn = sqlite3.connect("jobtracker.db")
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db()
    conn.execute("""CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )""")
    conn.commit()
    conn.close()


init_db()


@app.route("/")
def home():
    return "AI Job Tracker Backend is Running! 🚀"


@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json(silent = True)
    if not data:
        return jsonify({
            "success": False,
            "message": "No data received."
        }), 400

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not all([name, email, password]):
        return jsonify({
            "success": False,
            "message": "Name, email, and password are required."
        }), 400

    conn = get_db()
    try:
        conn.execute(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            (name, email, password)
        )
        conn.commit()
    except sqlite3.IntegrityError:
        return jsonify({
            "success": False,
            "message": "Email already registered."
        }), 409
    finally:
        conn.close()

    return jsonify({
        "success": True,
        "message": "Signup successful."
    }), 201


if __name__ == "__main__":
    app.run(debug=True)


