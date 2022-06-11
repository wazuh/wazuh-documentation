.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Kibana is a flexible and intuitive web interface for mining and visualizing the events and archives stored in Elasticsearch. Learn more about it here. 

.. _basic_kibana:


Kibana
======

Kibana is a flexible and intuitive web interface for mining and visualizing the events and archives stored in Elasticsearch.


.. note:: Root user privileges are required to run all the commands described below.

Prerequisites
~~~~~~~~~~~~~

Some extra packages are needed for the installation, such as ``curl`` or ``unzip``, that will be used in further steps: 

.. include:: /_templates/installations/basic/before_installation_elastic.rst


Adding the Elastic Stack repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. tabs::

  .. group-tab:: Yum


    .. include:: /_templates/installations/basic/elastic/yum/add_repository.rst



  .. group-tab:: APT - Debian 10.x (Buster) / Ubuntu 18.04 (Bionic Beaver) or earlier


    .. include:: /_templates/installations/basic/elastic/deb/add_repository/10.rst



Kibana installation and configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Install the Kibana package:

    .. tabs::

        .. group-tab:: Yum


            .. include:: /_templates/installations/basic/elastic/yum/install_kibana.rst



        .. group-tab:: APT


            .. include:: /_templates/installations/basic/elastic/deb/install_kibana.rst



#. The next step is the certificate placement, this guide assumes that a copy of ``certs.zip`` is placed in the root home folder (~/):

    .. include:: /_templates/installations/basic/elastic/common/deploy_kibana_certificate.rst


#. Download the Kibana configuration file:

   .. Note::

     Starting Elasticsearch 7.11.0, a DNS name must be specified in the ``elasticsearch.hosts`` field since IP addresses are no longer allowed. 

   .. include:: /_templates/installations/basic/elastic/common/configure_kibana.rst


#. Create the ``/usr/share/kibana/data`` directory:

    .. code-block:: console
    
      # mkdir /usr/share/kibana/data
      # chown -R kibana:kibana /usr/share/kibana  


#. Install the Wazuh Kibana plugin:

    The installation of the plugin must be done from the Kibana home directory.

    .. code-block:: console

        # cd /usr/share/kibana
        # sudo -u kibana /usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/4.x/ui/kibana/wazuh_kibana-|WAZUH_CURRENT|_|ELASTICSEARCH_ELK_LATEST|-1.zip

#. Link Kibana's socket to privileged port 443:

    .. code-block:: console

      # setcap 'cap_net_bind_service=+ep' /usr/share/kibana/node/bin/node

#. Enable and start the Kibana service:

    .. include:: /_templates/installations/basic/elastic/common/enable_kibana.rst


#. Access the web interface using the password generated during the Elasticsearch installation process: 

  .. code-block:: none

      URL: https://<kibana_ip>
      user: elastic
      password: <PASSWORD_elastic>


  Upon the first access to Kibana, the browser shows a warning message stating that the certificate was not issued by a trusted authority. An exception can be added in the advanced options of the web browser or,  for increased security, the ``root-ca.pem`` file previously generated can be imported to the certificate manager of the browser.  Alternatively, a certificate from a trusted authority can be configured.

With the first access attempt, the Wazuh Kibana plugin may prompt a message that indicates that it cannot communicate with the Wazuh API. To solve this issue, edit the file ``/usr/share/kibana/data/wazuh/config/wazuh.yml`` and replace the ``url`` with the Wazuh server's address: 

.. code-block:: yaml

  hosts:
    - default:
       url: https://localhost
       port: 55000
       username: wazuh-wui
       password: wazuh-wui
       run_as: false


Disabling repositories
~~~~~~~~~~~~~~~~~~~~~~

.. include:: /_templates/installations/basic/elastic/common/disabling_repositories_explanation.rst


.. tabs::

  .. group-tab:: Yum


    .. include:: /_templates/installations/basic/elastic/yum/disabling_repositories.rst



  .. group-tab:: APT


    .. include:: /_templates/installations/basic/elastic/deb/disabling_repositories.rst



To uninstall Kibana, visit the :ref:`uninstalling section <basic_uninstall_kibana>`.

Next steps
~~~~~~~~~~

Once the Wazuh - Elastic Stack environment is ready, a Wazuh agent can be installed on every endpoint to be monitored. The :doc:`Wazuh agent installation guide </installation-guide/wazuh-agent/index>` is available for most operating systems.
