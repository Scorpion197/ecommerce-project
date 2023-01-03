# Generated by Django 4.1.1 on 2023-01-02 23:51

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        (
            "ecommerce_app",
            "0035_alter_order_created_at_alter_product_created_at_and_more",
        ),
    ]

    operations = [
        migrations.AddField(
            model_name="product",
            name="is_deleted",
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
        migrations.AlterField(
            model_name="order",
            name="created_at",
            field=models.DateTimeField(
                blank=True,
                default=datetime.datetime(
                    2023, 1, 2, 23, 51, 43, 277438, tzinfo=datetime.timezone.utc
                ),
                null=True,
            ),
        ),
        migrations.AlterField(
            model_name="product",
            name="created_at",
            field=models.DateTimeField(
                blank=True,
                default=datetime.datetime(2023, 1, 2, 23, 51, 43, 275636),
                null=True,
            ),
        ),
        migrations.AlterField(
            model_name="subscription",
            name="created_at",
            field=models.DateTimeField(
                blank=True,
                default=datetime.datetime(2023, 1, 2, 23, 51, 43, 276897),
                null=True,
            ),
        ),
        migrations.AlterField(
            model_name="subscription",
            name="expires_at",
            field=models.DateTimeField(
                blank=True,
                default=datetime.datetime(2023, 1, 2, 23, 51, 43, 276971),
                null=True,
            ),
        ),
        migrations.AlterField(
            model_name="subscription",
            name="started_at",
            field=models.DateTimeField(
                blank=True,
                default=datetime.datetime(2023, 1, 2, 23, 51, 43, 276962),
                null=True,
            ),
        ),
    ]
