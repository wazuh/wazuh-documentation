.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: In this section of the Wazuh documentation, you will find the instructions to uninstall each Wazuh component. Learn more here. 
  
Uninstalling Wazuh with Open Distro for Elasticsearch
=====================================================

This document will give instructions to uninstall each Wazuh component. 

Uninstall the Wazuh manager
---------------------------

.. tabs::


  .. group-tab:: Yum


    .. include:: ../../_templates/installations/wazuh/yum/uninstall_wazuh_manager_api.rst



  .. group-tab:: APT


    .. include:: ../../_templates/installations/wazuh/deb/uninstall_wazuh_manager_api.rst



  .. group-tab:: ZYpp


    .. include:: ../../_templates/installations/wazuh/zypp/uninstall_wazuh_manager_api.rst


.. include:: ../../_templates/installations/wazuh/common/disable_wazuh_manager_service.rst

Uninstall Filebeat
---------------------



.. tabs::


  .. group-tab:: Yum


    .. include:: ../../_templates/installations/elastic/yum/uninstall_filebeat.rst



  .. group-tab:: APT


    .. include:: ../../_templates/installations/elastic/deb/uninstall_filebeat.rst



  .. group-tab:: ZYpp  


    .. include:: ../../_templates/installations/elastic/deb/uninstall_filebeat.rst


Uninstall Elasticsearch
-----------------------


.. tabs::


  .. group-tab:: Yum


    .. include:: ../../_templates/installations/elastic/yum/uninstall_elasticsearch.rst



  .. group-tab:: APT


    .. include:: ../../_templates/installations/elastic/deb/uninstall_elasticsearch.rst



  .. group-tab:: ZYpp


    .. include:: ../../_templates/installations/elastic/zypp/uninstall_elasticsearch.rst


Uninstall Kibana
----------------

.. tabs::


  .. group-tab:: Yum


    .. include:: ../../_templates/installations/elastic/yum/uninstall_kibana.rst



  .. group-tab:: APT


    .. include:: ../../_templates/installations/elastic/deb/uninstall_kibana.rst



  .. group-tab:: ZYpp


    .. include:: ../../_templates/installations/elastic/zypp/uninstall_kibana.rst   
