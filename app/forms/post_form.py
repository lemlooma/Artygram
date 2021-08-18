from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField
from wtforms.validators import DataRequired, ValidationError


class CreatePostForm(FlaskForm):
    caption = StringField('Caption', validators=[DataRequired()])
    pic_url = StringField('Picture Url', validators=[DataRequired()])

    def updateCaption(self, newCaption):
        self.caption = newCaption
