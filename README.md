# An application with
<p align="center">
    <a href="https://github.com/laravel/laravel" target="_blank">
        <img height="120" src="https://res.cloudinary.com/dtfbvvkyp/image/upload/v1566331377/laravel-logolockup-cmyk-red.svg" width="400">
    </a>
    <a href="https://github.com/facebook/react" target="_blank">
        <img height="100" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" alt="React logo">
    </a>
</p>


## Before install
- Make sure you have installed Docker Desktop. If you don't, follow the <a href="https://www.docker.com/get-started" target="_blank">Get Started with Docker</a>.

## Installation guide

### Clone the project
    $ git clone https://github.com/danilocolasso/laravel-react-admin.git laravel-react
    
    $ cd laravel-react
    
### Up the containers
    $ docker-compose up -d
The `-d` is optional. Just to detach the Docker from your terminal tab and run in background.
    
### Install Composer dependencies
    $ docker run --rm -v $(pwd):/app composer install
    
### Create an env file
    $ cp .env.example .env
Change the database user, password and name if you want.
    
### Generate Laravel session key
    $ docker-compose exec app php artisan key:generate
To protect your users data. 
    
### Cache your config (optional)
    $ docker-compose exec app php artisan config:cache
It will improve a lot the performance.
    
### Migrate database
    $ docker--compose exec app php artisan passport:install
    
    $ docker-compose exec app php artisan migrate --seed
Your database and schema will be created and populated with some demo data automatically.
The `passport:install` command will create encryption keys needed to generate secure access token.

### Install Node Packages
    $ npm install
    
And to compile your assets:

    $ npm run dev 
    
#### Defaut credentials

>**user:** admin@admin.com
>
>**password:** password


# Deploying

### Env
    APP_ENV=production
    APP_DEBUG=false

### Passport
When deploying Passport to your production servers for the first time, you will likely need to run the passport:keys command. This command generates the encryption keys Passport needs in order to generate access token. The generated keys are not typically kept in source control:

    $ docker-compose exec app php artisan passport:keys


### Autoloader Optimization
    $ composer install --optimize-autoloader --no-dev
    
### Optimizing Configuration Loading
    $ docker-compose exec app php artisan config:cache
    
### Optimizing Route Loading
    $ docker-compose exec app php artisan route:cache
