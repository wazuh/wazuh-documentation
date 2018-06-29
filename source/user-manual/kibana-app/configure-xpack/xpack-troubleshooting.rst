.. _xpack_troubleshooting:

Troubleshooting
===============

"Welcome to X-Pack!" banner
---------------------------

After loging into Kibana UI I click `Dismiss` in the banner:
After follow every step on this tutorial, I've logged in through the Kibana UI with a Wazuh standard
user and I can see this banner:

.. thumbnail:: ../../../images/kibana-app/rbac-xpack/xpack12.png
    :title: xPackMonitoring.showBanner 1
    :align: center
    :width: 100%

And it throws an error:

.. thumbnail:: ../../../images/kibana-app/rbac-xpack/xpack13.png
    :title: xPackMonitoring.showBanner 2
    :align: center
    :width: 100%

It happens because Jack has no privileges to modify the `.kibana` index.

We need to login with another user with higher privileges to dismiss it. We can use the Wazuh admin user to do it or use the `elastic` user and go to Management > Kibana > Advanced settings as follow:

.. thumbnail:: ../../../images/kibana-app/rbac-xpack/xpack10.png
    :title: xPackMonitoring.showBanner 3
    :align: center
    :width: 100%

You should see a list with many options, disable the xPackMonitoring.showBanner option as follow:

.. thumbnail:: ../../../images/kibana-app/rbac-xpack/xpack11.png
    :title: xPackMonitoring.showBanner 4
    :align: center
    :width: 100%

Using a different index pattern
-------------------------------

If you are indexing data with a different partern, for example `my-alerts-*` you need a different role with access to that new pattern:

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


Index pattern selector issues
-----------------------------

The index pattern list is calculated from the server and it's filtered depending on the user role. It means the user can only select the index patterns it has access to.

If the user can't access to any pattern, the app will display the following screen:

.. thumbnail:: ../../../images/kibana-app/rbac-xpack/xpack14.png
    :title: Index pattern selector
    :align: center
    :width: 100%
