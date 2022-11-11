.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to keep a backup of key files of your Wazuh with Elastic Stack basic installation.
  
Wazuh and Elastic Stack basic licence
=====================================

Once you've backed up the Wazuh server and agents files, follow these steps if you have installed Elastic Stack basic along with Wazuh.

#. Backup Elasticsearch configuration files.

   .. code-block:: console

      # cp -rp --parents \
      /etc/elasticsearch/jvm.options \
      /etc/elasticsearch/elasticsearch.yml \
      /usr/lib/sysctl.d/elasticsearch.conf $bkp_folder

   -  If your are using x-pack, save certificates and role mapping files.

#. Backup Kibana configuration files

   .. code-block:: console

      # cp -rp --parents \
      /etc/kibana/kibana.yml \
      /usr/share/kibana/data/wazuh/config/wazuh.yml $bkp_folder
