-- in terminal:
-- psql < craigslist.sql
-- psql craigslist

DROP DATABASE IF EXISTS  craigslist;

CREATE DATABASE craigslist;

\c craigslist

CREATE TABLE regions
(
    reg_id SERIAL PRIMARY KEY,
    region TEXT NOT NULL
);

CREATE TABLE users
(
    user_table_id SERIAL PRIMARY KEY,
    user_table_name TEXT NOT NULL,
    prefered_region INTEGER REFERENCES regions (reg_id) ON DELETE SET NULL
);

CREATE TABLE categories
(
    cat_id SERIAL PRIMARY KEY,
    category VARCHAR(15) NOT NULL
);

CREATE TABLE posts
(
    post_id SERIAL PRIMARY KEY,
    title VARCHAR(15) NOT NULL,
    content TEXT NOT NULL, 
    users_id INTEGER NOT NULL REFERENCES users(user_table_id) ON DELETE CASCADE,
    post_location VARCHAR(15) NOT NULL,
    region INTEGER REFERENCES regions (reg_id) ON DELETE SET NULL,
    category_id INTEGER REFERENCES categories (cat_id) ON DELETE SET NULL
);

INSERT INTO regions
    (region)
VALUES
    ('San Francisco'),
    ('Atlanta'),
    ('Seattle'),
    ('Chicago');

INSERT INTO categories
    (category)
VALUES
    ('Sports'),
    ('News'),
    ('Vacation'),
    ('Videos');

INSERT INTO users
    (user_table_name,prefered_region)
VALUES
    ('Bailey','2'),
    ('Smith','2'),
    ('Jones','1'),
    ('Cooper','3'),
    ('Brown','3');

INSERT INTO posts
    (title,content,users_id,post_location,region,category_id)
VALUES
    ('Post1','The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',1,'Area1',1,1),
    ('Post2','There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text.',1,'Area2',1,1),
    ('Post3','It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',1,'Area3',1,2),
    ('Post4','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lors standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ',2,'Area4',4,3),
    ('Post5',' Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',3,'Area5',3,4),
    ('Post6','Sed sagittis massa ut magna blandit, ut mattis ante scelerisque. Pellentesque ut gravida dui. Proin quis leo nec sapien mattis luctus vel ac justo. Cras enim urna, iaculis ac tortor ut, dignissim congue nibh. Duis in congue tortor. Sed ultricies felis nibh, eu congue elit facilisis a. Morbi pharetra eu dui nec pretium. In sit amet orci quis sem aliquet porttitor.',5,'Area6',2,2),
    ('Post7','Ut tincidunt nibh a ipsum cursus, et pellentesque felis tincidunt. Nulla egestas consequat augue, quis porttitor turpis lobortis eu. Curabitur iaculis leo ac lorem cursus venenatis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed a ex turpis. Sed ac tellus felis. Suspendisse potenti. In quis molestie est, at blandit justo.',5,'Area7',2,1);


