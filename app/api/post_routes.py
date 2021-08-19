from ..models.post import Post
from ..models.user import User
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

    return {post.id: post.to_dict() for post in posts}
    # return {"Posts": {post.id: post.to_dict() for post in posts}}


@post_routes.route('/new', methods=['GET', 'POST'])
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
            timestamp=datetime.now()
        )

        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@post_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_caption(id):
    post = Post.query.get(id)
    form = CreatePostForm()
    # if current_user.get_id() != post.user_id:

    #     return jsonify({"error": 'Not Authorized'})

    print('CAPTION', post.caption)

    post.caption = request.data[1]

    db.session.add(post)
    db.session.commit()
    return jsonify(post.to_dict())


@post_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_post(id):
    post = Post.query.get(id)
    db.session.delete(post)
    db.session.commit()

    return jsonify("Delete successful")


@post_routes.route('/<int:id>/like', methods=['PUT'])
@login_required
def likeOnPost(id):
    user = current_user
    post = Post.query.get(id)

    # print('this is the post!!!!!!!!!!!', dir(post.postLikes))
    # post.postLikes.append(int(user.id))

    # post.postLikes is a list contains the User object. not the user.id
    # this is getting all the id in the post.postLikes.
    allUsersId = [user.id for user in post.postLikes]

    if user.id in allUsersId:
        #have to remove the whole user object.
        post.postLikes.remove(user)
    else:
        # this has to add the user object. instead of just the user.id
        post.postLikes.append(user)

    db.session.commit()
    # print('this is the post!!!!!!!!!!!', post.postLikes)
    return post.to_dict()
