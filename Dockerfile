FROM jboss/keycloak:15.0.0
COPY scripts/startup.sh /opt/jboss/startup-scripts/startup.sh
COPY scripts/create-client.sh /tmp/create-client.sh
