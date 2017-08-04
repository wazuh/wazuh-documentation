.. _reference_ossec_labels:


labels
=============

.. topic:: XML section name

	.. code-block:: xml

	    <labels>
	    </labels>

This section permits include extra information about agents in their alerts. When email notifications are enabled, labeled data is
sent within alerts by email without any additional configuration.

Options
-------

- `label`_

.. _reference_ossec_labels_label:

label
^^^^^

This option specifies the information that appears in alerts. It has the format ``key:value``, which means that it is necessary to include
the atribute ``key`` to work properly. Thinking in the JSON alerts, it is possible to nest labels splitting this atribute by dots.


Atributes:

+--------------------+-------------------------------------------------------------+
| **key**            | The title that will describe the information of the label.  |
+                    +---------------------------------------+---------------------+
|                    | Allowed value                         | string              |
+--------------------+---------------------------------------+---------------------+
| **hidden**         | Permits not to show the specified label by default.         |
+                    +---------------------------------------+---------------------+
|                    | Allowed value                         | yes                 |
+--------------------+---------------------------------------+---------------------+

.. note::
    In ``internal_options.conf`` there is the possibility of show hidden labels in the alerts.

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
