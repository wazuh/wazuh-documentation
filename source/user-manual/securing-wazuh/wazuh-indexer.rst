.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn how to secure Wazuh indexer.

.. _user_manual_secure_wazuh_indexer:

Change the Wazuh indexer passwords
==================================

In this section we will show you how to change the passwords of the Wazuh indexer users to secure your installation.

We  provide a script to simplify the process of changing passwords, start by downloading it:

  .. code-block:: console
  
    # curl -so wazuh-passwords-tool.sh https://packages.wazuh.com/|WAZUH_LATEST_MINOR|/wazuh-passwords-tool.sh

The script allows changing the password for either a single user or all the users present on the ``/usr/share/wazuh-indexer/plugins/opensearch-security/securityconfig/internal_users.yml`` file. It also offers the option to change the password of more than one user at once, getting them from a formatted file.

All the available options to run the script are:

+----------------------------------------------+-------------------------------------------------------------------------------------------------------------+
| Options                                      | Purpose                                                                                                     |
+==============================================+=============================================================================================================+
| -a / --change-all                            | Changes all the Wazuh indexer user passwords and prints them on screen.                                     |
+----------------------------------------------+-------------------------------------------------------------------------------------------------------------+
| -p / --password <password>                   | Indicates the new password, must be used with option -u.                                                    |
+----------------------------------------------+-------------------------------------------------------------------------------------------------------------+    
| -u / --user <user>                           | Indicates the name of the user whose password will be changed.                                              |
|                                              | If no password is specified, it will generate a random one                                                  |
+----------------------------------------------+-------------------------------------------------------------------------------------------------------------+
| -c / --cert <route-admin-certificate>        | Indicates route to the admin certificate                                                                    |
+----------------------------------------------+-------------------------------------------------------------------------------------------------------------+
| -k / --certkey <route-admin-certificate-key> | Indicates route to the admin certificate key                                                                |
+----------------------------------------------+-------------------------------------------------------------------------------------------------------------+
| -v / --verbose                               | Shows the complete script execution output                                                                  |
+----------------------------------------------+-------------------------------------------------------------------------------------------------------------+
| -f / --file <password_file.yml>              | Changes the passwords for the ones given in the file.                                                       |
|                                              |   Each user has to have this format.                                                                        |
|                                              |                                                                                                             |
|                                              |      # Description                                                                                          |
|                                              |        username: <user>                                                                                     |
|                                              |        password: <password>                                                                                 |
+----------------------------------------------+-------------------------------------------------------------------------------------------------------------+
| -gf, --generate-file <passwords.wazuh>       | Generate password file with random passwords for standard users                                             |
+----------------------------------------------+-------------------------------------------------------------------------------------------------------------+
| -h / --help                                  | Shows help                                                                                                  |
+----------------------------------------------+-------------------------------------------------------------------------------------------------------------+

Change the password for single user
-----------------------------------

To change the password for a single user, run the script with the ``-u`` option. You may indicate the new password with option ``-p``. If no password is specified, the script will generate a random one. 

  .. code-block:: console
  
    # bash wazuh-passwords-tool.sh -u admin -p mypassword

This is the output of the script:

  .. code-block:: none
    :class: output 

    28/04/2022 10:17:50 INFO: Generating password hash
    28/04/2022 10:17:55 WARNING: Passwords changed. Remember to update the password in the Wazuh dashboard and Filebeat nodes if necessary, and restart the services.
    
Change the passwords for all users
----------------------------------

To generate and change passwords for all users, run the script with the ``-a`` option:

  .. code-block:: console
  
    # bash wazuh-passwords-tool.sh -a

This is the output of the script:

  .. code-block:: none
    :class: output 

    28/04/2022 10:25:31 INFO: The password for user admin is EYzV0Q07poX53W395uChGVKYNEGMEkfe
    28/04/2022 10:25:31 INFO: The password for user kibanaserver is PoXXlnylEcV3VKdJWqFzVAomHEmb1WO4
    28/04/2022 10:25:31 INFO: The password for user kibanaro is Kp6Xtohsz7dMUATguwf2bD80MTUnrZC9
    28/04/2022 10:25:31 INFO: The password for user logstash is C1uDj6FZCyrPQKPp2KzazX7TAkdRmRjz
    28/04/2022 10:25:31 INFO: The password for user readall is gmDRDY7J4R3zt85BLiY0NS23oIUhvkd2
    28/04/2022 10:25:31 INFO: The password for user snapshotrestore is U5MZg6WeXNUP9NPPophRoMtA9GQNEvdR
    28/04/2022 10:25:31 INFO: The password for user wazuh_admin is WrWzM8egHJY2CfxngapAeSchA3yq3X3t
    28/04/2022 10:25:31 INFO: The password for user wazuh_user is oCwLLG88wb7x5OpnxOPjclVpqWgq9s7W
    28/04/2022 10:25:31 WARNING: Passwords changed. Remember to update the password in the Wazuh dashboard and Filebeat nodes if necessary, and restart the services.

Change the passwords using a formatted file
--------------------------------------------

To use a formatted file to indicate the passwords, run the script with the ``-f`` option followed by the file path. Use the following pattern to indicate the users and passwords in the formatted file: 

  .. code-block:: none

    User: 
        name: wazuh
        password: <password_wazuh>

    User: 
        name: kibanaserver
        password: <password_kibanaserver>

If the ``-a`` option is used in combination with the ``-f`` option, all users not included in the file are given a random password.

In distributed deployments you will need to change the passwords in the nodes running Wazuh dashboard and Filebeat, you can use ``wazuh-passwords-tool.sh`` to do this.

