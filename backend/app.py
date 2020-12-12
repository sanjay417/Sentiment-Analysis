from flask import Flask, request
import requests
from pprint import pprint
import pickle, string
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import json

stopwords_english = stopwords.words('english')

app = Flask(__name__)


def bag_of_words(words):
    words_clean = []

    for word in words:
        word = word.lower()
        if word not in stopwords_english and word not in string.punctuation:
            words_clean.append(word)

    words_dictionary = dict([word, True] for word in words_clean)

    return words_dictionary


@app.route('/getreviews')
def getreviews():
    movie = request.args['movie']
    movieInfo = []
    url = "http://www.omdbapi.com"
    querystring = {"t":  movie, "apikey": "55013436"}
    response = requests.request("GET", url, params=querystring)
    id = response.json()['imdbID']
    rating = response.json()['imdbRating']
    movieInfo.append(id)
    movieInfo.append(rating)

    url = "https://imdb8.p.rapidapi.com/title/get-user-reviews"

    querystring = {"tconst": id}

    headers = {
        'x-rapidapi-key': "2275a7690amshcb05a25661d0226p1527c2jsnfd8b0b159a98",
        'x-rapidapi-host': "imdb8.p.rapidapi.com"
    }

    response = requests.request("GET", url, headers=headers, params=querystring)

    reviews = []
    for i in response.json()['reviews']:
        pprint(i['reviewText'])
        reviews.append(i['reviewText'])

    classifier_f = open("naivebayes.pickle", "rb")
    classifier = pickle.load(classifier_f)
    classifier_f.close()

    reviewsWithSentiment = {}
    for i in reviews:
        custom_review_tokens = word_tokenize(i)
        custom_review_set = bag_of_words(custom_review_tokens)

        prob_result = classifier.prob_classify(custom_review_set)
        posSentiment = prob_result.prob("pos")
        negSentiment = prob_result.prob("neg")
        reviewsWithSentiment[i] = [posSentiment * 100, negSentiment * 100]

    movieInfo.append(reviewsWithSentiment)
    pprint(movieInfo)

    retJSON = dict()
    retJSON['imdbId'] = movieInfo[0]		
    retJSON['imdbRating'] = movieInfo[1]	

    reviews = []
    for k, v in movieInfo[2].items():
        review = {
            'review': k,
            'prediction': v
        }
        reviews.append(review)

    retJSON['reviews'] = reviews			

    return json.dumps(retJSON)


if __name__ == '__main__':
    app.run()
