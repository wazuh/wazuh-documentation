.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to deploy Wazuh on Kubernetes for Amazon EKS and local clusters, from preparation to verifying components.

Deployment
==========

Deploying the Wazuh central components
--------------------------------------

This section covers steps for deploying Wazuh central components on Kubernetes for Amazon EKS and local Kubernetes clusters, and to verify the deployment.

-  :ref:`amazon-eks-deployment`
-  :ref:`local-cluster-deployment`
-  :ref:`verifying-the-deployment`

.. _amazon-eks-deployment:

Amazon EKS deployment
^^^^^^^^^^^^^^^^^^^^^

Follow the steps below to deploy Wazuh central components on an Amazon EKS cluster.

Clone the Wazuh Kubernetes repository for the necessary services and pods:

.. code-block:: console

   $ git clone https://github.com/wazuh/wazuh-kubernetes.git -b |WAZUH_CURRENT_KUBERNETES| --depth=1
   $ cd wazuh-kubernetes

Apply Traefik ingress controller
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The Traefik ingress controller routes and load balances external traffic to the appropriate internal Kubernetes services. It is also used to expose the Wazuh services outside the EKS cluster.

#. Run the command below to deploy Traefik CRD:

   .. code-block:: console

      $ kubectl apply -f traefik/crd/kubernetes-crd-definition-v1.yml

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      customresourcedefinition.apiextensions.k8s.io/ingressroutes.traefik.io created
      customresourcedefinition.apiextensions.k8s.io/ingressroutetcps.traefik.io created
      customresourcedefinition.apiextensions.k8s.io/ingressrouteudps.traefik.io created
      customresourcedefinition.apiextensions.k8s.io/middlewares.traefik.io created
      customresourcedefinition.apiextensions.k8s.io/middlewaretcps.traefik.io created
      customresourcedefinition.apiextensions.k8s.io/serverstransports.traefik.io created
      customresourcedefinition.apiextensions.k8s.io/serverstransporttcps.traefik.io created
      customresourcedefinition.apiextensions.k8s.io/tlsoptions.traefik.io created
      customresourcedefinition.apiextensions.k8s.io/tlsstores.traefik.io created
      customresourcedefinition.apiextensions.k8s.io/traefikservices.traefik.io created

#. Deploy the Traefik runtime for the ingress controller:

   .. code-block:: console

      $ kubectl apply -k traefik/runtime/

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      namespace/traefik created
      serviceaccount/traefik created
      clusterrole.rbac.authorization.k8s.io/traefik created
      clusterrolebinding.rbac.authorization.k8s.io/traefik created
      service/traefik created
      deployment.apps/traefik created

#. Run the command below to view all running services in the ``traefik`` namespace:

   .. code-block:: console

      $ kubectl -n traefik get svc

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      NAME      TYPE           CLUSTER-IP     EXTERNAL-IP                                                              PORT(S)                                       AGE
      traefik   LoadBalancer   10.100.34.51   a7ffe29bfcf38420988fd52a698be422-862207742.us-west-1.elb.amazonaws.com   443:30725/TCP,1514:32036/TCP,1515:30354/TCP   6m29s

   Note the ``EXTERNAL-IP`` as this will be used in generating the Wazuh dashboard certificate.

.. _kubernetes_ssl_certificates:

Setup SSL certificates
~~~~~~~~~~~~~~~~~~~~~~

Perform the steps below to generate the required certificates for the deployment:

#. Download the ``wazuh-certs-tool.sh`` script and the ``config.yml`` configuration file. These files are used to create the certificates that encrypt communications between the Wazuh central components.

   .. code-block:: console

      $ cd wazuh
      $ curl -so wazuh-certs-tool.sh https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/wazuh-certs-tool-|WAZUH_CURRENT|-1.sh
      $ curl -so wazuh-credentials.sh https://raw.githubusercontent.com/wazuh/wazuh-installation-assistant/|WAZUH_CURRENT|/credentials_lib/wazuh-credentials.sh
      $ curl -so config.yml https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/config-|WAZUH_CURRENT|-1.yml

#. Edit ``./config.yml`` and replace the node names and IP values with the corresponding names and IP addresses. You need to do this for the Wazuh manager, Wazuh indexer, and Wazuh dashboard node.

   .. code-block:: yaml
      :emphasize-lines: 29

      nodes:
        indexer:
          - name: indexer
            dns:
              - "wazuh-indexer"
              - "wazuh-indexer.wazuh.svc.cluster.local"
              - "wazuh-indexer-0.wazuh-indexer"
              - "wazuh-indexer-1.wazuh-indexer"
              - "wazuh-indexer-2.wazuh-indexer"
              - "wazuh-indexer-0.wazuh-indexer.wazuh.svc.cluster.local"
              - "wazuh-indexer-1.wazuh-indexer.wazuh.svc.cluster.local"
              - "wazuh-indexer-2.wazuh-indexer.wazuh.svc.cluster.local"
        manager:
          - name: manager
            dns:
              - "wazuh-api"
              - "wazuh-api.wazuh.svc.cluster.local"
              - "wazuh-agents"
              - "wazuh-agents.wazuh.svc.cluster.local"
              - "wazuh-events"
              - "wazuh-events.wazuh.svc.cluster.local"
              - "wazuh-registration"
              - "wazuh-registration.wazuh.svc.cluster.local"
        dashboard:
          - name: dashboard
            dns:
              - "dashboard"
              - "dashboard.wazuh.svc.cluster.local"
              - "<EXTERNAL-IP>"

   Replace

   -  ``<EXTERNAL-IP>`` with the external IP address for the Traefik ingress controller. Run the following command get the external IP address  ``kubectl -n traefik get svc``.

#. Run script ``/tools/utils/deployment/certificates-conf.sh`` to create and import the certificates via secretGenerator on the ``kustomization.yml`` file.

   .. code-block:: console

      $ sudo bash ../tools/utils/deployment/certificates-conf.sh --cert --copy --priv

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      Detected indexer nodes:   indexer
      Detected manager nodes:   manager
      Detected dashboard nodes: dashboard
      Generating certificates
      05/10/2026 16:37:5x INFO: Verbose logging redirected to .../wazuh-certificates-tool.log
      05/10/2026 16:37:5x INFO: Generating the root certificate.
      05/10/2026 16:37:5x INFO: Generating Admin certificates.
      05/10/2026 16:37:5x INFO: Admin certificates created.
      05/10/2026 16:37:5x INFO: Generating Wazuh indexer certificates.
      05/10/2026 16:37:5x INFO: Wazuh indexer certificates created.
      05/10/2026 16:37:5x INFO: Generating Wazuh manager certificates.
      05/10/2026 16:37:56 INFO: Wazuh manager certificates created.
      05/10/2026 16:37:56 INFO: Generating Wazuh dashboard certificates.
      05/10/2026 16:37:57 INFO: Wazuh dashboard certificates created.
      Copying certificates for indexer: indexer -> config/indexer/certs/
      Copying certificates for manager: manager -> config/manager/certs/
      Copying certificates for dashboard: dashboard -> config/dashboard/certs/
      Copying root-ca certificates -> config/root-ca/certs/
      Setting ownership for indexer indexer (1000:1000)
      Setting ownership for manager manager (1000:1000)
      Setting ownership for dashboard dashboard (1000:1000)
      Setting ownership for root-ca certificates (1000:1000)
      Process completed.

