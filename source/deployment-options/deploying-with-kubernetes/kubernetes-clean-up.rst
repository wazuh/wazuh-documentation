.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn the steps to clean up your environment, including deleting StatefulSets, services, ConfigMaps, and persistent volumes.

Clean up
========

When you no longer need your Wazuh Kubernetes deployment or want a fresh deployment, it is important to properly remove all resources to prevent orphaned configurations or volumes from consuming cluster resources.

This section outlines the steps required to completely clean up your environment, including deleting StatefulSets, services, ConfigMaps, and persistent volumes associated with the Wazuh cluster.

Follow the steps below to delete all deployments, services, and volumes.

#. Remove the entire cluster

   The deployment of the Wazuh cluster of managers uses different `StatefulSet <https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/>`__ elements, as well as configuration maps and services.

   To delete your Wazuh cluster, execute the following command from the repository directory.

   -  EKS cluster:

      .. code-block:: console

         # kubectl delete -k envs/eks/

   -  Other cluster types:

      .. code-block:: console

         # kubectl delete -k envs/local-env/

   This will remove every resource defined in the ``kustomization.yml`` file.

   .. note::

      Deleting the wazuh namespace can race ahead of the individual resource deletes it triggers, occasionally printing Error from server (NotFound) for a resource that has been deleted. This is expected and does not indicate a failed cleanup.

#. Run the following command from your repository directory to delete the Traefik ingress controller (For EKS cluster).

   .. code-block:: console

      # kubectl delete -k traefik/runtime/
      # kubectl delete -f traefik/crd/kubernetes-crd-definition-v1.yml

#. Run the command below to check if any persistent volumes remain after deleting the cluster.

   .. code-block:: console

      # kubectl get persistentvolume

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      NAME                                       CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS        CLAIM                                                         STORAGECLASS             REASON    AGE
      pvc-024466da-f7c5-11e8-b9b8-022ada63b4ac   10Gi       RWO            Retain           Released      wazuh/wazuh-manager-worker-wazuh-manager-worker-1-0           gp2-encrypted-retained             6d
      pvc-b3226ad3-f7c4-11e8-b9b8-022ada63b4ac   30Gi       RWO            Retain           Bound         wazuh/wazuh-indexer-wazuh-indexer-0                           gp2-encrypted-retained             6d
      pvc-fb821971-f7c4-11e8-b9b8-022ada63b4ac   10Gi       RWO            Retain           Released      wazuh/wazuh-manager-master-wazuh-manager-master-0             gp2-encrypted-retained             6d
      pvc-ffe7bf66-f7c4-11e8-b9b8-022ada63b4ac   10Gi       RWO            Retain           Released      wazuh/wazuh-manager-worker-wazuh-manager-worker-0-0           gp2-encrypted-retained             6d

   On EKS, a Retain reclaim policy is common. Volumes typically transition to the Released state rather than being removed automatically, preserving the underlying data until you explicitly delete the volumes.

   On a local cluster, the default StorageClass uses a Delete reclaim policy, which is intended to remove volumes automatically. However, this behavior depends on the storage provisioner.

   Run the command below to explicitly delete the volumes.

   .. code-block:: console

      # kubectl delete persistentvolume <PV_NAME>

   Replace ``<PV_NAME>`` with the name of the persistent volume, for example ``pvc-b3226ad3-f7c4-11e8-b9b8-022ada63b4ac``.

   Repeat the ``kubectl delete`` command to delete all Wazuh-related persistent volumes.

.. warning::

   Do not forget to delete the volumes manually where necessary.
