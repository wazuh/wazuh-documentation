.. Copyright (C) 2018 Wazuh, Inc.

.. _kubernetes_upgrade:

Upgrade Wazuh installed in Kubernetes
=====================================

Check which files are exported to the volume
--------------------------------------------

Our Kubernetes deployment uses our Wazuh images from Docker. If we look at the following code extracted from the Wazuh configuration using Docker we can see which directories and files are used in the upgrade.

.. code-block:: bash

    DATA_DIRS[((i++))]="api/configuration"
    DATA_DIRS[((i++))]="etc"
    DATA_DIRS[((i++))]="logs"
    DATA_DIRS[((i++))]="queue/db"
    DATA_DIRS[((i++))]="queue/rootcheck"
    DATA_DIRS[((i++))]="queue/agent-groups"
    DATA_DIRS[((i++))]="queue/agent-info"
    DATA_DIRS[((i++))]="queue/agents-timestamp"
    DATA_DIRS[((i++))]="queue/agentless"
    DATA_DIRS[((i++))]="queue/cluster"
    DATA_DIRS[((i++))]="queue/rids"
    DATA_DIRS[((i++))]="queue/fts"
    DATA_DIRS[((i++))]="var/multigroups"

Any modification related to these files will also be made in the associated volume. When the replica pod is created, it will get those files from the volume, keeping the previous changes.

Change the image of the container
---------------------------------

The only step to update Wazuh is to change the image of the pod in each file that deploys each node of the Wazuh cluster.

These files are the *StatefulSet* files:

    - wazuh-master-sts.yaml
    - wazuh-worker-0-sts.yaml
    - wazuh-worker-1-sts.yaml

For example:

.. code-block:: yaml

    containers:
    - name: wazuh-manager
      image: 'wazuh/wazuh:3.8.2_6.7.0'


Apply the new configuration
---------------------------

The last step is to apply the new configuration of each pod. For example for the wazuh manager master:

.. code-block:: console

    $ kubectl apply -f wazuh-manager-master-sts.yaml
    statefulset.apps "wazuh-manager-master" configured

This process will end the old pod while creating a new one with the new version, linked to the same volume. Once the Pods are booted, the update will be ready and we can check the new version of Wazuh installed, the cluster and the changes that have been maintained through the use of the volumes.
