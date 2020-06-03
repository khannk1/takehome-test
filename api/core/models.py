from django.db import models
import jsonfield

def initial_row_data():
    return  {}

# Create your models here.
class Family(models.Model):
    data = jsonfield.JSONField(default=initial_row_data)