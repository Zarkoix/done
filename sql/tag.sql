drop table if exists done_app.tag;
create table done_app.tag (
  id               serial primary key not null,
  author_id        uuid not null references done_app.done_user(id) ON DELETE CASCADE,
  name             varchar(32)
);

comment on table done_app.tag is 'Table for storing created tags.';
comment on column done_app.tag.author_id is 'The author of the tag.';
comment on column done_app.tag.name is 'The name of the tag.';
