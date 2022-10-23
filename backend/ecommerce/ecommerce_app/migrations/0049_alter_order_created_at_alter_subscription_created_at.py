# Generated by Django 4.1.1 on 2022-10-23 13:46

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("ecommerce_app", "0048_subscription_status_alter_order_created_at_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="order",
            name="created_at",
            field=models.DateTimeField(
                blank=True,
                default=datetime.datetime(
                    2022, 10, 23, 13, 46, 58, 967455, tzinfo=datetime.timezone.utc
                ),
                null=True,
            ),
        ),
        migrations.AlterField(
            model_name="subscription",
            name="created_at",
            field=models.DateTimeField(
                blank=True,
                default=datetime.datetime(
                    2022, 10, 23, 13, 46, 58, 966530, tzinfo=datetime.timezone.utc
                ),
                null=True,
            ),
        ),
    ]