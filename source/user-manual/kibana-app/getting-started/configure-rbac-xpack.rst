.. _configure_rbac_xpack:

Configure RBAC with X-Pack
==========================

Since X-Pack provides us the capabilities of RBAC (role base access control) we can use it to manage Kibana on the right way.
The default X-Pack configuration uses the **elastic** user to make all. This is not the right way on a production environment.

.. warning:: The **elastic** user is a superuser so it's better to create users with the right roles.

Preparation
------------

.. note:: Follow the official Elastic guide https://www.elastic.co/downloads/x-pack for a more in deep explanation.

On a default installation you could follow the next steps to prepare the environment:

1. Install X-Pack plugin for Elasticsearch:

  .. code-block:: console

    # /usr/share/elasticsearch/bin/elasticsearch-plugin install x-pack


2. Restart Elasticsearch:

  .. code-block:: console

    # systemctl restart elasticsearch

It's important to wait until the Elasticsearch server finishes starting. Check the current status with the following command, which should give you a response like the shown below:

.. code-block:: console

  # curl localhost:9200/?pretty -u elastic:elastic_password

  {
    "name" : "5urh-FJ",
    "cluster_name" : "elasticsearch",
    "cluster_uuid" : "B5rXKBg2Tr-KWwFdbDHJQg",
    "version" : {
      "number" : "6.2.3",
      "build_hash" : "7299dc3",
      "build_date" : "2018-02-07T19:34:26.990113Z",
      "build_snapshot" : false,
      "lucene_version" : "7.2.1",
      "minimum_wire_compatibility_version" : "5.6.0",
      "minimum_index_compatibility_version" : "5.0.0"
    },
    "tagline" : "You Know, for Search"
  }


3. Generate the credentials and note down them:

  .. code-block:: console

    # /usr/share/elasticsearch/bin/x-pack/setup-passwords auto


4. Install X-Pack plugin for Kibana:

  .. code-block:: console

    # /usr/share/kibana/bin/kibana-plugin install x-pack


5. Set temporary the `elastic` user for Kibana, edit /etc/kibana/kibana.yml as follow:

  .. code-block:: console

    elasticsearch.username: "elastic"
    elasticsearch.password: "elastic_password_from_step3"


6. Restart Kibana

  .. code-block:: console

    # systemctl restart kibana


7. Login the Kibana UI using the `elastic` user too.

Kibana system user
------------------

We need to create a user to be used by Kibana to connect to Elasticsearch. It also will start the whole plugins installed along X-Pack plugin. Finally it will fetch data related to Wazuh from Elasticsearch and it will write data to Elasticsearch as well.

.. note:: This user will use two roles: **wazuh-admin** and the pre-built role named **kibana_system**. The **wazuh-admin** role will be used to handle data related to Wazuh and the **kibana_system** role will be used by Kibana itself.

1. Defining the wazuh-admin role

    a) At cluster level, it will need the following privileges:

    +------------------------------------------------------------------------+-------------------------------------------------------------+
    |Cluster privileges                                                      | Check                                                       |
    +========================================================================+=============================================================+
    |manage                                                                  | **Yes**                                                     |
    +------------------------------------------------------------------------+-------------------------------------------------------------+
    |manage_index_templates                                                  | **Yes**                                                     |
    +------------------------------------------------------------------------+-------------------------------------------------------------+


    b) At index level, it will need the following privileges:

    +------------------------------------------------------------------------+-------------------------------------------------------------+
    |Indices                                                                 | Privileges                                                  |
    +========================================================================+=============================================================+
    |.old-wazuh                                                              | **all**                                                     |
    +------------------------------------------------------------------------+-------------------------------------------------------------+
    |.wazuh                                                                  | **all**                                                     |
    +------------------------------------------------------------------------+-------------------------------------------------------------+
    |.wazuh-version                                                          | **all**                                                     |
    +------------------------------------------------------------------------+-------------------------------------------------------------+
    |wazuh-*                                                                 | **all**                                                     |
    +------------------------------------------------------------------------+-------------------------------------------------------------+

Wazuh admin user
----------------------

We need a new user who will be able to login through the Kibana UI and add/delete Wazuh API entries too.

.. note:: This user will use two roles: **wazuh-basic** and **wazuh-api-admin**. The **wazuh-admin** role will be used to handle data related to Wazuh and the **wazuh-api-admin** role will be used to add/delete Wazuh API entries.

1. Defining the wazuh-basic role:

    a) At cluster level, it won't need any privileges. At index level, it will need the following privileges:

    +------------------------------------------------------------------------+-------------------------------------------------------------+
    |Indices                                                                 | Privileges                                                  |
    +========================================================================+=============================================================+
    |.kibana                                                                 | **read**                                                    |
    +------------------------------------------------------------------------+-------------------------------------------------------------+
    |.wazuh                                                                  | **read**                                                    |
    +------------------------------------------------------------------------+-------------------------------------------------------------+
    |.wazuh-version                                                          | **read**                                                    |
    +------------------------------------------------------------------------+-------------------------------------------------------------+
    |wazuh-alerts-3.x-*                                                      | **read**                                                    |
    +------------------------------------------------------------------------+-------------------------------------------------------------+
    |wazuh-monitoring-3.x-*                                                  | **read**                                                    |
    +------------------------------------------------------------------------+-------------------------------------------------------------+

