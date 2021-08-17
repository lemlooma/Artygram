from ..models.post import Post
from ..models.user import User, followers
from ..models.db import db
from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from ..forms.post_form import CreatePostForm
from datetime import datetime
from .auth_routes import validation_errors_to_error_messages

post_routes = Blueprint('posts', __name__)


@post_routes.route('/')
@login_required
def get_posts():
    user = current_user
    following_ids = [following.id for following in user.follows]
    following_ids.append(user.id)
    posts = Post.query.filter(Post.user_id.in_(
        following_ids)).order_by(Post.timestamp.desc()).all()

    users = User.query.filter(User.id.in_(following_ids)).all()

    return {"Posts": [post.to_dict() for post in posts]}


@post_routes.route('/new', methods=['POST'])
@login_required
def create_posts():
    user = current_user
    form = CreatePostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_post = Post(
            user_id=user.id,
            caption=data['caption'],
            pic_url=data['pic_url'],
            timestamp=datetime.now
        )
        db.session.add(new_post)
        db.session.commit()
        return {new_post.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401