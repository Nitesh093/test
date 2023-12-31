# Generated by Django 4.1.4 on 2023-10-17 16:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='email',
            field=models.EmailField(default='ab@gmail.com', max_length=50),
        ),
        migrations.AddField(
            model_name='user',
            name='first_name',
            field=models.CharField(default='first_name', max_length=30),
        ),
        migrations.AddField(
            model_name='user',
            name='last_name',
            field=models.CharField(default='last', max_length=30),
        ),
        migrations.AddField(
            model_name='user',
            name='password',
            field=models.CharField(default='pass', max_length=50),
        ),
    ]
