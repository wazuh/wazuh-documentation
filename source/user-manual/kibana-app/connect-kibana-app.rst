.. Copyright (C) 2020 Wazuh, Inc.

.. _connect_kibana_app:

Setting up the Wazuh Kibana plugin
==================================

During the installation process new users and roles were added, this section aims to guide the user on how to assign each user their respective roles. 

If you want to learn more about the Wazuh Kibana plugin capabilities, go to the :ref:`kibana_features` section.

First step, map the admin user to the admin role. Go to the Wazuh Kibana plugin menu and select Security > Roles mapping. 

.. thumbnail:: ../../images/kibana-app/wazuh_security.png
    :align: center

Select create a new mapping. 

.. thumbnail:: ../../images/kibana-app/wazuh_create_new_mapping.png
    :align: center

Choose a name for this new role mapping, for example, opendistro_wazuh_admin, select the administrator role and assign it to your admin user. 

.. thumbnail:: ../../images/kibana-app/wazuh_map_admin.png
    :align: center


Second step, enable run_as. 

Edit the file ``/usr/share/kibana/optimize/wazuh/config/wazuh.yml`` and set run_as as true. This option allows each user to use its authentication context.  

.. code-block:: console

  hosts:
    - default:
       url: https://localhost
       port: 55000
       username: wazuh
       password: wazuh
       run_as: true


Restart Kibana. Clear your browser cache and cookies. 


To create a new Open Distro user, go to the top left corner menu and select Security. 

.. thumbnail:: ../../images/kibana-app/open_distro_security.png
    :align: center

Select internal users.     

.. thumbnail:: ../../images/kibana-app/open_distro_internal_users.png
    :align: center

Select Create internal user. 

.. thumbnail:: ../../images/kibana-app/open_distro_new_user.png
    :align: center

Choose a name and a password for your new user. 

.. thumbnail:: ../../images/kibana-app/open_distro_read_only_user.png
    :align: center

Go back to the Security menu and select Roles > Create new role. Select a name, for example, read_only_role, cluster permission for example cluster_composite_ops_ro. Select the index pattern that this role will give access to, for example, wazuh* and the corresponding index permission, for example, read.     

.. thumbnail:: ../../images/kibana-app/open_distro_create_role.png
    :align: center

Once the role is created select Mapped users and Map users. 

.. thumbnail:: ../../images/kibana-app/open_distro_map_role.png
    :align: center

Select our recently created user, read_only_user, and map it to this role. 

.. thumbnail:: ../../images/kibana-app/open_distro_map_user.png
    :align: center

Go back to Roles. Select kibana_user and map it to read_only_user. 

.. thumbnail:: ../../images/kibana-app/map_kibana_user.png
    :align: center


Go back to the Wazuh Kibana plugin menu and select Security > Roles mapping. 

.. thumbnail:: ../../images/kibana-app/wazuh_security.png
    :align: center

Select Create Role mapping. 

.. thumbnail:: ../../images/kibana-app/wazuh_new_role_mapping.png
    :align: center

Assign the readonly role to this read_only_user. 

.. thumbnail:: ../../images/kibana-app/wazuh_map_read_only.png
    :align: center
