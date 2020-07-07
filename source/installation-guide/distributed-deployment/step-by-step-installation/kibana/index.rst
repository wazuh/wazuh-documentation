.. Copyright (C) 2020 Wazuh, Inc.

.. meta:: :description: Learn how to install Elastic Stack for using Wazuh on Debian

.. _kibana:


Kibana
======

Kibana is a flexible and intuitive web interface for mining and visualizing the events and archives stored in Elasticsearch. More information can be found at `Kibana site <https://opendistro.github.io/for-elasticsearch-docs/docs/kibana/>`_.

It is recommended to install Kibana on the same server as Elasticsearch, but it is not required. The following Kibana installation may vary depending on whether Kibana will be installed in the same server as Elasticsearch or not.

Prerequisites
~~~~~~~~~~~~~

Before installing Kibana, some extra packages must be installed:

.. include:: ../../../../_templates/installations/elastic/common/before_installation_kibana.rst

Adding the Wazuh repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~

This step is required only if Kibana will be installed on a separate host where Elasticsearch was installed

.. tabs::

  .. group-tab:: Yum


    .. include:: ../../../../_templates/installations/wazuh/yum/add_repository.rst



  .. group-tab:: APT


    .. include:: ../../../../_templates/installations/wazuh/deb/add_repository.rst



Kibana installation and configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Install the Kibana package:

    .. tabs::

        .. group-tab:: Yum


            .. include:: ../../../../_templates/installations/elastic/yum/install_kibana.rst



        .. group-tab:: APT


            .. include:: ../../../../_templates/installations/elastic/deb/install_kibana.rst



#. Download the Kibana configuration file:

    .. include:: ../../../../_templates/installations/elastic/common/configure_kibana.rst


#. Install the Wazuh Kibana plugin:

    The installation of the plugin must be done from the Kibana home directory:

    .. code-block:: console

        # cd /usr/share/kibana
        # sudo -u kibana /usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/wazuhapp/wazuhapp-3.13.0_7.7.0.zip

#. The next step involves the certificates placement. It will vary depending on whether Kibana will be installed in the same server as Elasticsearch or in a different one:


    .. tabs::



        .. group-tab:: Same Elasticsearch server


            Copy the Elasticsearch certificates:

            .. include:: ../../../../_templates/installations/elastic/common/copy_certificates_kibana_elastic_server.rst



        .. group-tab:: Different Elasticsearch server


            .. include:: ../../../../_templates/installations/elastic/common/generate_new_kibana_certificates.rst



#. Link Kibana's socket to privileged port 443:

    .. code-block:: console

        # setcap 'cap_net_bind_service=+ep' /usr/share/kibana/node/bin/node


#. Enable and start the Kibana service:

    .. include:: ../../../../_templates/installations/elastic/common/enable_kibana.rst

With the first access to Kibana, the browser shows a warning message stating that the certificate was not issued by a trusted authority. This can be accepted by clicking on ``Advanced options`` to add an exception or, for increased security, by importing the ``root-ca.pem`` previously created to the Certificate Manager of each browser that will access the Kibana interface or use a certificate from a trusted authority.

.. note:: The Kibana service listens to port ``443``. The browser address is: ``https://<kibana_ip>`` replacing ``<kibana_ip>`` by the Kibana server IP. The default user and password to access Kibana is ``wazuh_user``.

It is highly recommended to change Elasticsearch’s default passwords for the users found at the ``/usr/share/elasticsearch/plugins/opendistro_security/securityconfig/internal_users.yml`` file. More information about this process can be found :ref:`here <change_elastic_pass>`.

With the first access attempt, the Wazuh Kibana plugin may prompt a message that indicates that the Wazuh API is not working. To solve this issue edit the file ``/usr/share/kibana/optimize/wazuh/config/wazuh.yml`` and replace the ``url`` value by the Wazuh's server IP in which the Wazuh API is installed:

.. code-block:: yaml

  hosts:
    - default:
       url: <Wazuh_server_IP>
       port: 55000
       user: foo
       password: bar


Next steps
~~~~~~~~~~

Once the Wazuh environment is ready, a Wazuh agent can be installed in every endpoint to be monitored. The Wazuh agent installation guide is available for most operating systems and can be found :ref:`here<installation_agents>`.
