#!/usr/bin/env bash
# wait-for-it.sh: Wait for a service to become available

TIMEOUT=30
HOST=$1
PORT=$2
shift 2
CMD=$@

echo "Waiting for $HOST:$PORT to be available..."

# Wait for the service to be ready
until nc -z -v -w30 $HOST $PORT
do
  echo "$HOST:$PORT is unavailable - sleeping"
  sleep 5
done

echo "$HOST:$PORT is now available"

# Execute the command
exec $CMD
