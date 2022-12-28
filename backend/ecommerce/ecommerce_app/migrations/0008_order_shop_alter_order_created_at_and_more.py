# Generated by Django 4.1.1 on 2022-12-28 19:54

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        (
            "ecommerce_app",
            "0007_alter_order_created_at_alter_product_created_at_and_more",
        ),
    ]

    operations = [
        migrations.AddField(
            model_name="order",
            name="shop",
            field=models.ForeignKey(
                blank=True,
                default=None,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="ecommerce_app.shop",
            ),
        ),
        migrations.AlterField(
            model_name="order",
            name="created_at",
            field=models.DateTimeField(
                blank=True,
                default=datetime.datetime(
                    2022, 12, 28, 19, 54, 52, 463995, tzinfo=datetime.timezone.utc
                ),
                null=True,
            ),
        ),
        migrations.AlterField(
            model_name="product",
            name="created_at",
            field=models.DateTimeField(
                blank=True,
                default=datetime.datetime(2022, 12, 28, 19, 54, 52, 462432),
                null=True,
            ),
        ),
        migrations.AlterField(
            model_name="subscription",
            name="created_at",
            field=models.DateTimeField(
                blank=True,
                default=datetime.datetime(2022, 12, 28, 19, 54, 52, 463504),
                null=True,
            ),
        ),
        migrations.AlterField(
            model_name="subscription",
            name="expires_at",
            field=models.DateTimeField(
                blank=True,
                default=datetime.datetime(2022, 12, 28, 19, 54, 52, 463567),
                null=True,
            ),
        ),
        migrations.AlterField(
            model_name="subscription",
            name="started_at",
            field=models.DateTimeField(
                blank=True,
                default=datetime.datetime(2022, 12, 28, 19, 54, 52, 463559),
                null=True,
            ),
        ),
    ]