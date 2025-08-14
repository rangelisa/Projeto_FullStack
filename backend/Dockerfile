
FROM python:3.12-slim


WORKDIR /app


COPY main.py /app/main.py
COPY dados.json /app/dados.json
COPY requirements.txt /app/requirements.txt


RUN pip install --no-cache-dir -r requirements.txt


EXPOSE 8000


CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
