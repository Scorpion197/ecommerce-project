# Generated by Django 4.1.1 on 2023-01-02 22:02

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        (
            "ecommerce_app",
            "0032_alter_order_created_at_alter_product_created_at_and_more",
        ),
    ]

    operations = [
        migrations.AlterField(
            model_name="order",
            name="created_at",
            field=models.DateTimeField(
                blank=True,
                default=datetime.datetime(
                    2023, 1, 2, 22, 2, 51, 171764, tzinfo=datetime.timezone.utc
                ),
                null=True,
            ),
        ),
        migrations.AlterField(
            model_name="product",
            name="created_at",
            field=models.DateTimeField(
                blank=True,
                default=datetime.datetime(2023, 1, 2, 22, 2, 51, 169803),
                null=True,
            ),
        ),
        migrations.AlterField(
            model_name="subscription",
            name="created_at",
            field=models.DateTimeField(
                blank=True,
                default=datetime.datetime(2023, 1, 2, 22, 2, 51, 171227),
                null=True,
            ),
        ),
        migrations.AlterField(
            model_name="subscription",
            name="expires_at",
            field=models.DateTimeField(
                blank=True,
                default=datetime.datetime(2023, 1, 2, 22, 2, 51, 171303),
                null=True,
            ),
        ),
        migrations.AlterField(
            model_name="subscription",
            name="started_at",
            field=models.DateTimeField(
                blank=True,
                default=datetime.datetime(2023, 1, 2, 22, 2, 51, 171295),
                null=True,
            ),
        ),
    ]