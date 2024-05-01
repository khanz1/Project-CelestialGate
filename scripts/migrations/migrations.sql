CREATE TABLE auth_users
(
    id            SERIAL PRIMARY KEY,
    uid           VARCHAR(255)        NOT NULL,
    username      VARCHAR(255) UNIQUE,
    email         VARCHAR(255) UNIQUE NOT NULL,
    password      VARCHAR(255)        NOT NULL,
    picture_url   TEXT,
    is_verified   BOOLEAN             NOT NULL DEFAULT false,
    status        VARCHAR(255)        NOT NULL DEFAULT 'on-boarding',
    created_at    TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE auth_oauth_list
(
    id               SERIAL PRIMARY KEY,
    provider         VARCHAR(255),
    user_id          INTEGER,
    oauth_id         VARCHAR(255),
    name             VARCHAR(255),
    username         VARCHAR(255),
    email            VARCHAR(255),
    picture_url      VARCHAR(255),
    oauth_created_at TIMESTAMP,
    created_at       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES auth_users (id)
);

CREATE TABLE logs_api (
    id         SERIAL PRIMARY KEY,
    text       VARCHAR(255),
    operation  VARCHAR(255),
    ip_address VARCHAR(255),
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
    from_url   VARCHAR(255),
    to_url     VARCHAR(255),
    active_from TIMESTAMP,
    active_to   TIMESTAMP,
    user_id    INTEGER,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES auth_users (id)
);

CREATE TABLE gp_redirects_logs (
    id         SERIAL PRIMARY KEY,
    redirect_id INTEGER,
    ip_address VARCHAR(255),
    query TEXT,
    user_agent TEXT,
    data TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (redirect_id) REFERENCES gp_redirects (id)
);
