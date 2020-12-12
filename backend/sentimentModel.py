import nltk, string
from nltk.corpus import movie_reviews, stopwords, wordnet
from nltk import FreqDist, NaiveBayesClassifier, classify
from nltk.tag import pos_tag
import random
from nltk.tokenize import word_tokenize
import os
import pickle
from sklearn.model_selection import cross_validate, KFold   
from nltk import ngrams


stopwords_english = stopwords.words('english')
os.chdir('C:/Users/miran/Desktop/multimedia_project/backend/aclImdb/train/pos')

pos_reviews = []
for filename in os.listdir(os.getcwd()):
   with open(os.path.join(os.getcwd(), filename), 'r', encoding="cp437") as f:
        review = f.read()
        review_tokens = word_tokenize(review)
        pos_reviews.append(review_tokens)


os.chdir('C:/Users/miran/Desktop/multimedia_project/backend/aclImdb/train/neg')


neg_reviews = []
for filename in os.listdir(os.getcwd()):
   with open(os.path.join(os.getcwd(), filename), 'r', encoding="cp437") as f:
        review = f.read()
        review_tokens = word_tokenize(review)
        neg_reviews.append(review_tokens)


os.chdir('C:/Users/miran/Desktop/multimedia_project/backend')

important_words = ['above', 'below', 'off', 'over', 'under', 'more', 'most', 'such', 'no', 'nor', 'not', 'only', 'so', 'than', 'too', 'very', 'just', 'but']
 
stopwords_english_for_bigrams = set(stopwords_english) - set(important_words)
 
#words_clean_for_bigrams = clean_words(words, stopwords_english_for_bigrams)

def clean_words(words, stopwords_english):
    words_clean = []
    for word in words:
        word = word.lower()
        if word not in stopwords_english and word not in string.punctuation:
            words_clean.append(word)    
    return words_clean

def bag_of_words(words):    
    words_dictionary = dict([word, True] for word in words)    
    return words_dictionary
 
def bag_of_ngrams(words, n=2):
    words_ng = []
    for item in iter(ngrams(words, n)):
        words_ng.append(item)
    words_dictionary = dict([word, True] for word in words_ng)    
    return words_dictionary
 
def bag_of_all_words(words, n=2):
    words_clean = clean_words(words, stopwords_english)
    words_clean_for_bigrams = clean_words(words, stopwords_english_for_bigrams)
 
    unigram_features = bag_of_words(words_clean)
    bigram_features = bag_of_ngrams(words_clean_for_bigrams)
 
    all_features = unigram_features.copy()
    all_features.update(bigram_features)
 
    print(all_features)
    return all_features
 


pos_reviews_set = []
for words in pos_reviews:
    pos_reviews_set.append((bag_of_words(words), 'pos'))
 

neg_reviews_set = []
for words in neg_reviews:
    neg_reviews_set.append((bag_of_words(words), 'neg'))


random.shuffle(pos_reviews_set)
random.shuffle(neg_reviews_set)
 
test_set = pos_reviews_set[:2000] + neg_reviews_set[:2000]
train_set = pos_reviews_set[2000:] + neg_reviews_set[2000:]

cv = KFold(n_splits = 10)
sum = 0
for traincv, testcv in cv.split(train_set):
    classifier = nltk.NaiveBayesClassifier.train(train_set[traincv[0]:traincv[len(traincv)-1]])
    sum += nltk.classify.accuracy(classifier, train_set[testcv[0]:testcv[len(testcv)-1]])

print(traincv, testcv)
average = sum/10
save_classifier = open("naivebayes.pickle","wb")
pickle.dump(classifier, save_classifier)
save_classifier.close()

accuracy = classify.accuracy(classifier, test_set)

print("TRAIN ACCURACY -> ", average)
print("TEST ACCURACY -> ", accuracy)
