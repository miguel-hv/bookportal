# Bookportal app

Created in order to learn Java (with Spring Boot and Postgre database), Docker and Nextjs.

## App description

The goal is to create a portal where users can register and post book recommendations.

- Each user can post, edit and delete book recommendations
- Each user will see a list of all the book recommendations
- One admin will be able to see a list of all the users and manage all their accounts and their posts

## Technical aspects

### UX/UI
I'm using very basic ux and ui strategies, as the goal is not learning about frontend but learning about Nextjs backend for frontend proxy and Java backend. 

I'm handling error messages very lightly: no snackbars nor error pages, just the backend messages shown in the browser.

### Security
jwt authentication with two authorization levels: user and admin.

Refresh token is implementend with a guard in frontend so it redirects to login when no token is found.

### Database access
Using Hibernate/JPA. QueryDSL can be used to mimic the LINQ deferred query representation used in C# to prevent N+1 issues. 

## Run the app
A makefile was created to run the app in local. 
- run the docker container app in development: 
```
make up  
```
- build the docker container app: 
```
make prod  
```
The app can be run in local without containers, starting the backend in localhost:8080 and the frontend in localhost:3000

Generate folder structure json with this command (Linux):
```
tree -J -I 'node_modules|.next|.git' > project-structure.json
```
