from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from .like import likes

Followers = db.Table(
    "followers",
    db.Model.metadata,
    db.Column("followerId", db.Integer, db.ForeignKey("users.id")),
    db.Column("followingId", db.Integer, db.ForeignKey("users.id")),
    db.Column("timestamp", db.DateTime, default=datetime.now)
)


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    bio = db.Column(db.String(255))
    profile_pic = db.Column(db.String(255))
    hashed_password = db.Column(db.String(255), nullable=False)

    # follows = db.relationship(
    #     'User',
    #     secondary=Followers,
    #     primaryjoin=(Followers.c.followerId == id),
    #     secondaryjoin=(Followers.c.followingId == id),
    #     backref=db.backref('followers', lazy='dynamic'),
    #     lazy='dynamic'
    # )

    # followers = db.relationship(
    #     'User',
    #     secondary=followers,
    #     primaryjoin=(followers.c.followingId == id),
    #     secondaryjoin=(followers.c.followerId == id),
    #     backref=db.backref('follows', lazy='dynamic'),
    #     lazy='dynamic'
    # )

    follows = db.relationship('User', secondary=Followers, primaryjoin=(Followers.c.followerId == id),secondaryjoin=(Followers.c.followingId == id), back_populates='followers')
    followers = db.relationship('User', secondary=Followers, primaryjoin=(Followers.c.followingId == id),secondaryjoin=(Followers.c.followerId == id), back_populates='follows')

    posts = db.relationship('Post', back_populates="users")
    comments = db.relationship('Comment', back_populates="users")
    userLikes = db.relationship("Post", secondary=likes, back_populates="postLikes")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        # print(self.followers)
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            "bio": self.bio,
            "profile_pic": self.profile_pic,
            "follows": [user.to_dict() for user in self.follows],
            # "followers": [user.to_dict() for user in self.test],
        }
