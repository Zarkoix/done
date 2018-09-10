drop table if exists done_app.tagmap;
create table done_app.tagmap (
  id            serial primary key,
  todo_id       id not null references done_app.todo(id) ON DELETE CASCADE,
  tag_id        id not null references done_app.tag(id) ON DELETE CASCADE
);

comment on table done_app.tagmap is 'Table for tracking the tags on todos.';
comment on column done_app.tagmap.todo_id is 'The id of the todo.';
comment on column done_app.tagmap.tag_id is 'The id of the tag.';
