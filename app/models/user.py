from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

followers = db.Table(
    "followers",
    db.Model.metadata,
    db.Column("followerId", db.Integer, db.ForeignKey("users.id")),
    db.Column("followingId", db.Integer, db.ForeignKey("users.id")),
    db.Column("timestamp", db.DateTime, default=datetime.now)
)

likes = db.Table(
   "likes",
   db.Model.metadata,
   db.Coloumn("user_id", db.Interger, db.ForeignKey("users.id")),
   db.Coloumn("post_id", db.Interger, db.ForeignKey("posts.id"))
)

class User(db.Model, UserMixin):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    bio = db.Column(db.String(255))
    profile_pic = db.Column(db.String(255))
    hashed_password = db.Column(db.String(255), nullable=False)

    follows = db.relationship(
        'User',
        secondary=followers, 
        primaryjoin=(followers.c.followerId == id), 
        secondaryjoin=(followers.c.followingId == id), 
        backref = db.backref('followers', lazy='dynamic'), 
        lazy='dynamic'
    )
    
    posts = db.relationship('Post', back_populates="users")
    comments = db.relatipnship('Comment', back_populates="users")
    userLikes = db.relationship("Post", secondary=likes, back_populates="postlikes")

    
    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            "bio": self.bio,
            "profile_pic": self.profile_pic
        }
