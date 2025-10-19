# backend/auth.py
import os
from typing import Optional
from fastapi import Header, HTTPException, status
import firebase_admin
from firebase_admin import credentials, auth

# Init Admin SDK once
if not firebase_admin._apps:
    # Use an absolute path to the Firebase service account JSON.  This allows
    # the API to be started from any working directory and still locate the
    # credentials file shipped alongside this module.  A custom path can also
    # be provided via the FIREBASE_SERVICE_ACCOUNT environment variable.
    default_path = os.path.join(os.path.dirname(__file__), "firebase-service-account.json")
    svc_path = os.getenv("FIREBASE_SERVICE_ACCOUNT", default_path)
    cred = credentials.Certificate(svc_path)
    firebase_admin.initialize_app(cred)

def verify_bearer(authorization: Optional[str] = Header(None)) -> str:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing Bearer token")
    token = authorization.split(" ", 1)[1]
    try:
        decoded = auth.verify_id_token(token)
        return decoded["uid"]  # return Firebase uid
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")