from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('octofit_tracker', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='name',
            field=models.CharField(default='', max_length=200),
        ),
    ]
