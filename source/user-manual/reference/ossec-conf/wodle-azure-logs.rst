.. Copyright (C) 2018 Wazuh, Inc.

.. _wodle_azure_logs:

wodle name="azure-logs"
=======================

.. versionadded:: 3.7.0

.. topic:: XML section name

	.. code-block:: xml

		<wodle name="azure-logs">
		</wodle>

Configuration options of the Azure-Logs wodle.


Options
-------

- `disabled`_
- `interval`_
- `run_on_start`_
- `day`_
- `wday`_
- `time`_
- `timeout`_
- `log_analytics`_
- `log_analytics\\application_id`_ 
- `log_analytics\\application_key`_ 
- `log_analytics\\auth_path`_ 
- `log_analytics\\tenantdomain`_ 
- `log_analytics\\request`_ 
- `log_analytics\\request\\tag`_ 
- `log_analytics\\request\\query`_   
- `log_analytics\\request\\workspace`_ 
- `log_analytics\\request\\timeout`_
- `log_analytics\\request\\time_offset`_
- `graph\\application_id`_   
- `graph\\application_key`_
- `graph\\auth_path`_ 
- `graph\\tenantdomain`_   
- `graph\\request`_ 
- `graph\\request\\tag`_ 
- `graph\\request\\query`_ 
- `graph\\request\\timeout`_ 
- `graph\\request\\time_offset`_ 
- `storage\\account_name`_
- `storage\\account_key`_
- `storage\\auth_path`_
- `storage\\tag`_
- `storage\\container`_
- `graph`_
- `storage`_


+----------------------------------------+----------------------------------------------+
| Options                                | Allowed values                               |
+========================================+==============================================+
| `disabled`_                            | yes, no                                      |
+----------------------------------------+----------------------------------------------+
| `interval`_                            | A positive number + suffix                   |
+----------------------------------------+----------------------------------------------+
| `run_on_start`_                        | yes, no                                      |
+----------------------------------------+----------------------------------------------+
| `day`_                                 | A day of the month                           |
+----------------------------------------+----------------------------------------------+
| `wday`_                                | A day of the week                            |
+----------------------------------------+----------------------------------------------+
| `time`_                                | A time of the day [hh:mm]                    |
+----------------------------------------+----------------------------------------------+
| `timeout`_                             | A positive number (seconds)                  |
+----------------------------------------+----------------------------------------------+
| `log_analytics`_                       | N/A                                          |
+----------------------------------------+----------------------------------------------+
| `log_analytics\\application_id`_       | Any string                                   |
+----------------------------------------+----------------------------------------------+
| `log_analytics\\application_key`_      | Any string                                   |
+----------------------------------------+----------------------------------------------+
| `log_analytics\\auth_path`_            | File path                                    |
+----------------------------------------+----------------------------------------------+
| `log_analytics\\tenantdomain`_         | Any string                                   |
+----------------------------------------+----------------------------------------------+
| `log_analytics\\request`_              | N/A                                          |
+----------------------------------------+----------------------------------------------+
| `log_analytics\\request\\tag`_         | Any string                                   |
+----------------------------------------+----------------------------------------------+
| `log_analytics\\request\\query`_       | Any string                                   |
+----------------------------------------+----------------------------------------------+
| `log_analytics\\request\\workspace`_   | Any string                                   |
+----------------------------------------+----------------------------------------------+
| `log_analytics\\request\\timeout`_     | A positive number (seconds)                  |
+----------------------------------------+----------------------------------------------+
| `log_analytics\\request\\time_offset`_ | A positive number + suffix                   |
+----------------------------------------+----------------------------------------------+
| `graph`_                               | N/A                |                         |
+----------------------------------------+----------------------------------------------+
| `graph\\application_id`_               | Any string                                   |
+----------------------------------------+----------------------------------------------+
| `graph\\application_key`_              | Any string                                   |
+----------------------------------------+----------------------------------------------+
| `graph\\auth_path`_                    | File path                                    |
+----------------------------------------+----------------------------------------------+
| `graph\\tenantdomain`_                 | Any string                                   |
+----------------------------------------+----------------------------------------------+
| `graph\\request`_                      | N/A                                          |
+----------------------------------------+----------------------------------------------+
| `graph\\request\\tag`_                 | Any string                                   |
+----------------------------------------+----------------------------------------------+
| `graph\\request\\query`_               | Any string                                   |
+----------------------------------------+----------------------------------------------+
| `graph\\request\\timeout`_             | A positive number (seconds)                  |
+----------------------------------------+----------------------------------------------+
| `graph\\request\\time_offset`_         | A positive number + suffix                   |
+----------------------------------------+----------------------------------------------+
| `storage`_                             | N/A                                          |
+----------------------------------------+----------------------------------------------+
| `storage\\account_name`_               | Any string                                   |
+----------------------------------------+----------------------------------------------+
| `storage\\account_key`_                | Any string                                   |
+----------------------------------------+----------------------------------------------+
| `storage\\auth_path`_                  | File path                                    |
+----------------------------------------+----------------------------------------------+
| `storage\\tag`_                        | Any string                                   |
+----------------------------------------+----------------------------------------------+
| `storage\\container`_                  | N/A                                          |
+----------------------------------------+----------------------------------------------+
| `storage\\container name`_             | Any string                                   |
+----------------------------------------+----------------------------------------------+
| `storage\\container\\blobs`_           | Extension                                    |
+----------------------------------------+----------------------------------------------+
| `storage\\container\\content_type`_    | text, json_file or json_inline               |
+----------------------------------------+----------------------------------------------+
| `storage\\container\\timeout`_         | A positive number (seconds)                  |
+----------------------------------------+----------------------------------------------+
| `storage\\container\\time_offset`_     | A positive number + suffix                   |
+----------------------------------------+----------------------------------------------+


