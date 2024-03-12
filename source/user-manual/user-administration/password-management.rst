.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn how to use the Wazuh passwords tool to manage your passwords and secure your Wazuh installation.

Password management
===================

.. note::

   If you deployed Wazuh on Docker, read :ref:`change-pwd-existing-usr` for specific instructions.

Learn how to use the Wazuh passwords tool to manage your passwords. This tool allows you to change the passwords of both the :doc:`Wazuh indexer </getting-started/components/wazuh-indexer>` users, also known as internal users, and the :doc:`Wazuh manager API </user-manual/api/index>`  users.

Among the Wazuh indexer users, it is worth mentioning the following:

- *admin*: is the default administrator user. It's used to log in to the web interface and for communications between Filebeat and the Wazuh indexer. If you change the *admin* password, you must update it in Filebeat and the Wazuh server.

- *kibanaserver*: is used for communications between the Wazuh dashboard and the Wazuh indexer. If you change the *kibanaserver* password, you must update it in the Wazuh dashboard.

On the other hand, the Wazuh manager API has two default users:

- *wazuh*: is the default Wazuh manager API administrator user.

- *wazuh-wui*: is an admin user used for communications between Wazuh dashboard and the Wazuh manager API. If you change the *wazuh-wui* password, you must update it in the Wazuh dashboard.

If you use the tool in an all-in-one deployment, it automatically updates the passwords where necessary.  If you use it in a distributed environment, depending on the user whose password you change, you may have to update the password on other components. See  :ref:`Changing the passwords in a distributed environment <passwords_distributed>` for more details.

The passwords tool is embedded in the Wazuh indexer under ``/usr/share/wazuh-indexer/plugins/opensearch-security/tools/``. You can use the embedded version or download it with the following command:

  .. code-block:: console

    # curl -so wazuh-passwords-tool.sh https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/wazuh-passwords-tool.sh


All the available options to run the script are:

+----------------------------------------------+-------------------------------------------------------------------------------------------------------------+
| Options                                      | Purpose                                                                                                     |
+==============================================+=============================================================================================================+
| -a / --change-all                            | Changes all the Wazuh indexer and Wazuh API user passwords and prints them on screen.                       |
|                                              | To change API passwords -au|--admin-user and -ap|--admin-password are required.                             |
+----------------------------------------------+-------------------------------------------------------------------------------------------------------------+
| -A,  --api                                   | Change the Wazuh API password given the current password.                                                   |
|                                              | Requires -u|--user, and -p|--password, -au|--admin-user and -ap|--admin-password.                           |
+----------------------------------------------+-------------------------------------------------------------------------------------------------------------+
| -au,--admin-user <adminUser>                 | Admin user for the Wazuh API. Required for changing the Wazuh API passwords.                                |
+----------------------------------------------+-------------------------------------------------------------------------------------------------------------+
| -ap, --admin-password <adminPassword>        | Password for the Wazuh API admin user. Required for changing the Wazuh API passwords.                       |
+----------------------------------------------+-------------------------------------------------------------------------------------------------------------+
| -u / --user <user>                           | Indicates the name of the user whose password will be changed.                                              |
|                                              | If no password is specified, it will generate a random one.                                                 |
+----------------------------------------------+-------------------------------------------------------------------------------------------------------------+
| -p / --password <password>                   | Indicates the new password. Must be used with option -u.                                                    |
+----------------------------------------------+-------------------------------------------------------------------------------------------------------------+
| -c / --cert <route-admin-certificate>        | Indicates route to the admin certificate.                                                                   |
+----------------------------------------------+-------------------------------------------------------------------------------------------------------------+
| -k / --certkey <route-admin-certificate-key> | Indicates route to the admin certificate key.                                                               |
+----------------------------------------------+-------------------------------------------------------------------------------------------------------------+
| -v / --verbose                               | Shows the complete script execution output.                                                                 |
+----------------------------------------------+-------------------------------------------------------------------------------------------------------------+
| -f / --file <password_file.yml>              | Changes the passwords for the ones given in the file.                                                       |
|                                              |                                                                                                             |
|                                              | Wazuh indexer users must have this format:                                                                  |
|                                              |                                                                                                             |
|                                              |    # Description                                                                                            |
|                                              |      indexer_username: <user>                                                                               |
|                                              |      indexer_password: <password>                                                                           |
|                                              |                                                                                                             |
|                                              | Wazuh API users must have this format:                                                                      |
|                                              |                                                                                                             |
|                                              |    # Description                                                                                            |
|                                              |     api_username: <user>                                                                                    |
|                                              |      api_password: <password>                                                                               |
+----------------------------------------------+-------------------------------------------------------------------------------------------------------------+
| -gf, --generate-file <passwords.wazuh>       | Generate password file with random passwords for standard users.                                            |
+----------------------------------------------+-------------------------------------------------------------------------------------------------------------+
| -h / --help                                  | Shows help.                                                                                                 |
+----------------------------------------------+-------------------------------------------------------------------------------------------------------------+

