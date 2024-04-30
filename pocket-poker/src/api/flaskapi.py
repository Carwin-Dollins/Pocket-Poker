from flask import Flask 
import flask
import json
from analysis import dbReport, playerReport, updateWins

app = Flask(__name__)

#generate user report
@app.route('/analysis/user/<int:player_id>')

#uses the player_id from player stats 
def playerGraphs( player_id : int) :
    updateWins()
    return flask.jsonify(playerReport(player_id))

@app.route('/analysis/database')

#generate database graphs

def databaseGraphs() :
    updateWins()
    return flask.jsonify(dbReport())

if __name__ == "__main__":
    app.run()