.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Learn how to secure Opendistro for Elasticsearch.

.. _user_manual_secure_opendistro:

Change the Open Distro for Elasticsearch passwords 
==================================================

In this section we will show you how to change the passwords of the Open Distro for Elasticsearch users to secure your installation.

We  provide a script to simplify the process of changing passwords, start by downloading it:

  .. code-block:: console
  
    # curl -so wazuh-opendistro-passwords-tool https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/wazuh-opendistro-passwords-tool.sh

The script allows changing the password for either a single user or all the users present on the ``/usr/share/elasticsearch/plugins/opendistro_security/securityconfig/internal_users.yml`` file. It also offers the option to change the password of more than one user at once, getting them from a formatted file. All the available options to run the script are:

+----------------------------------------------+-------------------------------------------------------------------------------------------------------------+
| Options                                      | Purpose                                                                                                     |
+==============================================+=============================================================================================================+
| -a / --change-all                            | Generates random passwords, changes all the Open Distro user passwords and prints them on screen            |
+----------------------------------------------+-------------------------------------------------------------------------------------------------------------+
| -p / --password <password>                   | Indicates the new password, must be used with option ``-u``                                                 |
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
| -f / --file <password_file.yml>              | Indicates route to file where new passwords are given                                                       |
+----------------------------------------------+-------------------------------------------------------------------------------------------------------------+
| -h / --help                                  | Shows help                                                                                                  |
+----------------------------------------------+-------------------------------------------------------------------------------------------------------------+

Change the password for single user
-----------------------------------

To change the password for a single user, run the script with the ``-u`` option. You may indicate the new password with option ``-p``. If no password is specified, the script will generate a random one. 
  
  .. code-block:: console

    # bash wazuh-opendistro-passwords-tool -u admin -p mypassword

This is the output of the script:

  .. code-block:: none
    :class: output 

    Creating backup...
    Backup created
    Generating hash
    Hash generated
    Loading changes...
    Done
    Password changed. Remember to update the password in /etc/filebeat/filebeat.yml and /etc/kibana/kibana.yml if necessary and restart the services.



Change the passwords for all users
----------------------------------

To generate and change the passwords for all users, run the script with the ``-a`` option:

.. code-block:: console

  # bash wazuh-opendistro-passwords-tool -a

This is the output of the script:

  .. code-block:: none
    :class: output 

    Generating random passwords
    Done
    Creating backup...
    Backup created
    Generating hashes
    Hashes generated
    Loading changes...
    Done

    The password for admin is Re6dEMVUcB_c6rEDf_C_nkBCZkwFKtZL

    The password for kibanaserver is 4KLxLHor69cq2i1jFXmSUjBTVjG2yhU9

    The password for kibanaro is zCd-SrihVwzfRxj5qPrwlSgmZJP9RsMA

    The password for logstash is OmbPImuV5fv11R6XYAG92cUjaDy9PkdH

    The password for readall is F2vglVGFJHXohwqEW5G4Tfjsiz-qqkTU

    The password for snapshotrestore is rd35bCchP3Uf-0w77VCEJzHF7WEP3fNw

    Passwords changed. Remember to update the password in /etc/filebeat/filebeat.yml and /etc/kibana/kibana.yml if necessary and restart the services.


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

In distributed deployments you will need to change update the passwords in both ``/etc/filebeat/filebeat.yml`` and ``/etc/kibana/kibana.yml``. After changing the configuration files, remember to restart the corresponding services.


