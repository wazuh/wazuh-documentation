.. Copyright (C) 2020 Wazuh, Inc.

.. meta:: :description: Learn how to install Elastic Stack for using Wazuh on Debian

.. _basic_kibana:


Kibana
======

Kibana is a flexible and intuitive web interface for mining and visualizing the events and archives stored in Elasticsearch.

Elastic recommends installing Kibana on the same server as Elasticsearch, but it is not required. The following Kibana installation may vary depending on whether Kibana will be installed in the same server as Elasticsearch or not.

Adding the Elastic Stack repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. tabs::

  .. group-tab:: Yum


    .. include:: ../../../../../_templates/installations/basic/elastic/yum/add_repository.rst



  .. group-tab:: APT


    .. include:: ../../../../../_templates/installations/basic/elastic/deb/add_repository.rst



  .. group-tab:: ZYpp


    .. include:: ../../../../../_templates/installations/basic/elastic/zypp/add_repository.rst



Kibana installation and configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Install the Kibana package:

    .. tabs::

        .. group-tab:: Yum


            .. include:: ../../../../../_templates/installations/basic/elastic/yum/install_kibana.rst



        .. group-tab:: APT


            .. include:: ../../../../../_templates/installations/basic/elastic/deb/install_kibana.rst



        .. group-tab:: ZYpp


            .. include:: ../../../../../_templates/installations/basic/elastic/zypp/install_kibana.rst


#. The next step, involving the certificate placement, may vary depending on whether Kibana will be installed in the same server as Elasticsearch or in a different one:


    .. tabs::



        .. tab:: Same Elasticsearch server


            Copy the Elasticsearch certificates:

            .. include:: ../../../../../_templates/installations/basic/elastic/common/copy_certificates_kibana_elastic_server.rst



        .. tab:: Different Elasticsearch server


            .. include:: ../../../../../_templates/installations/basic/elastic/common/generate_new_kibana_certificates.rst



#. Download the Kibana configuration file:

    .. include:: ../../../../../_templates/installations/basic/elastic/common/configure_kibana.rst


#. Update the ``optimize`` and ``plugins`` directories permissions:

    .. code-block:: console
    
      # chown -R kibana:kibana /usr/share/kibana/optimize
      # chown -R kibana:kibana /usr/share/kibana/plugins    


#. Install the Wazuh Kibana plugin:

    The installation of the plugin must be done from the Kibana home directory.

    .. code-block:: console

        # cd /usr/share/kibana

    .. code-block:: console

        # sudo -u kibana /usr/share/kibana/bin/kibana-plugin install https://packages-dev.wazuh.com/pre-release/ui/kibana/wazuh_kibana-4.0.0_7.8.0-1.zip

#. Link Kibana's socket to privileged port 443:

    .. code-block:: console

      # setcap 'cap_net_bind_service=+ep' /usr/share/kibana/node/bin/node

#. Enable and start the Kibana service:

    .. include:: ../../../../../_templates/installations/basic/elastic/common/enable_kibana.rst

    With the first access to Kibana, the browser shows a warning message stating that the certificate was not issued by a trusted authority. This can be accepted by clicking on ``Advanced options`` to add an exception or, for increased security, by importing the ``ca.crt`` previously created to the Certificate Manager of each browser that will access the Kibana interface.

    .. note:: The Kibana service listens to the default port ``443``. The browser address is: ``https://<kibana_ip>`` replacing ``<kibana_ip>`` by the Kibana server IP. The default user is ``elastic`` and the password is the one generated previously.


Disabling repositories
~~~~~~~~~~~~~~~~~~~~~~

.. include:: ../../../../../_templates/installations/basic/elastic/common/disabling_repositories_explanation.rst


.. tabs::

  .. group-tab:: Yum


    .. include:: ../../../../../_templates/installations/basic/elastic/yum/disabling_repositories.rst



  .. group-tab:: APT


    .. include:: ../../../../../_templates/installations/basic/elastic/deb/disabling_repositories.rst



  .. group-tab:: ZYpp


    .. include:: ../../../../../_templates/installations/basic/elastic/zypp/disabling_repositories.rst



Next steps
~~~~~~~~~~

Once the Wazuh - Elastic Stack environment is ready, a Wazuh agent can be installed in every endpoint to be monitored. The Wazuh installation guide is available for most operating systems and it can be found :ref:`here<installation_agents>`.
