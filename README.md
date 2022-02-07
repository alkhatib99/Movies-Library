# Movies-Library - version 2

**Author Name**: Abedalqader Alkhatib.
**Date**: 1/31/2022. - 2/1/2022

## WRRC

Web Request Response Cycle

This is an simple drawing of WRRC.
!image['The Wrrc Drawing'](./images/wrrc.jpg)

Another simple drawing of WRRC.
!image['Drawing WRRC'](./images/wrrc2.jpg)

Another simple drawing of WRRC - Task13.
!image['Drawing WRRC'](./images/wrrc3.jpg)

This is an simple drawing for CRUD.
!image['CRUD'](./images/crud.png)

## Overview

> it's an Movie-Library Web-App, include folder name Movie data that's include file name data.json.....

## Getting Started

clone the repo then, inital npm using('npm init -y'), then installe the required packages.

## Features

This app provides a two error handler, one for not found page (404), other for server error (500).

This app provides handler forread data.json and define constructor of Movie include title, poster path and overview, then handle for home pagee '/'.

Also handler for favorite page'/favorite'.
handler for not found pages, using a promise function to fill data from api
new features:

- add handler for trending page.
- add handler for search page.
- add handler for latest page.
- add handler for person page.

### In task 13

- create a clinet connect to database.
- create relation called "favmovies".
- add handler using post method '/add' then insert body data to the relation.
- add handler to get the rows '/favMovie'.
- last thing edit the errorhandler to catch all server errors.

### In Task 14

- Create endpoint for delete movie './delete/id'.
- Create endpoint for update movie './update/id'.
- Create endpoint for find one movie './getMovie/id'.
- Draw a CRUD diagram for sql queries.

....Will continue.
