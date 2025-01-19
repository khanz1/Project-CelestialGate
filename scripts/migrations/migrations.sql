CREATE TABLE auth_users
(
    id            SERIAL PRIMARY KEY,
    uid           VARCHAR(15)        NOT NULL,
    username      VARCHAR(15) UNIQUE,
    email         VARCHAR(100) UNIQUE NOT NULL,
    password      VARCHAR(255)        NOT NULL,
    picture_url   TEXT,
    is_verified   BOOLEAN             NOT NULL DEFAULT false,
    created_at    TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE auth_oauth_list
(
    id               SERIAL PRIMARY KEY,
    provider         VARCHAR(50),
    user_id          INTEGER,
    oauth_id         VARCHAR(15),
    name             VARCHAR(100),
    username         VARCHAR(50),
    email            VARCHAR(100),
    picture_url      TEXT,
    oauth_created_at TIMESTAMP,
    created_at       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES auth_users (id)
);

CREATE TABLE logs_api (
    id         SERIAL PRIMARY KEY,
    text       TEXT,
    operation  VARCHAR(50),
    ip_address VARCHAR(30),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE aa_owned_files (
    id         SERIAL PRIMARY KEY,
    user_id    INTEGER,
    file_name  VARCHAR(255),
    file_url  VARCHAR(255),
    file_type VARCHAR(255),
    public_file_url VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES auth_users (id)
);

CREATE TABLE gp_redirects (
    id         SERIAL PRIMARY KEY,
    from_url   VARCHAR(255) NOT NULL,
    to_url     TEXT NOT NULL,
    active_from TIMESTAMP,
    active_to   TIMESTAMP,
    valid_from TIMESTAMP,
    valid_to TIMESTAMP,
    access_count INTEGER NOT NULL DEFAULT 0,
    user_id    INTEGER,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES auth_users (id)
);

CREATE TABLE gp_redirects_logs (
    id         SERIAL PRIMARY KEY,
    redirect_id INTEGER,
    ip_address VARCHAR(50),
    query TEXT,
    user_agent TEXT,
    data TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (redirect_id) REFERENCES gp_redirects (id)
);
