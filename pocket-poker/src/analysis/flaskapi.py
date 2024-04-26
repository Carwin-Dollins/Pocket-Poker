from flask import Flask 
from analysis import dbReport, playerReport

app = Flask(__name__)

#generate user report
@app.route('/analysis/user/<int:userId>')

def playerGraphs( userId : int) :

    playerReport(userId)
    return "process done"

@app.route('/analysis/database')

#generate database graphs

def databaseGraphs() :

    dbReport()
    return "process done"

if __name__ == "__main__":
    app.run()