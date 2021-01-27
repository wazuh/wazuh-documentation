.. Copyright (C) 2020 Wazuh, Inc.

.. _ruleset_cdb-list:

Using CDB lists
===============

Wazuh is able to check if a field extracted during the decoding phase is in a CDB list (constant database). The main use case of this feature is to create a white/black list of users, file hashes, IPs or domain names.

Creating a CDB list
-------------------

Creating the list file
^^^^^^^^^^^^^^^^^^^^^^

The list file is a plain text file where each line has the following format::

    key1:value1
    key2:value2

Each key must be unique, followed by a colon ``:`` and it can have an optional value. The value can be identical to others but the key must remain unique.

With a key we can determine the presence or absence of a field in a given list. By adding a value we can use it as criteria in rules. For example, if we have account names (key) with a department name (value) associated, it would be possible to create an alert that triggers when a user not from the finance department logs into the finance server.

For IP addresses the dot notation is used for subnet matches:

+-------------+----------------+-------------------------------+
| key         | CIDR           | Possible matches              |
+=============+================+===============================+
| 192.168.:   | 192.168.0.0/16 | 192.168.0.0 - 192.168.255.255 |
+-------------+----------------+-------------------------------+
| 172.16.19.: | 172.16.19.0/24 | 172.16.19.0 - 172.16.19.255   |
+-------------+----------------+-------------------------------+
| 10.1.1.1:   | 10.1.1.1/32    | 10.1.1.1                      |
+-------------+----------------+-------------------------------+

Example of IP address list file::

    192.168.: Matches 192.168.0.0 - 192.168.255.255
    172.16.19.: Matches 172.16.19.0 - 172.16.19.255
    10.1.1.1: Matches 10.1.1.1

We recommend to store the lists on ``/var/ossec/etc/lists``.

.. versionadded:: 3.11.0

Since Wazuh v3.11.0, CDB lists are built and loaded automatically when the analysis engine is started. Therefore, when adding or modifying CDB lists, it is no longer needed to run ``ossec-makelists``, just restart the manager.

Adding the list to ossec.conf
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Each list must be defined in the ``ossec.conf`` file using the following syntax:

.. code-block:: xml

  <wazuh_config>
    <ruleset>
      <list>etc/lists/list-IP</list>

.. warning::
  The ``<list>`` setting uses a relative path to the Wazuh installation folder (``/var/ossec/``) so make sure to indicate the directory accordingly.

Restart Wazuh to apply the changes:

  a. For Systemd:

  .. code-block:: console

    # systemctl restart wazuh-manager

  b. For SysV Init:

  .. code-block:: console

    # service wazuh-manager restart

Using the CDB list in the rules
-------------------------------

A rule would use the following syntax to look up a key within a CDB list.

Positive key match
^^^^^^^^^^^^^^^^^^

This example is a search for the key stored in the field attribute and will match if it is present in the database:

.. code-block:: xml

     <list field="user" lookup="match_key">etc/lists/list-user</list>

The ``lookup="match_key"`` is the default and can be omitted as in this example:

.. code-block:: xml

     <list field="user">etc/lists/list-user</list>

In case the field is an IP address, you must use ``address_match_key``:

.. code-block:: xml

    <list field="srcip" lookup="address_match_key">etc/lists/list-IP</list>

Negative key match
^^^^^^^^^^^^^^^^^^

This example is a search for the key stored in the field attribute and will match if it is not present in the database:

.. code-block:: xml

    <list field="user" lookup="not_match_key">etc/lists/list-user</list>

In case the field is an IP address, you must use ``not_address_match_key``:

.. code-block:: xml

    <list field="srcip" lookup="not_address_match_key">etc/lists/list-IP</list>

Key and value match
^^^^^^^^^^^^^^^^^^^

This example is a search for the key stored in the field attribute, and on a positive match the returned value of the key will be processed using the regex in the *check_value* attribute:

.. code-block:: xml

     <list field="user" lookup="match_key_value" check_value="^block">etc/lists/list-user</list>

In case the field is an IP address, you must use ``not_address_match_key``:

.. code-block:: xml

   <list field="srcip" lookup="address_match_key_value" check_value="^reject">etc/lists/list-IP</list>


CDB lists examples
^^^^^^^^^^^^^^^^^^

.. code-block:: xml

  <rule id="110700" level="10">
    <if_group>json</if_group>
    <list field="ip" lookup="address_match_key">etc/lists/List-one</list>
    <description>IP blacklisted in LIST ONE</description>
    <group>list1,</group>
  </rule>


  <rule id="110701" level="10">
    <if_group>json</if_group>
    <list field="ip" lookup="address_match_key">etc/lists/List-two</list>
    <description>IP blacklisted in LIST TWO</description>
    <group>list2,</group>
  </rule>


  <rule id="110710" level="10">
    <if_sid>110700</if_sid>
    <list field="ip" lookup="address_match_key">etc/lists/List-two</list>
    <description>IP blacklisted in LIST ONE and LIST TWO</description>
    <group>list1,list2,</group>
  </rule>

In this example, the described rules check if an IP is in the *List-one*, in the *List-two* or in both.
