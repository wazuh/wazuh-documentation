.. Copyright (C) 2022 Wazuh, Inc.

.. _user_manual_uninstall_wazuh_installation_basic:

Uninstalling Wazuh with Elastic Stack
======================================

This document will give instructions to uninstall each Wazuh component. 

.. _basic_uninstall_manager:

Uninstall the Wazuh manager
---------------------------

.. tabs::


  .. group-tab:: Yum


    .. include:: ../../_templates/installations/basic/wazuh/yum/uninstall_wazuh_manager_api.rst



  .. group-tab:: APT


    .. include:: ../../_templates/installations/basic/wazuh/deb/uninstall_wazuh_manager_api.rst



  .. group-tab:: ZYpp


    .. include:: ../../_templates/installations/basic/wazuh/zypp/uninstall_wazuh_manager_api.rst


.. include:: ../../_templates/installations/wazuh/common/disable_wazuh_manager_service.rst

.. _basic_uninstall_filebeat:

Uninstall Filebeat
------------------



.. tabs::


  .. group-tab:: Yum


    .. include:: ../../_templates/installations/basic/elastic/yum/uninstall_filebeat.rst



  .. group-tab:: APT


    .. include:: ../../_templates/installations/basic/elastic/deb/uninstall_filebeat.rst



  .. group-tab:: ZYpp  


    .. include:: ../../_templates/installations/basic/elastic/deb/uninstall_filebeat.rst



.. _basic_uninstall_elasticsearch:

Uninstall Elasticsearch
-----------------------


.. tabs::


  .. group-tab:: Yum


    .. include:: ../../_templates/installations/basic/elastic/yum/uninstall_elasticsearch.rst



  .. group-tab:: APT


    .. include:: ../../_templates/installations/basic/elastic/deb/uninstall_elasticsearch.rst



  .. group-tab:: ZYpp


    .. include:: ../../_templates/installations/basic/elastic/zypp/uninstall_elasticsearch.rst

   



.. _basic_uninstall_kibana:

Uninstall Kibana
----------------

.. tabs::


  .. group-tab:: Yum


    .. include:: ../../_templates/installations/basic/elastic/yum/uninstall_kibana.rst



  .. group-tab:: APT


    .. include:: ../../_templates/installations/basic/elastic/deb/uninstall_kibana.rst



  .. group-tab:: ZYpp


    .. include:: ../../_templates/installations/basic/elastic/zypp/uninstall_kibana.rst   




