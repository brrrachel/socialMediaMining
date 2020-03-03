#!/bin/bash
docker run --rm  --name pg-docker -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 -v $(pwd)/postgres-volume:/var/lib/postgresql/data postgres