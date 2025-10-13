# Backend production environment
SPRING_PROFILES_ACTIVE=docker
SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/bookdb
SPRING_DATASOURCE_USERNAME=bookuser
SPRING_DATASOURCE_PASSWORD=bookpass
SPRING_JPA_HIBERNATE_DDL_AUTO=update
FRONTEND_URL=https://your-frontend-domain.com
JWT_SECRET=Z4v7aP9xD2kR8tM6pQ1wS3bV5yN0cL2fH8eG4rU7tY9iP0aB3vC6dE5kT8rW2n
JWT_EXPIRATION=3600000

# Frontend production environment
NEXT_PUBLIC_API_BASE_URL=http://backend:8080/api
