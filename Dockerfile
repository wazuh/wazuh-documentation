# Copyright 2017-2019 Markus Zapke-Gründemann
# Extended by Wazuh, Inc.
# docker build -t sphinx-autobuild .
# docker run -it -p 8000:8000 --rm -v "$(pwd)/source":/home/python/docs sphinx-autobuild

FROM python:3.8-alpine

COPY --chown=1000:1000 requirements.txt ./

RUN python -m pip install --requirement requirements.txt && python -m pip install sphinx-autobuild==2021.3.14

EXPOSE 8000

CMD ["sphinx-autobuild", "--host", "0.0.0.0", "--ignore","*.tmp", "--ignore","**/*.min.*","--port", "8000", "/home/python/docs", "/home/python/build/html"]
