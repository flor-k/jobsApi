### Example of a job API from John Smilga

1. JWT Tokens for sessions
2. cors, xss, limit-rater, etc.. for security
3. Uploaded to Git for repo management
4. Uploaded to Heroku (https://jobs-api-06-jk.herokuapp.com/)

### If you want to try it locally

1. Change the package.json "start" script to "nodemon app.js" so you can have autorefresh when saving changes
2. Create a .env with the following vars "JWT_LIFETIME" (example value "30d"), "JWT_SECRET" (add your own secret key), MONGO_URI (the connection string to mongo db)
