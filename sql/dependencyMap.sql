drop table if exists done_app.dependencymap;
create table done_app.dependencymap (
  id                  serial primary key,
  dependant_id        serial not null references done_app.todo(id) ON DELETE CASCADE,
  dependency_id       serial not null references done_app.todo(id) ON DELETE CASCADE
);

comment on table done_app.dependencymap is 'Table for dependency relations, dependant depends on dependency.';
comment on column done_app.dependencymap.dependant_id is 'The id of the todo that depends on the other.';
comment on column done_app.dependencymap.dependency_id is 'The id of the todo that is depended on.';
