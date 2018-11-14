.. Copyright (C) 2018 Wazuh, Inc.

.. _reference_ossec_labels:

labels
======

.. topic:: XML section name

	.. code-block:: xml

	    <labels>
	    </labels>

The labels section of ``ossec.conf`` allows additional user-defined information about agents to be included in alerts. When email notifications are enabled, this additional data is also contained in the email alerts without any further configuration.

Options
-------

- `label`_

.. _reference_ossec_labels_label:

label
^^^^^

This option specifies the additional information that will appear in alerts. Labels can be nested in JSON formatted alerts by separating the "key" terms by a period.


Attributes:

+--------------------+-------------------------------------------------------------+
| **key**            | The title that will describe the information of the label.  |
+                    +---------------------------------------+---------------------+
|                    | Allowed value                         | Any string          |
+--------------------+---------------------------------------+---------------------+
| **hidden**         | For labels that are hidden by default.                      |
+                    +---------------------------------------+---------------------+
|                    | Default value                         | no                  |
+                    +---------------------------------------+---------------------+
|                    | Allowed value                         | yes,no              |
+--------------------+---------------------------------------+---------------------+

.. note::
    In ``internal_options.conf``, hidden labels can be set to be displayed in alerts.

Automatic labels
^^^^^^^^^^^^^^^^

`Added in Wazuh 3.x`

There are some information about the system that Wazuh can automaticly obtain. In this case, you only need to replace the value of the label with a defined string which has to be written between delimiters: "$(" and ")". 

The list of current available labels is:

+--------------------+-------------------------------------------------------------+
| **os.name**        | The name of the Operative System                            |
+--------------------+-------------------------------------------------------------+
| **os.version**     | The version of the Operative System                         |
+--------------------+-------------------------------------------------------------+
| **ipv4.primary**   | The IPv4 of your default network interface                  |
+--------------------+-------------------------------------------------------------+
| **ipv4.others**    | The IPv4 of the rest of network interfaces                  |
+--------------------+-------------------------------------------------------------+
| **ipv6.primary**   | The IPv6 of your default network interface                  |
+--------------------+-------------------------------------------------------------+
| **ipv6.others**    | The IPv6 of the rest of network interfaces                  |
+--------------------+-------------------------------------------------------------+
| **mac.primary**    | The MAC address of your default network interface           |
+--------------------+-------------------------------------------------------------+
| **mac.others**     | The MAC address of the rest of network interfaces           |
+--------------------+-------------------------------------------------------------+
| **timezone**       | The UTC timezone of the system.                             |
+--------------------+-------------------------------------------------------------+
| **hostname**       | The name of the system                                      |
+--------------------+-------------------------------------------------------------+

Example of configuration
------------------------

.. code-block:: xml

  <labels>
    <label key="aws.instance-id">i-052a1838c</label>
    <label key="aws.sec-group">sg-1103</label>
    <label key="network.ip">172.17.0.0</label>
    <label key="network.mac">02:42:ac:11:00:02</label>
    <label key="installation" hidden="yes">January 1st, 2017</label>
  </labels>

In case you want to use the automatic labels the configuration will be like this one:

.. code-block:: xml

  <labels>
    <label key="Operative System">$(os.name) - $(os.version)</label>
    <label key="network.ip">$(ipv4.primary)</label>
    <label key="Timezone">$(timezone)</label>
    <label key="Agent">$(hostname)</label>
  </labels>

And the labels will be displayed this way:

.. code-block:: JSON

  Operative System: "CentOS Linux" - "7 (Core)"
  network.ip: ["10.0.2.15"]
  Timezone: UTC 0
  Agent: "c7-manager-100"
