#!/bin/bash

# 最初のエラーで直ちにスクリプトを Exit
set -e 

# SQL ファイルを実行する関数
run_sql_file() {
    local file="$1"
    PGPASSWORD=${DB_PASSWORD} psql -h "${DB_HOST}" -p "${DB_PORT}" -d "${DB_NAME}" -U "${DB_USER}" -f "$file"
}

# Flag to indicate whether to prompt for DB info
prompt_for_db_info=false

# .migration_info が存在するか確認してそれを source する。
if [ -f .migration_info ]; then
    source .migration_info
    # Check if any of the variables are empty
    if [ -z "$DB_HOST" ] || [ -z "$DB_NAME" ] || [ -z "$DB_PORT" ] || [ -z "$DB_USER" ] || [ -z "$DB_PASSWORD" ]; then
        prompt_for_db_info=true # Some values are empty, so prompt user for values
    fi
else
    prompt_for_db_info=true # No .migration_info file, so prompt user for values
fi

# If .migration_info doesn't exist or any of the variables are empty, prompt for DB info
if $prompt_for_db_info ; then
    echo "Please enter the following database connection information that can be found in Supabase in Settings -> database:"
    DB_HOST=$(gum input --placeholder "Host")
    DB_NAME=$(gum input --placeholder "Database name")
    DB_PORT=$(gum input --placeholder "Port")
    DB_USER=$(gum input --placeholder "User")
    DB_PASSWORD=$(gum input --placeholder "Password" --password)

    # Save the inputs in .migration_info file
    echo "DB_HOST=$DB_HOST" > .migration_info
    echo "DB_NAME=$DB_NAME" >> .migration_info
    echo "DB_PORT=$DB_PORT" >> .migration_info
    echo "DB_USER=$DB_USER" >> .migration_info
    echo "DB_PASSWORD=$DB_PASSWORD" >> .migration_info
fi

# Running the tables.sql file to create tables
run_sql_file "scripts/drop_tables.sql"

echo "Drop script completed."
