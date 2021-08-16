from app.models import db, Post


# Adds a demo user, you can add other users here if you want
def seed_posts():
   post1 = Post(caption="dummy caption", pic_url="https://lh6.ggpht.com/HlgucZ0ylJAfZgusynnUwxNIgIp5htNhShF559x3dRXiuy_UdP3UQVLYW6c=s1200", user_id= 2 )

   post2 = Post(caption="dummy caption", pic_url="https://www.tate.org.uk/art/images/work/N/N05/N05976_9.jpg", user_id=2)

   post3 = Post(caption="dummy caption", pic_url="https://www.homestratosphere.com/wp-content/uploads/2019/07/Cubism-art-833x1024.jpg", user_id= 1 )

   post4 = Post(caption="dummy caption", pic_url="https://media.vanityfair.com/photos/5e8f9f875752fb00088317c4/16:9/w_1280,c_limit/The-Art-of-Making-Art-About-a-Plague.jpg", user_id= 1 )

   post5 = Post(caption="dummy caption", pic_url="https://www.killyourdarlings.com.au/wp-content/uploads/2020/07/horse-1.jpg", user_id= 3 )

   post6 = Post(caption="dummy caption", pic_url="https://images.artsonia.com/art/93030215.jpg", user_id= 3 )

   post7= Post(caption="dummy caption", pic_url="https://media.timeout.com/images/105590782/750/422/image.jpg", user_id= 10 )
   post8 = Post(caption="dummy caption", pic_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR0CmwogoC8hHJaqWkdtG1K34toqYMgV84cw&usqp=CAU", user_id= 10 )

   post9 = Post(caption="dummy caption", pic_url="https://d1zdxptf8tk3f9.cloudfront.net/ckeditor_assets/pictures/2528/content_mr-tt-628115-unsplash.jpg", user_id= 7 )

   post10 = Post(caption="dummy caption", pic_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe_ZcKVdiu1-7eLtbes7mnF5mNvACzbBSZhg&usqp=CAU", user_id= 7)

   db.session.add(post1)
   db.session.add(post2)
   db.session.add(post3)
   db.session.add(post4)
   db.session.add(post5)
   db.session.add(post6)
   db.session.add(post7)
   db.session.add(post8)
   db.session.add(post9)
   db.session.add(post10)
  
   db.session.commit()



def undo_posts():
    db.session.execute('TRUNCATE posts;')
    db.session.commit()