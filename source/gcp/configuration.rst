.. Copyright (C) 2020 Wazuh, Inc.

.. _gcp_configuration:

Configuring the GCP module in Wazuh
===================================

The ``GCP module`` is a section of the :ref:`local configuration <reference_ossec_conf>`.  It has the following structure:

.. code-block:: xml

    <gcp-pubsub>
        <project_id>YOUR_PROJECT_ID</project_id>
        <subscription_name>YOUR_SUBSCRIPTION_NAME</subscription_name>
        <credentials_file>YOUR_CREDENTIALS_FILE.json</credentials_file>
        <max_messages>15</max_messages>
        <interval>1m</interval>
    </gcp-pubsub>


Configuration options for the GCP module.

Parameters
----------

- `enabled`_
- `project_id`_
- `subscription_name`_
- `credentials_file`_
- `logging`_
- `max_messages`_
- `interval`_

enabled
^^^^^^^

Use this parameter to enable the GCP module ``(Optional)``.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

project_id
^^^^^^^^^^

Put your GCloud project ID here ``(Required)``.

+--------------------+-----------------------------+
| **Allowed values** | String with your project ID |
+--------------------+-----------------------------+

subscription_name
^^^^^^^^^^^^^^^^^

Put your GCloud subscription name here ``(Required)``.

+--------------------+------------------------------------+
| **Allowed values** | String with your subscription name |
+--------------------+------------------------------------+

credentials_file
^^^^^^^^^^^^^^^^

Path to credentials file ``(Required)``. Keep in mind that the root would be your ``WAZUH_PATH``. 

.. note:: This file must be in JSON format.

+--------------------+------------------------------------------------+
| **Allowed values** | Relative path to your credentials file         |
+--------------------+------------------------------------------------+
| **Example**        | credentials.json (WAZUH_PATH/credentials.json) |
+--------------------+------------------------------------------------+

logging
^^^^^^^

Logger level. The module only shows the messages which have a level as ``log_level`` at least ``(Optional)``. 

+--------------------+--------------------------+
| **Default value**  | 3 (INFO)                 |
+--------------------+--------------------------+
| **Allowed values** | A number between 1 and 6 |
+--------------------+--------------------------+

There are six levels of debug in this module:

+-----------+-------------+
| **Level** | **Meaning** |
+-----------+-------------+
| 1         | notset      |
+-----------+-------------+
| 2         | debug       |
+-----------+-------------+
| 3         | info        |
+-----------+-------------+
| 4         | warning     |
+-----------+-------------+
| 5         | error       |
+-----------+-------------+
| 6         | critical    |
+-----------+-------------+

max_messages
^^^^^^^^^^^^

Maximum number of retrieved messages for each request. This means that if there are more messages than this value, there will be another request until the response will be empty (``Optional``).

+--------------------+---------------------------+
| **Default value**  | 100                       |
+--------------------+---------------------------+
| **Allowed values** | Any number from 1 to 1000 |
+--------------------+---------------------------+

interval
^^^^^^^^

Interval of time between each pull from GCloud Pub/Sub ``(Required)``.

+--------------------+-------------------------------------+
| **Allowed values** | Positive numbers with the time unit |
+--------------------+-------------------------------------+
| **Example**        | 10s, 10m, 10h                       |
+--------------------+-------------------------------------+