.. Copyright (C) 2021 Wazuh, Inc.
.. meta::
  :description: Learn more about how to set up the Wazuh Kibana plugin and how to assign each user their respective roles after the Wazuh installation process.
  
.. _connect_kibana_app:

Setting up the Wazuh Kibana plugin
==================================

During the installation process new users and roles were added, this section aims to guide the user on how to assign each user their respective roles. 

If you want to learn more about the Wazuh Kibana plugin capabilities, go to the :ref:`kibana_features` section.

First, open the Wazuh Kibana plugin menu and select ``Security`` option followed by ``Users``.

        .. thumbnail:: ../../images/kibana-app/security_users.png
            :align: center


Select the ``wazuh_admin`` user:

        .. thumbnail:: ../../images/kibana-app/wazuh_admin.png
            :align: center
 

Assign the ``administrator`` role to this user: 

        .. thumbnail:: ../../images/kibana-app/administrator_role.png
            :align: center


Analogously, select ``wazuh_user`` and assign the ``readonly`` mode: 

        .. thumbnail:: ../../images/kibana-app/readonly_role.png
            :align: center
    
