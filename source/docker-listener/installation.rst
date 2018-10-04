.. Copyright (C) 2018 Wazuh, Inc.

.. _docker-wodle_listener_installation:

Installation
============

This wodle works on the agent side. You need to have the option ``disabled`` with the value ``no`` in the ``ossec.conf`` for using it.

.. code-block:: xml

    <wodle name="docker-listener">
        <interval>2h</interval>
        <attemps>5</attemps>
        <run_on_start>no</run_on_start>
        <disabled>no</disabled>
    </wodle>

Dependencies
------------

- Python >= 2.7
- Pip
- docker

Part of the integration has been implemented in `Python <https://www.python.org/>`_, so we will need to have Python installed with a version 2.7 or higher. 

The correct functioning of the integration implemented in Python requires the presence of certain libraries as `docker library <https://pypi.org/project/docker/>`_.

.. note::

        It is necessary Wauzh 3.7 or higher for use this wodle


Installing dependencies
-----------------------

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

Wazuh Rules
-----------

The logs are stored in json files, therefore, with these simple rules we will be able to obtain the related alerts. 

.. code-block:: xml

    <rule id="87900" level="0">
        <decoded_as>json</decoded_as>
        <field name="integration">docker</field>
        <description>Docker alerts: $(docker.Type).</description>
    </rule>

     <rule id="87901" level="3">
        <if_sid>87900</if_sid>
        <field name="docker.status">create</field>
        <description>Container $(docker.Actor.Attributes.name) created</description>
    </rule>

    <rule id="87902" level="3">
        <if_sid>87900</if_sid>
        <field name="docker.status">destroy</field>
        <description>Container $(docker.Actor.Attributes.name) destroyed</description>
    </rule>

    <rule id="87903" level="3">
        <if_sid>87900</if_sid>
        <field name="docker.status">start</field>
        <description>Container $(docker.Actor.Attributes.name) started</description>
    </rule>