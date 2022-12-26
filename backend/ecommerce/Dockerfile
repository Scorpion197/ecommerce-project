FROM python:3.8.3-slim                      

WORKDIR /app/api 

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update \
    && apt-get -y install libpq-dev gcc
RUN pip install --upgrade pip 
COPY ./requirements.txt ./ 
RUN pip install -r requirements.txt 
COPY . ./
COPY ./entrypoint.sh ./
RUN chmod +x entrypoint.sh 