Changing the password for single user
-------------------------------------

To change the password for a single Wazuh indexer user, run the script with the ``-u`` option and indicate the new password with the option ``-p``. The password must have a length between 8 and 64 characters and contain at least one upper case letter, one lower case letter, a number and one of the following symbols: ``.*+?-``. If no password is specified, the script will generate a random one.


   .. code-block:: console

      # bash wazuh-passwords-tool.sh -u admin -p Secr3tP4ssw*rd


   .. code-block:: console
      :class: output

      INFO: Generating password hash
      WARNING: Password changed. Remember to update the password in the Wazuh dashboard and Filebeat nodes if necessary, and restart the services.

If you use the tool in an all-in-one deployment, it automatically updates the passwords where necessary.  If you use it in a distributed environment, depending on the user whose password you change, you may have to update the password on other components. See :ref:`Changing the passwords in a distributed environment <passwords_distributed>` for more details.

If you want to change the password for a Wazuh manager API user, run the script on a Wazuh server node and use option ``-A, --api``. Alternatively, you can change the Wazuh manager API passwords following the instructions in the :doc:`Securing the Wazuh API </user-manual/api/securing-api>` documentation.


Changing the passwords for all users
------------------------------------

To generate and change passwords for all the Wazuh indexer users, run the script with the ``-a`` option:

  .. code-block:: console

    # bash wazuh-passwords-tool.sh -a

  .. code-block:: console
    :class: output
    :emphasize-lines: 2,3

    INFO: Wazuh API admin credentials not provided, Wazuh API passwords not changed.
    INFO: The password for user admin is kwd139yG?YoIK?lRnqcXQ4R4gJDlAqKn
    INFO: The password for user kibanaserver is Bu1WIELh9RdRlf*oGjinN1?yhF6XzA7V
    INFO: The password for user kibanaro is 7kZvau11cPn6Y1SbOsdr8Kwr*BRiK3u+
    INFO: The password for user logstash is SUbk4KTmLl*geQbUg0c5tyfwahjDMhx5
    INFO: The password for user readall is ?w*Itj1Lgz.5w.C7vOw0Kxi7G94G8bG*
    INFO: The password for user snapshotrestore is Z6UXgM8Sr0bfV.i*6yPPEUY3H6Du2rdz
    WARNING: Wazuh indexer passwords changed. Remember to update the password in the Wazuh dashboard, Wazuh server, and Filebeat nodes if necessary, and restart the services.

If you use the tool in an all-in-one deployment, it automatically updates the passwords where necessary. If you use it in a distributed environment, you have to update the password on other components. See :ref:`Changing the passwords in a distributed environment <passwords_distributed>` for more details.

On an all-in-one deployment, use options ``-a``, ``-au`` and ``-ap`` to also change the passwords for all the Wazuh indexer and the Wazuh manager API users.

   .. code-block:: console

      # sudo bash wazuh-passwords-tool.sh -a -au wazuh -ap KTb+Md+rR74J2yHfoGGnFGHGm03Gadyu


   .. code-block:: console
      :class: output
      :emphasize-lines: 1,2,8,9

      INFO: The password for user admin is Wkw+b2rM6BEOwUmGfr*m*i1ithWw.dg2
      INFO: The password for user kibanaserver is 5Y0lIfCwmjkus9nWAAVxMInI+Eth25hr
      INFO: The password for user kibanaro is kJG7fHX18.UJIZoNip5nDo*34DN+cGBL
      INFO: The password for user logstash is wuabgegtKsQABems5RNJfV0AOmxT?81T
      INFO: The password for user readall is gKSuQFGG.Sa0L9gzJX5WZHPP3Y4Es+sU
      INFO: The password for user snapshotrestore is UdyI8ToXkgVCNOPfJ*FX*a5vybeB.rUw
      WARNING: Wazuh indexer passwords changed. Remember to update the password in the Wazuh dashboard, Wazuh server, and Filebeat nodes if necessary, and restart the services.
      INFO: The password for Wazuh API user wazuh is zG0yTsAiettOXWEB79Aca1jbQ5.UeW3M
      INFO: The password for Wazuh API user wazuh-wui is JmKiaCBQo?4Ne0yrM4+n7kGdXGfCmVjO
      INFO: Updated wazuh-wui user password in wazuh dashboard. Remember to restart the service.