Generate credentials
~~~~~~~~~~~~~~~~~~~~

The Wazuh images ship with no default passwords. Each deployment generates its own, before the first deployment. Perform the steps below to generate the required credentials.

#. Download the ``wazuh-credentials.sh`` library. This file provides the credential generation functions used by the script in the next step.

   .. code-block:: console

      $ cd wazuh
      $ curl -o wazuh-credentials.sh https://raw.githubusercontent.com/wazuh/wazuh-installation-assistant/|WAZUH_CURRENT|/credentials_lib/wazuh-credentials.sh

#. Run the ``credentials-conf.sh`` script to generate the credentials and import them via ``secretGenerator`` on the ``kustomization.yml`` file.

   .. code-block:: console

      $ sudo bash ../tools/utils/deployment/credentials-conf.sh

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      WAZUH_INDEXER_ADMIN_PASSWORD: generated
      WAZUH_INDEXER_KIBANASERVER_PASSWORD: generated
      WAZUH_INDEXER_MANAGER_PASSWORD: generated
      WAZUH_MANAGER_API_PASSWORD: generated
      WAZUH_MANAGER_WUI_PASSWORD: generated
      Credentials written to ./config/credentials: indexer.env, manager.env, dashboard.env
      Log in to the Wazuh dashboard as 'admin'. Read its password with:
        grep '^WAZUH_INDEXER_ADMIN_PASSWORD=' ./config/credentials/indexer.env | cut -d= -f2-

   The command creates the ``indexer.env``, ``manager.env``, and ``dashboard.env`` in the ``wazuh/config/credentials/`` directory, holding only the credentials that each component needs. Keep these files for the life of the deployment, every ``kubectl apply -k`` and ``kubectl delete -k`` reads them, and a recreated indexer pod retrieves its credentials from them again.

#. Retrieve the generated dashboard password to log in after deployment. This will be required to login to Wazuh dashboard after the deployment is completed.

   .. code-block:: console

      $ grep '^WAZUH_INDEXER_ADMIN_PASSWORD=' wazuh/config/credentials/indexer.env | cut -d= -f2-

Set the cluster key and the agent enrollment password
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The repository ships ``wazuh/secrets/wazuh-cluster-key-secret.yaml`` and ``wazuh/secrets/wazuh-authd-pass-secret.yaml`` with placeholder values. These values must be replaced manually before the first deployment. Perform the steps below to create the cluster key and agent enrollment password.

#. Generate a ``CLUSTER_KEY``. It must be exactly 32 alphanumeric characters.

   .. code-block:: console

      $ openssl rand -hex 16

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      e9e059de43c6631e0a52e8acb3738c21

#. Encode the key in base64.

   .. code-block:: console

      $ echo -n "<CLUSTER_KEY>" | base64

#. Replacing the ``data.key`` value in ``wazuh/secrets/wazuh-cluster-key-secret.yaml`` with the encoded ``CLUSTER_KEY``.

   .. code-block:: yaml
      :emphasize-lines: 16

      # Copyright (C) 2019, Wazuh Inc.
      #
      # This program is a free software; you can redistribute it
      # and/or modify it under the terms of the GNU General Public
      # License (version 2) as published by the FSF - Free Software
      # Foundation.
      # Wazuh cluster key secret
      apiVersion: v1
      kind: Secret
      metadata:
        name: wazuh-cluster-key
        namespace: wazuh
      # Placeholder, not a key. Replace it before the first deployment: see
      # docs/ref/getting-started/installation.md, step 3.3.2.
      data:
        key: <CLUSTER_KEY> # string "REPLACETHISCLUSTERKEYBEFOREDEPLO" base64 encoded

   .. warning::

      Every Wazuh manager master and worker presents it ``Cluster_Key`` when joining the Wazuh manager cluster; a node whose key doesn't match the Wazuh manager master's key cannot join the cluster

#. Generate an agent enrollment password ``ENROLLMENT_PASSWORD``.

   .. code-block:: console

      $ openssl rand -base64 24 | tr -dc A-Za-z0-9 | head -c 24

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      ul0GkIsq9zGa0lVpbB5WOKsF

#. Encode the ``ENROLLMENT_PASSWORD`` in base64

   .. code-block:: console

      $ echo -n "<ENROLLMENT_PASSWORD>" | base64

#. Replacing the ``data.authd.pass`` value in ``wazuh/secrets/wazuh-authd-pass-secret.yaml`` with the encoded ``ENROLLMENT_PASSWORD``.

   .. code-block:: yaml
      :emphasize-lines: 14

      # Copyright (C) 2019, Wazuh Inc.
      #
      # This program is a free software; you can redistribute it
      # and/or modify it under the terms of the GNU General Public
      # License (version 2) as published by the FSF - Free Software
      # Foundation.
      # Wazuh authd password secret
      apiVersion: v1
      kind: Secret
      metadata:
        name: wazuh-authd-pass
        namespace: wazuh
      data:
        authd.pass: <ENROLLMENT_PASSWORD> # string "password" base64 encoded

Apply all manifests
~~~~~~~~~~~~~~~~~~~

The Wazuh Kubernetes cluster manifest for Amazon EKS clusters is located in ``envs/eks``.

You can adjust cluster resources by editing patch files in ``envs/eks/`` or ``envs/local-env/``. These files override specific values in the base manifests for each environment, such as CPU, memory, and storage for persistent volumes.

