drop table if exists done_app.tag;
create table done_app.tag (
  id               serial primary key not null,
  author_id        uuid not null references done_app.user(id) ON DELETE CASCADE,
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
