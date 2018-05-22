.. Copyright (C) 2018 Wazuh, Inc.

.. _lists:

Lists
=====

You'll find many tables with items from lists provided by the Wazuh API such agents, rules, decoders, logs, etc.
All of them are sortable by specific columns, this way you could see your data in your desired order.

.. thumbnail:: ../../../images/kibana-app/tables/tables-1.png
    :title: tables-1
    :align: center
    :width: 100%

You could sort by specific column on an ascending way or descending way, depending on the arrow direction. Click on the desired arrows 
multiple times to alternate the direction.

Download CSV from content
-------------------------

You could want to download all the content from a list well formatted. You'll be able to fetch it using comma-separated values. 
Look at the bottom of any list such ruleset list or the agents list and click on *Formatted*.

.. thumbnail:: ../../../images/kibana-app/tables/tables-2.png
    :title: tables-2
    :align: center
    :width: 15%

Filters you are using to see the list will be applied to this feature.

.. note:: 

    It will download all the data provided by the Wazuh API to that list. Example: download CSV for the agents list will download all the agents.
    We recommend to set some filters before download the CSV content. Also it has a maximum limit of 99.999 items.

Pagination
----------

You don't need take care about the amount of data you are trying to fetch, we have implemented a pagination system while fetching data from 
the Wazuh API. While you are scrolling down the list, it's fetching data progressively.