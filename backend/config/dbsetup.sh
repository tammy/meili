#!/bin/bash

cockroach start --insecure --store=meili-db --host=localhost --http-port=8000 &
sleep 1
cockroach user set root --insecure
cockroach sql --insecure -e 'DROP DATABASE IF EXISTS meili CASCADE' --user=root --host=localhost --port=26257
cockroach sql --insecure -e 'CREATE DATABASE meili' --user=root --host=localhost --port=26257
cockroach sql --insecure -e 'GRANT ALL ON DATABASE meili TO root' --user=root --host=localhost --port=26257

node config/seed.js
cockroach quit --insecure

