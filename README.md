# AutoWatch Web Application

  
  <b>AutoWatch</b> is a machine learning based application built using React and Flask. AutoWatch is used for recommending a market price for cars for provided parameters.
  
  An API was built using Flask and was deployed on Heroku. This Flask API is used to get the recommendation made by the machine learning models in JSON format. The input data is sent as a POST request to the API to get the predicted information.<br/>

<b>Deployed Web Application Link: </b>https://auto-watch.netlify.app/
<br/>
## Steps to run the React Application in local

  

1. Clone this repo.

2. Open command prompt in the following folder "React_Frontend/agri-ai"

3. Install all the npm packages

  

```

npm install

```

  

4. Start the application

  

```

npm start

```

  

The Application Runs on localhost:3000

  

## Steps to run the Flask API in local

  

1. Clone this repo

2. Open command prompt in "Flask_API"

3. Create a virtual environment

  

```

mkvirtualenv environment_name

```

  

4. Install all the packages

  

```

pip install -r requirements.txt

```

  

5. Run the app.py file

  

```

python app.py

```