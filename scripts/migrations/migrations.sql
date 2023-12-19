CREATE TABLE auth_users
(
    id            SERIAL PRIMARY KEY,
    uid           VARCHAR(255)        NOT NULL,
    username      VARCHAR(255) UNIQUE,
    email         VARCHAR(255) UNIQUE NOT NULL,
    password      VARCHAR(255)        NOT NULL,
    picture_url   VARCHAR(255),
    is_verified   BOOLEAN             NOT NULL DEFAULT false,
    is_subscribed BOOLEAN             NOT NULL DEFAULT false,
    status        VARCHAR(255)        NOT NULL DEFAULT 'on-boarding',
    created_at    TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP
);