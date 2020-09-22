FROM python:3.7-alpine

COPY --chown=1000:1000 requirements.txt ./

RUN python -m pip install --requirement requirements.txt && python -m pip install sphinx-autobuild==0.7.1
RUN apk add --no-cache make

COPY ./entrypoint.sh /entrypoint.sh
RUN chmod 755 /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]