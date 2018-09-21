drop table if exists done_app.tag;
create table done_app.tag (
  id               serial primary key not null,
  author_id        uuid default current_user_id() references done_app_private.user(id) ON DELETE CASCADE,
  name             varchar(32),
  color            char(7)
);

comment on table done_app.tag is 'Table for storing created tags.';
comment on column done_app.tag.author_id is 'The author of the tag.';
comment on column done_app.tag.name is 'The name of the tag.';
comment on column done_app.tag.color is 'The hexcode color of the tag.';

alter table done_app.tag enable row level security;

drop policy if exists enforce_authorship on done_app.tag;
create policy enforce_authorship
  on done_app.tag
  for ALL
  using ("author_id" = current_user_id())
  with check ("author_id" = current_user_id());

drop function if exists done_app.create_new_tag;
create function done_app.create_new_tag(name varchar(32), color char(7)) returns done_app.tag as $$
declare
  newTag done_app.tag;
begin
  insert into done_app.tag(name, color) VALUES (name, color) returning * into newTag;
  return newTag;
end;
$$ language plpgsql volatile;

comment on function done_app.create_new_tag is 'Creates a new tag with the given name and color';

------------------------------------
-- Tagmap SQL
------------------------------------

drop table if exists done_app.tagmap;
create table done_app.tagmap (
  todo_id serial not null references done_app.todo(id) ON DELETE CASCADE,
  tag_id serial not null references done_app.tag(id) ON DELETE CASCADE,
  PRIMARY KEY (todo_id, tag_id)
);

comment on table done_app.tagmap is E'@omit create,update,delete \nTable for tracking the tags on todos.';
comment on column done_app.tagmap.todo_id is 'The id of the todo.';
comment on column done_app.tagmap.tag_id is 'The id of the tag.';

drop function if exists done_app.todo_get_tags;
create function done_app.todo_get_tags(todo done_app.todo)
returns setof done_app.tag as $$
  select tag.*
  from done_app.tagmap
  inner join done_app.tag
  on (tagmap.tag_id = tag.id)
  where tagmap.todo_id = todo.id;
$$ language sql stable;

comment on function done_app.todo_get_tags is 'Returns all the tags on the given todo';

drop function if exists done_app.todo_add_tag;
create function done_app.todo_add_tag(todo_id integer, tag_id integer)
returns done_app.todo as $$
declare
	todo done_app.todo;
begin
  insert into done_app.tagmap(todo_id, tag_id) VALUES ($1, $2);
  select * from done_app.todo where id = todo_id into todo;
  return todo;
end;
$$ language plpgsql volatile;

comment on function done_app.todo_add_tag is 'Add tag to todo';

drop function if exists done_app.todo_delete_tag;
create function done_app.todo_delete_tag(todo_id integer, tag_id integer)
returns done_app.todo as $$
declare
	todo done_app.todo;
begin
  delete from done_app.tagmap where tagmap.todo_id = $1 and tagmap.tag_id = $2;
  select * from done_app.todo where id = $1 into todo;
  return todo;
end;
$$ language plpgsql volatile;

comment on function done_app.todo_delete_tag is 'Delete tag from todo';

drop function if exists done_app.todo_create_and_add_tag;
create function done_app.todo_create_and_add_tag(todo_id integer, tag_name varchar(32), tag_color char(7))
returns done_app.todo as $$
declare
	newTag done_app.tag;
begin
  newTag = done_app.create_new_tag(tag_name, tag_color);
  return done_app.todo_add_tag(todo_id, newTag.id);
end;
$$ language plpgsql volatile;

comment on function done_app.todo_create_and_add_tag is 'Creates a new tag and add to this todo';
