.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh Query Language (WQL) is a text-based language designed to allow users to perform advanced data filtering in the Wazuh dashboard. Learn more in this section of the documentation.

Filtering data using Wazuh Query Language (WQL)
===============================================

Wazuh Query Language (WQL) is a text-based language designed to allow users to perform advanced data filtering in the Wazuh dashboard. WQL stands out with its user-friendly syntax which leverages the Wazuh server API to facilitate advanced data analysis to gain security insights.

Beyond basic data retrieval, WQL extends the functionality of the Wazuh dashboard search bars, particularly within specialized tabs. This provides a seamless user experience, allowing for intuitive navigation and data manipulation on the Wazuh dashboard.

This guide shows the specifics of operators, values, separators, and the unique syntax of WQL. With WQL, you can filter for specific threat group names or conduct a broad search for related terms. WQL is case-sensitive, meaning it differentiates between uppercase and lowercase letters. Therefore, when writing queries, it is important to use the correct case for identifiers, keywords, and other elements to ensure accurate and effective query execution.

The WQL expands the search bar functionality to specialized tabs on the Wazuh dashboard. These tabs include the following:

-  Security Configuration Assessment
-  Endpoint summary
-  MITRE ATT&CK Intelligence
-  Agent Inventory data
-  Rule management
-  Decoder management
-  CDB list management
-  Group management

WQL queries
-----------

WQL enables precise data retrieval by defining detailed criteria. This approach requires defining the field, operator, and value, ensuring the return of accurate and relevant data. The structure of these queries follows a simple pattern: ``fieldname operator value``.

Field name
^^^^^^^^^^

In WQL, "Field name" indicates the particular data type you want to filter, serving as the starting point in a query. It precedes the operator, pinpointing the exact data segment for targeted text searches. The image below demonstrates the WQL search bar in action on the **MITRE ATT&CK** > **Intelligence** tab. A click on the search bar reveals all available field names, enhancing user guidance and intuition.

.. thumbnail:: /images/wazuh-dashboard/queries/intelligence-field-names.png
   :align: center
   :width: 80%
   :title: Intelligence - Field names
   :alt: Intelligence - Field names

The Wazuh dashboard displays a validation error if you use an incorrect field name.

.. thumbnail:: /images/wazuh-dashboard/queries/intelligence-validation-error.png
   :align: center
   :width: 80%
   :title: Intelligence - Field names validation error
   :alt: Intelligence - Field names validation error

Operators
^^^^^^^^^

In the Wazuh Query Language, operators enable precise data filtering and guide the flow of operations to generate desired outcomes. The key operators in WQL are:

-  ``=`` for equality
-  ``!=`` for inequality
-  ``>`` for greater than
-  ``<`` for less than
-  ``~`` for like as

Equality (=)
~~~~~~~~~~~~

This filter operator is used to find exact matches within a dataset. It is also known as equals to and is denoted by the symbol ``=``. For example, you can filter by entities whose ``os.name`` is equal to a specific value such as “Debian”.

.. thumbnail:: /images/wazuh-dashboard/queries/os_name-debian.png
   :align: center
   :width: 80%
   :title: os.name equals to Debian
   :alt: os.name equals to Debian

Inequality (!=)
~~~~~~~~~~~~~~~

This filter operator finds all data that do not match the specified value within a dataset. It is also known as *not equal to* and denoted by the symbol ``!=``. For example, you can filter by entities whose network protocol does not equal a specific value, such as *ipv6*.

.. thumbnail:: /images/wazuh-dashboard/queries/protocol-not-ipv6.png
   :align: center
   :width: 80%
   :title: Protocol not equal to ipv6
   :alt: Protocol not equal to ipv6

Greater than ( > )
~~~~~~~~~~~~~~~~~~

This *greater than* (``>``) operator filters values exceeding a specified threshold in a dataset. For example, you can filter by entities whose local port number is greater than a specific value such as *36271* with the query ``local.port>36271``.

.. thumbnail:: /images/wazuh-dashboard/queries/port-greater-than-value.png
   :align: center
   :width: 80%
   :title: Port greater than value
   :alt: Port greater than value

Less than (<)
~~~~~~~~~~~~~

This *less than* (``<``) operator filters values below a specified limit in a dataset. For example, you can filter by entities whose local port number is less than a specific value such as *53770* with the query ``local.port<53770``.