.. note::

   Edit the following document to update ``image`` value for the Wazuh indexer, manager, and dashboard.

   -  Edit the manifest file ``wazuh/indexer_stack/wazuh-dashboard/dashboard-deploy.yaml`` that defines the Wazuh dashboard deployment. Locate the ``containers`` section and replace the ``image`` value with ``wazuh/wazuh-dashboard:|WAZUH_CURRENT_KUBERNETES|-|WAZUH_CURRENT_KUBERNETES_REV|``.
   -  Edit the manifest file ``wazuh/indexer_stack/wazuh-indexer/cluster/indexer-sts.yaml`` that defines the Wazuh indexer statefulset. Locate the ``containers`` section and replace the ``image`` value with ``wazuh/wazuh-indexer:|WAZUH_CURRENT_KUBERNETES|-|WAZUH_CURRENT_KUBERNETES_REV|``.
   -  Edit the manifest file ``wazuh/wazuh_managers/wazuh-master-sts.yaml`` that defines the Wazuh manager master statefulset. Locate the ``initContainers`` and ``containers`` section and replace the ``image`` value with ``wazuh/wazuh-manager:|WAZUH_CURRENT_KUBERNETES|-|WAZUH_CURRENT_KUBERNETES_REV|``.
   -  Edit the manifest file ``wazuh/wazuh_managers/wazuh-worker-sts.yaml`` that defines the Wazuh manager worker statefulset. Locate the ``initContainers`` and ``containers`` section and replace the ``image`` value with ``wazuh/wazuh-manager:|WAZUH_CURRENT_KUBERNETES|-|WAZUH_CURRENT_KUBERNETES_REV|``.

#. Edit the ``wazuh/base/ingressRoute-tcp-dashboard.yaml`` file and replace ``<FQDN_OF_THE_INGRESS>`` with the fully qualified domain name (FQDN) of the external load balancer created for the Traefik service. This configures TLS pass-through for the Wazuh dashboard.

   .. code-block:: yaml
      :emphasize-lines: 10

      apiVersion: traefik.io/v1alpha1
      kind: IngressRouteTCP
      metadata:
        name: wazuh-dashboard
        namespace: wazuh
      spec:
        entryPoints:
          - websecure
        routes:
        - match: HostSNI(`<FQDN_OF_THE_INGRESS>`)
          middlewares:
          - name: ip-allowlist
          services:
          - name: dashboard
            port: 443
        tls:
          passthrough: true

   Run the command ``kubectl -n traefik get svc`` to get the FQDN of the load balancer created for the Traefik service.

   The command output looks similar to this:

   .. code-block:: none
      :class: output
      :emphasize-lines: 2

      NAME      TYPE           CLUSTER-IP     EXTERNAL-IP                                                              PORT(S)                                       AGE
      traefik   LoadBalancer   10.100.34.51   a7ffe29bfcf38420988fd52a698be422-862207742.us-west-1.elb.amazonaws.com   443:30725/TCP,1514:32036/TCP,1515:30354/TCP   6m29s

#. Deploy the Wazuh Kubernetes cluster using the ``kustomization`` file:

   .. code-block:: console

      $ kubectl apply -k envs/eks/

   Refer to the :ref:`verifying the deployment <verifying-the-deployment>` section to confirm the deployment is successful.

#. Run the following command to publish the Wazuh manager ports for Wazuh API service using port forwarding:

   .. code-block:: console

      $ kubectl -n wazuh port-forward service/wazuh-api --address <KUBERNETES_HOST_IP_ADDRESS> 55000:55000 &

.. _local-cluster-deployment:

Local cluster deployment
^^^^^^^^^^^^^^^^^^^^^^^^

Follow the steps below to deploy a Wazuh Kubernetes cluster on a Local Kubernetes cluster.

#. Clone the Wazuh Kubernetes repository for the necessary services and pods:

   .. code-block:: console

      $ git clone https://github.com/wazuh/wazuh-kubernetes.git -b |WAZUH_CURRENT_KUBERNETES| --depth=1
      $ cd wazuh-kubernetes

#. Edit the ``wazuh/base/ingressRoute-tcp-dashboard.yaml`` file and clear its contents for local deployments to prevent the EKS ingress configuration from being applied:

   .. code-block:: console

      $ echo "" > wazuh/base/ingressRoute-tcp-dashboard.yaml

Set up storage class
~~~~~~~~~~~~~~~~~~~~

The storage class provisioner varies by cluster. Edit the ``envs/local-env/storage-class.yaml`` file to set the provisioner that matches your cluster type.

Check your storage class by running the command below:

.. code-block:: console

   $ kubectl get sc

The command output looks similar to this:

.. code-block:: none
   :class: output

   NAME                 PROVISIONER                RECLAIMPOLICY   VOLUMEBINDINGMODE   ALLOWVOLUMEEXPANSION   AGE
   standard (default)   k8s.io/minikube-hostpath   Delete          Immediate           false                  10m

The provisioner column displays ``k8s.io/minikube-hostpath``.

Set up SSL certificates
~~~~~~~~~~~~~~~~~~~~~~~

Perform the steps below to generate the required certificates for the deployment:

#. Download the ``wazuh-certs-tool.sh`` script and the ``config.yml`` configuration file. These files are used to generate certificates that encrypt communications between Wazuh's central components.

   .. code-block:: console

      $ cd wazuh
      $ curl -so wazuh-certs-tool.sh https://packages-staging.xdrsiem.wazuh.info/nightly-backup/2026-09-29/wazuh-certs-tool-|WAZUH_CURRENT|-latest.sh
      $ curl -o config.yml https://packages-staging.xdrsiem.wazuh.info/nightly-backup/<DATE>/config-|WAZUH_CURRENT|-latest.yml

#. Edit the ``./config.yml`` file and replace the node names and IP values with the corresponding names and IP addresses. You need to do this for the Wazuh manager, Wazuh indexer, and Wazuh dashboard nodes.

   .. code-block:: yaml

      nodes:
        indexer:
          - name: indexer
            dns:
              - "wazuh-indexer"
              - "wazuh-indexer.wazuh.svc.cluster.local"
              - "wazuh-indexer-0.wazuh-indexer"
              - "wazuh-indexer-1.wazuh-indexer"
              - "wazuh-indexer-2.wazuh-indexer"
              - "wazuh-indexer-0.wazuh-indexer.wazuh.svc.cluster.local"
              - "wazuh-indexer-1.wazuh-indexer.wazuh.svc.cluster.local"
              - "wazuh-indexer-2.wazuh-indexer.wazuh.svc.cluster.local"
        manager:
          - name: manager
            dns:
              - "wazuh-api"
              - "wazuh-api.wazuh.svc.cluster.local"
              - "wazuh-agents"
              - "wazuh-agents.wazuh.svc.cluster.local"
              - "wazuh-events"
              - "wazuh-events.wazuh.svc.cluster.local"
              - "wazuh-registration"
              - "wazuh-registration.wazuh.svc.cluster.local"
        dashboard:
          - name: dashboard
            dns:
              - "dashboard"
              - "dashboard.wazuh.svc.cluster.local"

