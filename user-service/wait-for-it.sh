#!/bin/bash
# wait-for-it.sh

# wait-for-it.sh waits for a service to be ready and then runs a command
# Usage: wait-for-it.sh host:port -- command args...

TIMEOUT=15
QUIET=0
HOST="$1"
PORT="$2"
CMD="${@:4}"

shift 2

echo "Waiting for $HOST:$PORT to be available..."

while ! nc -z "$HOST" "$PORT"; do
  if [ $QUIET -eq 0 ]; then
    echo "Waiting..."
  fi
  sleep 1
done

if [ $QUIET -eq 0 ]; then
  echo "$HOST:$PORT is available!"
fi

exec $CMD
