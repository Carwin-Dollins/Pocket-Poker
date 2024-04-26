import os
import json
from flask import Flask, request, jsonify
from supabase import create_client, Client
from dotenv import load_dotenv
from gotrue import errors

load_dotenv();

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

app = Flask(__name__)

""" Returns auth data from a user for testing purposes only """
@app.route("/api/users/<uid>", methods=["GET"])
def userid(uid):
    try:
        user = supabase.auth.admin.get_user_by_id(uid)
        return user.model_dump_json()
    except Exception as e:
        return {
            "message": "Something went wrong.",
            "error": str(e),
            "data": None
        }, 500

# @app.route("/api/users", methods=["GET"])
# def users():
#     try:
#         list_of_users = supabase.auth.admin.list_users(page=1, per_page=50)
#         return json.dumps([x.model_dump_json() for x in list_of_users])
#     except Exception as e:
#         return {
#             "message": "Something went wrong.",
#             "error": str(e),
#             "data": None
#         }, 500

""" Signs up a user using their username, password, email, and name """
@app.route("/api/signup", methods=["POST"])
def signup():
    try:
        data = request.get_json()
        username = data['username']
        password = data['password']
        email = data['email']
        name = data['name']

        # user = supabase.auth.admin.create_user()
        user = supabase.auth.sign_up({
            'email': email,
            'password': password
        })

        print(supabase.table('player_stats').insert({
            'user_id': user.user.id,
            'username': username,
            'name': name
        }).execute())

        return user.model_dump_json()

        return {
            "message": "Success."
        }, 200
    except Exception as e:
        return {
            "message": "Something went wrong.",
            "error": str(e),
            "data": None
        }, 500

""" Returns session information """
@app.route("/api/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        user_data = supabase.auth.sign_in_with_password({"email": data["email"], "password": data["password"]})
        session = supabase.auth.get_session()
        return session.json()
    except Exception as e:
        return {
            "message": "Something went wrong.",
            "error": str(e),
            "data": None
        }, 500

app.run(host="0.0.0.0", port=80)