#. Run the script ``/tools/utils/deployment/certificates-conf.sh`` to create and import the certificates via secretGenerator on the ``kustomization.yml`` file.

   .. code-block:: console

      $ sudo bash ../tools/utils/deployment/certificates-conf.sh --cert --copy --priv

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      Detected indexer nodes:   indexer
      Detected manager nodes:   manager
      Detected dashboard nodes: dashboard
      Generating certificates
      05/10/2026 16:37:5x INFO: Verbose logging redirected to .../wazuh-certificates-tool.log
      05/10/2026 16:37:5x INFO: Generating the root certificate.
      05/10/2026 16:37:5x INFO: Generating Admin certificates.
      05/10/2026 16:37:5x INFO: Admin certificates created.
      05/10/2026 16:37:5x INFO: Generating Wazuh indexer certificates.
      05/10/2026 16:37:5x INFO: Wazuh indexer certificates created.
      05/10/2026 16:37:5x INFO: Generating Wazuh manager certificates.
      05/10/2026 16:37:56 INFO: Wazuh manager certificates created.
      05/10/2026 16:37:56 INFO: Generating Wazuh dashboard certificates.
      05/10/2026 16:37:57 INFO: Wazuh dashboard certificates created.
      Copying certificates for indexer: indexer -> config/indexer/certs/
      Copying certificates for manager: manager -> config/manager/certs/
      Copying certificates for dashboard: dashboard -> config/dashboard/certs/
      Copying root-ca certificates -> config/root-ca/certs/
      Setting ownership for indexer indexer (1000:1000)
      Setting ownership for manager manager (1000:1000)
      Setting ownership for dashboard dashboard (1000:1000)
      Setting ownership for root-ca certificates (1000:1000)
      Process completed.

Generate credentials
~~~~~~~~~~~~~~~~~~~~

The Wazuh images ship with no default passwords. Each deployment generates its own before the first deployment. Perform the steps below to generate the required credentials.

#. Download the ``wazuh-credentials.sh`` library. This file provides the credential generation functions used by the script in the next step.

   .. code-block:: console

      $ cd wazuh
      $ curl -o wazuh-credentials.sh https://raw.githubusercontent.com/wazuh/wazuh-installation-assistant/|WAZUH_CURRENT|/credentials_lib/wazuh-credentials.sh

#. Run the ``credentials-conf.sh`` script to generate the credentials and import them via ``secretGenerator`` on the ``kustomization.yml`` file.

   .. code-block:: console

      $ sudo bash ../tools/utils/deployment/credentials-conf.sh

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      WAZUH_INDEXER_ADMIN_PASSWORD: generated
      WAZUH_INDEXER_KIBANASERVER_PASSWORD: generated
      WAZUH_INDEXER_MANAGER_PASSWORD: generated
      WAZUH_MANAGER_API_PASSWORD: generated
      WAZUH_MANAGER_WUI_PASSWORD: generated
      Credentials written to ./config/credentials: indexer.env, manager.env, dashboard.env
      Log in to the Wazuh dashboard as 'admin'. Read its password with:
        grep '^WAZUH_INDEXER_ADMIN_PASSWORD=' ./config/credentials/indexer.env | cut -d= -f2-

   The command creates the ``indexer.env``, ``manager.env``, and ``dashboard.env`` in the ``wazuh/config/credentials/`` directory, holding only the credentials that each component needs. Keep these files for the life of the deployment; every ``kubectl apply -k`` and ``kubectl delete -k`` reads them, and a recreated indexer pod retrieves its credentials from them again.

#. Retrieve the generated dashboard password to log in after deployment.

   .. code-block:: console

      $ grep '^WAZUH_INDEXER_ADMIN_PASSWORD=' wazuh/config/credentials/indexer.env | cut -d= -f2-

Set the cluster key and the agent enrollment password
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The repository ships ``wazuh/secrets/wazuh-cluster-key-secret.yaml`` and ``wazuh/secrets/wazuh-authd-pass-secret.yaml`` with placeholder values. These values must be replaced manually before the first deployment. Perform the steps below to create the cluster key and agent enrollment password.

#. Generate a ``CLUSTER_KEY``. It must be exactly 32 alphanumeric characters.

   .. code-block:: console

      $ openssl rand -hex 16

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      e9e059de43c6631e0a52e8acb3738c21

#. Encode the key in base64.

   .. code-block:: console

      $ echo -n "<CLUSTER_KEY>" | base64

#. Replacing the ``data.key`` value in ``wazuh/secrets/wazuh-cluster-key-secret.yaml`` with the encoded ``CLUSTER_KEY``.

   .. code-block:: yaml
      :emphasize-lines: 16

      # Copyright (C) 2019, Wazuh Inc.
      #
      # This program is a free software; you can redistribute it
      # and/or modify it under the terms of the GNU General Public
      # License (version 2) as published by the FSF - Free Software
      # Foundation.
      # Wazuh cluster key secret
      apiVersion: v1
      kind: Secret
      metadata:
        name: wazuh-cluster-key
        namespace: wazuh
      # Placeholder, not a key. Replace it before the first deployment: see
      # docs/ref/getting-started/installation.md, step 3.3.2.
      data:
        key: <CLUSTER_KEY> # string "REPLACETHISCLUSTERKEYBEFOREDEPLO" base64 encoded

   .. warning::

      Every Wazuh manager master and worker presents it ``Cluster_Key`` when joining the Wazuh manager cluster; a node whose key doesn't match the Wazuh manager master's key cannot join the cluster

#. Generate an agent enrollment password ``ENROLLMENT_PASSWORD``.

   .. code-block:: console

      $ openssl rand -base64 24 | tr -dc A-Za-z0-9 | head -c 24

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      ul0GkIsq9zGa0lVpbB5WOKsF

#. Encode the ``ENROLLMENT_PASSWORD`` in base64

   .. code-block:: console

      $ echo -n "<ENROLLMENT_PASSWORD>" | base64

#. Replacing the ``data.authd.pass`` value in ``wazuh/secrets/wazuh-authd-pass-secret.yaml`` with the encoded ``ENROLLMENT_PASSWORD``.

   .. code-block:: yaml
      :emphasize-lines: 14

      # Copyright (C) 2019, Wazuh Inc.
      #
      # This program is a free software; you can redistribute it
      # and/or modify it under the terms of the GNU General Public
      # License (version 2) as published by the FSF - Free Software
      # Foundation.
      # Wazuh authd password secret
      apiVersion: v1
      kind: Secret
      metadata:
        name: wazuh-authd-pass
        namespace: wazuh
      data:
        authd.pass: <ENROLLMENT_PASSWORD> # string "password" base64 encoded