disabled
^^^^^^^^

Disables the Azure-Logs wodle.

+--------------------+-----------------------------+
| **Default value**  | no                          |
+--------------------+-----------------------------+
| **Allowed values** | yes, no                     |
+--------------------+-----------------------------+

interval
^^^^^^^^

Interval between Azure-Logs executions.

+--------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Default value**  | 1d                                                                                                                                                             |
+--------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | A positive number that should contain a suffix character indicating a time unit, such as, s (seconds), m (minutes), h (hours), d (days), w (weeks), M (months) |
+--------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+

The interval option is conditioned by the following described options ``day``, ``wday`` and ``time``. If none of these options are set, the interval can take any allowed value.

run_on_start
^^^^^^^^^^^^^

Run evaluation immediately when service is started.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+


day
^^^

Day of the month to run the Azure-Logs.

+--------------------+--------------------------+
| **Default value**  | n/a                      |
+--------------------+--------------------------+
| **Allowed values** | Day of the month [1..31] |
+--------------------+--------------------------+

.. note::

	When the ``day`` option is set, the interval value must be a multiple of months. By default, the interval is set to a month.

wday
^^^^

Day of the week to run the Azure-Logs. This option is **not compatible** with the ``day`` option.

+--------------------+--------------------------+
| **Default value**  | n/a                      |
+--------------------+--------------------------+
| **Allowed values** | Day of the week:         |
|                    |   - sunday/sun           |
|                    |   - monday/mon           |
|                    |   - tuesday/tue          |
|                    |   - wednesday/wed        |
|                    |   - thursday/thu         |
|                    |   - friday/fri           |
|                    |   - saturday/sat         |
+--------------------+--------------------------+

time
^^^^

Time of the day to run the Azure-Logs. It has to be represented in the format *hh:mm*.

+--------------------+-----------------------+
| **Default value**  | n/a                   |
+--------------------+-----------------------+
| **Allowed values** | Time of day *[hh:mm]* |
+--------------------+-----------------------+

timeout
^^^^^^^

