.. Copyright (C) 2018 Wazuh, Inc.

.. _configure_xpack_users:

Configure X-Pack users
======================

Using Kibana UI with the `elastic` user
---------------------------------------

1. Login into Kibana using the `elastic` user:

  .. thumbnail:: ../../../images/kibana-app/rbac-xpack/xpack01.png
      :title: Configure through Kibana 1
      :align: center
      :width: 40%

2. Go to Management > Security > Roles:

  .. thumbnail:: ../../../images/kibana-app/rbac-xpack/xpack02.png
      :title: Configure through Kibana 2
      :align: center
      :width: 100%

3. Creating the **wazuh-admin** role:

  .. thumbnail:: ../../../images/kibana-app/rbac-xpack/xpack03.png
      :title: Configure through Kibana 3
      :align: center
      :width: 100%

4. Creating the **wazuh-basic** role:

  .. thumbnail:: ../../../images/kibana-app/rbac-xpack/xpack04.png
      :title: Configure through Kibana 4
      :align: center
      :width: 100%

5. Creating the **wazuh-api-admin** role:

  .. thumbnail:: ../../../images/kibana-app/rbac-xpack/xpack05.png
      :title: Configure through Kibana 5
      :align: center
      :width: 100%

6. Go to Management > Security > Users:

  .. thumbnail:: ../../../images/kibana-app/rbac-xpack/xpack06.png
      :title: Configure through Kibana 6
      :align: center
      :width: 100%

7. Creating the Wazuh admin user:

  .. thumbnail:: ../../../images/kibana-app/rbac-xpack/xpack07.png
      :title: Configure through Kibana 7
      :align: center
      :width: 100%

8. Creating a standard user:

  .. note:: This user is not able to add/remove/edit a Wazuh API, use the Wazuh admin user instead (step 7).

  .. thumbnail:: ../../../images/kibana-app/rbac-xpack/xpack08.png
      :title: Configure through Kibana 8
      :align: center
      :width: 100%

9. Creating the Kibana system user:

  .. note:: Ensure the password is enough strong, it will be the superuser for your environment.

  .. thumbnail:: ../../../images/kibana-app/rbac-xpack/xpack09.png
      :title: Configure through Kibana 9
      :align: center
      :width: 100%

10. Set the right user on `kibana.yml` file:

  .. code-block:: console

    # vi /etc/kibana/kibana.yml

    elasticsearch.username: "wazuhsystem"
    elasticsearch.password: "wazuhsystem"


11. Restart Kibana:

  .. code-block:: console

    # systemctl restart kibana


Using CLI
---------

.. note:: Before configure the roles and users you must to install X-Pack.

1. Creating the **wazuh-admin** role:

  .. code-block:: none

    # curl -XPOST "http://localhost:9200/_xpack/security/role/wazuh-admin" -H 'Content-Type: application/json' -d'
    {
      "cluster": [ "manage", "manage_index_templates" ],
      "indices": [
        {
          "names": [ ".old-wazuh", ".wazuh", ".wazuh-version", "wazuh-*" ],
          "privileges": ["all"]
        }
      ]
    }' -u elastic:elastic_password

    {"role":{"created":true}}


2. Creating the **wazuh-basic** role:

  .. code-block:: none

    # curl -XPOST "http://localhost:9200/_xpack/security/role/wazuh-basic" -H 'Content-Type: application/json' -d'
    {
      "cluster": [],
      "indices": [
        {
          "names": [ ".kibana", ".wazuh", ".wazuh-version", "wazuh-alerts-3.x-*", "wazuh-monitoring-3.x-*" ],
          "privileges": ["read"]
        }
      ]
    }' -u elastic:elastic_password

    {"role":{"created":true}}


3. Creating the **wazuh-api-admin** role:

  .. code-block:: none

    # curl -XPOST "http://localhost:9200/_xpack/security/role/wazuh-api-admin" -H 'Content-Type: application/json' -d'
    {
      "cluster": [],
      "indices": [
        {
          "names": [ ".wazuh" ],
          "privileges": ["all"]
        }
      ]
    }' -u elastic:elastic_password

    {"role":{"created":true}}


4. Creating the Kibana system user:

  .. note:: Ensure the password is enough strong, it will be the superuser for your environment.

  .. code-block:: none

    # curl -XPOST "http://localhost:9200/_xpack/security/user/wazuhsystem" -H 'Content-Type: application/json' -d'
    {
      "password": "wazuhsystem",
      "roles":["wazuh-admin","kibana_system"],
      "full_name":"Wazuh System",
      "email":"wazuhsystem@wazuh.com"
    }' -u elastic:elastic_password

    {"user":{"created":true}}


5. Creating the Wazuh admin user:

  .. code-block:: none

    # curl -XPOST "http://localhost:9200/_xpack/security/user/jack" -H 'Content-Type: application/json' -d'
    {
      "password": "jackjack",
      "roles":["wazuh-basic","wazuh-api-admin"],
      "full_name":"Jack",
      "email":"jack@wazuh.com"
    }' -u elastic:elastic_password

    {"user":{"created":true}}


6. Creating a standard user:

  .. note:: This user is not able to add/remove/edit a Wazuh API, use the Wazuh admin user instead (step 5).

  .. code-block:: none

    # curl -XPOST "http://localhost:9200/_xpack/security/user/john" -H 'Content-Type: application/json' -d'
    {
      "password": "johnjohn",
      "roles":["wazuh-basic"],
      "full_name":"John",
      "email":"john@wazuh.com"
    }' -u elastic:elastic_password

    {"user":{"created":true}}


7. Set the right user on `kibana.yml` file:

  .. code-block:: none

    # vi /etc/kibana/kibana.yml

    elasticsearch.username: "wazuhsystem"
    elasticsearch.password: "wazuhsystem"


8. Restart Kibana:

  .. code-block:: console

    # systemctl restart kibana
