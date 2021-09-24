from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


def email_valid(form, field):

    email = field.data

    if '@' not in email:
        raise ValidationError('Email must have @ symbol')


def username_length(form, field):
    # Check if username length is less than 25 chars
    username = field.data
    if len(username) > 15:
        raise ValidationError('Username must be less 15 than  characters.')


def email_length(form, field):
    # Check if email is less than 30 characters
    email = field.data
    if len(email) > 80:
        raise ValidationError(
            'Email must be less than 80 characters.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, username_length])
    email = StringField('email', validators=[DataRequired(), user_exists, email_length, email_valid])
    password = StringField('password', validators=[DataRequired()])
