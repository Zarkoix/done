drop user if exists graphile;
create user graphile;
alter user graphile with password 'postgraphile';

drop role if exists done_user;
create role done_user noinherit; -- supposedly logged in

drop role if exists default_user;
create role default_user noinherit; -- not logged in

grant done_user to graphile;
grant default_user to graphile;

grant default_user to done_user;

grant usage on schema done_app to done_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA done_app TO done_user;

grant usage on schema done_app_public to default_user;
