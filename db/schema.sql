DROP DATABASE IF EXISTS techblog_db;
CREATE DATABASE techblog_db;

USE techblog_db;

CREATE TABLE blog (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    blog_title VARCHAR(30) NOT NULL,
    contents VARCHAR(1000),
    creator VARCHAR(30),
    date INT NOT NULL
);

CREATE TABLE comment (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    contents VARCHAR(1000),
    creator VARCHAR(30),
    date INT NOT NULL,
    blog_id INT,
    FOREIGN KEY (blog_id) REFERENCES blog(id) ON DELETE SET NULL-- references the blog model's id
);
