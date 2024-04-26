from flask import Flask 
from analysis import dbReport, playerReport

app = Flask(__name__)

#generate user report
@app.route('/analysis/user/<int:player_id>')

#uses the player_id from player stats 
def playerGraphs( player_id : int) :

    playerReport(player_id)
    return "process done"

@app.route('/analysis/database')

#generate database graphs

def databaseGraphs() :

    dbReport()
    return "process done"

if __name__ == "__main__":
    app.run()