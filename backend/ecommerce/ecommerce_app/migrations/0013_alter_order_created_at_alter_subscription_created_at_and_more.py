# Generated by Django 4.1.1 on 2022-10-05 09:38

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("ecommerce_app", "0012_alter_order_created_at_alter_subscription_created_at"),
    ]

    operations = [
        migrations.AlterField(
            model_name="order",
            name="created_at",
            field=models.DateTimeField(
                blank=True,
                default=datetime.datetime(
                    2022, 10, 5, 9, 38, 40, 310350, tzinfo=datetime.timezone.utc
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
                    2022, 10, 5, 9, 38, 40, 309601, tzinfo=datetime.timezone.utc
                ),
                null=True,
            ),
        ),
        migrations.AlterField(
            model_name="useraccount",
            name="is_active",
            field=models.BooleanField(blank=True, default=True, null=True),
        ),
    ]