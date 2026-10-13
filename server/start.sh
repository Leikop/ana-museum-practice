#!/bin/sh
# Starts the fake API described in the exam statement.
# Run from inside the /server folder: sh start.sh
json-server --watch db.json
