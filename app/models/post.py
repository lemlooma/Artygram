from .db import db
from flask import jsonify
from datetime import datetime
from .like import likes
from .user import User


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    caption = db.Column(db.String(100), nullable=False)
    pic_url = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    timestamp = db.Column(db.DateTime, default=datetime.now)

    users = db.relationship('User', back_populates="posts")

    comments = db.relationship("Comment", back_populates="posts")

    postLikes = db.relationship(
        "User", secondary=likes, back_populates="userLikes")

    def to_dict(self):
        user = User.query.filter(User.id == self.user_id).first()

        return {
            'id': self.id,
            'caption': self.caption,
            'pic_url': self.pic_url,
            "user_id": self.user_id,
            "timestamp": self.timestamp,
            "user": user.to_dict(),
            "comments": self.comments,
            "postlikes": self.postLikes,
            "likesnum": len(self.postLikes),
            "commentsnum": len(self.comments)
        }

    def to_dict_associations(self):
        return {
            "comments": self.comments,
            "postlikes": self.postLikes,
            "likesnum": len(self.postLikes),
            "commentsnum": len(self.comments)
        }
