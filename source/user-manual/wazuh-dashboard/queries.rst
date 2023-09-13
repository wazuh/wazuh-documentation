.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Advance filtering is possible using the Wazuh Dashboard's queries. Learn more about it in this section of the Wazuh documentation.
 
.. _dashboard-queries:

Filtering data using queries
============================

The query language to use depends on where the data is comming from:

- Wazuh API
- Wazuh indexer

Wazuh API
---------

To filter this data, the most of related search bars use WQL (Wazuh Query Language), that is a query language based in the :ref:`Wazuh API query language <queries>`.

.. thumbnail:: ../../images/wazuh-dashboard/queries/search-bar-wql.png
    :title: Search bar using WQL with implicit filter
    :align: left
    :width: 100%

It supports 2 modes:

* **explicit**: Define the field, operator and value. This mode is enabled when it finds a field and operator tokens.
    * **Field name**: Field name to filter by. If an incorrect field name is used, an validation error will be displayed.
    * **Operator**: Operator to filter by:
        * ``=``: equality.
        * ``!=``: not equality.
        * ``<``: smaller.
        * ``>``: bigger.
        * ``~``: like as.
        * ``()``: grouping operators. Group queries.
    * **Value**: Value to filter by.

    .. note::
        * Value without spaces can be literal.
        * Value with spaces or containing the double quote character (**"**) must be wrapped by a pair of double quotes (**""**). The double quote (**"**) can be escaped using **\\"**.

    * **Separator**: Operator to join multiple "queries":
        * ``or``: represents an ``OR``.
        * ``and``: represents an ``AND``.
    
    .. note::

        The tokens can be separated by whitespaces.
        
* **search term**: use a term to search in the available fields. Under the hood, this search is translated to query in each field supported by the explicit mode using the like as operator (~).

.. warning::

    Theses modes can not be combined.

Some search bars can include an implicit filter, that is added to the user query, as for example in the Agents section.

.. thumbnail:: ../../images/wazuh-dashboard/queries/search-bar-wql-with-implicit-filter.png
    :title: Search bar using WQL with implicit filter
    :align: left
    :width: 100%

Examples
^^^^^^^^

* Explicit mode

For example, to filter by entities whose **id** is equal to a specific value:

    .. code-block:: none

        id=001

    .. note::

        It is possible to use whitespace between the tokens.

    .. code-block:: none

        id = 001

To get more precise results, use a query with multiple statements using the logical operators (**and** or **or**) and/or grouping operators (**()**).

To filter by an agent that is active and the OS platform contains linux:

    .. code-block:: none

        status=active and os.platform~linux

To filter by an agent that was never connected, its IP contains 240 or the OS platform contains linux:

    .. code-block:: none

        status!=never_connected and ip~240 and os.platform~linux

To filter by an agent that was never connected and its IP contains 240, or its ID is equal to 001:

    .. code-block:: none

        ( status!=never_connected and ip~240 ) or id=001

* Search term mode

.. code-block:: none

    linux

Wazuh Indexer
-------------

See https://opensearch.org/docs/2.8/dashboards/discover/dql/.