.. thumbnail:: /images/wazuh-dashboard/queries/port-less-than-value.png
   :align: center
   :width: 80%
   :title: Port less than value
   :alt: Port less than value

Like as (~)
~~~~~~~~~~~

The *like as* operator (``~``) enables pattern matching, allowing data retrieval when a specified field matches a given pattern. It offers flexibility by finding records with partial matches. For example, the image below shows how to filter threat groups with names similar to “APT1”:

.. thumbnail:: /images/wazuh-dashboard/queries/filter-similar-name-groups.png
   :align: center
   :width: 80%
   :title: Filter similar name groups
   :alt: Filter similar name groups

Consider a query aimed at finding descriptions that include the terms "threat group" shown below:

.. thumbnail:: /images/wazuh-dashboard/queries/filter-similar-description-groups.png
   :align: center
   :width: 80%
   :title: Filter similar description groups
   :alt: Filter similar description groups

The query matches documents containing any search terms, irrespective of their order. By default, the query logic treats multiple search terms inclusively, using an *or* combination.

Value
^^^^^

*Value* is the specific data that is being filtered for. It represents the condition used to narrow down the results of a query. For instance, to display an entity named ``wazuh-agent``, the query would be structured accordingly:

.. code-block:: none

   name=wazuh-agent

.. thumbnail:: /images/wazuh-dashboard/queries/filter-value.png
   :align: center
   :width: 80%
   :title: Filter value
   :alt: Filter value

