from flask import Flask 
import flask
import json
from analysis import dbReport, playerReport

app = Flask(__name__)

#generate user report
@app.route('/analysis/user/<int:player_id>')

#uses the player_id from player stats 
def playerGraphs( player_id : int) :

    return flask.jsonify(playerReport(player_id))

@app.route('/analysis/database')

#generate database graphs

def databaseGraphs() :

    return flask.jsonify(dbReport())

if __name__ == "__main__":
    app.run()