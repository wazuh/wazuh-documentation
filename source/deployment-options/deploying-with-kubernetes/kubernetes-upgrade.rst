.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Check out how to upgrade Wazuh installed in Kubernetes, creating a new pod linked to the same volume but with the new updated version.

.. _kubernetes_upgrade:

Upgrade Wazuh installed in Kubernetes
=====================================

Checking which files are exported to the volume
-----------------------------------------------

Our Kubernetes deployment uses our Wazuh images from Docker. If we look at the following code extracted from the Wazuh configuration using Docker, we can see which directories and files are used in the upgrade.

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
   /usr/share/wazuh-indexer/config/certs/
   /usr/share/wazuh-indexer/config/opensearch.yml
   /usr/share/wazuh-indexer/config/opensearch-security/internal_users.yml

Any modification related to these files will also be made in the associated volume. When the replica pod is created, it will get those files from the volume, keeping the previous changes.


Recreating certificates
-----------------------

Upgrading from a version earlier than v4.8.0 requires you to recreate the SSL certificates. Clone the  *wazuh-kubernetes* repository and check out the v|WAZUH_CURRENT_KUBERNETES| tag. Then, follow the instructions in :ref:`kubernetes_ssl_certificates`.

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

Next, :ref:`apply the new configuration <apply_the_new_configuration>`.

Keeping custom manifests
^^^^^^^^^^^^^^^^^^^^^^^^

To upgrade your deployment keeping your custom manifests, do the following.

#. If you are upgrading from version 4.3, :ref:`update the Java Opts variable name <updating_java_opts>` with the new one.
#. If you are upgrading from version 4.3, :ref:`update old paths <updating_old_paths>` with the new ones.
#. If you are upgrading from version 4.13, :ref:`update old paths <updating_old_paths>` with the new ones.
#. If you are upgrading from a version earlier than 4.8, :ref:`update configuration parameters <updating_configuraton_parameters>`.
#. :ref:`Modify tags of Wazuh images <modifying_tags>`.

Next, :ref:`apply the new configuration <apply_the_new_configuration>`.

.. _updating_java_opts:

Updating Java Opts variable name
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. If you are upgrading from version 4.3, you must replace ``ES_JAVA_OPTS`` with ``OPENSEARCH_JAVA_OPTS`` and modify the value.

   -  ``wazuh/wazuh_managers/wazuh-master-sts.yaml``

      .. code-block:: yaml
         :emphasize-lines: 2

         env:
           - name: OPENSEARCH_JAVA_OPTS
             value: '-Xms1g -Xmx1g -Dlog4j2.formatMsgNoLookups=true'

.. _updating_old_paths:

Updating old paths
~~~~~~~~~~~~~~~~~~

