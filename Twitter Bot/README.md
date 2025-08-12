

Purpose: A Twitter bot that automatically replies to mentions of a username
Author: Ananya Sanivarapu



**Retrieving and Storing Data**

- done in the make_queue function
- continuously streaming tweets using Tweepy was not possible with the Free version ( used search for user_mentions) 
- code searches for 5 most recent user_mentions every 450 seconds to comply with the rate limit.
- tweets stored in a list (mentions[]) of dictionaries with each dictionary containing information about a specific tweet
- This includes id, text, tweets that preceed that tweet.
- tweets are stored in chronological order in 'mentions' with the latest tweet last
- code ensures no duplicates were formed by storing all the tweet_ids seen so far
  ( old method for deduplicating tweets also included in code but
  it does not account for deleting tweets ) 




**Retrieving past conversation of a tweet**
- function: trace_conversation_history  -  checks if the property .referenced_tweets exists for  tweet
- If so, saves the text of that preceding tweet to a string, updates tweet to preceding tweet, checks
  for the  .referenced_tweets property in preceding tweet in a loop until there are no more tweets that
  precede it.

**Crafting a reply using Ninja's API**

- posting a reply has a much tighter rate limit
- code only uses the latest tweet at the end of each retrieval of 5 tweets.
- After a tweet is replied to, it is removed from the mentions list (hence no duplicate replies)
- used NinjaCode’s API code on the website as an initial gude refined by OpenAI API docs


**Authentication**
- used OAuth 2.0 authentication.
- generated a bearer_token from the api_key and api_secret_key provided



**Future Considerations**
- tweet_history” currently retrieves the text of all preceding tweets in the chain
  For long tweet chains, a cutoff could be implemented, with more emphasis on the original tweet.


- only retrieving individual properties and tweet history of each tweet in the mentions list
 if it happens to be the tweet chosen to get replied to.
  (This was before I realized how few tweets in the mentions list actually get replied to
   because of the rate limit)



**Working Hours Tracking Log:**

Thursday: ~ 4 hours : going through API docs, trying to get the API keys to work.


Friday: ~ 8 hours - sorting out storing data and how to deal with previous tweets .


Saturday: ~7 hours - debugging, implementing previous ideas in code, storing API Keys securely etc. 


  
