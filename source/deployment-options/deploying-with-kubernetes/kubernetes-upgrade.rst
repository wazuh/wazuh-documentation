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


Recreating certificates
-----------------------

Upgrading from a version earlier than v4.8.0 requires that you recreate the SSL certificates. Follow instructions in :ref:`kubernetes_ssl_certificates` using the v|WAZUH_CURRENT_KUBERNETES| tag.


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

To upgrade your deployment keeping your custom manifests, do the following.

#. If you are upgrading from 4.3, some paths are different. You have to update the old paths with the new ones in the following manifests:


   ``Wazuh dashboard``

      -  ``/usr/share/wazuh-dashboard/config/certs/`` -> ``/usr/share/wazuh-dashboard/certs/``

         .. code-block::  bash

            wazuh/indexer_stack/wazuh-dashboard/dashboard-deploy.yaml
            wazuh/indexer_stack/wazuh-dashboard/dashboard_conf/opensearch_dashboards.yml

   ``Wazuh indexer``

      -  ``/usr/share/wazuh-indexer/config/certs/`` -> ``/usr/share/wazuh-indexer/certs/``

         .. code-block::  bash

            wazuh/indexer_stack/wazuh-indexer/cluster/indexer-sts.yaml
            wazuh/indexer_stack/wazuh-indexer/indexer_conf/opensearch.yml

      -  ``/usr/share/wazuh-indexer/config/opensearch.yml`` -> ``/usr/share/wazuh-indexer/opensearch.yml``

         .. code-block::  bash

            wazuh/indexer_stack/wazuh-indexer/cluster/indexer-sts.yaml

      -  ``/usr/share/wazuh-indexer/plugins/opensearch-security/securityconfig/`` -> ``/usr/share/wazuh-indexer/opensearch-security/``

         .. code-block::  bash

            wazuh/indexer_stack/wazuh-indexer/cluster/indexer-sts.yaml

#. If you are upgrading from a version earlier than 4.8, the defaultRoute parameter into Wazuh dashboard configuration was changed.

   -  ``wazuh/indexer_stack/wazuh-dashboard/dashboard_conf/opensearch_dashboards.yml``

      .. code-block:: yaml

         uiSettings.overrides.defaultRoute: /app/wz-home

   It also requires modifying the CN in the opensearch.yml file for Wazuh indexer and modifying all Wazuh indexer URLs in the deployment:

   -  ``wazuh/indexer_stack/wazuh-indexer/indexer_conf/opensearch.yml``

      .. code-block:: yaml

         plugins.security.nodes_dn:
           - CN=indexer,O=Company,L=California,C=US

   -  ``wazuh/indexer_stack/wazuh-dashboard/dashboard-deploy.yaml``

      .. code-block:: yaml

         env:
           - name: INDEXER_URL
             value: 'https://indexer:9200'

   -  ``wazuh/wazuh_managers/wazuh-master-sts.yaml``

      .. code-block:: yaml

         env:
           - name: INDEXER_URL
             value: 'https://indexer:9200'

   -  ``wazuh/wazuh_managers/wazuh-worker-sts.yaml``

      .. code-block:: yaml

         env:
           - name: INDEXER_URL
             value: 'https://indexer:9200'


   In addition for older versions, several parameters were modified within the Wazuh manager ``ossec.conf`` file, so it is mandatory to use the files stored in ``wazuh/wazuh_managers/wazuh_conf/master.conf`` and ``wazuh/wazuh_managers/wazuh_conf/worker.conf`` of the v|WAZUH_CURRENT_KUBERNETES| tag, subsequently applying all the customizations made.

#. Modify the tag of Wazuh images in the different statefulsets and deployments.

   .. code-block:: yaml

         image: 'wazuh/wazuh-dashboard:|WAZUH_CURRENT_KUBERNETES|'
         image: 'wazuh/wazuh-manager:|WAZUH_CURRENT_KUBERNETES|'
         image: 'wazuh/wazuh-indexer:|WAZUH_CURRENT_KUBERNETES|'

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
