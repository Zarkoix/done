select done_app.register_user('adam@adamtowers.io', 'adam00');
select done_app.register_user('adam@towers.com', 'adam00');

select * from done_app_private.user;

insert into done_app.todo(author_id, headline) VALUES ('e6445b3c-b782-11e8-a575-d3230a8865ed', 'something to do');


insert into done_app.todo(author_id, headline) VALUES ('e64743f6-b782-11e8-a576-57e341134458', 'adamtowers');
