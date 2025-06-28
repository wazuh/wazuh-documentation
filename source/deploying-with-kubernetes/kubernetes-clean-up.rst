.. Copyright (C) 2021 Wazuh, Inc.

.. _kubernetes_clean_up:

Clean Up
========

Steps to perform a clean up of all deployments, services and volumes.

1. Remove the entire cluster

The deployment of the Wazuh cluster of managers involves the use of different `StatefulSet <https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/>`_ elements as well as configuration maps and services.

To delete your Wazuh cluster just use execute the following command from this repository directory.

    .. code-block:: console

        $ kubectl delete -k envs/eks/

This will remove every resource defined on the ``kustomization.yml`` file.

2. Remove the persistent volumes.

    .. code-block:: console

        $ kubectl get persistentvolume

    .. code-block:: none
        :class: output

        NAME                                       CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS        CLAIM                                                         STORAGECLASS             REASON    AGE
        pvc-024466da-f7c5-11e8-b9b8-022ada63b4ac   10Gi       RWO            Retain           Released      wazuh/wazuh-manager-worker-wazuh-manager-worker-1-0           gp2-encrypted-retained             6d
        pvc-b3226ad3-f7c4-11e8-b9b8-022ada63b4ac   30Gi       RWO            Retain           Bound         wazuh/wazuh-elasticsearch-wazuh-elasticsearch-0               gp2-encrypted-retained             6d
        pvc-fb821971-f7c4-11e8-b9b8-022ada63b4ac   10Gi       RWO            Retain           Released      wazuh/wazuh-manager-master-wazuh-manager-master-0             gp2-encrypted-retained             6d
        pvc-ffe7bf66-f7c4-11e8-b9b8-022ada63b4ac   10Gi       RWO            Retain           Released      wazuh/wazuh-manager-worker-wazuh-manager-worker-0-0           gp2-encrypted-retained             6d

    .. code-block:: console

        $ kubectl delete persistentvolume pvc-b3226ad3-f7c4-11e8-b9b8-022ada63b4ac

.. warning::
    Do not forget to delete the volumes manually in AWS.
