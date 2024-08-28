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

