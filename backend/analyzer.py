import pickle, string
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

stopwords_english = stopwords.words('english')
def bag_of_words(words):
    words_clean = []
 
    for word in words:
        word = word.lower()
        if word not in stopwords_english and word not in string.punctuation:
            words_clean.append(word)
    
    words_dictionary = dict([word, True] for word in words_clean)
    
    return words_dictionary


classifier_f = open("naivebayes.pickle", "rb")
classifier = pickle.load(classifier_f)
classifier_f.close()

print("CLASSIFIER OPENED")

custom_review = "The images were brilliant the acting was top notch and everything was blended together by Hans " \
                "Zimmer and his Music. 169 minutes flew by me with my eyes fixed on the screen and my heart racing. " \
                "And there it was.. The ending. I couldn't believe it . I was reliving, rethinking the movie while " \
                "the credit scenes rolled enjoying the moment, the smell of popcorn, my comfortable seat and what do " \
                "i see next to me? Ninety percent of the people in the cinema rushing outside after the first second " \
                "of the credit scenes. "
custom_review_tokens = word_tokenize(custom_review)
custom_review_set = bag_of_words(custom_review_tokens)
 
print(classifier.classify(custom_review_set))
 
prob_result = classifier.prob_classify(custom_review_set)
print(prob_result)
print(prob_result.max())
print(prob_result.prob("neg"))
print(prob_result.prob("pos"))