Timeout for each evaluation. In case the execution takes longer that the specified timeout, it stops.

+--------------------+-----------------------------+
| **Default value**  | 0                           |
+--------------------+-----------------------------+
| **Allowed values** | A positive number (seconds) |
+--------------------+-----------------------------+

log_analytics
-------------

Defines the use of the Azure Log Analytics REST API to get the desired logs. 

log_analytics options
~~~~~~~~~~~~~~~~~~~~~

This option configures the integration with Azure Log Analytics REST API. 

- `log_analytics\\application_id`_
- `log_analytics\\application_key`_
- `log_analytics\\auth_path`_
- `log_analytics\\tenantdomain`_
- `log_analytics\\request`_

+----------------------------------------+----------------------------------------------+
| Options                                | Allowed values                               |
+========================================+==============================================+
| `log_analytics\\application_id`_       | Any string                                   |
+----------------------------------------+----------------------------------------------+
| `log_analytics\\application_key`_      | Any string                                   |
+----------------------------------------+----------------------------------------------+
| `log_analytics\\auth_path`_            | File path                                    |
+----------------------------------------+----------------------------------------------+
| `log_analytics\\tenantdomain`_         | Any string                                   |
+----------------------------------------+----------------------------------------------+
| `log_analytics\\request`_              | N/A                                          |
+----------------------------------------+----------------------------------------------+

log_analytics\\application_id
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Identifier of the application that we will use for the authentication and to be able to make use of the Azure Log Analytics API. It must be used next to the ``application_key`` option obligatorily. Incompatible with ``auth_path`` option. 

+--------------------+--------------------+
| **Default value**  | N/A                |
+--------------------+--------------------+
| **Allowed values** | Any string         |
+--------------------+--------------------+

log_analytics\\application_key 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Key to the application we will use for authentication and to be able to make use of the Azure Log Analytics API. It must be used next to the ``application_id`` option obligatorily. Incompatible with ``auth_path`` option. 

+--------------------+--------------------+
| **Default value**  | N/A                |
+--------------------+--------------------+
| **Allowed values** | Any string         |
+--------------------+--------------------+

log_analytics\\auth_path
^^^^^^^^^^^^^^^^^^^^^^^^

Path of the file that contains the application identifier and the application key for authentication in order to use the Azure Log Analytics API. Incompatible with ``application_id`` and ``application_key`` options.

+--------------------+--------------------+
| **Default value**  | N/A                |
+--------------------+--------------------+
| **Allowed values** | File path          |
+--------------------+--------------------+

File example: 

.. code-block:: shell

    application_id = 8b7...c14                
    application_key = w22...91x

log_analytics\\tenantdomain
^^^^^^^^^^^^^^^^^^^^^^^^^^^ 

A tenant is simply a dedicated instance of Azure Active Directory (Azure AD). The Azure Log Analytics API uses the Azure Active Directory authentication scheme.

+--------------------+--------------------+
| **Default value**  | N/A                |
+--------------------+--------------------+
| **Allowed values** | Any String         |
+--------------------+--------------------+

log_analytics\\request
^^^^^^^^^^^^^^^^^^^^^^

This option includes all the other options needed to make a query. We can have more than one ``request`` entry. 

request options
~~~~~~~~~~~~~~~

+-----------------------------------------+----------------------------------------------+
| Options                                 | Allowed values                               |
+=========================================+==============================================+
| `log_analytics\\request\\tag`_          | Any string                                   |
+-----------------------------------------+----------------------------------------------+
| `log_analytics\\request\\query`_        | Any string                                   |
+-----------------------------------------+----------------------------------------------+
| `log_analytics\\request\\workspace`_    | Any string                                   |
+-----------------------------------------+----------------------------------------------+
| `log_analytics\\request\\timeout`_      | A positive number (seconds)                  |
+-----------------------------------------+----------------------------------------------+
| `log_analytics\\request\\time_offset`_  | A positive number + suffix                   |
+-----------------------------------------+----------------------------------------------+

