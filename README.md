# OnlineBookstoreSpringBoot
---
### Frontend 
* Angular 12
* Bootstrap 5
---
### Backend
* Java 8
* Spring Boot
* Spring Security
* MySql
### Payments
* StripeJs
---
### Instalation
* Install mysqlserver or other db and fill `application.yml` with username and password
* Create account on `https://mailtrap.io` and set credentials in `application.yml`
* Install node.js 14 or higher
---
### Runtime
* Make sure that MySql service is running
* Start backend server 
* Go to `/UI/bookio` and run `npm install` to install dependencies
* Then run `ng serve` to run application on localhost
* Go to browser `http://localhost:4200`
#### Usage 
* Application has full path availability on `http://localhost:8080/swagger-ui.html` (backend server must be running).
* User can sign up and login, json web token is stored in local storage in web browser (can be checked in devtools).
* After provide credentials for signing up it is mandatory to activate account via email (mailtrap.io) with requesting on the link in the achieved mail.
* After above steps user can add a book, add to cart, make a fake order, check book details, check user details. 
* To unlock payments process user should create account on `www.stripe.com` and provide stripe_key to `environment.ts` file. It provide access to make a fake payment on cart.

