# Artygram

Wiki: https://github.com/lemlooma/Artygram/wiki

Live Demo: https://artygram.herokuapp.com/

Artygram is an Instrgram clone targeted towards artist. On Artygram you can browse artist's profile pages and view their work 


## Welcome View 

![welcome](artygram.png) 

## Home View

![homepage](artygram_homeView.png) 

## Technical Details

Artygram's backend is built using Flask and frontend is built using React-Redux 

## Features 

- Signup, Login and Demo a user 
- Post Image/Edit Image/Delete Image 
- Like/Unlike Posts
- Follow/Unfollow Users 
- Photo Feed
- User Profiles




# Flask React Project
This is the starter for the Flask React project.

## Getting started
1.Clone this repository (only this branch)

git clone https://github.com/appacademy-starters/python-project-starter.git
2. Install dependencies

pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
3.Create a .env file based on the example with proper settings for your development environment

4.Setup your PostgreSQL user, password and database and make sure it matches your .env file

5.Get into your pipenv, migrate your database, seed your database, and run your flask app

pipenv shell
flask db upgrade
flask seed all
flask run

6.To run the React App in development, checkout the README inside the react-app directory.

IMPORTANT! If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment. You can do this by running:

pipenv lock -r > requirements.txt
ALSO IMPORTANT! psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux. There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.

## Deploy to Heroku
1.Before you deploy, don't forget to run the following command in order to ensure that your production environment has all of your up-to-date dependencies. You only have to run this command when you have installed new Python packages since your last deployment, but if you aren't sure, it won't hurt to run it again.

pipenv lock -r > requirements.txt

2.Create a new project on Heroku

3.Under Resources click "Find more add-ons" and add the add on called "Heroku Postgres"

4.Install the Heroku CLI

5.Run

heroku login
Login to the heroku container registry

heroku container:login
7.Update the REACT_APP_BASE_URL variable in the Dockerfile. This should be the full URL of your Heroku app: i.e. "https://flask-react-aa.herokuapp.com"

8.Push your docker container to heroku from the root directory of your project. (If you are using an M1 mac, follow these steps below instead, then continue on to step 9.) This will build the Dockerfile and push the image to your heroku container registry.

heroku container:push web -a {NAME_OF_HEROKU_APP}
9.Release your docker container to heroku

heroku container:release web -a {NAME_OF_HEROKU_APP}
10.set up your database

heroku run -a {NAME_OF_HEROKU_APP} flask db upgrade
heroku run -a {NAME_OF_HEROKU_APP} flask seed all
11.Under Settings find "Config Vars" and add any additional/secret .env variables.

12.profit

## For M1 Mac users
(Replaces Step 8)

1.Build image with linux platform for heroku servers. Replace {NAME_OF_HEROKU_APP} with your own tag:

docker buildx build --platform linux/amd64 -t {NAME_OF_HEROKU_APP} .
2.Tag your app with the url for your apps registry. Make sure to use the name of your Heroku app in the url and tag name:

docker tag {NAME_OF_HEROKU_APP} registry.heroku.com/{NAME_OF_HEROKU_APP}/web
3.Use docker to push the image to the Heroku container registry:

docker push registry.heroku.com/{NAME_OF_HEROKU_APP}/web
