import os
import sys
from dotenv import load_dotenv
from facebook_scraper import get_posts

load_dotenv()

print ("hi")

result = []
for post in get_posts(group=os.environ.get("FacebookGroupId"), pages=1, 
                    credentials=(os.environ.get("FacebookUser"), os.environ.get("FacebookPassword"))):
    result.append({ 
        "post_id": post["post_id"], 
        "text": post["text"], 
        "user_id": post["user_id"], 
        "username": post["username"],
        "time": post["time"]    
    })
    print ({ "post_id": post['post_id'] })
    # print (post)

print (result)
sys.stdout.flush()