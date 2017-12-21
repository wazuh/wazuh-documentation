.. _upgrading_same_major:

Upgrade from the same major version
=====================================

Use these instructions if you are upgrading your Wazuh installation within the same major version. As an example, from 2.0.1 to 2.1.1.

Upgrade Wazuh manager
---------------------

Before upgrading the Wazuh manager, stop ``ossec-authd`` in case that it is running in background. Since Wazuh 2.1.0, ``ossec-authd`` should be configured in the :doc:`auth section <../../user-manual/reference/ossec-conf/auth>` of ``ossec.conf``.


a) Upgrade Wazuh server on CentOS/RHEL/Fedora:

.. code-block:: console

    # yum upgrade wazuh-manager

b) Upgrade Wazuh server on Debian/Ubuntu:

.. code-block:: console

    # apt-get update && sudo apt-get install --only-upgrade wazuh-manager

Upgrade Wazuh API
---------------------

a) Upgrade Wazuh API on CentOS/RHEL/Fedora:

.. code-block:: console

    # yum upgrade wazuh-api

b) Upgrade Wazuh API on Debian/Ubuntu:

.. code-block:: console

    # apt-get update && sudo apt-get install --only-upgrade wazuh-api


Upgrade Wazuh agent
---------------------

a) Upgrade Wazuh agent on CentOS/RHEL/Fedora:

.. code-block:: console

    # yum upgrade wazuh-agent

b) Upgrade Wazuh agent on Debian/Ubuntu:

.. code-block:: console

    # apt-get update && sudo apt-get install --only-upgrade wazuh-agent


Upgrade Wazuh Kibana App
-------------------------


1) On your terminal, remove the current Wazuh Kibana App:

    .. code-block:: console

        # /usr/share/kibana/bin/kibana-plugin remove wazuh

2) Once the process is completed, you must stop Kibana with:

  a) For Systemd:

    .. code-block:: console

        # systemctl stop kibana

  b) For SysV Init:

    .. code-block:: console

        # service kibana stop

3) Remove the current kibana bundles:

.. code-block:: console

    # rm -rf /usr/share/kibana/optimize/bundles

4) Upgrade Wazuh Kibana App (this can take a while):


    4.1) Increase the default Node.js heap memory limit to prevent out of memory errors when installing the Wazuh App. 
  Set the limit as follow:

    .. code-block:: console

        # export NODE_OPTIONS="--max-old-space-size=3072"
        
    4.2) Install Wazuh App:

    .. code-block:: console

        # /usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/wazuhapp/wazuhapp.zip

5) Once the process is completed, you must start Kibana again with:

  a) For Systemd:

    .. code-block:: console

        # systemctl start kibana

  b) For SysV Init:

    .. code-block:: console

        # service kibana start
