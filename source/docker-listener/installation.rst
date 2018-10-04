.. Copyright (C) 2018 Wazuh, Inc.

.. _docker-wodle_listener_installation:

Manager Requierements
=====================

Wazuhs manager is in charge of carrying out the integration with Docker when monitoring containers. The correct use of the integration depends on the previous installation of certain requirements.  

Dependencies
------------

- Docker
- Wazuh >= 3.7
- Python >= 2.7
- Pip
- docker

Docker
^^^^^^

`Docker <https://www.docker.com/>`_ is mandatory. It is necessary that Docker service is active for using this wodle.

Wazuh 3.7
^^^^^^^^^

Integration with Docker for monitoring containers is an added capability in Wazuh version 3.7. The configuration regarding the integration by Wazuh will be implemented in the Wazuh manager with version 3.7 or higher. 

Python 2.7
^^^^^^^^^^

Part of the integration has been implemented in `Python <https://www.python.org/>`_, so we will need to have Python installed with a version 2.7 or higher. 

Pip
^^^

The correct functioning of the integration implemented in Python requires the presence of certain libraries that we will mention below. To install these libraries the easiest option is to use `Pip <https://pypi.org/project/pip/>`_. 

docker
^^^^^^

One of the libraries to install is `docker library <https://pypi.org/project/docker/>`_. docker allows listen Docker events.

Installing Dependencies
-----------------------

Python docker is required on the system running the Wazuh module to listen Docker events.

Pip
^^^

Pip can be used as Python package manager to install the required module. In order to use it, we will start installing this tool.


a) CentOS/RHEL/Fedora:

.. note::

        It may be necessary to enable the EPEL repository

.. code-block:: console

    # yum install python-pip

b) Debian/Ubuntu:

.. code-block:: console

    # apt-get update && apt-get install python-pip

c) From sources:

.. code-block:: console

    # curl -O https://bootstrap.pypa.io/get-pip.py
    # python get-pip.py

docker library
^^^^^^^^^^^^^^

.. code-block:: console

    # pip install docker