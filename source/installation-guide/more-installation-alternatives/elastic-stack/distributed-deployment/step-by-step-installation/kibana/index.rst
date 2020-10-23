.. Copyright (C) 2020 Wazuh, Inc.

.. meta:: :description: Learn how to install Elastic Stack for using Wazuh on Debian

.. _basic_kibana:


Kibana
======

Kibana is a flexible and intuitive web interface for mining and visualizing the events and archives stored in Elasticsearch.


.. note:: Root user privileges are required to run all the commands described below.

Adding the Elastic Stack repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. tabs::

  .. group-tab:: Yum


    .. include:: ../../../../../../_templates/installations/basic/elastic/yum/add_repository.rst



  .. group-tab:: APT


    .. include:: ../../../../../../_templates/installations/basic/elastic/deb/add_repository.rst



  .. group-tab:: ZYpp


    .. include:: ../../../../../../_templates/installations/basic/elastic/zypp/add_repository.rst



Kibana installation and configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Install the Kibana package:

    .. tabs::

        .. group-tab:: Yum


            .. include:: ../../../../../../_templates/installations/basic/elastic/yum/install_kibana.rst



        .. group-tab:: APT


            .. include:: ../../../../../../_templates/installations/basic/elastic/deb/install_kibana.rst



        .. group-tab:: ZYpp


            .. include:: ../../../../../../_templates/installations/basic/elastic/zypp/install_kibana.rst


#. The next step is the certificate placement, this guide assumes that a copy of ``certs.zip`` is placed in the root home folder (~/):

    .. include:: ../../../../../../_templates/installations/basic/elastic/common/deploy_kibana_certificate.rst


#. Download the Kibana configuration file:

    .. include:: ../../../../../../_templates/installations/basic/elastic/common/configure_kibana.rst


#. Update the ``optimize`` and ``plugins`` directories permissions:

    .. code-block:: console
    
      # chown -R kibana:kibana /usr/share/kibana/optimize
      # chown -R kibana:kibana /usr/share/kibana/plugins    


#. Install the Wazuh Kibana plugin:

    The installation of the plugin must be done from the Kibana home directory.

    .. code-block:: console

        # cd /usr/share/kibana
        # sudo -u kibana /usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/4.x/ui/kibana/wazuh_kibana-4.0.0_7.9.2-1.zip

#. Link Kibana's socket to privileged port 443:

    .. code-block:: console

      # setcap 'cap_net_bind_service=+ep' /usr/share/kibana/node/bin/node

#. Enable and start the Kibana service:

    .. include:: ../../../../../../_templates/installations/basic/elastic/common/enable_kibana.rst

Upon the first access to Kibana, the browser shows a warning message stating that the certificate was not issued by a trusted authority. An exception can be added in the advanced options of the web browser or,  for increased security, the ``root-ca.pem`` file previously generated can be imported to the certificate manager of the browser.  Alternatively, a certificate from a trusted authority can be configured.

.. note:: The Kibana service listens to the default port ``443``. The browser address is: ``https://<kibana_ip>`` replacing ``<kibana_ip>`` with the corresponding Kibana server's IP. The default user is ``elastic`` and the password is the one generated previously.

With the first access attempt, the Wazuh Kibana plugin may prompt a message that indicates that it cannot communicate with the Wazuh API. To solve this issue edit the file ``/usr/share/kibana/optimize/wazuh/config/wazuh.yml`` and replace the ``url`` by the Wazuh server's address: 

.. code-block:: yaml

  hosts:
    - default:
       url: https://localhost
       port: 55000
       user: wazuh-wui
       password: wazuh-wui


Disabling repositories
~~~~~~~~~~~~~~~~~~~~~~

.. include:: ../../../../../../_templates/installations/basic/elastic/common/disabling_repositories_explanation.rst


.. tabs::

  .. group-tab:: Yum


    .. include:: ../../../../../../_templates/installations/basic/elastic/yum/disabling_repositories.rst



  .. group-tab:: APT


    .. include:: ../../../../../../_templates/installations/basic/elastic/deb/disabling_repositories.rst



  .. group-tab:: ZYpp


    .. include:: ../../../../../../_templates/installations/basic/elastic/zypp/disabling_repositories.rst



To uninstall Kibana, visit the :ref:`uninstalling section <basic_uninstall_kibana>`.

Next steps
~~~~~~~~~~

Once the Wazuh - Elastic Stack environment is ready, a Wazuh agent can be installed in every endpoint to be monitored. The Wazuh installation guide is available for most operating systems and it can be found :ref:`here<installation_agents>`.
