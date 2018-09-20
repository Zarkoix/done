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

alter table done_app.todo enable row level security;

drop policy if exists enforce_authorship on done_app.tag;
create policy enforce_authorship
  on done_app.tag
  for ALL
  using ("author_id" = current_user_id())
  with check ("author_id" = current_user_id());

drop function if exists done_app.createNewTag;
create function done_app.createNewTag(name varchar(32), color char(7)) returns done_app.tag as $$
declare
  newTag done_app.tag;
begin
  insert into done_app.tag(name, color) VALUES (name, color) returning * into newTag;
  return newTag;
end;
$$ language plpgsql volatile;

------------------------------------
-- Tagmap SQL
------------------------------------

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

comment on function done_app.todo_getTags is 'Returns all the tags on the given todo';