As shown in the example above, no additional formatting is necessary when filtering for values without spaces. You must wrap the value with a pair of double quotes ``" "`` if it contains spaces or the double quote character (").

.. code-block:: none

   name="Agent Tesla"

.. thumbnail:: /images/wazuh-dashboard/queries/filter-value-spaces.png
   :align: center
   :width: 80%
   :title: Filter value with spaces
   :alt: Filter value with spaces

.. note::

   The double quote ``"`` can be escaped using ``\``. For example: ``"value with whitespaces and escaped \"quotes\""`` represents ``value with whitespaces and escaped "quotes"``.

Separators
^^^^^^^^^^

*Separators* are operators that combine multiple queries for complex filtering. WQL supports the use of the ``and`` and ``or`` boolean operators.

.. note::

   WQL is case sensitive and supports only lowercase separators, hence ``AND`` & ``OR`` are invalid.

or separator
~~~~~~~~~~~~

The *or* logical operator, denoted as a comma (``,``), merges various conditions within a query, requiring at least one condition to be true for the query to succeed. For example, we show the query to filter software named “Bumblebee” or “Avenger” below:

.. code-block:: none

   name=Bazar or name=Avenger

.. thumbnail:: /images/wazuh-dashboard/queries/or-filter-names.png
   :align: center
   :width: 80%
   :title: OR filter names
   :alt: OR filter names

and separator
~~~~~~~~~~~~~

The *and* logical operator, denoted as a semicolon (``;``), links several conditions in a query, requiring all conditions to be met for the overall query to succeed. For example, run the following query to filter agents whose status is “disconnected”, and whose operating system platform is “debian”:

.. code-block:: none

   status=disconnected and os.platform=debian

.. thumbnail:: /images/wazuh-dashboard/queries/and-filter.png
   :align: center
   :width: 80%
   :title: AND filter
   :alt: AND filter

Grouping operators
^^^^^^^^^^^^^^^^^^

WQL utilizes parentheses ``()`` to prioritize expressions, ensuring those within are assessed first. This approach structures the enclosed expressions as singular units within broader queries, guiding the order of evaluation.

.. code-block:: none

   ( status=active and ip!=192.168.56.195 ) or id=001

.. thumbnail:: /images/wazuh-dashboard/queries/grouping-operators.png
   :align: center
   :width: 80%
   :title: Grouping operators
   :alt: Grouping operators

Wildcards
---------

WQL does not support the use of wildcards represented as ``*``.

.. thumbnail:: /images/wazuh-dashboard/queries/wildcards-not-supported.png
   :align: center
   :width: 80%
   :title: Wildcards not supported
   :alt: Wildcards not supported

Whitespaces
-----------

WQL supports the use of whitespaces between data tokens.

.. code-block:: none

   status = disconnected and os.name = debian

.. thumbnail:: /images/wazuh-dashboard/queries/whitespaces-supported.png
   :align: center
   :width: 80%
   :title: Whitespaces are supported
   :alt: Whitespaces are supported

Ranges
------

WQL supports numeric inequalities using the ``>``, and ``<`` operators. For example:

.. code-block:: none

   local.port>36271 and local.port<53771

.. thumbnail:: ../../images/wazuh-dashboard/queries/port-ranges.png
   :align: center
   :width: 80%
   :title: Port ranges
   :alt: Port ranges

Example: Sending WQL queries with cURL
--------------------------------------

For example, the following query would be used to filter Ubuntu endpoints with a version higher than 18. We encode the value of the parameter ``q`` with the ``--data-urlencode`` flag:

.. code-block:: console

   # curl -G --data-urlencode "q=os.name=ubuntu;os.version>18" -k -X GET "https://localhost:55000/agents?limit=500&pretty=true&select=id,name,os.name,os.version,os.codename,os.major" -H  "Authorization: Bearer $TOKEN"

.. code-block:: none
   :class: output

   {
      "data": {
         "affected_items": [
            {
               "os": {
                  "codename": "Bionic Beaver",
                  "major": "18",
                  "name": "Ubuntu",
                  "version": "18.04.4 LTS"
               },
               "name": "wazuh-master",
               "id": "000"
            },
            {
               "os": {
                  "codename": "Bionic Beaver",
                  "major": "18",
                  "name": "Ubuntu",
                  "version": "18.04.4 LTS"
               },
               "name": "wazuh-agent4",
               "id": "004"
            },
            {
               "os": {
                  "codename": "Bionic Beaver",
                  "major": "18",
                  "name": "Ubuntu",
                  "version": "18.04.4 LTS"
               },
               "name": "wazuh-agent5",
               "id": "005"
            },
            {
               "os": {
                  "codename": "Bionic Beaver",
                  "major": "18",
                  "name": "Ubuntu",
                  "version": "18.04.4 LTS"
               },
               "name": "wazuh-agent6",
               "id": "006"
            },
            {
               "os": {
                  "codename": "Bionic Beaver",
                  "major": "18",
                  "name": "Ubuntu",
                  "version": "18.04.4 LTS"
               },
               "name": "wazuh-agent7",
               "id": "007"
            },
            {
               "os": {
                  "codename": "Bionic Beaver",
                  "major": "18",
                  "name": "Ubuntu",
                  "version": "18.04.4 LTS"
               },
               "name": "wazuh-agent8",
               "id": "008"
            },
            {
               "os": {
                  "codename": "Bionic Beaver",
                  "major": "18",
                  "name": "Ubuntu",
                  "version": "18.04.2 LTS"
               },
               "name": "wazuh-agent9",
               "id": "009"
            },
            {
               "os": {
                  "codename": "Bionic Beaver",
                  "major": "18",
                  "name": "Ubuntu",
                  "version": "18.04.2 LTS"
               },
               "name": "wazuh-agent10",
               "id": "010"
            }
         ],
         "total_affected_items": 8,
         "total_failed_items": 0,
         "failed_items": []
      },
      "message": "All selected agents information was returned",
      "error": 0
   }

You can use the same field multiple times for more accurate results. For example, filtering Wazuh agents running on a Ubuntu endpoint with a version higher than 18 but lower than 18.04.4:

.. code-block:: console

   # curl -G --data-urlencode "q=os.name=ubuntu;os.version>18;os.version<18.04.4" -k -X GET "https://localhost:55000/agents?limit=500&pretty=true&select=id,name,os.name,os.version,os.codename,os.major" -H  "Authorization: Bearer $TOKEN"

.. code-block:: none
   :class: output

   {
      "data": {
         "affected_items": [
            {
               "os": {
                  "codename": "Bionic Beaver",
                  "major": "18",
                  "name": "Ubuntu",
                  "version": "18.04.2 LTS"
               },
               "name": "wazuh-agent9",
               "id": "009"
            },
            {
               "os": {
                  "codename": "Bionic Beaver",
                  "major": "18",
                  "name": "Ubuntu",
                  "version": "18.04.2 LTS"
               },
               "name": "wazuh-agent10",
               "id": "010"
            }
         ],
         "total_affected_items": 2,
         "total_failed_items": 0,
         "failed_items": []
      },
      "message": "All selected agents information was returned",
      "error": 0
   }

An example of using the *or* (``,``) separator and *like as* (``~``) operator can be filtering Wazuh agents whose operating system name contains ``windows`` or ``centos``.

.. code-block:: console

   # curl -G --data-urlencode "q=os.name~centos,os.name~windows" -k -X GET "https://localhost:55000/agents?limit=500&pretty=true&select=id,name,os.name,os.version,os.codename,os.major" -H  "Authorization: Bearer $TOKEN"

.. code-block:: none
   :class: output

   {
      "data": {
         "affected_items": [
            {
               "os": {
                  "major": "6",
                  "name": "Microsoft Windows 7 Ultimate Edition Professional Service Pack 1",
                  "version": "6.1.7601"
               },
               "name": "jmv74211-PC",
               "id": "013"
            }
         ],
         "total_affected_items": 1,
         "total_failed_items": 0,
         "failed_items": []
      },
      "message": "All selected agents information was returned",
      "error": 0
   }

Getting Wazuh agents installed on Ubuntu  endpoints with ID greater than 0 and lower than 4, whose name contains the substring ``waz`` and whose major version is 16 or 18:

.. code-block:: console

   # curl -G --data-urlencode "q=id!=0;id<4;name~waz;(os.major=16,os.major=18)" -k -X GET "https://localhost:55000/agents?limit=500&pretty=true&select=id,name,os.name,os.version,os.codename,os.major" -H  "Authorization: Bearer $TOKEN"

.. code-block:: none
   :class: output

   {
      "data": {
         "affected_items": [
            {
               "os": {
                  "codename": "Xenial Xerus",
                  "major": "16",
                  "name": "Ubuntu",
                  "version": "16.04.6 LTS"
               },
               "name": "wazuh-agent1",
               "id": "001"
            },
            {
               "os": {
                  "codename": "Xenial Xerus",
                  "major": "16",
                  "name": "Ubuntu",
                  "version": "16.04.6 LTS"
               },
               "name": "wazuh-agent2",
               "id": "002"
            },
            {
               "os": {
                  "codename": "Xenial Xerus",
                  "major": "16",
                  "name": "Ubuntu",
                  "version": "16.04.6 LTS"
               },
               "name": "wazuh-agent3",
               "id": "003"
            }
         ],
         "total_affected_items": 3,
         "total_failed_items": 0,
         "failed_items": []
      },
      "message": "All selected agents information was returned",
      "error": 0
   }

Getting Wazuh agents with an ID higher than ``007`` that run on Windows or whose operating system major version is either 14 or 18:

.. code-block:: console

   # curl -G --data-urlencode "q=id>007;(os.name~windows,(os.major=14,os.major=18))" -k -X 500GET "https://localhost:55000/agents?limit=500&pretty=true&select=id,name,os.name,os.version,os.codename,os.major" -H  "Authorization: Bearer $TOKEN"

.. code-block:: none
   :class: output

   {
      "data": {
         "affected_items": [
            {
               "os": {
                  "codename": "Bionic Beaver",
                  "major": "18",
                  "name": "Ubuntu",
                  "version": "18.04.4 LTS"
               },
               "name": "wazuh-agent8",
               "id": "008"
            },
            {
               "os": {
                  "codename": "Bionic Beaver",
                  "major": "18",
                  "name": "Ubuntu",
                  "version": "18.04.2 LTS"
               },
               "name": "wazuh-agent9",
               "id": "009"
            },
            {
               "os": {
                  "codename": "Bionic Beaver",
                  "major": "18",
                  "name": "Ubuntu",
                  "version": "18.04.2 LTS"
               },
               "name": "wazuh-agent10",
               "id": "010"
            },
            {
               "os": {
                  "major": "6",
                  "name": "Microsoft Windows 7 Ultimate Edition Professional Service Pack 1",
                  "version": "6.1.7601"
               },
               "name": "jmv74211-PC",
               "id": "013"
            }
         ],
         "total_affected_items": 4,
         "total_failed_items": 0,
         "failed_items": []
      },
      "message": "All selected agents information was returned",
      "error": 0
   }
