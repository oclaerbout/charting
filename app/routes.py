from app import app
from flask import render_template, request, jsonify
@app.route('/')
@app.route('/index')
def index():
    return "Hi DS met voorkennis!"

@app.route('/chart')
def chart():
    items = ["Olivier", "Leni", "Titus"]
    return render_template("chart.html", items=items)

@app.route('/api/chart-data')
def chart_data():
    return jsonify({
        "labels": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        "series": [
            {"name": "Email", "data": [120, 132, 101, 134, 90, 230, 210]},
            {"name": "Union Ads", "data": [220, 182, 191, 234, 290, 330, 310]},
            {"name": "Video Ads", "data": [150, 232, 201, 154, 190, 330, 410]},
            {"name": "Direct", "data": [320, 332, 301, 334, 390, 330, 320]},
            {"name": "Search Engine", "data": [820, 932, 901, 934, 1290, 1330, 1320]}
        ]
    })