# Copyright 2017-2019 Markus Zapke-Gründemann
# Extended by Wazuh, Inc.
# docker build -t sphinx-autobuild .
# docker run -it -p 8000:8000 --rm -v "$(pwd)/source":/home/python/docs sphinx-autobuild

FROM keimlink/sphinx-doc:1.7.1

COPY --chown=1000:1000 requirements.txt ./

RUN . .venv/bin/activate \
    && python -m pip install --requirement requirements.txt && python -m pip install sphinx-autobuild==0.7.1

EXPOSE 8000

CMD ["sphinx-autobuild", "--host", "0.0.0.0", "--port", "8000", "/home/python/docs", "/home/python/build/html"]