log_analytics\\request\\tag
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Defines a tag that we will add to the query. This entry is optional and can be used to facilitate searches for events that are tagged or to create custom rules. 

+--------------------+--------------------+
| **Default value**  | N/A                |
+--------------------+--------------------+
| **Allowed values** | Any String         |
+--------------------+--------------------+

log_analytics\\request\\query
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This is the query we will make to the Azure Log Analytics API. This option is ready to use any query we can make in the Log Analytics portal. You can find a reference of the language used. `Reference <https://docs.loganalytics.io/docs/Language-Reference>`_. 

+--------------------+--------------------+
| **Default value**  | N/A                |
+--------------------+--------------------+
| **Allowed values** | Any String         |
+--------------------+--------------------+

log_analytics\\request\\workspace
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Defines the workspace where we will perform the queries. 

+--------------------+--------------------+
| **Default value**  | N/A                |
+--------------------+--------------------+
| **Allowed values** | Any String         |
+--------------------+--------------------+

log_analytics\\request\\timeout
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Timeout for each request evaluation. This option overwrites the general `timeout`_ option. In case the execution takes longer that the specified timeout, it stops.

+--------------------+-----------------------------+
| **Default value**  | 0                           |
+--------------------+-----------------------------+
| **Allowed values** | A positive number (seconds) |
+--------------------+-----------------------------+

log_analytics\\request\\time_offset
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This option sets the time delay in which we will perform the query. For example, if we establish this option with the value "1d", the integration will perform the query on the events that have been generated in the interval of time defined between the current date of the system minus one day (1d) and the current date of the system. 

+--------------------+----------------------------------------------------------------------------------------------------------------------------+
| **Default value**  | 1d                                                                                                                         |
+--------------------+----------------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | A positive number that should contain a suffix character indicating a time unit, such as, m (minutes), h (hours), d (days) |
+--------------------+----------------------------------------------------------------------------------------------------------------------------+

Example of log_analytics configuration
--------------------------------------

.. code-block:: xml

    <wodle name="azure-logs">

        <disabled>no</disabled>
        <day>15</day>
        <time>02:00</time>
        <run_on_start>yes</run_on_start>

        <log_analytics>

            <application_id>8b7...c14</application_id>
            <application_key>w22...91x</application_key>
            <tenantdomain>wazuh.onmicrosoft.com</tenantdomain>

            <request>
                <tag>azure-activity</tag>
                <query>AzureActivity | where SubscriptionId == "2d7...61d </query>
                <workspace>d6b...efa</workspace>
                <time_offset>36h</time_offset>
            </request>

        </log_analytics>

    </wodle>


graph
-----

This option configures the integration with Azure Active Directory Graph REST API. 

- `graph\\application_id`_
- `graph\\application_key`_
- `graph\\auth_path`_
- `graph\\tenantdomain`_
- `graph\\request`_

+----------------------------------+----------------------------------------------+
| Options                          | Allowed values                               |
+==================================+==============================================+
| `graph\\application_id`_         | Any string                                   |
+----------------------------------+----------------------------------------------+
| `graph\\application_key`_        | Any string                                   |
+----------------------------------+----------------------------------------------+
| `graph\\auth_path`_              | File path                                    |
+----------------------------------+----------------------------------------------+
| `graph\\tenantdomain`_           | Any string                                   |
+----------------------------------+----------------------------------------------+
| `graph\\request`_                | N/A                                          |
+----------------------------------+----------------------------------------------+

graph\\application_id
^^^^^^^^^^^^^^^^^^^^^

Identifier of the application that we will use for the authentication and to be able to make use of the AAD Graph API. It must be used next to the ``application_key`` option obligatorily. Incompatible with ``auth_path`` option. 

+--------------------+--------------------+
| **Default value**  | N/A                |
+--------------------+--------------------+
| **Allowed values** | Any string         |
+--------------------+--------------------+

graph\\application_key 
^^^^^^^^^^^^^^^^^^^^^^

