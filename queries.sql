-- users

    -- createTable
    CREATE TABLE users (
    user_id serial NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50),
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(5) CHECK ( role IN ('admin', 'user'))
    );

    -- createUser
    INSERT INTO users 
    (name, surname, email, password, role) 
    VALUES($1, $2, $3, $4, $5)
    -- updateUser
    UPDATE users 
    SET name=$1, surname=$2, email=$3, password=$4, role=$5
    WHERE email=$6
    -- deleteUser
    DELETE FROM users WHERE email=$1
    -- getUsers
    SELECT * 
    FROM users
    -- getUsersById
    SELECT * 
    FROM users
    WHERE email = $1

-- favorites

CREATE TABLE favorites(
    favorite_id serial NOT NULL PRIMARY KEY,
    user_id int NOT NULL
    FOREIGN KEY (user_id) REFERENCES authors(id_user)
    ON DELETE CASCADE
)