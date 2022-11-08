# Generated by Django 4.1.1 on 2022-10-29 15:31

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        (
            "ecommerce_app",
            "0060_alter_order_created_at_alter_subscription_created_at_and_more",
        ),
    ]

    operations = [
        migrations.AlterField(
            model_name="order",
            name="created_at",
            field=models.DateTimeField(
                blank=True,
                default=datetime.datetime(
                    2022, 10, 29, 15, 31, 34, 827036, tzinfo=datetime.timezone.utc
                ),
                null=True,
            ),
        ),
        migrations.AlterField(
            model_name="subscription",
            name="created_at",
            field=models.DateTimeField(
                blank=True,
                default=datetime.datetime(2022, 10, 29, 15, 31, 34, 826543),
                null=True,
            ),
        ),
        migrations.AlterField(
            model_name="subscription",
            name="expires_at",
            field=models.DateTimeField(
                blank=True,
                default=datetime.datetime(2022, 10, 29, 15, 31, 34, 826616),
                null=True,
            ),
        ),
        migrations.AlterField(
            model_name="subscription",
            name="started_at",
            field=models.DateTimeField(
                blank=True,
                default=datetime.datetime(2022, 10, 29, 15, 31, 34, 826607),
                null=True,
            ),
        ),
    ]