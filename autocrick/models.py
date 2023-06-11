from django.db import models

# Create your models here.
class User(models.Model):
    fullname = models.CharField(max_length=255)
    username = models.CharField(max_length=255)
    email = models.EmailField()
    password = models.CharField(max_length=255)
    contact_no = models.CharField(max_length=255)
    role_id = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'users'

class Role(models.Model):
    role_id = models.CharField(max_length=2)
    role = models.CharField(max_length=30)
    status = models.CharField(max_length=2)

    class Meta:
        db_table = 'roles'

class Matches(models.Model):
    tournament_id = models.CharField(max_length=3)
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=2)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'matches'

class Players_in_Match(models.Model):
    user_id = models.CharField(max_length=3)
    match_id = models.CharField(max_length=3)

    class Meta:
        db_table = 'players_in_match'

class Tournament(models.Model):
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=255)
    no_of_matches = models.CharField(max_length=3)
    latitude = models.CharField(max_length=50)
    longitude = models.CharField(max_length=50)
    venue = models.CharField(max_length=40)
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=2)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'tournament'