Apply all manifests
~~~~~~~~~~~~~~~~~~~

The Wazuh Kubernetes cluster manifest for other cluster types is located in ``envs/local-env``.

You can adjust cluster resources by editing patch files in ``envs/local-env/``. These files override specific values in the base manifests for each environment, such as CPU, memory, and storage for persistent volumes.

.. note::

   Edit the following document to update ``image`` value for the Wazuh indexer, manager and dashboard.

   -  Edit the manifest file ``wazuh/indexer_stack/wazuh-dashboard/dashboard-deploy.yaml`` that defines the Wazuh dashboard deployment. Locate the ``containers`` section and replace the ``image`` value with ``wazuh/wazuh-dashboard:|WAZUH_CURRENT_KUBERNETES|-|WAZUH_CURRENT_KUBERNETES_REV|``.
   -  Edit the manifest file ``wazuh/indexer_stack/wazuh-indexer/cluster/indexer-sts.yaml`` that defines the Wazuh indexer statefulset. Locate the ``containers`` section and replace the ``image`` value with ``wazuh/wazuh-indexer:|WAZUH_CURRENT_KUBERNETES|-|WAZUH_CURRENT_KUBERNETES_REV|``.
   -  Edit the manifest file ``wazuh/wazuh_managers/wazuh-master-sts.yaml`` that defines the Wazuh manager master statefulset. Locate the ``initContainers`` and ``containers`` section and replace the ``image`` value with ``wazuh/wazuh-manager:|WAZUH_CURRENT_KUBERNETES|-|WAZUH_CURRENT_KUBERNETES_REV|``.
   -  Edit the manifest file ``wazuh/wazuh_managers/wazuh-worker-sts.yaml`` that defines the Wazuh manager worker statefulset. Locate the ``initContainers`` and ``containers`` section and replace the ``image`` value with ``wazuh/wazuh-manager:|WAZUH_CURRENT_KUBERNETES|-|WAZUH_CURRENT_KUBERNETES_REV|``.

#. Run the command below to deploy Traefik CRD:

   .. code-block:: console

      $ cd ..
      $ kubectl apply -f traefik/crd/

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      customresourcedefinition.apiextensions.k8s.io/ingressroutes.traefik.io created
      customresourcedefinition.apiextensions.k8s.io/ingressroutetcps.traefik.io created
      customresourcedefinition.apiextensions.k8s.io/ingressrouteudps.traefik.io created
      customresourcedefinition.apiextensions.k8s.io/middlewares.traefik.io created
      customresourcedefinition.apiextensions.k8s.io/middlewaretcps.traefik.io created
      customresourcedefinition.apiextensions.k8s.io/serverstransports.traefik.io created
      customresourcedefinition.apiextensions.k8s.io/serverstransporttcps.traefik.io created
      customresourcedefinition.apiextensions.k8s.io/tlsoptions.traefik.io created
      customresourcedefinition.apiextensions.k8s.io/tlsstores.traefik.io created
      customresourcedefinition.apiextensions.k8s.io/traefikservices.traefik.io created

#. Deploy the Wazuh Kubernetes cluster using the ``kustomization`` file:

   .. code-block:: console

      $ kubectl apply -k envs/local-env/

   .. note::

      For Kubernetes clusters running on Minikube, run the command below to load the docker images into Minikube before deploying the Wazuh Kubernetes cluster.

      .. code-block:: console

         $ docker pull wazuh/wazuh-indexer:|WAZUH_CURRENT_KUBERNETES|-|WAZUH_CURRENT_KUBERNETES_REV|
         $ docker pull wazuh/wazuh-manager:|WAZUH_CURRENT_KUBERNETES|-|WAZUH_CURRENT_KUBERNETES_REV|
         $ docker pull wazuh/wazuh-dashboard:|WAZUH_CURRENT_KUBERNETES|-|WAZUH_CURRENT_KUBERNETES_REV|
         $ minikube image load wazuh/wazuh-indexer:|WAZUH_CURRENT_KUBERNETES|-|WAZUH_CURRENT_KUBERNETES_REV|
         $ minikube image load wazuh/wazuh-manager:|WAZUH_CURRENT_KUBERNETES|-|WAZUH_CURRENT_KUBERNETES_REV|
         $ minikube image load wazuh/wazuh-dashboard:|WAZUH_CURRENT_KUBERNETES|-|WAZUH_CURRENT_KUBERNETES_REV|

#. Run the following commands to expose the Wazuh manager ports for agent enrollment and Wazuh API service using port forwarding:

   .. code-block:: console

      $ kubectl -n wazuh port-forward service/wazuh-agents --address <KUBERNETES_HOST_IP_ADDRESS> 1517:1517 > /tmp/wazuh-agent-port-forward.log 2>&1 &
      $ kubectl -n wazuh port-forward service/wazuh-api --address <KUBERNETES_HOST_IP_ADDRESS> 55000:55000 &

   .. note::

      Older versions of Wazuh agents (version 4.x) use the ports 1514 and 1515 for agent enrollment and connection. Run the command below to expose ports 1514 and 1515.

      .. code-block:: console

         $ kubectl -n wazuh port-forward service/wazuh-agents --address <KUBERNETES_HOST_IP_ADDRESS> 1514:1514 > /tmp/wazuh-agent-port-forward.log 2>&1 &
         $ kubectl -n wazuh port-forward service/wazuh-agents --address <KUBERNETES_HOST_IP_ADDRESS> 1515:1515 > /tmp/wazuh-agent-port-forward.log 2>&1 &

#. Access the Wazuh dashboard using port forwarding. The Wazuh dashboard will be accessible on ``https://<KUBERNETES_HOST_IP_ADDRESS>:8443``:

   .. code-block:: console

      $ kubectl -n wazuh port-forward service/dashboard --address <KUBERNETES_HOST_IP_ADDRESS> 8443:443 > /tmp/wazuh-dashboard-port-forward.log 2>&1 &

   Replace ``<KUBERNETES_HOST_IP_ADDRESS>`` with the IP address of the Kubernetes endpoint:

   Refer to the :ref:`verifying the deployment <verifying-the-deployment>` section to confirm the deployment is successful.

Allow agent traffic to the Wazuh manager
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Perform the following steps to permit Wazuh agent traffic to the Wazuh manager.

