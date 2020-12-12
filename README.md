# Instruction on Running Backend
First please go into the backend folder by running the following comamnd.
```bash
$ cd backend
```
From the backend folder, please follow the following instructions.

1.) Setup a python virtual environment -
          pip install virtualenv
					virtualenv myenv
					myenv\Scripts\activate 

2.) Installing necessary packages -
          pip install flask
          pip install requests
          pip install pickle
          pip install nltk
          pip install sklearn

3.) Trained classifier is already included. The file with .pickle extension. But, if want to train the whole classifier again, there is 
    dataset included in the folder. Just unzip it and copy the path of pos and neg folders and paste them in the sentimentModel.py at appropriate places.

4.) You can then run the sentimentModel.py which will create a pickle file at last which is our trained classifier. 

5.) If you want to skip the training part, you can just run app.py. But, make sure to run the front-end first.

6.)Now, you can search up movie names and it will show you results like imdb rating, top postive reviews, etc.

7.) To see things working on backend, you can take a look at the terminal that the reviews being fetched from the api are  
    being printed there.

# Instruction on Running Frontend
First check if the host machine has node version 12+ installed by following the command below.
```bash
$ node --version
# v12.xx.x should show
```
**Note:** If the version did not show and see errors, make sure to install node from the url provided: https://nodejs.org/en/

If you see the version from your bash, you can run the following commands:
```bash
$ npm i
$ npm start
```

Once the frontend code is done compiling, the frontend should be served for the user on the system's default web browser.
