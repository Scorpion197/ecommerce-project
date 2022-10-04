from allauth.account.adapter import DefaultAccountAdapter


class CustomAccountAdapter(DefaultAccountAdapter):
    def save_user(self, request, user, form, commit=False):
        user = super().save_user(request, user, form, commit)
        data = form.cleaned_data
        user.first_name = data.get("first_name")
        user.family_name = data.get("family_name")
        user.email = data.get("email")
        user.user_type = data.get("user_type")
        user.is_active = data.get("is_active")
        user.save()
        return user