#. Create the network policy manifest ``allow-agents-to-manager-np.yaml``.

   .. code-block:: yaml

      apiVersion: networking.k8s.io/v1
      kind: NetworkPolicy
      metadata:
        name: allow-agents-to-manager
        namespace: wazuh
      spec:
        podSelector:
          matchLabels:
            app: wazuh-manager
        policyTypes:
          - Ingress
        ingress:
          - from:
              - ipBlock:
                  cidr: 0.0.0.0/0
            ports:
              - port: 1514
                protocol: TCP
              - port: 1514
                protocol: UDP
              - port: 1515
                protocol: TCP
              - port: 1517
                protocol: TCP

#. Apply the manifest ``allow-agents-to-manager-np.yaml``.

   .. code-block:: console

      $ kubectl apply -f allow-agents-to-manager-np.yaml

.. _verifying-the-deployment:

Verifying the deployment
^^^^^^^^^^^^^^^^^^^^^^^^

Namespace
~~~~~~~~~

Run the following command to check that the Wazuh namespace is active:

.. code-block:: console

   $ kubectl get namespaces | grep wazuh

.. code-block:: none
   :class: output

   wazuh         Active    12m

Services
~~~~~~~~

Run the command below to view all running services in the Wazuh namespace:

.. code-block:: console

   $ kubectl get services -n wazuh

.. code-block:: none
   :class: output

   NAME                 TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)             AGE
   dashboard            ClusterIP   10.100.196.140   <none>        443/TCP             23m
   wazuh-api            ClusterIP   10.100.58.98     <none>        55000/TCP           23m
   wazuh-cluster        ClusterIP   None             <none>        1516/TCP            23m
   wazuh-events         ClusterIP   10.100.63.117    <none>        1514/TCP            23m
   wazuh-indexer        ClusterIP   None             <none>        9300/TCP,9200/TCP   23m
   wazuh-registration   ClusterIP   10.100.40.83     <none>        1515/TCP            23m

.. note::

   Record the External IP addresses for the ``wazuh-registration`` and ``wazuh-events`` services, as they are required during Wazuh agent installation.

   The ``wazuh-registration`` External IP is used as the Wazuh registration server IP address (port ``1515``), while the ``wazuh-events`` External IP is used as the Wazuh manager IP address for event transmission (port ``1514``) after enrollment.

Deployments
~~~~~~~~~~~

Run the command below to check for the deployments in the Wazuh namespace:

.. code-block:: console

   $ kubectl get deployments -n wazuh

.. code-block:: none
   :class: output

   NAME             DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
   wazuh-dashboard  1         1         1            1           11m

StatefulSets
~~~~~~~~~~~~

Run the command below to check the active StatefulSets in the Wazuh namespace:

.. code-block:: console

   $ kubectl get statefulsets -n wazuh

.. code-block:: none
   :class: output

   NAME                   READY   AGE
   wazuh-indexer          3/3     15m
   wazuh-manager-master   1/1     15m
   wazuh-manager-worker   2/2     15m

Pods
~~~~

Run the command below to view the pods' status in the Wazuh namespace:

.. code-block:: console

   $ kubectl get pods -n wazuh

.. code-block:: none
   :class: output

   NAME                               READY   STATUS    RESTARTS   AGE
   wazuh-dashboard-57d455f894-ffwsk   1/1     Running   0          4h17m
   wazuh-indexer-0                    1/1     Running   0          4h17m
   wazuh-indexer-1                    1/1     Running   0          4h17m
   wazuh-indexer-2                    1/1     Running   0          4h17m
   wazuh-manager-master-0             1/1     Running   0          4h17m
   wazuh-manager-worker-0             1/1     Running   0          4h17m
   wazuh-manager-worker-1             1/1     Running   0          4h17m

Note that the Wazuh manager assigns a Wazuh agent enrollment password by default. Run the command below to confirm the password string.

.. code-block:: console

   # kubectl exec -it wazuh-manager-master-0 -n wazuh -- cat /var/ossec/etc/authd.pass

Accessing the Wazuh dashboard (EKS users only)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you created domain names for the services, access the dashboard at ``https://wazuh.<YOUR_DOMAIN>.com``. Otherwise, access the Wazuh dashboard using the ``EXTERNAL-IP`` address or hostname that your cloud provider assigned.

Check the services to view ``EXTERNAL-IP``:

   .. code-block:: console

      # kubectl -n traefik get svc

   .. code-block:: none
      :class: output

      NAME                                 TYPE           CLUSTER-IP      EXTERNAL-IP                                                                     PORT(S)                                                    AGE
      ingress-Traefik-controller             LoadBalancer   10.100.228.67   a0c363db4315d484fa38751820a9e89b-e1811181631efef0.elb.us-west-1.amazonaws.com   80:30561/TCP,443:32533/TCP,1514:31784/TCP,1515:31274/TCP   36s
      ingress-Traefik-controller-admission   ClusterIP      10.100.118.85   <none>                                                                          443/TCP                                                    35s

.. note::

   For a local cluster deployment where the ``EXTERNAL-IP`` address is not accessible, you can access the Wazuh dashboard using a ``port-forward`` as shown below:

   .. code-block:: console

      # kubectl -n wazuh port-forward --address <KUBERNETES_HOST_IP_ADDRESS> service/dashboard 8443:443 > /tmp/wazuh-dashboard-port-forward.log 2>&1 &

The Wazuh dashboard is accessible at ``https://<KUBERNETES_HOST_IP_ADDRESS>:8443``.

The default credentials are ``admin:admin``.

Deploying a Wazuh agent
-----------------------

This section provide steps to enroll a Wazuh agent in a Wazuh manager running in a Kubernetes environment and deploy a Wazuh agent on Kubernetes.

.. contents::
   :local:
   :depth: 1
   :backlinks: none

.. _kubernetes-creating-enrollment-token:

Creating an enrollment token
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform the following steps to generate an enrollment token for the Wazuh agent deployment.

#. On the Wazuh dashboard, Click **☰** to open the menu and navigate to **Agent management** > **Enrollment tokens**. Click on **Create token**.

#. Fill in the following configuration information

   #. **Address**: Provide the Wazuh manager address (For example: ``wazuh-agents.wazuh.svc.cluster.local``) .
   #. Toggle **Embed CA** to include the CA certificate in the token.
   #. Click **Create**.

   .. thumbnail:: /images/deployment-options/deploying-with-kubernetes/kubernetes-enrollment-token-address.png
      :title: Create enrollment token
      :alt: Create enrollment token form with the Address field
      :align: center
      :width: 80%

   .. thumbnail:: /images/deployment-options/deploying-with-kubernetes/kubernetes-enrollment-token-embed-ca.png
      :title: Embed CA option
      :alt: Create enrollment token form with the Embed CA option enabled
      :align: center
      :width: 80%

