.. Copyright (C) 2020 Wazuh, Inc.

Unattended installation
=======================

This section will explain how to install Wazuh on a single host by using a script that will automatically detect whether the operating system uses ``rpm`` or ``deb`` packages.
The script will perform a health-check verifying that the available system resources meet the minimal requirements. For more information, please visit the :ref:`requirements <basic_all_in_one_requirements>` section.

The script will install Java Development Kit and other packages including ``unzip`` and ``libcap`` required by Elasticsearch. Besides, the `Search Guard offline TLS tool <https://docs.search-guard.com/latest/offline-tls-tool>`_ will be used to generate the certificates for protecting data in the Elastic Stack.

Installing Wazuh
----------------

.. note:: Root user privileges are required to run all the commands described below. To download the script the package ``curl`` will be used.

Download and run the script:

  .. code-block:: console

      # curl -so ~/all-in-one-installation.sh https://raw.githubusercontent.com/wazuh/wazuh/new-documentation-templates/extensions/basic/unattended-installation/all-in-one-installation.sh && bash ~/all-in-one-installation.sh

The script will perform an health-check to ensure that the host has enough resources to garantee the proper performance. This can be skipped adding the option ``-i`` or ``--ignore-healthcheck`` when running the script:

.. code-block:: console


  # bash all-in-one-installation.sh -i      

After the execution of the script, it will show the following messages to confirm that the install was made successfully:

.. code-block:: none
  :class: output
  :emphasize-lines: 26

  # Checking the installation...
  # Elasticsearch installation succeeded.
  # Filebeat installation succeeded.
  # Initializing Kibana (this may take a while)
  # #################################
  # During the installation of Elasticsearch the passwords for its user were generated. Please take note of them:
  # Changed password for user apm_system
  # PASSWORD apm_system = vJc4HN6tJRRMia0acbiz

  # Changed password for user kibana_system
  # PASSWORD kibana_system = oMH7soxtI7vyEOZ1v4g7

  # Changed password for user kibana
  # PASSWORD kibana = oMH7soxtI7vyEOZ1v4g7

  # Changed password for user logstash_system
  # PASSWORD logstash_system = dTJJAeFCwMrov7ox00Hk

  # Changed password for user beats_system
  # PASSWORD beats_system = 0PclOBKbgkoYMV54yWHh

  # Changed password for user remote_monitoring_user
  # PASSWORD remote_monitoring_user = pCK0YZ9rsy9oZqDJkOTR

  # Changed password for user elastic
  # PASSWORD elastic = nBsPDPzfxcVFZjSlLhP6

  # Installation finished



Once Kibana is accessible, the script will quit. Save the password for ``elastic`` user since this will be needed to access Kibana.


Customizing the installation
----------------------------

The Kibana configuration found at the ``/etc/kibana/kibana.yml`` file has the ``server.host`` parameter set to ``0.0.0.0``. It means that Kibana can be accessed from the outside and will accept all the available IPs of the host.  This value can be changed for a specific IP if needed.

.. note:: The Kibana service listens to the default port ``443``. The browser address is: ``https://<kibana_ip>`` replacing ``<kibana_ip>`` by the Kibana server IP. The default user to access Kibana is ``elastic`` and the password is the one given after the installation.

With the first access to Kibana, the browser shows a warning message stating that the certificate was not issued by a trusted authority. This can be accepted by clicking on ``Advanced options`` to add an exception or, for increased security, by importing the ``ca.crt``, found in the ``/etc/kibana/certs/ca`` directory, to the Certificate Manager of each browser that will access the Kibana interface or use a certificate from a trusted authority.

Next steps
----------

Once the Wazuh environment is ready, a Wazuh agent can be installed in every endpoint to be monitored. The Wazuh agent installation guide is available for most operating systems and can be found :ref:`here<installation_agents>`.
