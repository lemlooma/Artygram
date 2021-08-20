from flask import Blueprint, jsonify
from flask_login import login_required,current_user
from app.models import User


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get_or_404(id)

    return user.to_dict()


@user_routes.route('/<int:id>/following')
@login_required
def following(id):
    user = User.query.get(id)
    print(user)
    return user.to_dict()


@user_routes.route('/<int:id>/followers')
@login_required
def followers(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/follow')
@login_required
def likeOnPost(id):
    loggedUser = current_user
    otherUser = User.query.get(id)

    # print('this is the post!!!!!!!!!!!', dir(post.postLikes))
    # post.postLikes.append(int(user.id))

    # post.postLikes is a list contains the User object. not the user.id
    # this is getting all the id in the post.postLikes.
    allUsersId = [user.id for user in loggedUser.follows]

    if otherUser.id in allUsersId:
        # have to remove the whole user object.
        loggedUser.follows.remove(otherUser)
    else:
        # this has to add the user object. instead of just the user.id
        loggedUser.follows.append(otherUser)

    db.session.commit()
    # print('this is the post!!!!!!!!!!!', post.postLikes)
    return {'loggedUser': loggedUser.to_dict(), 'otherUser': otherUser.to_dict()}