#. Copy the enrollment token created. This will be required for the Wazuh agent deployment.

Enrolling a Wazuh agent
^^^^^^^^^^^^^^^^^^^^^^^

Follow the steps below to enroll a Wazuh agent in a Wazuh manager running in a Kubernetes environment.

#. Note the following Wazuh agent deployment variables to simplify the installation, enrollment, and configuration process of the Wazuh agent.

   -  ``WAZUH_ENROLLMENT_TOKEN``: The enrollment token generated for the agent deployment.
   -  ``WAZUH_AGENT_NAME``: Name of the new Wazuh agent to be enrolled.

#. Use the deployment variables to install the Wazuh agent using the :doc:`Wazuh agent installation </installation-guide/wazuh-agent/index>` guide. The example below shows the command to install the Wazuh agent on a Linux endpoint after adding the :ref:`Wazuh repository <agent-installation-add-wazuh-repository>`.

   .. code-block:: console

      $ sudo WAZUH_ENROLLMENT_TOKEN="<ENROLLMENT_TOKEN>" \
      WAZUH_AGENT_NAME="<WAZUH_AGENT_NAME>" \
      apt-get install -y wazuh-agent

   Replace:

   -  ``<ENROLLMENT_TOKEN>`` with the Wazuh agent enrollment token generated in the previous :ref:`section <kubernetes-creating-enrollment-token>`.
   -  ``<WAZUH_AGENT_NAME>`` with the Wazuh agent name that will be used for enrollment.

   Enable and start the Wazuh agent service with the following commands.

   .. code-block:: console

      # systemctl daemon-reload
      # systemctl enable wazuh-agent
      # systemctl start wazuh-agent

Wazuh agent deployment on Kubernetes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh agent can be deployed directly within your Kubernetes environment to monitor workloads, pods, and container activity. This setup provides visibility into the cluster's runtime behavior, helping detect threats and configuration issues at the container and node levels.

There are two main deployment models for Wazuh agents in Kubernetes:

-  **DaemonSet deployment** where one Wazuh agent runs on each node to monitor the node and all containers on that node.
-  **Sidecar deployment** where the Wazuh agent runs as a companion container alongside a specific application pod to monitor that application only.

Deploying the Wazuh agent as a DaemonSet
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This is the most common approach for full-cluster monitoring. Each node runs one agent, ensuring complete coverage without manual intervention when new nodes are added.

