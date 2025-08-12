
"""

This file trains a CNN based on the all-data.csv file. It then uses
the CNN trained earlier to assign sentiment scores to companies
from data set company_news.csv

"""




# This code trains a CNN based on the all-data.csv file. 

import re
import nltk
import tqdm
import unicodedata
from nltk.tokenize import word_tokenize
import pandas as pd


df = pd.read_csv("/content/drive/My Drive/Colab Notebooks/PGI - Final Assignment/all-data.csv",
                 delimiter = ',',
                 encoding='latin-1',
                 header = None)
df = df.rename(columns=lambda x: ['Sentiment', 'Sentence'][x])
print(df.info())
df = df[['Sentence', 'Sentiment']]
df = df[df.Sentiment != "neutral"]


def stopwords_removal(words):
    list_stopwords = nltk.corpus.stopwords.words('english')
    return [word for word in words if word not in list_stopwords]




def pre_process_corpus(docs):
  norm_docs = []
  for doc in tqdm.tqdm(docs):
    #case folding
    doc = doc.lower()
    doc = doc.translate(doc.maketrans("\n\t\r", "   "))

    doc = re.sub(r'[^a-zA-Z0-9\s]', '', doc, re.I|re.A)
    doc = re.sub(' +', ' ', doc)
    doc = doc.strip()
    doc = word_tokenize(doc)
    #filtering
    doc = stopwords_removal(doc)
    norm_docs.append(doc)


  norm_docs = [" ".join(word) for word in norm_docs]
  return norm_docs

df.Sentence = pre_process_corpus(df.Sentence)



print(df.head())


import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from sklearn.preprocessing import LabelEncoder
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Embedding, Dropout, Conv1D, MaxPooling1D, GlobalMaxPooling1D
from keras.callbacks import EarlyStopping, ModelCheckpoint


print(df.columns) 



X_train, X_test, y_train, y_test = train_test_split(df['Sentence'], df['Sentiment'], test_size=0.1, random_state=42)



# Preprocessing: 
vocab_size = 5732  
token = Tokenizer(num_words=vocab_size, oov_token="<OOV>")
token.fit_on_texts(X_train)

X_train = token.texts_to_sequences(X_train)
X_test = token.texts_to_sequences(X_test)

MAX_SEQUENCE_LENGTH = 30
X_train = pad_sequences(X_train, maxlen=MAX_SEQUENCE_LENGTH, padding="post")
X_test = pad_sequences(X_test, maxlen=MAX_SEQUENCE_LENGTH, padding="post")


le = LabelEncoder()
y_train = le.fit_transform(y_train)
y_test = le.transform(y_test)







#Building the CNN model 
vec_size = 300
model = Sequential()
model.add(Embedding(input_dim=vocab_size, output_dim=vec_size, input_length=MAX_SEQUENCE_LENGTH))
model.add(Conv1D(64, 8, activation="relu"))
model.add(MaxPooling1D(2))
model.add(Dropout(0.1))

model.add(Dense(8, activation="relu"))
model.add(Dropout(0.1))
model.add(Dense(4, activation='relu'))
model.add(Dropout(0.1))
model.add(GlobalMaxPooling1D())
model.add(Dense(1, activation='sigmoid'))

model.compile(loss='binary_crossentropy', optimizer=tf.optimizers.Adam(learning_rate=0.0001), metrics=['accuracy'])
model.summary()




#Train with callbacks
es = EarlyStopping(monitor='val_loss', mode='min', verbose=1, patience=5)
mc = ModelCheckpoint('./best_model/best_model_cnn1d.h5', monitor='val_accuracy', mode='max', verbose=1, save_best_only=True)

history = model.fit(
    X_train, y_train,
    batch_size=4,
    shuffle=True,
    validation_split=0.1,
    epochs=10,
    verbose=1,
    callbacks=[es, mc]
)

#Predicting results
print("tested_results:" )
def predictions(x):
    prediction_probs = model.predict(x)
    #predictions = [1 if prob > 0.5 else 0 for prob in prediction_probs]
    return prediction_probs
print(predictions(X_test))




# This code then uses the CNN trained earlier to assign sentiment scores to companies
#from data set company_news.csv

import pandas as pd
import numpy as np
from tensorflow.keras.preprocessing.sequence import pad_sequences



df2 = pd.read_csv("/content/drive/My Drive/Colab Notebooks/PGI - Final Assignment/company_news.csv",
                  delimiter=',',
                  encoding='latin-1',
                  header=None)
df2.columns = ['Company', 'News']
df2 = df2[['Company', 'News']]



# Preprocessing 
df2['News'] = pre_process_corpus(df2['News'])

df2['News'] = token.texts_to_sequences(df2['News'])

df2['News'] = pad_sequences(df2['News'], maxlen=MAX_SEQUENCE_LENGTH, padding='post').tolist()

news_array = np.asarray(df2['News'].tolist(), dtype=np.int32)

print("news_array shape:", news_array.shape)    
print("news_array dtype:", news_array.dtype)   





# Make predictions
preds = model.predict(news_array, verbose=0).flatten()

df2['prediction'] = preds


print(df2.groupby('Company')['prediction'].mean())

company_prediction_dict = df2.groupby('Company')['prediction'].mean().to_dict()
print(company_prediction_dict)

