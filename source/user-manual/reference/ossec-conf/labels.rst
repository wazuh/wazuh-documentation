.. Copyright (C) 2019 Wazuh, Inc.

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

+--------------------+-------------------------------------------------------------------------------------------------+
| **key**            | The title that will describe the information of the label.                                      |
+                    +---------------------------------------+---------------------------------------------------------+
|                    | Allowed value                         | Any string that does not start with an underscore ( _ ) |
+--------------------+---------------------------------------+---------------------------------------------------------+
| **hidden**         | For labels that are hidden by default.                                                          |
+                    +---------------------------------------+---------------------------------------------------------+
|                    | Default value                         | no                                                      |
+                    +---------------------------------------+---------------------------------------------------------+
|                    | Allowed value                         | yes,no                                                  |
+--------------------+---------------------------------------+---------------------------------------------------------+

.. note::
    In ``internal_options.conf``, hidden labels can be set to be displayed in alerts.

.. note::
    .. versionadded:: 3.9.0
    Keys starting with an underscore character are reserved for the system labels. These labels are invisible and contain internal information of the agents.

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
