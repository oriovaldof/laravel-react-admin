[![Maintenance Status][status-image]][status-url] 
[![NPM version][npm-image]][npm-url]
[![Code style][code-style-image]][code-style-url] 
[![Licence][license-image]][license-url]


Simple admin built with Laravel and React
===================

## Before install
Make sure you have installed Docker Desktop. If you don't, follow the <a href="https://www.docker.com/get-started" target="_blank">Get Started with Docker</a>.

## Technologies used

- [Docker](https://www.docker.com/) - Containerize the Application
- [Laravel 7.x](https://laravel.com/docs/7.x) - Backend PHP Framework
- [React](https://pt-br.reactjs.org/) - JavaScript library for building user interfaces
- [Ant Design](https://ant.design/) - Components/Design System
- [ESLint](https://eslint.org/) - Find and fix problems in JavaScript code

## Installation guide

#### Clone the project
    $ git clone https://github.com/danilocolasso/laravel-react-admin.git laravel-react
    
    $ cd laravel-react
    
#### Up the containers
    $ docker-compose up -d
The `-d` is optional. Just to detach the Docker from your terminal tab and run in background.
    
#### Install Composer dependencies
    $ docker run --rm -v $(pwd):/app composer install
    
#### Create an env file
    $ cp .env.example .env
Change the database user, password and name if you want.
    
#### Generate Laravel session key
    $ docker-compose exec app php artisan key:generate
To protect your users data. 
    
#### Cache your config (optional)
    $ docker-compose exec app php artisan config:cache
It will improve a lot the performance.
    
#### Migrate database
    $ docker-compose exec app php artisan migrate --seed
    
    $ docker-compose exec app php artisan passport:install
Your database and schema will be created and populated with some demo data automatically.
The `passport:install` command will create encryption keys needed to generate secure access token.

#### Install Node Packages
    $ docker-compose exec app npm install
    
And to compile your assets:

    $ docker-compose exec app npm run dev 
    
#### The application will be available at
http://localhost/

*Defaut credentials*
>**user:** admin@admin.com
>
>**password:** password


## Deploying

#### Env
    APP_ENV=production
    APP_DEBUG=false

#### Passport
When deploying Passport to your production servers for the first time, you will likely need to run the passport:keys command. This command generates the encryption keys Passport needs in order to generate access token. The generated keys are not typically kept in source control:

    $ docker-compose exec app php artisan passport:keys


#### Autoloader Optimization
    $ composer install --optimize-autoloader --no-dev
    
#### Optimizing Configuration Loading
    $ docker-compose exec app php artisan config:cache
    
#### Optimizing Route Loading
    $ docker-compose exec app php artisan route:cache

## How to contribute
- Create a branch with your feature `$ git checkout -b my-feature`
- Commit your changes `$ git commit -m "Add my feature"`
- Push to your branch `$ git push origin my-feature`    

<h4 align="center">
    Made with ♡ by <a href="https://www.linkedin.com/in/danilocolasso/" target="_blank">Danilo Colasso</a>
</h4>

[status-url]: https://github.com/danilocolasso/laravel-react-admin/pulse
[status-image]: https://img.shields.io/github/last-commit/danilocolasso/laravel-react-admin

[code-style-url]: https://standardjs.com
[code-style-image]: https://img.shields.io/badge/code_style-standard-yellow

[npm-url]: https://www.npmjs.com/package/npm
[npm-image]: https://img.shields.io/npm/v/npm

[license-url]: LICENSE.md
[license-image]: https://img.shields.io/github/license/danilocolasso/laravel-react-admin?color=7159C1
