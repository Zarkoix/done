create user graphile;

create role done_user noinherit; -- supposedly logged in
create role default_user noinherit; -- not logged in

grant done_user to graphile;
grant default_user to graphile;

grant usage on schema done_app to done_user
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA done_app TO done_user;