Key to the application we will use for authentication and to be able to make use of the AAD Graph API. It must be used next to the ``application_id`` option obligatorily. Incompatible with ``auth_path`` option. 

+--------------------+--------------------+
| **Default value**  | N/A                |
+--------------------+--------------------+
| **Allowed values** | Any string         |
+--------------------+--------------------+

graph\\auth_path
^^^^^^^^^^^^^^^^

Path of the file that contains the application identifier and the application key for authentication in order to use the AAD Graph API. Incompatible with ``application_id`` and ``application_key`` options.

+--------------------+--------------------+
| **Default value**  | N/A                |
+--------------------+--------------------+
| **Allowed values** | File path          |
+--------------------+--------------------+

File example: 

.. code-block:: shell

    application_id = 8b7...c14                
    application_key = w22...91x

graph\\tenantdomain
^^^^^^^^^^^^^^^^^^^ 

A tenant is simply a dedicated instance of Azure Active Directory (Azure AD) because it uses the Azure Active Directory authentication scheme.

+--------------------+--------------------+
| **Default value**  | N/A                |
+--------------------+--------------------+
| **Allowed values** | Any String         |
+--------------------+--------------------+

graph\\request
^^^^^^^^^^^^^^

This option includes all the other options needed to make a query. We can have more than one ``request`` entry. 

request options
~~~~~~~~~~~~~~~

+-----------------------------------------+----------------------------------------------+
| Options                                 | Allowed values                               |
+=========================================+==============================================+
| `graph\\request\\tag`_                  | Any string                                   |
+-----------------------------------------+----------------------------------------------+
| `graph\\request\\query`_                | Any string                                   |
+-----------------------------------------+----------------------------------------------+
| `graph\\request\\timeout`_              | A positive number (seconds)                  |
+-----------------------------------------+----------------------------------------------+
| `graph\\request\\time_offset`_          | A positive number + suffix                   |
+-----------------------------------------+----------------------------------------------+

graph\\request\\tag
^^^^^^^^^^^^^^^^^^^

Defines a tag that we will add to the query. This entry is optional and can be used to facilitate searches for events that are tagged or to create custom rules. 

+--------------------+--------------------+
| **Default value**  | N/A                |
+--------------------+--------------------+
| **Allowed values** | Any String         |
+--------------------+--------------------+

graph\\request\\query
^^^^^^^^^^^^^^^^^^^^^

This is the query we will make to the Azure Log Analytics API. This option is ready to use any query we can make in the Log Analytics portal. You can find a reference of the language used `here <https://msdn.microsoft.com/en-us/library/azure/ad/graph/howto/azure-ad-graph-api-common-queries>`_. 

+--------------------+--------------------+
| **Default value**  | N/A                |
+--------------------+--------------------+
| **Allowed values** | Any String         |
+--------------------+--------------------+

graph\\request\\timeout
^^^^^^^^^^^^^^^^^^^^^^^

Timeout for each request evaluation. This option overwrites the general `timeout`_ option. In case the execution takes longer that the specified timeout, it stops.

+--------------------+-----------------------------+
| **Default value**  | 0                           |
+--------------------+-----------------------------+
| **Allowed values** | A positive number (seconds) |
+--------------------+-----------------------------+


graph\\request\\time_offset
^^^^^^^^^^^^^^^^^^^^^^^^^^^

This option sets the time delay in which we will perform the query. For example, if we establish this option with the value "1d", the integration will perform the query on the events that have been generated in the interval of time defined between the current date of the system minus one day (1d) and the current date of the system. 

+--------------------+----------------------------------------------------------------------------------------------------------------------------+
| **Default value**  | 1d                                                                                                                         |
+--------------------+----------------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | A positive number that should contain a suffix character indicating a time unit, such as, m (minutes), h (hours), d (days) |
+--------------------+----------------------------------------------------------------------------------------------------------------------------+

Example of graph configuration
------------------------------

