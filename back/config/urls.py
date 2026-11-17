from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    # Админка Django (переименована, чтобы не конфликтовать с React)
    path('django-admin/', admin.site.urls),
    
    # API
    path('api/auth/', include('accounts.urls')),
    path('api/', include('meals.urls')),
    
    # Все остальные пути отдаем в React
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]