#. Create the Wazuh agent DaemonSet manifest ``wazuh-agent-daemonset.yaml``:

   .. code-block:: yaml
      :emphasize-lines: 18

      apiVersion: v1
      kind: Namespace
      metadata:
        name: wazuh-daemonset
      ---
      # Replace TOKEN_PLACEHOLDER with a real enrollment token, minted on the
      # manager with:
      #   wazuh-manager-authd --create-enrollment-token \
      #     --address wazuh-agents.wazuh.svc.cluster.local
      # (the --address value must be in the manager listener certificate's SAN)
      apiVersion: v1
      kind: Secret
      metadata:
        name: wazuh-enrollment-token
        namespace: wazuh-daemonset
      type: Opaque
      stringData:
        token: "<ENROLLMENT_TOKEN>"
      ---
      apiVersion: apps/v1
      kind: DaemonSet
      metadata:
        name: wazuh-agent
        namespace: wazuh-daemonset
      spec:
        selector:
          matchLabels:
            app: wazuh-agent
        template:
          metadata:
            labels:
              app: wazuh-agent
          spec:
            automountServiceAccountToken: false
            terminationGracePeriodSeconds: 20
            initContainers:
              # Clear stale PID/lock files left behind by an unclean restart
              - name: cleanup-ossec-stale
                image: busybox:1.36
                imagePullPolicy: IfNotPresent
                command: ["/bin/sh", "-lc"]
                args:
                  - |
                    set -e
                    mkdir -p /agent/var/run /agent/queue/ossec
                    rm -f /agent/var/run/*.pid || true
                    rm -f /agent/queue/ossec/*.lock || true
                volumeMounts:
                  - name: ossec-data
                    mountPath: /agent
              # Seed /var/ossec into the persistent hostPath on first run only,
              - name: prepare-ossec-tree
                image: public.ecr.aws/wazuh-cicd/wazuh/wazuh-agent:|WAZUH_CURRENT|-latest
                imagePullPolicy: IfNotPresent
                command: ["/bin/sh", "-lc"]
                args:
                  - |
                    set -e
                    if [ ! -d /agent/bin ]; then
                      cp -a /var/ossec/. /agent/
                    fi
                    for d in etc logs queue var rids tmp "active-response"; do
                      [ -d "/agent/$d" ] && chown -R wazuh:wazuh "/agent/$d"
                    done
                    chown -R 0:0 /agent/bin /agent/lib || true
                    find /agent/bin -type f -exec chmod 0755 {} \; || true
                volumeMounts:
                  - name: ossec-data
                    mountPath: /agent
            containers:
              - name: wazuh-agent
                image: public.ecr.aws/wazuh-cicd/wazuh/wazuh-agent:|WAZUH_CURRENT|-latest
                imagePullPolicy: IfNotPresent
                env:
                  - name: NODE_NAME
                    valueFrom:
                      fieldRef:
                        fieldPath: spec.nodeName
                  - name: WAZUH_AGENT_NAME
                    value: "wazuh-agent-$(NODE_NAME)"
                  - name: WAZUH_ENROLLMENT_TOKEN
                    valueFrom:
                      secretKeyRef:
                        name: wazuh-enrollment-token
                        key: token
                securityContext:
                  runAsUser: 0
                  allowPrivilegeEscalation: true
                  capabilities:
                    add: ["SETGID", "SETUID"]
                volumeMounts:
                  - name: varlog
                    mountPath: /var/log
                    readOnly: true
                  - name: ossec-data
                    mountPath: /var/ossec
            volumes:
              - name: varlog
                hostPath:
                  path: /var/log
                  type: Directory
              - name: ossec-data
                hostPath:
                  path: /var/lib/wazuh
                  type: DirectoryOrCreate

   Replace:

   -  ``<ENROLLMENT_TOKEN>`` with the Wazuh agent enrollment token generated in the previous :ref:`section <kubernetes-creating-enrollment-token>`.

#. Create the namespace:

   .. code-block:: console

      $ kubectl create namespace wazuh-daemonset

#. Deploy the Wazuh agent:

   .. code-block:: console

      $ kubectl apply -f wazuh-agent-daemonset.yaml

#. Verify that the Wazuh agent is deployed across all nodes with the following command:

   .. code-block:: console

      $ kubectl get pods -n wazuh-daemonset -o wide

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      $ kubectl get pods -n wazuh-daemonset -o wide
      NAME                READY   STATUS    RESTARTS   AGE   IP          NODE     NOMINATED NODE   READINESS GATES
      wazuh-agent-t2fwl   1/1     Running   0          21m   10.42.0.9   server   <none>           <none>

Deploying the Wazuh agent as a Sidecar
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The sidecar approach is ideal for targeted monitoring of sensitive applications or workloads that require isolated log collection. Perform the steps below to deploy Wazuh as a Sidecar:

#. Modify your application's deployment to include the Wazuh agent container. In the example below, we deploy Wazuh alongside the Apache Tomcat application from the ``wazuh-agent-sidecar.yaml`` deployment file:

   .. code-block:: yaml
      :emphasize-lines: 125

      apiVersion: v1
      kind: Namespace
      metadata:
        name: wazuh-sidecar
      ---
      # Replace TOKEN_PLACEHOLDER with a real enrollment token - see the
      apiVersion: v1
      kind: Secret
      metadata:
        name: wazuh-enrollment-token
        namespace: wazuh-sidecar
      type: Opaque
      stringData:
        token: "TOKEN_PLACEHOLDER"
      ---
      apiVersion: apps/v1
      kind: StatefulSet
      metadata:
        name: tomcat-wazuh-agent
        namespace: wazuh-sidecar
      spec:
        serviceName: tomcat-app
        replicas: 1
        selector:
          matchLabels:
            app: tomcat-wazuh-agent
        template:
          metadata:
            labels:
              app: tomcat-wazuh-agent
          spec:
            automountServiceAccountToken: false
            terminationGracePeriodSeconds: 20
            initContainers:
              # Clear stale PID/lock files left behind by an unclean restart
              - name: cleanup-ossec-stale
                image: busybox:1.36
                imagePullPolicy: IfNotPresent
                command: ["/bin/sh", "-lc"]
                args:
                  - |
                    set -e
                    mkdir -p /agent/var/run /agent/queue/ossec
                    rm -f /agent/var/run/*.pid || true
                    rm -f /agent/queue/ossec/*.lock || true
                volumeMounts:
                  - name: wazuh-agent-data
                    mountPath: /agent
              # Seed /var/ossec into the PVC on first run only
              - name: prepare-ossec-tree
                image: public.ecr.aws/wazuh-cicd/wazuh/wazuh-agent:|WAZUH_CURRENT|-latest
                imagePullPolicy: IfNotPresent
                command: ["/bin/sh", "-lc"]
                args:
                  - |
                    set -e
                    if [ ! -d /agent/bin ]; then
                      cp -a /var/ossec/. /agent/
                      cat >> /agent/etc/ossec.conf <<'EOF'
                    <ossec_config>
                      <localfile>
                        <log_format>syslog</log_format>
                        <location>/usr/local/tomcat/logs/catalina.*.log</location>
                      </localfile>
                    </ossec_config>
                    EOF
                    fi
                    for d in etc logs queue var rids tmp "active-response"; do
                      [ -d "/agent/$d" ] && chown -R wazuh:wazuh "/agent/$d"
                    done
                    chown -R 0:0 /agent/bin /agent/lib || true
                    find /agent/bin -type f -exec chmod 0755 {} \; || true
                volumeMounts:
                  - name: wazuh-agent-data
                    mountPath: /agent
            containers:
              - name: tomcat
                image: tomcat:10.1-jdk17
                imagePullPolicy: IfNotPresent
                ports:
                  - containerPort: 8080
                volumeMounts:
                  - name: application-data
                    mountPath: /usr/local/tomcat/logs
              - name: wazuh-agent
                image: public.ecr.aws/wazuh-cicd/wazuh/wazuh-agent:|WAZUH_CURRENT|-latest
                imagePullPolicy: IfNotPresent
                lifecycle:
                  preStop:
                    exec:
                      command: ["/bin/sh", "-lc", "/var/ossec/bin/wazuh-control stop || true; sleep 2"]
                env:
                  - name: WAZUH_AGENT_NAME
                    valueFrom:
                      fieldRef:
                        fieldPath: metadata.name
                  - name: WAZUH_ENROLLMENT_TOKEN
                    valueFrom:
                      secretKeyRef:
                        name: wazuh-enrollment-token
                        key: token
                securityContext:
                  runAsUser: 0
                  allowPrivilegeEscalation: true
                  capabilities:
                    add: ["SETGID", "SETUID"]
                volumeMounts:
                  - name: wazuh-agent-data
                    mountPath: /var/ossec
                  - name: application-data
                    mountPath: /usr/local/tomcat/logs
        volumeClaimTemplates:
          - metadata:
              name: wazuh-agent-data
            spec:
              accessModes: ["ReadWriteOnce"]
              # storageClassName: gp2   # set to your cluster's StorageClass (kubectl get sc)
              resources:
                requests:
                  storage: 3Gi
          - metadata:
              name: application-data
            spec:
              accessModes: ["ReadWriteOnce"]
              # storageClassName: gp2   # uncomment to set to your cluster's StorageClass on EKS (kubectl get sc)
              resources:
                requests:
                  storage: 5Gi
      ---
      apiVersion: v1
      kind: Service
      metadata:
        name: tomcat-app
        namespace: wazuh-sidecar
      spec:
        selector:
          app: tomcat-wazuh-agent
        type: NodePort
        ports:
          - protocol: TCP
            port: 80
            targetPort: 8080
            nodePort: 30013

   Replace:

   -  ``<ENROLLMENT_TOKEN>`` with the Wazuh agent enrollment token generated in the previous :ref:`section <kubernetes-creating-enrollment-token>`.

#. Create the namespace for the Wazuh agent and the Node.js application:

   .. code-block:: console

      # kubectl create namespace wazuh-sidecar

#. Deploy the sidecar setup:

   .. code-block:: console

      # kubectl apply -f wazuh-agent-sidecar.yaml

#. Run the command below to confirm that the ``tomcat-wazuh-agent`` pod is running:

   .. code-block:: console

      # kubectl get pods -n wazuh-sidecar

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      NAME                           READY   STATUS     RESTARTS   AGE
      tomcat-wazuh-agent-0   2/2     Running           0          18s
