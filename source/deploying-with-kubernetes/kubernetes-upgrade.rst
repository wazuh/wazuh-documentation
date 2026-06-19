.. Copyright (C) 2021 Wazuh, Inc.

.. _kubernetes_upgrade:

Upgrade Wazuh installed in Kubernetes
=====================================

Check which files are exported to the volume
--------------------------------------------

Our Kubernetes deployment uses our Wazuh images from Docker. If we look at the following code extracted from the Wazuh configuration using Docker we can see which directories and files are used in the upgrade.

.. code-block:: bash

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

Any modification related to these files will also be made in the associated volume. When the replica pod is created, it will get those files from the volume, keeping the previous changes.

Change the image of the container
---------------------------------

The only step to update Wazuh is to change the image of the pod in each file that deploys each node of the Wazuh cluster.

These files are the *StatefulSet* files:

    - wazuh-master-sts.yaml
    - wazuh-worker-sts.yaml

For example:

.. code-block:: yaml

    containers:
    - name: wazuh-manager
      image: 'wazuh/wazuh:|WAZUH_LATEST_KUBERNETES|_|OPENDISTRO_LATEST_KUBERNETES|'


Apply the new configuration
---------------------------

The last step is to apply the new configuration:

.. code-block:: console

    $ kubectl apply -k envs/eks/

.. code-block:: none
    :class: output

    statefulset.apps "wazuh-manager-master" configured

This process will end the old pod while creating a new one with the new version, linked to the same volume. Once the Pods are booted, the update will be ready and we can check the new version of Wazuh installed, the cluster and the changes that have been maintained through the use of the volumes.
