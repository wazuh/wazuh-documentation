.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This section outlines the steps required to completely clean up your environment, including deleting StatefulSets, services, ConfigMaps, and persistent volumes associated with the Wazuh cluster.

Clean Up
========

When you no longer need your Wazuh Kubernetes deployment or want a fresh deployment, it is important to properly remove all resources to prevent orphaned configurations or volumes from consuming cluster resources.

This section outlines the steps required to completely clean up your environment, including deleting StatefulSets, services, ConfigMaps, and persistent volumes associated with the Wazuh cluster.

Follow the steps below to delete all deployments, services, and volumes.

#. Remove the entire cluster

   The deployment of the Wazuh cluster of managers involves the use of different `StatefulSet <https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/>`__ elements as well as configuration maps and services.

   To delete your Wazuh cluster, execute the following command from the repository directory.

   -  EKS cluster

      .. code-block:: console

         $ kubectl delete -k envs/eks/

   - Other cluster types

      .. code-block:: console

         $ kubectl delete -k envs/local-env/

   This will remove every resource defined on the ``kustomization.yml`` file.

#. Remove the persistent volumes.

   .. code-block:: console

      $ kubectl get persistentvolume

   .. code-block:: none
      :class: output

      NAME                                       CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS        CLAIM                                                         STORAGECLASS             REASON    AGE
      pvc-024466da-f7c5-11e8-b9b8-022ada63b4ac   10Gi       RWO            Retain           Released      wazuh/wazuh-manager-worker-wazuh-manager-worker-1-0           gp2-encrypted-retained             6d
      pvc-b3226ad3-f7c4-11e8-b9b8-022ada63b4ac   30Gi       RWO            Retain           Bound         wazuh/wazuh-indexer-wazuh-indexer-0                           gp2-encrypted-retained             6d
      pvc-fb821971-f7c4-11e8-b9b8-022ada63b4ac   10Gi       RWO            Retain           Released      wazuh/wazuh-manager-master-wazuh-manager-master-0             gp2-encrypted-retained             6d
      pvc-ffe7bf66-f7c4-11e8-b9b8-022ada63b4ac   10Gi       RWO            Retain           Released      wazuh/wazuh-manager-worker-wazuh-manager-worker-0-0           gp2-encrypted-retained             6d

   .. code-block:: console

      $ kubectl delete persistentvolume pvc-b3226ad3-f7c4-11e8-b9b8-022ada63b4ac

   Repeat the kubectl delete  command to delete all Wazuh related persistent volumes.

.. warning::

   Do not forget to delete the volumes manually where necessary.
