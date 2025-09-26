.. Copyright (C) 2021 Wazuh, Inc.

.. _upgrade-scenario:


Upgrade Guide (3.x to 4.0)
==========================

This scenario covers the upgrade of a cluster running version 3.13.x or previous to 4.x.


First create a new named volume with: ``docker volume create migration``


Then proceed and attach it to the current cluster by modifying the docker-compose.yml like this:


.. code-block:: yaml

  volumes:
    migration:
      external:
        name: migration

  services:
    wazuh:
      image: wazuh/wazuh:3.13.1_7.8.0
      hostname: wazuh-manager
      restart: always
      ports:
        - "1514:1514/udp"
        - "1515:1515"
        - "514:514/udp"
        - "55000:55000"
      volumes:
        - migration:/wazuh-migration


.. note::
   Pay attention to the ``external`` keyword on the volume definition to access a volume created outside the scope of the cluster.

Proceed to rebuild the container with this volume attached: ``docker-compose up -d``

Copy the content of ``/var/ossec/data`` and ``global.db`` to ``/wazuh-migration`` on your Wazuh container:

``docker exec wazuh-docker_wazuh_1 cp -a /var/ossec/data /wazuh-migration/``

``docker exec wazuh-docker_wazuh_1 cp /var/ossec/var/db/global.db /wazuh-migration/``

You can stop the cluster now: ``docker-compose stop``

The data from your legacy Wazuh container it's in the migration volume, feel free to inspect it:

``docker run --rm -v migration:/migration alpine:latest ls -l /migration/data``

Mount the volume on the new 4.0 cluster:

.. code-block:: yaml

  services:
  wazuh:
  ...
    volumes:
      ...
      - migration:/wazuh-migration

  volumes:
    ...
    migration:
      external:
        name: migration

Re-build the container with ``docker-compose up -d`` and now the migration volume is mounted on the Wazuh container at ``/migration``, the container logic will take place and the migration will proceed before starting the manager processes.

On startup the script will provide feedback of the process. The message: ``Migration completed succesfully`` will appear on first execution, then it will display a warning to remove the volume from ``docker-compose.yml``.


Migrated agents will be active on the new cluster:

.. code-block:: shell

  # /var/ossec/bin/agent_control -l

  Wazuh agent_control. List of available agents:
     ID: 000, Name: wazuh-manager (server), IP: 127.0.0.1, Active/Local
     ID: 001, Name: debian-agent, IP: any, Active
     ID: 002, Name: centos7-agent, IP: any, Active
