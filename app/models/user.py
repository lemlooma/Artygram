from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

followers = db.Table(
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
