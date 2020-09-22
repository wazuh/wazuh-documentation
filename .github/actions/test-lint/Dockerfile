FROM python:3.7-alpine

RUN python -m pip install restructuredtext_lint

RUN apk add --no-cache make

COPY ./entrypoint.sh /entrypoint.sh
RUN chmod 755 /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]