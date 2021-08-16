from .db import db
from datetime import datetime

likes = db.Table(
    "likes",
    db.Model.metadata,
    db.Column("userId", db.Integer, db.ForeignKey("users.id")),
    db.Column("postId", db.Integer, db.ForeignKey("posts.id")),
    db.Column("timestamp", db.DateTime, default=datetime.now)

)
