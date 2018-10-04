.. Copyright (C) 2018 Wazuh, Inc.

.. _docker-wodle_monitoring_containers:

Monitoring Containers
=====================

The `docker library <https://pypi.org/project/docker/>`_ for Python lets doing the same that ``docker`` command does.

You only need to have the Docker service and Wazuh running for monitoring the containers activity.

Wazuh configuration
^^^^^^^^^^^^^^^^^^^

Below there is an example of the wodle configuration:

.. code-block:: xml

    <wodle name="docker-listener">
        <interval>2h</interval>
        <attemps>5</attemps>
        <run_on_start>no</run_on_start>
        <disabled>no</disabled>
    </wodle>

Wazuh Rules
^^^^^^^^^^^

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