.. tabs::

   .. group-tab:: Upgrading from 4.3-4.12

      **Wazuh dashboard**

      #. Edit ``wazuh/indexer_stack/wazuh-dashboard/dashboard-deploy.yaml`` and do the following replacements.

         -  Replace ``/usr/share/wazuh-dashboard/config/certs/`` with ``/usr/share/wazuh-dashboard/certs/``.

      #. Edit ``wazuh/indexer_stack/wazuh-dashboard/dashboard_conf/opensearch_dashboards.yml`` and do the following replacements.

         -  Replace ``/usr/share/wazuh-dashboard/config/certs/`` with ``/usr/share/wazuh-dashboard/certs/``.

      **Wazuh indexer**

      #. Edit ``wazuh/indexer_stack/wazuh-indexer/cluster/indexer-sts.yaml`` and do the following replacements.

         -  Replace ``/usr/share/wazuh-indexer/config/certs/`` with ``/usr/share/wazuh-indexer/certs/``.
         -  Replace ``/usr/share/wazuh-indexer/config/opensearch.yml`` with ``/usr/share/wazuh-indexer/opensearch.yml``.
         -  Replace ``/usr/share/wazuh-indexer/plugins/opensearch-security/securityconfig/`` with ``/usr/share/wazuh-indexer/opensearch-security/``.

      #. Edit ``wazuh/indexer_stack/wazuh-indexer/indexer_conf/opensearch.yml`` and do the following replacements.

         -  Replace ``/usr/share/wazuh-indexer/config/certs/`` with ``/usr/share/wazuh-indexer/certs/``.

   .. group-tab:: Upgrading from 4.13

      **Wazuh dashboard**

      #. Edit ``wazuh/indexer_stack/wazuh-dashboard/dashboard-deploy.yaml`` and do the following replacements.

         -  Replace ``/usr/share/wazuh-dashboard/certs/`` with ``/usr/share/wazuh-dashboard/config/certs/``.

      #. Edit ``wazuh/indexer_stack/wazuh-dashboard/dashboard_conf/opensearch_dashboards.yml`` and do the following replacements.

         -  Replace ``/usr/share/wazuh-dashboard/certs/`` with ``/usr/share/wazuh-dashboard/config/certs/``.

      **Wazuh indexer**

      #. Edit ``wazuh/indexer_stack/wazuh-indexer/cluster/indexer-sts.yaml`` and do the following replacements and additions.

         -  Replace ``/usr/share/wazuh-indexer/certs/`` with ``/usr/share/wazuh-indexer/config/certs/``.
         -  Replace ``/usr/share/wazuh-indexer/opensearch.yml`` with ``/usr/share/wazuh-indexer/config/opensearch.yml``.
         -  Replace ``/usr/share/wazuh-indexer/opensearch-security/internal_users.yml`` with ``/usr/share/wazuh-indexer/config/opensearch-security/internal_users.yml``.
         -  Replace ``/usr/share/wazuh-indexer/plugins/opensearch-security/securityconfig/`` with ``/usr/share/wazuh-indexer/opensearch-security/``.
         - Add the following statements:

         .. code-block:: yaml
            :emphasize-lines: 5, 9

            volumes:
            - name: indexer-certs
               secret:
                  secretName: indexer-certs
                  defaultMode: 0600
            - name: indexer-conf
               configMap:
                  name: indexer-conf
                  defaultMode: 0600

         .. code-block:: yaml
            :emphasize-lines: 3

            spec:
               securityContext:
               fsGroup: 1000
               # Set the wazuh-indexer volume permissions so the wazuh-indexer user can use it
               volumes:
               - name: indexer-certs

         .. code-block:: yaml
            :emphasize-lines: 2, 3

            securityContext:
               runAsUser: 1000
               runAsGroup: 1000
               capabilities:
                  add: ["SYS_CHROOT"]

.. _updating_configuraton_parameters:

Updating configuration parameters
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Update the ``defaultRoute`` parameter in the Wazuh dashboard configuration.

   -  ``wazuh/indexer_stack/wazuh-dashboard/dashboard_conf/opensearch_dashboards.yml``.

      .. code-block:: yaml

         uiSettings.overrides.defaultRoute: /app/wz-home

#. Edit ``opensearch.yml`` and modify ``CN`` for Wazuh indexer.

   -  ``wazuh/indexer_stack/wazuh-indexer/indexer_conf/opensearch.yml``

      .. code-block:: yaml

         plugins.security.nodes_dn:
           - CN=indexer,O=Company,L=California,C=US

#. Edit the following files and modify all Wazuh indexer URLs in the deployment.

   -  ``wazuh/indexer_stack/wazuh-dashboard/dashboard-deploy.yaml``

      .. code-block:: yaml
         :emphasize-lines: 3

         env:
           - name: INDEXER_URL
             value: 'https://indexer:9200'

   -  ``wazuh/wazuh_managers/wazuh-master-sts.yaml``

      .. code-block:: yaml
         :emphasize-lines: 3

         env:
           - name: INDEXER_URL
             value: 'https://indexer:9200'

   -  ``wazuh/wazuh_managers/wazuh-worker-sts.yaml``

      .. code-block:: yaml
         :emphasize-lines: 3

         env:
           - name: INDEXER_URL
             value: 'https://indexer:9200'

#. Edit the following files of the ``v|WAZUH_CURRENT_KUBERNETES|`` tag and apply all the customizations from your Wazuh manager ``ossec.conf`` file.

   -  ``wazuh/wazuh_managers/wazuh_conf/master.conf``
   -  ``wazuh/wazuh_managers/wazuh_conf/worker.conf``

.. _modifying_tags:

Modifying tags of Wazuh images
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Modify the tag of Wazuh images in the different *statefulsets* and deployments.

.. code-block:: yaml

   image: 'wazuh/wazuh-dashboard:|WAZUH_CURRENT_KUBERNETES|'
   image: 'wazuh/wazuh-manager:|WAZUH_CURRENT_KUBERNETES|'
   image: 'wazuh/wazuh-indexer:|WAZUH_CURRENT_KUBERNETES|'

.. _apply_the_new_configuration:

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
