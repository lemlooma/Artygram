from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    user1 = User(
        username='streetarts', email='streetarts@aa.io', password='password', profile_pic='https://imgur.com/RyU7Qns', bio="my art is dedicated to those with street smarts (;")
    user2 = User(
        username='lemalooma', email='lema@aa.io', password='password', profile_pic='https://imgur.com/husYQrq', bio="Art is a line around your thoughts. ―  Gustav Klimt")
    user3 = User(
         username='diana', email='diana@aa.io', password='password', profile_pic='https://imgur.com/UKZ4ZZb', bio="")
    user4 = User(
         username='kyle', email='kyle@aa.io', password='password', profile_pic='https://imgur.com/I2Wy7YV', bio="It's so fine and yet so terrible to stand in front of a blank canvas.")
    user5 = User(
         username='zhuoxin', email='zhuoxin@aa.io', password='password', profile_pic='https://imgur.com/0nblWeV', bio="The painter has the Universe in his mind and hands.")
    user6 = User(
        username='alexandertheartist', email='alexander@aa.io', password='password', profile_pic='https://imgur.com/0nblWeV', bio="If people only knew how hard I work to gain my mastery. It wouldn't seem so wonderful at all.")
    user7 = User(
        username='flulemaity', email='flulematiy@aa.io', password='password', profile_pic='https://imgur.com/w11rdD3', bio="The world always seems brighter when you’ve just made something that wasn’t there before.")
    user8 = User(
        username='dolly', email='dolly@aa.io', password='password', profile_pic='https://imgur.com/cOGFVdK', bio="While drawing I discover what I really want to say. ")
    user9 = User(
        username='harry', email='harry@aa.io', password='password', profile_pic='', bio="Art is never finished, only abandoned.")
    user10 = User(
        username='mervstheword', email='merv@aa.io', password='password', profile_pic='https://imgur.com/w11rdD3', bio="Life is sometimes hard. Things go wrong, in life and in love and in business and in friendship and in health and in all other ways that life can go wrong. And when things get tough, this is what you should do. Make good art.")
    user11 = User(
        username='artgod', email='artgod@aa.io', password='password', profile_pic='https://imgur.com/l6kJGFd', bio="Creativity is intelligence having fun.")
    user12 = User(
        username='vanDough', email='vadough@aa.io', password='password', profile_pic='https://imgur.com/ckiJh7g', bio="Learn the rules like a pro, so you can break them like an artist.")
    user13 = User(
        username='callen_shaub', email='callen@aa.io', password='password', profile_pic='https://imgur.com/UKZ4ZZb', bio="There is no must in art because art is free.")
    user14 = User(
        username='oil_paintings', email='oil@aa.io', password='password', profile_pic='https://imgur.com/ckiJh7g', bio="Artists are just children who refuse to put down their crayons.")
    user15 = User(
        username='marvelousmonet', email='monet@aa.io', password='password', profile_pic='https://imgur.com/husYQrq', bio="A true artist is not one who is inspired, but one who inspires others.")
    demo = User(
        username='Demo', email='demo@aa.io', password='password', profile_pic='https://imgur.com/ckiJh7g', bio='I started painting as a hobby when I was little. I didn’t know I had any talent. I believe talent is just a pursued interest. Anybody can do what I do.', follows=[user1, user2, user3, user10, user7] )

    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)
    db.session.add(user4)
    db.session.add(user5)
    db.session.add(user6)
    db.session.add(user7)
    db.session.add(user8)
    db.session.add(user9)
    db.session.add(user10)
    db.session.add(user11)
    db.session.add(user12)
    db.session.add(user13)
    db.session.add(user14)
    db.session.add(user15)
    db.session.add(demo)
   

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
