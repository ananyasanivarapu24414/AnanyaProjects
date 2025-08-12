
import tweepy
import time
import xml.etree.ElementTree as ET
from uuid import uuid4
from openai import OpenAI, Stream
from openai.types import CompletionUsage
from openai.types.chat import ChatCompletionChunk

from dotenv import load_dotenv
import os


load_dotenv(".env")
ninja_api_key : str = os.getenv("NINJA_API_KEY")
bearer_token : str = os.getenv("BEARER_TOKEN")


username  = "AnanyaSanivara1" # The username is the one who's mentions are tracked. 
mentions = [] # a list containing all the properties of tweets retrieved.
seen_tweets_set = set()



client = tweepy.Client(bearer_token=bearer_token, wait_on_rate_limit = True)
user_obj = client.get_user(username=username)
user_id = user_obj.data.id



def trace_conversation_history(id): 
    
    tweet_history = ""
    tweet = client.get_tweet(id = id, 
                            expansions = ["referenced_tweets.id"])
        
    referenced_tweet  = tweet # just for the sake of the loop

    while (referenced_tweet.data.referenced_tweets):
            referenced_tweet_id = referenced_tweet.data.referenced_tweets[0].id
            referenced_tweet = client.get_tweet(id = referenced_tweet_id,
                                                expansions = ["referenced_tweets.id"])
            tweet_history += (f"{referenced_tweet.data.text} | ")
                                    
                
    return(tweet_history)


def clean_text(text): 
    text = text.replace(f"@{username}", "")
    return (text)






"""

This is the old way I used of queueing mentions. The tweets come in chronological order 
latest first. However, because I only stored the id of the latest tweet in the previous
retrieval round of n tweets ( to check if the new round of tweets overlap with the
previous round in the case that less than n mentions have been generated since the last
round was retrieved) if that tweet ( with id = most_recent_id ) is then deleted, 
then the mentions[] list will contain duplicates. Hence, I realized I didn't account for
the fact that if some of the tweets get deleted, then duplicate tweets will continue to exist. 


most_recent_id= 0
mentions = []
def make_queue(n):

    global most_recent_id
    response = client.get_users_mentions(id = user_id, max_results = n, 
                                         tweet_fields = ["author_id", "conversation_id"], 
                                         expansions = ["referenced_tweets.id"]) 
    if response.data: 

        for x in range(len(response.data)): 
            
            tweet = client.get_tweet(id = response.data[x].id)

            if response.data[x].id == most_recent_id:
                break
    
            mention_tweet_props = {
                "text" : clean_text(tweet.data.text),
                "author" : tweet.author_id,
                "id": tweet.id,
                "conversation_id" : tweet.conversation_id,
                "tweet_history" : trace_conversation_history(tweet.id)

            }
            mentions.append(mention_tweet_props)
            
    
        most_recent_id = response.data[0].id
    return mentions

    

"""


# NEW WAY: The make_queue function adds at most n most recent mentions.

def make_queue(n):
    response = client.get_users_mentions(id = user_id, max_results = n, 
                                         tweet_fields = ["author_id", "conversation_id"], 
                                         expansions = ["referenced_tweets.id"])
    
    if response.data: 
        for x in range(len(response.data) - 1,-1,-1): 

            tweet_id = response.data[x].id

            if tweet_id in seen_tweets_set: 
                pass
            else: 
                tweet = client.get_tweet(id = tweet_id)    
                mention_tweet_props = {
                    "text" : clean_text(tweet.data.text),
                    "id": tweet_id,
                    "tweet_history" : trace_conversation_history(tweet_id)
                    }
                seen_tweets_set.add(tweet_id)
                mentions.append(mention_tweet_props)




ninja_client = OpenAI(api_key= ninja_api_key, base_url="https://api.myninja.ai/v1")

def reply_post(mention_tweet_props):

    compound_piece = ""
    
    response : Stream[ChatCompletionChunk] = ninja_client.chat.completions.create(
        model="ninja-super-agent:apex",
        # Ideally, I would've put the tweet format specs as part of the system message.
        messages = [ {"role": "user", "content": f'''You are a twitter bot, keep your responses under 240 characters.
                                                    This is 
                                                    the prompt: {mention_tweet_props["text"]}. The preceding tweets to this 
                                                    look like: {mention_tweet_props["tweet_history"]}'''}],
        stream=True
    )

    for chunk in response: 
        if chunk.choices: 
            compound_piece += chunk.choices[0].delta.content
    return(compound_piece)




# Mainline: _______________________________________________________

crafted_replies_log = []

while True:
    try: 
        make_queue(5)
        if mentions: 
            most_recent_tweet = mentions.pop()
            reply = reply_post(most_recent_tweet)
            print(f'tweet : {most_recent_tweet["text"]}')
            print(reply)
            crafted_replies_log.append({"tweet": most_recent_tweet["text"], "reply":reply})
            # under ordinary circumstances, I would also involve a 
            # client.update_status(reply) - to actually post the tweet
        time.sleep(450) #complying with the rate limits for posting. 

    except tweepy.TweepyException as e: 
        print(f" You have an error : {e}")
        break
    except Exception as e: 
        print(f"Some other error occurred: {e}")
        break
