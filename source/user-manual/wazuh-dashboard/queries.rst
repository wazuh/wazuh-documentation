.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Advance filtering is possible using the Wazuh Dashboard's queries. Learn more about it in this section of the Wazuh documentation.
 
.. _dashboard-queries:

Filtering data using queries
============================

The query language to use depends on where the data is coming from:

- Wazuh API
- Wazuh indexer

Wazuh API queries
-----------------

The WQL search bars found in various sections of the Wazuh dashboard, use the Wazuh Query Language to query the API. This language is based on the :ref:`Wazuh API query language <queries>`.

.. thumbnail:: ../../images/wazuh-dashboard/queries/search-bar-wql.png
    :title: Search bar using WQL with implicit filter
    :alt: Search bar using WQL with implicit filter
    :align: left
    :width: 100%


There are two query modes:

- :ref:`explicit <explicit_queries>`: The search includes a field, operator and value.

- :ref:`search term <search_term_queries>`: Uses a term to search in the available fields.

.. _explicit_queries:

Explicit queries
^^^^^^^^^^^^^^^^

These queries include a field, operator and value. This mode is enabled when it finds a field and operator tokens.

   - **Field name**: Field name to filter by. If an incorrect field name is used, a validation error is displayed.

   - **Operator**: Operator to filter by. The available operators are:

      - ``=``: equality.
      - ``!=``: not equality.
      - ``<``: smaller.
      - ``>``: bigger.
      - ``~``: like as.
      - ``()``: grouping operators. Group queries.

   - **Value**: Value to filter by.

      - Note that values without spaces can be literal.
      - Values with spaces or containing the double quote character (**"**) must be wrapped by a pair of double quotes (**""**). The double quote (**"**) can be escaped using **\\"**.

   - **Separator**: Operator to join multiple "queries".

      - ``or``: represents an ``OR``.
      - ``and``: represents an ``AND``.
    
    .. note::

        The tokens can be separated by whitespaces.

Note that some search bars include an implicit filter, that is added to the user query. For example, the search bar in the **Agents** section includes the ``id!=000`` filter.

.. thumbnail:: ../../images/wazuh-dashboard/queries/search-bar-wql-with-implicit-filter.png
    :title: Search bar using WQL with implicit filter
    :align: left
    :width: 100%

.. _search_term_queries:

Search term queries
^^^^^^^^^^^^^^^^^^^

Use a term to search in the available fields. Under the hood, this search is translated to query in each field supported by the explicit mode using the like as operator ``~``.

.. warning::

    The explicit and search term modes can't be combined.


Query examples
^^^^^^^^^^^^^^

Explicit mode
~~~~~~~~~~~~~

- Filter by entities whose **id** is equal to a specific value:

   .. code-block:: none

      id=001

   .. note::
      :class: not-long

      It is possible to use whitespace between the tokens.

      .. code-block:: none

         id = 001

To get more precise results, use a query with multiple statements using the logical operators (**and** or **or**) and/or grouping operators (**()**).

- Filter by an agent that is active and the OS platform contains linux:

   .. code-block:: none

      status=active and os.platform~linux

- Filter by an agent that was never connected, its IP contains 240 or the OS platform contains linux:

   .. code-block:: none

      status!=never_connected and ip~240 and os.platform~linux

- Filter by an agent that was never connected and its IP contains 240, or its ID is equal to 001:

   .. code-block:: none

      ( status!=never_connected and ip~240 ) or id=001


Search term mode
~~~~~~~~~~~~~~~~

- Search the term ``linux`` in the available fields:

.. code-block:: none

    linux


Wazuh Indexer
-------------

See https://opensearch.org/docs/2.8/dashboards/discover/dql/.