# Generated by Django 4.1.1 on 2022-09-25 18:12

from django.db import migrations, models
import ecommerce_app.models


class Migration(migrations.Migration):

    dependencies = [
        ("ecommerce_app", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Product",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "name",
                    models.CharField(blank=True, default="", max_length=200, null=True),
                ),
                ("price", models.IntegerField(default=0)),
                (
                    "size",
                    models.CharField(
                        choices=[
                            ("SMALL", "S"),
                            ("MEDIUM", "M"),
                            ("LARGE", "L"),
                            ("EXTRA_LARGE", "XL"),
                            ("EXTRA_EXTRA_LARGE", "XXL"),
                        ],
                        default="S",
                        max_length=20,
                    ),
                ),
                (
                    "color",
                    models.CharField(blank=True, default="", max_length=20, null=True),
                ),
                (
                    "image",
                    models.ImageField(
                        blank=True,
                        default=None,
                        null=True,
                        upload_to=ecommerce_app.models.upload_product_image,
                    ),
                ),
            ],
        ),
    ]