#!/bin/bash
export PATH=$PATH:$JBOSS_HOME/bin

REALM_NAME=$1
CLIENT_ID=$2

generate_realm_json()
{
  cat <<EOF
{
    "id": "$REALM_NAME",
    "realm": "$REALM_NAME",
    "displayName": "$REALM_NAME",
    "enabled": true,
    "sslRequired": "external",
    "registrationAllowed": true,
    "loginWithEmailAllowed": true,
    "duplicateEmailsAllowed": false,
    "resetPasswordAllowed": false,
    "editUsernameAllowed": false,
    "bruteForceProtected": true
}
EOF
}

generate_client_json()
{
  cat <<EOF
{
    "clientId": "$CLIENT_ID",
    "publicClient": true,
    "redirectUris": [
        "http://localhost:4200/*"
    ],
    "webOrigins": [
        "http://localhost:4200"
    ]
}
EOF
}

AUTH_ENDPOINT=http://localhost:8080/auth/

while ! curl -s --head  --request GET $AUTH_ENDPOINT | grep "200 OK" > /dev/null; do
  echo "Waiting for Keycloak server..."
  sleep 5s
done

# Fetch access token
ACCESS_TOKEN=$(
  curl -q --location --request POST  'http://localhost:8080/auth/realms/master/protocol/openid-connect/token' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'client_id=admin-cli' \
  --data-urlencode 'username=admin' \
  --data-urlencode 'password=admin' \
  --data-urlencode 'grant_type=password' | awk -F "access_token\":\"" '{print $2}' | awk -F "\"," '{print $1}')

# Create REALM
echo "Configuring realm $REALM_NAME"

curl -q --location --request POST 'http://localhost:8080/auth/admin/realms' \
--header 'Content-Type: application/json' \
--header "Authorization: Bearer $ACCESS_TOKEN" \
--data "$(generate_realm_json)"

# Create CLIENT
echo "Configuring client $CLIENT_ID"

curl -q  --location --request POST "http://localhost:8080/auth/admin/realms/$REALM_NAME/clients" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer $ACCESS_TOKEN" \
--data "$(generate_client_json)"

