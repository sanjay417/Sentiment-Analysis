import nltk, string
from nltk.corpus import movie_reviews, stopwords, wordnet
from nltk import FreqDist, NaiveBayesClassifier, classify
from nltk.tag import pos_tag
import random
from nltk.tokenize import word_tokenize
import os

stopwords_english = stopwords.words('english')

pos_reviews = []
for fileid in movie_reviews.fileids('pos'):
    words = movie_reviews.words(fileid)
    pos_reviews.append(words)

neg_reviews = []
for fileid in movie_reviews.fileids('neg'):
    words = movie_reviews.words(fileid)
    neg_reviews.append(words)

def bag_of_words(words):
    words_clean = []
 
    for word in words:
        word = word.lower()
        if word not in stopwords_english and word not in string.punctuation:
            words_clean.append(word)
    
    words_dictionary = dict([word, True] for word in words_clean)
    
    return words_dictionary

pos_reviews_set = []
for words in pos_reviews:
    pos_reviews_set.append((bag_of_words(words), 'pos'))
 
neg_reviews_set = []
for words in neg_reviews:
    neg_reviews_set.append((bag_of_words(words), 'neg'))

random.shuffle(pos_reviews_set)
random.shuffle(neg_reviews_set)
 
test_set = pos_reviews_set[:50] + neg_reviews_set[:50]
train_set = pos_reviews_set[50:] + neg_reviews_set[50:]

classifier = NaiveBayesClassifier.train(train_set)
 
accuracy = classify.accuracy(classifier, test_set)
print(accuracy) 

"""
os.chdir('C:/Users/miran/Desktop/multimedia_project/aclImdb/test/pos')

for filename in os.listdir(os.getcwd()):
   with open(os.path.join(os.getcwd(), filename), 'r') as f:

        custom_review = f.read()
        custom_review_tokens = word_tokenize(custom_review)
        custom_review_set = bag_of_words(custom_review_tokens)
        print (classifier.classify(custom_review_set)) 

        prob_result = classifier.prob_classify(custom_review_set)
        print (prob_result) 
        print (prob_result.max())
        print (prob_result.prob("neg")) 
        print (prob_result.prob("pos")) """

custom_review = "It was a wonderful and amazing movie. I loved it. Best direction, good acting."
custom_review_tokens = word_tokenize(custom_review)
custom_review_set = bag_of_words(custom_review_tokens)
 
print (classifier.classify(custom_review_set)) 
 
prob_result = classifier.prob_classify(custom_review_set)
print (prob_result) 
print (prob_result.max()) 
print (prob_result.prob("neg"))
print (prob_result.prob("pos")) 