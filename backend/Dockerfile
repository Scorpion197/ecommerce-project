FROM python:3.8.3-slim                      

WORKDIR /usr/src/app 

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update \
    && apt-get -y install libpq-dev gcc
RUN pip install --upgrade pip 
COPY ./requirements.txt . 
RUN pip install -r requirements.txt 
COPY . . 
RUN pwd && ls 
WORKDIR /usr/src/app/ecommerce
RUN python3 --version
RUN ls 
CMD ["python3", "manage.py", "runserver"]