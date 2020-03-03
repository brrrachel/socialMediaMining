#!/bin/bash

psql -h localhost -U postgres -d postgres -f "dbSetup.sql"