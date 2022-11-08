# Generated by Django 4.1.1 on 2022-11-08 15:13

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        (
            "ecommerce_app",
            "0076_alter_order_created_at_alter_product_created_at_and_more",
        ),
    ]

    operations = [
        migrations.AddField(
            model_name="product",
            name="barcode",
            field=models.CharField(blank=True, default="", max_length=50, null=True),
        ),
        migrations.AddField(
            model_name="product",
            name="sku",
            field=models.CharField(blank=True, default="", max_length=20, null=True),
        ),
        migrations.AddField(
            model_name="product",
            name="weight",
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AlterField(
            model_name="order",
            name="created_at",
            field=models.DateTimeField(
                blank=True,
                default=datetime.datetime(
                    2022, 11, 8, 15, 13, 37, 703323, tzinfo=datetime.timezone.utc
                ),
                null=True,
            ),
        ),
        migrations.AlterField(
            model_name="product",
            name="created_at",
            field=models.DateTimeField(
                blank=True,
                default=datetime.datetime(2022, 11, 8, 15, 13, 37, 701835),
                null=True,
            ),
        ),
        migrations.AlterField(
            model_name="subscription",
            name="created_at",
            field=models.DateTimeField(
                blank=True,
                default=datetime.datetime(2022, 11, 8, 15, 13, 37, 702791),
                null=True,
            ),
        ),
        migrations.AlterField(
            model_name="subscription",
            name="expires_at",
            field=models.DateTimeField(
                blank=True,
                default=datetime.datetime(2022, 11, 8, 15, 13, 37, 702863),
                null=True,
            ),
        ),
        migrations.AlterField(
            model_name="subscription",
            name="started_at",
            field=models.DateTimeField(
                blank=True,
                default=datetime.datetime(2022, 11, 8, 15, 13, 37, 702854),
                null=True,
            ),
        ),
    ]