.. Copyright (C) 2020 Wazuh, Inc.

.. meta:: :description: Learn how to install Elastic Stack for using Wazuh on Debian

.. _basic_kibana:


Kibana
======

Kibana is a flexible and intuitive web interface for mining and visualizing the events and archives stored in Elasticsearch. 

This section will explain how to install Kibana step-by-step. Alternatively, if you wish to do this installation in an automated way, you can find the instructions :ref:`here <basic_unattended_distributed_elasticsearch>`.

.. note:: Root user privileges are required to run all the commands described below.

Prerequisites
~~~~~~~~~~~~~

.. include:: ../../../_templates/installations/basic/before_installation_elastic.rst


Adding the Elastic Stack repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. tabs::

  .. group-tab:: Yum


    .. include:: ../../../_templates/installations/basic/elastic/yum/add_repository.rst



  .. group-tab:: APT


    .. include:: ../../../_templates/installations/basic/elastic/deb/add_repository.rst



  .. group-tab:: ZYpp


    .. include:: ../../../_templates/installations/basic/elastic/zypp/add_repository.rst



Kibana installation and configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Install the Kibana package:

    .. tabs::

        .. group-tab:: Yum


            .. include:: ../../../_templates/installations/basic/elastic/yum/install_kibana.rst



        .. group-tab:: APT


            .. include:: ../../../_templates/installations/basic/elastic/deb/install_kibana.rst



        .. group-tab:: ZYpp


            .. include:: ../../../_templates/installations/basic/elastic/zypp/install_kibana.rst


#. The next step is the certificate placement, this guide assumes that a copy of ``certs.zip`` is placed in the root home folder (~/):

    .. include:: ../../../_templates/installations/basic/elastic/common/deploy_kibana_certificate.rst


#. Download the Kibana configuration file:

    .. include:: ../../../_templates/installations/basic/elastic/common/configure_kibana.rst


#. Update the ``optimize`` and ``plugins`` directories permissions:

    .. code-block:: console
    
      # chown -R kibana:kibana /usr/share/kibana/optimize
      # chown -R kibana:kibana /usr/share/kibana/plugins    


#. Install the Wazuh Kibana plugin:

    The installation of the plugin must be done from the Kibana home directory.

    .. code-block:: console

        # cd /usr/share/kibana
        # sudo -u kibana /usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/4.x/ui/kibana/wazuh_kibana-4.0.3_7.9.3-1.zip

#. Link Kibana's socket to privileged port 443:

    .. code-block:: console

      # setcap 'cap_net_bind_service=+ep' /usr/share/kibana/node/bin/node

#. Enable and start the Kibana service:

    .. include:: ../../../_templates/installations/basic/elastic/common/enable_kibana.rst


#. Access the web interface using the password generated during the Elasticsearch installation process: 

  .. code-block:: none

      URL: https://<kibana_ip>
      user: elastic
      password: <PASSWORD_elastic>


  Upon the first access to Kibana, the browser shows a warning message stating that the certificate was not issued by a trusted authority. An exception can be added in the advanced options of the web browser or,  for increased security, the ``root-ca.pem`` file previously generated can be imported to the certificate manager of the browser.  Alternatively, a certificate from a trusted authority can be configured.

With the first access attempt, the Wazuh Kibana plugin may prompt a message that indicates that it cannot communicate with the Wazuh API. To solve this issue edit the file ``/usr/share/kibana/optimize/wazuh/config/wazuh.yml`` and replace the ``url`` with the Wazuh server's address: 

.. code-block:: yaml

  hosts:
    - default:
       url: https://localhost
       port: 55000
       username: wazuh
       password: wazuh


Disabling repositories
~~~~~~~~~~~~~~~~~~~~~~

.. include:: ../../../_templates/installations/basic/elastic/common/disabling_repositories_explanation.rst


.. tabs::

  .. group-tab:: Yum


    .. include:: ../../../_templates/installations/basic/elastic/yum/disabling_repositories.rst



  .. group-tab:: APT


    .. include:: ../../../_templates/installations/basic/elastic/deb/disabling_repositories.rst



  .. group-tab:: ZYpp


    .. include:: ../../../_templates/installations/basic/elastic/zypp/disabling_repositories.rst




Next steps
~~~~~~~~~~

Once the Wazuh - Elastic Stack environment is ready, a Wazuh agent can be installed in every endpoint to be monitored. The Wazuh installation guide is available for most operating systems and it can be found :ref:`here<installation_agents>`.


Uninstall Kibana
~~~~~~~~~~~~~~~~


In case you need to uninstall Kibana follow the instructions below:


.. tabs::


  .. group-tab:: Yum


    .. include:: ../../../_templates/installations/basic/elastic/yum/uninstall_kibana.rst



  .. group-tab:: APT


    .. include:: ../../../_templates/installations/basic/elastic/deb/uninstall_kibana.rst



  .. group-tab:: ZYpp


    .. include:: ../../../_templates/installations/basic/elastic/zypp/uninstall_kibana.rst