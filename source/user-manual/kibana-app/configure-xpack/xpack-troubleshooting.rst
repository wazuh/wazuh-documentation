.. Copyright (C) 2018 Wazuh, Inc.

.. _xpack_troubleshooting:

X-Pack troubleshooting
======================

**"After login into Kibana as a standard user and clicking an option on the "Help us improve the Elastic Stack" banner, I get an error message"**

The "Help us improve the Elastic Stack" banner appears the first time you open Kibana.

.. image:: ../../../images/kibana-app/configure-xpack/xpack-troubleshooting/xpack12.png
  :align: center
  :width: 100%

And it throws an error when you try to choose an option when logged in as a standard user:

.. image:: ../../../images/kibana-app/configure-xpack/xpack-troubleshooting/xpack13.png
  :align: center
  :width: 100%

It happens because the logged in user has no privileges to modify the ``.kibana`` index.

You have to log in with an user with higher privileges to close it. We can use the Wazuh admin user to do it or use the ``elastic`` user and go to *Management > Kibana > Advanced settings* as follow:

.. image:: ../../../images/kibana-app/configure-xpack/xpack-troubleshooting/xpack10.png
  :align: center
  :width: 100%

You should see a list with many options, disable the xPackMonitoring.showBanner option as follow:

.. image:: ../../../images/kibana-app/configure-xpack/xpack-troubleshooting/xpack11.png
  :align: center
  :width: 100%

**"How can I use a different index pattern?"**

If you are indexing data with a different index pattern, for example ``my-alerts-*`` you need a different role with access to that new pattern:

  .. code-block:: none

      # curl -XPOST "http://localhost:9200/_xpack/security/role/my-user" -H 'Content-Type: application/json' -d'
      {
      "cluster": [],
      "indices": [
        {
          "names": [ "my-alerts-*" ],
          "privileges": ["read"]
        }
      ]
      }' -u elastic:elastic_password

      {"role":{"created":true}}


Now assign it to your desired user(s):

  .. code-block:: none

    # curl -XPUT "http://localhost:9200/_xpack/security/user/john" -H 'Content-Type: application/json' -d'
    {
      "password": "johnjohn",
      "roles":["wazuh-basic","my-user"],
      "full_name":"John",
      "email":"john@wazuh.com"
    }' -u elastic:elastic_password

    {"user":{"created":false}} // If the user did exist previously

**"I have issues when using the index pattern selector"**

The index pattern list is calculated from the server and it's filtered depending on the user role. It means the user can only select the index patterns it has access to.

If the user can't access to any pattern, the app will display the following screen:

.. image:: ../../../images/kibana-app/configure-xpack/xpack-troubleshooting/xpack14.png
  :align: center
  :width: 50%
