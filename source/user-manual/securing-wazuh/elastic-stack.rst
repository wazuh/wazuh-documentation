.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Learn how to secure Elasticsearch.

.. _user_manual_secure_elasticsearch:

Change the Elasticsearch passwords
==================================


    During the installation of Wazuh with Elastic Stack basic license, the passwords for the different users were automatically generated. These passwords can be changed afterward using API requests. Replace the following variables and execute the corresponding API call: 

      - ``<elasticsearch_ip>``: The IP address of the Elasticsearch node.
      - ``<username>``: The name of the user whose password is going to be changed.
      - ``<user_password>``: Current user password. 
      - ``<new_password>``: The new password that will be assigned to the ``<username>`` user.

    .. code-block:: console
 
      # curl -k -X POST -u <username>:<user_password> "https://<elasticsearch_ip>:9200/_security/user/<username>/_password?pretty" -H 'Content-Type: application/json' -d '
      # {
      #   "password" : "<new_password>"
      # }
      # '

    If the call is successful, it returns an empty JSON structure ``{ }``.  
    
    The password may need to be updated in ``/etc/filebeat/filebeat.yml`` and ``/etc/kibana/kibana.yml``. 
    