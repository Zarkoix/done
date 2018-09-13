create schema if not exists done_app; -- logged in
create schema if not exists done_app_public; -- anyone
create schema if not exists done_app_private; -- internal only

create domain email as text check (value ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$');

create extension if not exists "uuid-ossp";
create extension if not exists pgcrypto;
