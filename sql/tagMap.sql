drop table if exists done_app.tagmap;
create table done_app.tagmap (
  todo_id serial not null references done_app.todo(id) ON DELETE CASCADE,
  tag_id serial not null references done_app.tag(id) ON DELETE CASCADE,
  PRIMARY KEY (todo_id, tag_id)
);

comment on table done_app.tagmap is 'Table for tracking the tags on todos.';
comment on column done_app.tagmap.todo_id is 'The id of the todo.';
comment on column done_app.tagmap.tag_id is 'The id of the tag.';

drop function if exists done_app.todo_getTags;
create function done_app.todo_getTags(todo done_app.todo)
returns setof done_app.tag as $$
  select tag.*
  from done_app.tagmap
  inner join done_app.tag
  on (tagmap.tag_id = tag.id)
  where tagmap.todo_id = todo.id;
$$ language sql stable;

comment on function done_app.tagsOnTodo is 'Returns all the tags on the given todo';