.. code-block:: xml

	<wodle name="azure-logs">

	    <disabled>no</disabled>
	    <wday>Friday</wday>
	    <time>12:00</time>
	    <run_on_start>no</run_on_start>
	    <timeout>1800</timeout>

	    <graph>

	        <auth_path>/Azure/graph_auth.txt</auth_path>
	        <tenantdomain>wazuh.onmicrosoft.com</tenantdomain>

	        <request>
	            <tag>azure-active_directory</tag>
	            <query>activities/audit?api-version=beta</query>
	            <time_offset>1d</time_offset>
	        </request>

	    </graph>

	</wodle>

storage
-------

This option configures the integration with Azure Storage. 

- `storage\\account_name`_
- `storage\\account_key`_
- `storage\\auth_path`_
- `storage\\tag`_
- `storage\\container`_

+----------------------------------+----------------------------------------------+
| Options                          | Allowed values                               |
+==================================+==============================================+
| `storage\\account_name`_         | Any string                                   |
+----------------------------------+----------------------------------------------+
| `storage\\account_key`_          | Any string                                   |
+----------------------------------+----------------------------------------------+
| `storage\\auth_path`_            | File path                                    |
+----------------------------------+----------------------------------------------+
| `storage\\tag`_                  | Any string                                   |
+----------------------------------+----------------------------------------------+
| `storage\\container`_            | N/A                                          |
+----------------------------------+----------------------------------------------+

storage\\account_name
^^^^^^^^^^^^^^^^^^^^^

Identifier of the account name that we will use for the authentication- It must be used next to the ``account_key`` option obligatorily. Incompatible with ``auth_path`` option. 

+--------------------+--------------------+
| **Default value**  | N/A                |
+--------------------+--------------------+
| **Allowed values** | Any string         |
+--------------------+--------------------+

storage\\account_key
^^^^^^^^^^^^^^^^^^^^

Identifier of the account key that we will use for the authentication- It must be used next to the ``account_name`` option obligatorily. Incompatible with ``auth_path`` option. 

+--------------------+--------------------+
| **Default value**  | N/A                |
+--------------------+--------------------+
| **Allowed values** | Any string         |
+--------------------+--------------------+

storage\\auth_path
^^^^^^^^^^^^^^^^^^

Path of the file that contains the account name and the account key for authentication. Incompatible with ``account_name`` and ``account_key`` options.

+--------------------+--------------------+
| **Default value**  | N/A                |
+--------------------+--------------------+
| **Allowed values** | File path          |
+--------------------+--------------------+

storage\\tag
^^^^^^^^^^^^

Defines a tag that we will add to the query. This entry is optional and can be used to facilitate searches for events that are tagged or to create custom rules. 

+--------------------+--------------------+
| **Default value**  | N/A                |
+--------------------+--------------------+
| **Allowed values** | Any String         |
+--------------------+--------------------+

storage\\container
^^^^^^^^^^^^^^^^^^

+-----------------------------------------+----------------------------------------------+
| Options                                 | Allowed values                               |
+=========================================+==============================================+
| `storage\\container name`_              | Any string                                   |
+-----------------------------------------+----------------------------------------------+
| `storage\\container\\blobs`_            | Extension                                    |
+-----------------------------------------+----------------------------------------------+
| `storage\\container\\content_type`_     | text, json_file or json_inline               |
+-----------------------------------------+----------------------------------------------+
| `storage\\container\\timeout`_          | A positive number (seconds)                  |
+-----------------------------------------+----------------------------------------------+
| `storage\\container\\time_offset`_      | A positive number + suffix                   |
+-----------------------------------------+----------------------------------------------+

storage\\container name
^^^^^^^^^^^^^^^^^^^^^^^

Specifies the name of the container. Enter ``*`` to access all account containers. 

+--------------------+--------------------+
| **Default value**  | N/A                |
+--------------------+--------------------+
| **Allowed values** | Any String/"*"     |
+--------------------+--------------------+

