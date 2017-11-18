# General
1. find a way to deal with error from api > show a nice page or whatever
2. understand JS process of throwing error and catching them up
3. add a logger middleware

# Redux
1. improve the store structure
2. add selectors


# SignUp form
1. check on the fly if username is taken
2. check on the fly if password === password confirmation

# Action points
<!-- 1. delete tweet must delete all respective comments --> done but to be revised with normalizer
2. select a tweet must close editablecomment of the activetweet -- was under progress but should be easier with normalizer[idem 5]
3. add comment must close editabletweet -- same as 5
4. add comment form must be available only when tweet is active -- done but trying to implement transition effect
5. add tweet must close editable comment -- was under progress but should be easier with normalizer

# Valid

## Tweet Reducer
1. ADD_TWEET id and allIds is working
2. ADD_TWEET is closing the editable tweet
3. EDIT_TWEET id and allIds is working
4. EDIT_TWEET is closing the editable tweet
5. DELETE_TWEET id and allIds is working
6. LOAD_TWEETS id and allIds is working
7. TRIGGER_EDITABLE_TWEET > working fine
8. TRIGGER_ACTIVABLE_TWEET > working fine

## Thread Reducer
1. Closing the editableTweet


#To be reviewed

## Tweet reducer
1. ADD_TWEET > keep ownership?
2. ADD_TWEET > author_id should be dynamic and correspond to currentUser
3. LOAD_TWEETS > keep ownership?
4.
