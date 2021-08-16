from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    user1 = User(
        username='streetarts', email='streetarts@aa.io',
                      password='password', profile_pic='', bio="")
    user2 = User(
        username='lemalooma', email='lema@aa.io',
                      password='password', profile_pic='', bio="")
    user3 = User(
         username='diana', email='diana@aa.io',
                      password='password', profile_pic='', bio="")
    user4 = User(
         username='kyle', email='kyle@aa.io',
                      password='password', profile_pic='', bio="")
    user5 = User(
         username='zhuoxin', email='zhuoxin@aa.io',
                      password='password', profile_pic='', bio="")
    user6 = User(
        username='alexandertheartist', email='alexander@aa.io',
                      password='password', profile_pic='', bio="")
    user7= User(
        username='flulemaity', email='flulematiy@aa.io',
                      password='password', profile_pic='', bio="")
    user8 = User(
            username='dolly', email='dolly@aa.io',
                      password='password', profile_pic='', bio="")
    user9 = User(
            username='harry', email='harry@aa.io',
                      password='password', profile_pic='', bio="")
    user10 = User(
        username='mervstheword', email='merv@aa.io',
                      password='password', profile_pic='', bio="")
    user11 = User(
        username='artgod', email='artgod@aa.io',
                      password='password', profile_pic='', bio="")
    user12 = User(
        username='vanDough', email='vadough@aa.io',
                      password='password', profile_pic='', bio="")
    user13 = User(
        username='callen_shaub', email='callen@aa.io',
                      password='password', profile_pic='', bio="")
    user14 = User(
        username='oil_paintings', email='oil@aa.io',
                      password='password', profile_pic='', bio="")
    user15 = User(
        username='marvelousmonet', email='monet@aa.io',
                      password='password', profile_pic='', bio="")


    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
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
   

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
