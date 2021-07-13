.. Copyright (C) 2021 Wazuh, Inc.

* Move to the installation location and create the certificates directory:

  .. code-block:: console

    # mkdir /etc/elasticsearch/certs

#. Download the ``wazuh-cert-tool.sh`` to create the certificates:

  .. code-block:: console

    # curl -so ~/wazuh-cert-tool.sh https://packages.wazuh.com/resources/4.1/open-distro/tools/certificate-utility/wazuh-cert-tool.sh
    # curl -so ~/instances.yml https://packages.wazuh.com/resources/4.1/open-distro/tools/certificate-utility/instances.yml

Replace the values ``<node-name>`` and ``<node-ip>``  with the corresponding names and IP addresses. There can be added as many nodes fields as needed:

  .. code-block:: yaml

    # Elasticsearch nodes
    elasticsearch-nodes:
      - name: <node-name>
        ip:
          - node-IP
    
    # Wazuh server nodes
    wazuh-servers:
      - name: <node-name>
        ip:
          - node-IP      
    
    # Kibana node
    kibana:
      - name: <node-name>
        ip:
          - node-IP      
  
  To learn more about how to create and configure the certificates, see the :ref:`Certificates deployment <user_manual_certificates>` section.

* Run the ``wazuh-cert-tool.sh`` to create the certificates:

  .. code-block:: console

    #  bash ~/wazuh-cert-tool.sh

* Move the Elasticsearch certificates to their corresponding location:

  .. code-block:: console

    # mkdir /etc/elasticsearch/certs/
    # mv ~/certs/elasticsearch* /etc/elasticsearch/certs/
    # mv ~/certs/admin* /etc/elasticsearch/certs/
    # cp ~/certs/root-ca* /etc/elasticsearch/certs/



* Compress all the necessary files to be sent to all the instances:

  .. code-block:: console

    # cd ~/certs/  
    # tar -cvf certs.tar *
    # mv ~/certs/certs.tar ~/

* Copy ``certs.tar`` to all the servers of the distributed deployment. This can be done by using, for example, ``scp``. 

* If Kibana will be installed on this node, keep the certificates file. Otherwise, if the file is already copied to all the instances of the distributed deployment, remove it to increase security  ``rm -f certs.tar``.

.. End of include file
