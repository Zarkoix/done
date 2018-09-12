drop type if exists done_app.do_when_time_style;
create type done_app.do_when_time_style as enum (
  'Someday', -- useraims to complete this at an abitrary time
  'Month', -- user has defined month granularity
  'Day', -- user has defined day granularity
  'HourMinute' -- user has defined hour granularity
);

drop type if exists done_app.deadline_time_style;
create type done_app.deadline_time_style as enum (
  'Month', -- user has defined month granularity
  'Day', -- user has defined day granularity
  'HourMinute' -- user has defined hour granularity
);

drop type if exists done_app.priority;
create type done_app.priority as enum (
  'NotDefined', -- user has yet to define a priority
  'Extreme',
  'High',
  'Moderate',
  'Low'
);

drop table if exists done_app.todo cascade;
create table done_app.todo (
  id               serial primary key not null,
  author_id        uuid not null references done_app_private.user(id) ON DELETE CASCADE,
  headline         varchar(280),
  body             text,
  created_at       timestamp default now(),
  do_when          timestamp default null,
  do_when_ts       done_app.do_when_time_style default null,
  deadline         timestamp default null,
  deadline_ts      done_app.deadline_time_style default null,
  duration         integer constraint valid_duration default -1 check (duration > 0 or duration = -1), -- time duration in minutes, -1 if not defined
  priority        done_app.priority default null
);

drop policy if exists todo_author on done_app.todo;
create policy todo_author
  on done_app.todo
  for ALL
  using ("author_id" = current_user_id())
  with check ("author_id" = current_user_id());

drop function if exists done_app.createTodo;
create function done_app.createTodo() returns done_app.todo as $$
declare
  usr done_app_private.user;
  newTodo done_app.todo;
begin
  select u.* into usr
    from done_app_private.user as u
    where u.id = current_user_id();

  if usr is not null then
    insert into done_app.todo(author_id) VALUES (usr.id) returning * into newTodo;
    return newTodo;
  end if;
  return null;
end;
$$ language plpgsql volatile;

comment on table done_app.todo is 'A todo created by a user.';
comment on column done_app.todo.id is 'The primary key for the todo.';
comment on column done_app.todo.author_id is 'The id of the author user.';
comment on column done_app.todo.headline is 'The title written by the user.';
comment on column done_app.todo.body is 'The main body text of our todo.';
comment on column done_app.todo.created_at is 'The time this todo was created.';
comment on column done_app.todo.do_when is 'The time this todo is expected to be started on.';
comment on column done_app.todo.do_when_ts is 'The granularity with which the user defined `do_when`.';
comment on column done_app.todo.deadline is 'The time time by which this todo must be done';
comment on column done_app.todo.deadline_ts is 'The granularity with which the user defined `deadline`.';
comment on column done_app.todo.duration is 'How long in minutes the user expects this to take';
