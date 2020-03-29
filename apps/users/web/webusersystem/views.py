from django.contrib import messages
from django.contrib.auth import authenticate
from django.shortcuts import render, redirect

from apps.users.api.user.models import User


def index(request):
    return render(request, '../../webusersystem/templates/index.html')


def register(request):
    errors = User.objects.validator(request.POST)
    if len(errors):
        for tag, error in errors.iteritems():
            messages.error(request, error, extra_tags=tag)
        return redirect('/')

    # hashed_password = bcrypt.hashpw(request.POST['password'].encode(), bcrypt.gensalt())
    user = User.objects.create(first_name=request.POST['first_name'], last_name=request.POST['last_name'],
                               password=request.POST['password'], email=request.POST['email'])
    user.save()
    request.session['id'] = user.id
    return redirect('/success')


def login(request):
    if (User.objects.filter(email=request.POST['login_email']).exists()):
        # user = User.objects.filter(email=request.POST['login_email'])[0]
        user = authenticate(email=request.POST['login_email'], password=request.POST['login_password'])
        if user is None:
            return redirect('/web/login')
        else:
            request.session['id'] = user.id
            print("user suces login")
            return redirect('/web/success')

        # if (bcrypt.checkpw(request.POST['login_password'].encode(), user.password.encode())):
        #     request.session['id'] = user.id
        #     return redirect('/success')
    return redirect('/web/login')


def success(request):
    user = User.objects.get(id=request.session['uuid'])
    context = {
        "user": user
    }
    return render(request, '../../webusersystem/templates/success.html', context)
