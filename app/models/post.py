from .db import db
from datetime import datetime
from .like import likes


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    caption = db.Column(db.String(100), nullable=False)
    pic_url = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    timestamp = db.Column(db.DateTime, default=datetime.now)

    users = db.relationship('User', back_populates="posts")

    comments = db.relationship("Comment", back_populates="posts")

    postlikes = db.relationship(
        "User", secondary=likes, back_populates="posts")

    def to_dict(self):
        return {
            'id': self.id,
            'caption': self.caption,
            'pic_url': self.pic_url,
            "user_id": self.user_id,
            "timestamp": self.timestamp
        }

    def to_dict_associations(self):
        return {
            "comments": self.comments,
            "postlikes": self.postlikes,
            "likesnum": len(self.postlikes),
            "commentsnum": len(self.comments)
        }