Changing the passwords using a formatted file
---------------------------------------------

Use a formatted file to indicate the passwords and run the script with the ``-f`` option followed by the file path. Use the following pattern to indicate the users and passwords in the formatted file.

For Wazuh indexer users:

  .. code-block:: none

    # Description
      indexer_username: <user>
      indexer_password: <password>

For Wazuh manager API users:

  .. code-block:: none

    # Description
      api_username: <user>
      api_password: <password>

If the ``-a`` option is used in combination with the ``-f`` option, all users not included in the file are given a random password.

The options ``-au`` and ``-ap`` are necessary to change the passwords for the API users.

.. _passwords_distributed:

Changing the passwords in a distributed environment
---------------------------------------------------

Follow the instructions below to change the passwords for all the Wazuh indexer users as well as the Wazuh manager API users.

#. On `any Wazuh indexer node`, use the Wazuh passwords tool to change the passwords of the Wazuh indexer users.

   .. code-block:: console

      # /usr/share/wazuh-indexer/plugins/opensearch-security/tools/wazuh-passwords-tool.sh --change-all

   .. code-block:: console
      :class: output
      :emphasize-lines: 2,3

      INFO: Wazuh API admin credentials not provided, Wazuh API passwords not changed.
      INFO: The password for user admin is wcAny.XUwOVWHFy.+7tW9l8gUW1L8N3j
      INFO: The password for user kibanaserver is qy6fBrNOI4fD9yR9.Oj03?pihN6Ejfpp
      INFO: The password for user kibanaro is Nj*sSXSxwntrx3O7m8ehrgdHkxCc0dna
      INFO: The password for user logstash is nQg1Qw0nIQFZXUJc8r8+zHVrkelch33h
      INFO: The password for user readall is s0iWAei?RXObSDdibBfzSgXdhZCD9kH4
      INFO: The password for user snapshotrestore is Mb2EHw8SIc1d.oz.nM?dHiPBGk7s?UZB
      WARNING: Wazuh indexer passwords changed. Remember to update the password in the Wazuh dashboard, Wazuh server, and Filebeat nodes if necessary, and restart the services.

#. On your `Wazuh server master node`, download the Wazuh passwords tool and use it to change the passwords of the Wazuh API users. Replace ``<wazuh-password>`` with the *wazuh* user password.

   .. code-block:: console

      # curl -sO https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/wazuh-passwords-tool.sh
      # bash wazuh-passwords-tool.sh --change-all --admin-user wazuh --admin-password <wazuh-password>

   .. code-block:: console
      :class: output

      INFO: The password for Wazuh API user wazuh is ivLOfmj7.jL6*7Ev?UJoFjrkGy9t6Je.
      INFO: The password for Wazuh API user wazuh-wui is fL+f?sFRPEv5pYRE559rqy9b6G4Z5pVi

#. On `all your Wazuh server nodes`, run the following command to update the `admin` password in the Filebeat keystore and in the ``ossec.conf`` file for the Wazuh server. Replace ``<admin-password>`` with the random password generated in the first step.

   .. code-block:: console

      # echo <admin-password> | filebeat keystore add password --stdin --force
      # sed -i 's/<password>.*<\/password>/<password><admin-password><\/password>/g' /var/ossec/etc/ossec.conf

#. Restart Filebeat and the Wazuh server to apply the change.

   .. include:: /_templates/common/restart_filebeat.rst
   .. include:: /_templates/common/restart_manager.rst

   .. note:: Repeat steps 3 and 4 on `every Wazuh server node`.

#. On your `Wazuh dashboard node`, run the following command to update the `kibanaserver` password in the Wazuh dashboard keystore. Replace ``<kibanaserver-password>`` with the random password generated in the first step.

   .. code-block:: console

      # echo <kibanaserver-password> | /usr/share/wazuh-dashboard/bin/opensearch-dashboards-keystore --allow-root add -f --stdin opensearch.password

#. Restart the Wazuh dashboard to apply the changes.

   .. include:: /_templates/common/restart_dashboard.rst

#. Go to **Dashboard management** > **Server APIs** to update the password of the API host entry with the new `wazuh-wui` password generated in the second step. Click on the edit button of the related API host. Change the **Password** and then click on **Apply** to save the changes.