storage\\container\\blobs
^^^^^^^^^^^^^^^^^^^^^^^^^

Specifies the extension of the blobs, like ``.json``. Enter "*" to access all blobs of the container/s. 

.. note::

    This option is related to option ``content_type``, because if any blob has a different content to the one we have indicated, it will not be read correctly. Therefore, we need to be aware of what content we are trying to obtain and take it into consideration when using this option with ``"*"``. 

+--------------------+--------------------+
| **Default value**  | N/A                |
+--------------------+--------------------+
| **Allowed values** | Extension/"*"      |
+--------------------+--------------------+

storage\\container\\content_type
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Specifies the content of the blobs.

- **text**. Plain text. Each line is a log.
- **json_file**. The blob contain records of logs in standard json format.
- **json_inline**. Each line is a log in json format. 

.. note::

	When the ``day`` option is set, the interval value must be a multiple of months. By default, the interval is set to a month.

+--------------------+----------------------------+
| **Default value**  | N/A                        |
+--------------------+----------------------------+
| **Allowed values** | text/json_file/json_inline |
+--------------------+----------------------------+

storage\\container\\timeout
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Timeout for each request evaluation. This option overwrites the general `timeout`_ option. In case the execution takes longer that the specified timeout, it stops.

+--------------------+-----------------------------+
| **Default value**  | 0                           |
+--------------------+-----------------------------+
| **Allowed values** | A positive number (seconds) |
+--------------------+-----------------------------+


storage\\container\\time_offset
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This option sets the time delay in which we will perform the query. For example, if we establish this option with the value "1d", the integration will perform the query on the events that have been generated in the interval of time defined between the current date of the system minus one day (1d) and the current date of the system. 

+--------------------+----------------------------------------------------------------------------------------------------------------------------+
| **Default value**  | 1d                                                                                                                         |
+--------------------+----------------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | A positive number that should contain a suffix character indicating a time unit, such as, m (minutes), h (hours), d (days) |
+--------------------+----------------------------------------------------------------------------------------------------------------------------+

Example of storage configuration
--------------------------------

.. code-block:: xml

    <wodle name="azure-logs">

        <disabled>no</disabled>
        <interval>1d</interval>
        <run_on_start>yes</run_on_start>

        <storage>

            <auth_path>/home/manager/Azure/storage_auth.txt</auth_path>
            <tag>azure-activity</tag>

            <container name="insights-operational-logs">
                <blobs>.json</blobs>
                <content_type>json_file</content_type>
                <time_offset>24h</time_offset>
            </container>

        </storage>
    </wodle>


Example of all integration
--------------------------

.. code-block:: xml


    <wodle name="azure-logs">

        <disabled>no</disabled>
        <day>15</day>
        <time>02:00</time>
        <run_on_start>yes</run_on_start>

        <log_analytics>

            <application_id>8b7...c14</application_id>
            <application_key>w22...91x</application_key>
            <tenantdomain>wazuh.onmicrosoft.com</tenantdomain>

            <request>
                <tag>azure-activity</tag>
                <query>AzureActivity | where SubscriptionId == "2d7...61d </query>
                <workspace>d6b...efa</workspace>
                <time_offset>36h</time_offset>
            </request>

        </log_analytics>

        <graph>

            <auth_path>/Azure/graph_auth.txt</auth_path>
            <tenantdomain>wazuh.onmicrosoft.com</tenantdomain>

            <request>
                <tag>azure-active_directory</tag>
                <query>activities/audit?api-version=beta</query>
                <timeout>7200</timeout>
                <time_offset>1d</time_offset>
            </request>

        </graph>

        <storage>

            <auth_path>/home/manager/Azure/storage_auth.txt</auth_path>
            <tag>azure-activity</tag>

            <container name="insights-operational-logs">
                <blobs>.json</blobs>
                <content_type>json_file</content_type>
                <time_offset>24h</time_offset>
            </container>

        </storage>
    </wodle>