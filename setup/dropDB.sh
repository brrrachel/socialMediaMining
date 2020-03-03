#!/bin/bash

psql -h localhost -U postgres -d postgres -f "querys/dropAllTables.sql"