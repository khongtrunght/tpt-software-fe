#!/bin/sh


docker-compose -f   ./docker-compose.dev.yml up --force-recreate --no-deps --build  $1

#  --force-recreate --no-deps --build 