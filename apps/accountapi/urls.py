from django.urls import path

from accountapi.views import LoginView, UserCreate, GetUserDetails, Logout, GetAllUsers, GetSystemRunningTime

urlpatterns = [
    path('auth/login', LoginView.as_view(), name="auth-login"),
    path('auth/register', UserCreate.as_view(), name="auth-register"),
    path('auth/userdetails', GetUserDetails.as_view(), name="auth-userdetails"),
    path('auth/getallusers', GetAllUsers.as_view(), name="auth-users"),
    path('auth/getrunningtime', GetSystemRunningTime.as_view(), name="systemrunningtime"),
    path('auth/logout', Logout.as_view(), name="auth-logout")
]
