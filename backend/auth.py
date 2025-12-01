# backend/auth.py
import os
import firebase_admin
from firebase_admin import credentials, auth as fb_auth
from flask import request, abort

# Initialize Firebase Admin SDK once
if not firebase_admin._apps:
    # Default to firebase-service-account.json sitting next to this file
    default_path = os.path.join(os.path.dirname(__file__), "firebase-service-account.json")
    svc_path = os.getenv("FIREBASE_SERVICE_ACCOUNT", default_path)
    cred = credentials.Certificate(svc_path)
    firebase_admin.initialize_app(cred)


def verify_bearer() -> str:
    """
    For Flask routes: validates the Authorization: Bearer <token> header
    and returns the Firebase UID if valid. Otherwise aborts with 401.
    """
    auth_header = request.headers.get("Authorization", "")

    if not auth_header.startswith("Bearer "):
        abort(401, description="Missing Bearer token")

    token = auth_header.split(" ", 1)[1]

    try:
        decoded = fb_auth.verify_id_token(token)
        return decoded["uid"]
    except Exception:
        abort(401, description="Invalid token")
