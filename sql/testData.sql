select done_app.register_user('adam@adamtowers.io', 'adam00');
select done_app.register_user('adam@towers.com', 'adam00');

select * from done_app_private.user;

insert into done_app.todo(author_id, headline) VALUES ('da1fd2c6-b630-11e8-a836-472f6813f32c', 'something to do');


insert into done_app.todo(author_id, headline) VALUES ('fb54436e-b6df-11e8-a7b6-e397187bde91', 'adamtowers');
