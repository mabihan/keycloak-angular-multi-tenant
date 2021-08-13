#!/bin/bash
echo "Creating realms and clients..."
/tmp/create-client.sh riri angular-client-riri &> /dev/null & disown
/tmp/create-client.sh fifi angular-client-fifi &> /dev/null & disown
/tmp/create-client.sh loulou angular-client-loulou &> /dev/null & disown
