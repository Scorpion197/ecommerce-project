# Generated by Django 4.1.1 on 2022-11-07 13:07

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        (
            "ecommerce_app",
            "0073_alter_order_created_at_alter_product_created_at_and_more",
        ),
    ]

    operations = [
        migrations.AlterField(
            model_name="order",
            name="created_at",
            field=models.DateTimeField(
                blank=True,
                default=datetime.datetime(
                    2022, 11, 7, 13, 7, 56, 728209, tzinfo=datetime.timezone.utc
                ),
                null=True,
            ),
        ),
        migrations.AlterField(
            model_name="product",
            name="created_at",
            field=models.DateTimeField(
                blank=True,
                default=datetime.datetime(2022, 11, 7, 13, 7, 56, 726835),
                null=True,
            ),
        ),
        migrations.AlterField(
            model_name="subscription",
            name="created_at",
            field=models.DateTimeField(
                blank=True,
                default=datetime.datetime(2022, 11, 7, 13, 7, 56, 727703),
                null=True,
            ),
        ),
        migrations.AlterField(
            model_name="subscription",
            name="expires_at",
            field=models.DateTimeField(
                blank=True,
                default=datetime.datetime(2022, 11, 7, 13, 7, 56, 727769),
                null=True,
            ),
        ),
        migrations.AlterField(
            model_name="subscription",
            name="started_at",
            field=models.DateTimeField(
                blank=True,
                default=datetime.datetime(2022, 11, 7, 13, 7, 56, 727760),
                null=True,
            ),
        ),
    ]
