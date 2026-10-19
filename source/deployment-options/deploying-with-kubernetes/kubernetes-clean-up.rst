.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn the steps to clean up your Wazuh Kubernetes deployment, including deleting the Wazuh agent examples, workloads, the Traefik ingress controller, and persistent volumes.

Clean up
========

When you no longer need your Wazuh Kubernetes deployment, or you want a fresh deployment, remove all its resources. Otherwise, orphaned configurations and volumes keep consuming cluster resources.

This section deletes the Wazuh workloads, Services, Secrets, network policies, and persistent volumes. It also deletes the Traefik ingress controller and the Wazuh agent examples. Run every command from the root of the ``wazuh-kubernetes`` repository.

Follow the steps below to delete all deployments, services, and volumes.

#. Remove the Wazuh agent deployment (if you deployed the example).

   .. code-block:: console

      $ kubectl delete namespace wazuh-daemonset wazuh-sidecar

   Then remove ``/var/lib/wazuh`` on each node where you deployed a DaemonSet agent.

#. Remove the entire cluster

   The Wazuh manager cluster deployment uses different `StatefulSet <https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/>`__ elements, as well as ConfigMaps and services.

   To delete your Wazuh cluster, execute the following command from the repository directory.

   .. tabs::

      .. group-tab:: EKS cluster

         .. code-block:: console

            $ kubectl delete -k envs/eks/

      .. group-tab:: Other cluster types

         .. code-block:: console

            $ kubectl delete -k envs/local-env/

   This will remove every resource defined in the ``kustomization.yml`` file.

   .. note::

      Deleting the wazuh namespace can race ahead of the individual resource deletes it triggers, occasionally printing ``Error from server (NotFound)`` for a resource that has been deleted. This is expected and does not indicate a failed cleanup.

#. Run the following command from your repository directory to delete the Traefik ingress controller (EKS cluster).

   .. code-block:: console

      $ kubectl delete -k traefik/runtime/
      $ kubectl delete -f traefik/crd/kubernetes-crd-definition-v1.yml

   On other cluster types, only the Traefik CRDs were applied. Delete them with the following command:

   .. code-block:: console

      $ kubectl delete -f traefik/crd/

#. Run the command below to check if any persistent volumes remain after deleting the cluster.

   .. code-block:: console

      $ kubectl get persistentvolume

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

   .. note::

      A volume still bound to a claim cannot be deleted. Delete the claim or its namespace first. The "Remove the entire cluster" step above already does this for a full cleanup.

   Run the command below to explicitly delete the volumes.

   .. code-block:: console

      $ kubectl delete persistentvolume <PV_NAME>

   Replace ``<PV_NAME>`` with the name of the persistent volume, for example ``pvc-b3226ad3-f7c4-11e8-b9b8-022ada63b4ac``.

   Repeat the ``kubectl delete`` command to delete all Wazuh-related persistent volumes.

   .. warning::

      Do not forget to delete the volumes manually where necessary.

#. Stop the port-forwards and remove the local files. Keep ``/etc/wazuh/ca`` only if you plan to redeploy with the same CA.

   .. code-block:: console

      $ pkill -f 'kubectl -n wazuh port-forward'
      $ sudo rm -rf wazuh/config/credentials wazuh/wazuh-certificates
      $ sudo rm -rf /etc/wazuh/ca
