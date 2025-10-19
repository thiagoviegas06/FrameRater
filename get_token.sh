#!/usr/bin/env bash
set -euo pipefail

API_KEY="AIzaSyBzEle0uO6vISBDtkZJHTqQzo7XZ_eJzOY"
EMAIL="demo@test.com"     
PASS="Password123!"

# 1) Call Firebase Auth REST API
RESP=$(curl -sS -X POST \
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}" \
  -H "Content-Type: application/json" \
  --data "{\"email\":\"$EMAIL\",\"password\":\"$PASS\",\"returnSecureToken\":true}")

# 2) Show raw response (so we can see EMAIL_NOT_FOUND / INVALID_PASSWORD, etc.)
echo "Raw response:"
echo "$RESP"

# 3) Extract idToken safely
ID_TOKEN=$(printf '%s' "$RESP" | python3 - <<'PY'
import json, sys
s = sys.stdin.read().strip()
try:
    print(json.loads(s)["idToken"])
except Exception:
    try:
        print("ERROR_FROM_FIREBASE:"+json.loads(s)["error"]["message"])
    except Exception:
        print("ERROR_PARSING_RESPONSE")
PY
)

# 4) Print result or error hint
if [[ "$ID_TOKEN" == ERROR_* || -z "$ID_TOKEN" ]]; then
  echo "Failed to get idToken. See 'Raw response' above."
else
  echo "Token starts with: ${ID_TOKEN:0:20}..."
  echo
  echo "Hitting protected endpoint:"
  curl -s http://localhost:3000/api/me -H "Authorization: Bearer $ID_TOKEN"
  echo
fi
