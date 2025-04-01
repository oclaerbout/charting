from app import app
from flask import render_template, request, jsonify
@app.route('/')
@app.route('/index')
def index():
    return "Hi DS met voorkennis!"

@app.route('/chart')
def chart():
    return render_template("chart.html")