2. Defining the wazuh-api-admin role:

    a) At cluster level, it won't need any privileges. At index level, it will need the following privileges:

    +------------------------------------------------------------------------+-------------------------------------------------------------+
    |Indices                                                                 | Privileges                                                  |
    +========================================================================+=============================================================+
    |.wazuh                                                                  | **all**                                                     |
    +------------------------------------------------------------------------+-------------------------------------------------------------+

Wazuh standard user
--------------------

Finally we need one or more users who will be able to login through the Kibana UI with read privileges only. This user only needs
to use the wazuh-basic role.

How your environment should looks like?
---------------------------------------

Take a look at the following table, it should looks like your environment:

+------------------------------------------------------------------------+-------------------------------------------------------------+
|User                                                                    | Roles                                                       |
+========================================================================+=============================================================+
|Kibana system user                                                      | **wazuh-admin**, **kibana_system**                          |
+------------------------------------------------------------------------+-------------------------------------------------------------+
|Wazuh admin user                                                        | **wazuh-basic**, **wazuh-api-admin**                        |
+------------------------------------------------------------------------+-------------------------------------------------------------+
|Wazuh standard user #1, Wazuh standard user #2...                       | **wazuh-basic**                                             |
+------------------------------------------------------------------------+-------------------------------------------------------------+

How to configure through Kibana with the `elastic` user
-------------------------------------------------------

1. Login on Kibana using the `elastic` user:

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


How to configure using the command line
----------------------------------------

.. note:: Before configure the roles and users you must to install X-Pack.

1. Creating the **wazuh-admin** role:

  .. code-block:: console

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

  .. code-block:: console

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

  .. code-block:: console

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

  .. code-block:: console

    # curl -XPOST "http://localhost:9200/_xpack/security/user/wazuhsystem" -H 'Content-Type: application/json' -d'
    {
      "password": "wazuhsystem",
      "roles":["wazuh-admin","kibana_system"],
      "full_name":"Wazuh System",
      "email":"wazuhsystem@wazuh.com"
    }' -u elastic:elastic_password

    {"user":{"created":true}}


5. Creating the Wazuh admin user:

  .. code-block:: console

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

  .. code-block:: console

    # curl -XPOST "http://localhost:9200/_xpack/security/user/john" -H 'Content-Type: application/json' -d'
    {
      "password": "johnjohn",
      "roles":["wazuh-basic"],
      "full_name":"John",
      "email":"john@wazuh.com"
    }' -u elastic:elastic_password

    {"user":{"created":true}}


7. Set the right user on `kibana.yml` file:

  .. code-block:: console

    # vi /etc/kibana/kibana.yml

    elasticsearch.username: "wazuhsystem"
    elasticsearch.password: "wazuhsystem"


8. Restart Kibana:

  .. code-block:: console

    # systemctl restart kibana



Troubles with the "Welcome to X-Pack!" banner
----------------------------------------------

After follow every step on this tutorial, I've logged in through the Kibana UI with a Wazuh standard
user and I can see this banner:

.. thumbnail:: ../../../images/kibana-app/rbac-xpack/xpack12.png
    :title: xPackMonitoring.showBanner 1
    :align: center
    :width: 100%

If I click on the `Dismiss` button it throws an error:

.. thumbnail:: ../../../images/kibana-app/rbac-xpack/xpack13.png
    :title: xPackMonitoring.showBanner 2
    :align: center
    :width: 100%

What's happening? The user Jack has no privileges to modify the `.kibana` index and it's fine. We need to login
with a higher privileges user to click on the `Dismiss` button like we did to add a Wazuh Api. We can use the Wazuh admin user
to do it or use the `elastic` user and go to Management > Kibana > Advanced settings as follow:

.. thumbnail:: ../../../images/kibana-app/rbac-xpack/xpack10.png
    :title: xPackMonitoring.showBanner 3
    :align: center
    :width: 100%

You should see a list with many options, disable the xPackMonitoring.showBanner option as follow:

.. thumbnail:: ../../../images/kibana-app/rbac-xpack/xpack11.png
    :title: xPackMonitoring.showBanner 4
    :align: center
    :width: 100%

Need different index pattern
-----------------------------

If you have a different environment with indices such `psg-alerts-*` the above tutorial won't work at all for you.
Create a new role named `psg-user` for your standard user who is going to use these indices, that new role ables your user to fetch
data from these indices:

  .. code-block:: console

      # curl -XPOST "http://localhost:9200/_xpack/security/role/psg-user" -H 'Content-Type: application/json' -d'
      {
      "cluster": [],
      "indices": [
        {
          "names": [ "psg-alerts-*" ],
          "privileges": ["read"]
        }
      ]
      }' -u elastic:elastic_password

      {"role":{"created":true}}


Now assign it to your desired user(s) as follow:

  .. code-block:: console

    # curl -XPUT "http://localhost:9200/_xpack/security/user/john" -H 'Content-Type: application/json' -d'
    {
      "password": "johnjohn",
      "roles":["wazuh-basic","psg-user"],
      "full_name":"John",
      "email":"john@wazuh.com"
    }' -u elastic:elastic_password

    {"user":{"created":false}} // If the user did exist previously


What's happening with the index pattern selector?
--------------------------------------------------

Since our last Wazuh App package, the index pattern list is calculated from the server and it's filtered
depending on the user role. It means the user can only select the index pattern(s) who it's able to see.

If the list for the user is empty, it can't navigate through the Wazuh App and it will see a message saying
it has no privileges to see anything on the Wazuh App.

.. thumbnail:: ../../../images/kibana-app/rbac-xpack/xpack14.png
    :title: Index pattern selector
    :align: center
    :width: 100%
