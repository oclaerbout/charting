from app import app
from flask import render_template, request, jsonify
@app.route('/')
@app.route('/index')
def index():
    return "Hi DS met voorkennis!"

@app.route('/chart')
def chart():
    return render_template("chart.html")

@app.route('/api/data')
def get_chart_data():
    data = {
        "categories": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        "series": [
            {"name": "Email", "data": [120, 132, 101, 1034, 90, 230, 210]},
            {"name": "Union Ads", "data": [220, 182, 191, 234, 290, 330, 310]},
            {"name": "Video Ads", "data": [150, 232, 201, 154, 190, 330, 410]},
            {"name": "Direct", "data": [320, 332, 301, 334, 390, 330, 320]},
            {"name": "Search Engine", "data": [820, 932, 901, 934, 1290, 1330, 1320]},
            {"name": "DS", "data": [1000, 1000, 1000, 1000, 1000, 1000, 1000]}
        ]
    }
    return jsonify(data)

@app.route('/test')
def test():
    return render_template('test.html')