.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Check out how to upgrade Wazuh installed in Kubernetes, creating a new pod linked to the same volume but with the new updated version.

.. _kubernetes_upgrade:

Upgrade Wazuh installed in Kubernetes
=====================================

Checking which files are exported to the volume
-----------------------------------------------

Our Kubernetes deployment uses our Wazuh images from Docker. If we look at the following code extracted from the Wazuh configuration using Docker, we can see which directories and files are used in the upgrade.

.. code-block:: none
    
    /var/ossec/api/configuration
    /var/ossec/etc
    /var/ossec/logs
    /var/ossec/queue
    /var/ossec/var/multigroups
    /var/ossec/integrations
    /var/ossec/active-response/bin
    /var/ossec/agentless
    /var/ossec/wodles
    /etc/filebeat
    /var/lib/filebeat
    /usr/share/wazuh-dashboard/config/
    /usr/share/wazuh-dashboard/certs/
    /var/lib/wazuh-indexer
    /usr/share/wazuh-indexer/certs/
    /usr/share/wazuh-indexer/opensearch.yml
    /usr/share/wazuh-indexer/opensearch-security/internal_users.yml


Any modification related to these files will also be made in the associated volume. When the replica pod is created, it will get those files from the volume, keeping the previous changes.


Recreate certificates
---------------------

Due to changes made in version v4.8.0 of Wazuh, it is mandatory to recreate the SSL certificates before applying the changes of the new version, so any update from a version prior to Wazuh v4.8.0 to an equal or later version must :ref:`recreate your certificates. <kubernetes_ssl_certificates>`


Configuring the upgrade
-----------------------

To upgrade to version |WAZUH_CURRENT_MINOR|, you can follow one of two strategies.

-  `Using default manifests`_ : This strategy uses the default manifests for Wazuh |WAZUH_CURRENT_MINOR|. It replaces the wazuh-kubernetes manifests of your outdated Wazuh version.
-  `Keeping custom manifests`_ : This strategy preserves the wazuh-kubernetes manifests of your outdated Wazuh deployment. It ignores the manifests of the latest Wazuh version.

Using default manifests
^^^^^^^^^^^^^^^^^^^^^^^

#. Checkout the tag for the current version of wazuh-kubernetes:

   .. code-block::

      # git checkout v|WAZUH_CURRENT_DOCKER|

#. `Apply the new configuration`_

Keeping custom manifests
^^^^^^^^^^^^^^^^^^^^^^^^

In Wazuh 4.4, some paths are different to those in earlier versions. You have to update the old paths with the new ones if you are keeping your custom manifests.

``old-path`` -> ``new-path``

-  ``/usr/share/wazuh-dashboard/config/certs/`` -> ``/usr/share/wazuh-dashboard/certs/``
-  ``/usr/share/wazuh-indexer/config/certs/`` -> ``/usr/share/wazuh-indexer/certs/``
-  ``/usr/share/wazuh-indexer/plugins/opensearch-security/securityconfig/`` -> ``/usr/share/wazuh-indexer/opensearch-security/``

To upgrade your deployment keeping your custom manifests, do the following.

#. If you are updating from 4.3, edit the following files and update them with the new paths in 4.4. You can see the new paths next to each file in the samples below.

   -  ``wazuh/indexer_stack/wazuh-dashboard/dashboard-deploy.yaml``

      .. code-block:: yaml

         image: 'wazuh/wazuh-dashboard:|WAZUH_CURRENT_KUBERNETES|'
         mountPath: /usr/share/wazuh-dashboard/certs/cert.pem
         mountPath: /usr/share/wazuh-dashboard/certs/key.pem
         mountPath: /usr/share/wazuh-dashboard/certs/root-ca.pem
         value: /usr/share/wazuh-dashboard/certs/cert.pem
         value: /usr/share/wazuh-dashboard/certs/key.pem

   -  ``wazuh/indexer_stack/wazuh-dashboard/dashboard_conf/opensearch_dashboards.yml``

      .. code-block:: yaml

         server.ssl.key: "/usr/share/wazuh-dashboard/certs/key.pem"
         server.ssl.certificate: "/usr/share/wazuh-dashboard/certs/cert.pem"
         opensearch.ssl.certificateAuthorities: ["/usr/share/wazuh-dashboard/certs/root-ca.pem"]

   -  ``wazuh/indexer_stack/wazuh-indexer/cluster/indexer-sts.yaml``

      .. code-block:: yaml

         image: 'wazuh/wazuh-indexer:|WAZUH_CURRENT_KUBERNETES|'
         mountPath: /usr/share/wazuh-indexer/certs/node-key.pem
         mountPath: /usr/share/wazuh-indexer/certs/node.pem
         mountPath: /usr/share/wazuh-indexer/certs/root-ca.pem
         mountPath: /usr/share/wazuh-indexer/certs/admin.pem
         mountPath: /usr/share/wazuh-indexer/certs/admin-key.pem
         mountPath: /usr/share/wazuh-indexer/opensearch.yml
         mountPath: /usr/share/wazuh-indexer/opensearch-security/internal_users.yml

   -  ``wazuh/indexer_stack/wazuh-indexer/indexer_conf/opensearch.yml``

      .. code-block:: yaml

         plugins.security.ssl.http.pemcert_filepath: /usr/share/wazuh-indexer/certs/node.pem
         plugins.security.ssl.http.pemkey_filepath: /usr/share/wazuh-indexer/certs/node-key.pem
         plugins.security.ssl.http.pemtrustedcas_filepath: /usr/share/wazuh-indexer/certs/root-ca.pem
         plugins.security.ssl.transport.pemcert_filepath: /usr/share/wazuh-indexer/certs/node.pem
         plugins.security.ssl.transport.pemkey_filepath: /usr/share/wazuh-indexer/certs/node-key.pem
         plugins.security.ssl.transport.pemtrustedcas_filepath: /usr/share/wazuh-indexer/certs/root-ca.pem

   -  ``wazuh/wazuh_managers/wazuh-master-sts.yaml``

      .. code-block:: yaml

         image: 'wazuh/wazuh-manager:|WAZUH_CURRENT_KUBERNETES|'

   -  ``wazuh/wazuh_managers/wazuh-worker-sts.yaml``

      .. code-block:: yaml

         image: 'wazuh/wazuh-manager:|WAZUH_CURRENT_KUBERNETES|'

#. `Apply the new configuration`_

Apply the new configuration
---------------------------

The last step is to apply the new configuration:

- EKS cluster

    .. code-block:: console

         $ kubectl apply -k envs/eks/

- Other cluster types

    .. code-block:: console

         $ kubectl apply -k envs/local-env/


.. code-block:: none
    :class: output

     statefulset.apps "wazuh-manager-master" configured

This process will end the old pod while creating a new one with the new version, linked to the same volume. Once the Pods are booted, the update will be ready, and we can check the new version of Wazuh installed, the cluster, and the changes that have been maintained through the use of the volumes.
