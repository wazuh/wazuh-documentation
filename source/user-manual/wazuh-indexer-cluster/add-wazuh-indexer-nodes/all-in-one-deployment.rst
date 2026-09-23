.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to add a new Wazuh indexer node to an all-in-one Wazuh deployment, including certificate creation, deployment, and configuring the existing components.

All-in-one deployment
=====================

.. _all_in_one_certificates_creation_and_deployment:

Certificates creation and deployment
------------------------------------

We create and deploy new certificates for your Wazuh indexer nodes and other Wazuh components when scaling an all-in-one deployment. This is necessary if you do not have access to your root CA.

Perform the outlined steps on your existing Wazuh indexer node to generate the certificates required for secure communication among the Wazuh central components.

.. note::

   Single-node deployments name the Wazuh indexer node as ``indexer`` by default. This guide renames the existing node to ``indexer-1`` so the certificates and the configuration follow the ``indexer-1``, ``indexer-2`` naming scheme. The ``node.name`` value on the existing node must be updated to match the name on the new certificate.

#. Create a ``config.yml`` file in the ``/root`` directory:

   .. code-block:: console

      # touch /root/config.yml

#. Edit ``/root/config.yml`` to reference all nodes in your deployment, including the new Wazuh indexer node. In an all-in-one deployment, the Wazuh manager and the Wazuh dashboard share the address of the existing node:

   .. code-block:: yaml

      nodes:
        # Wazuh indexer nodes
        indexer:
          - name: indexer-1
            ip: "<EXISTING_WAZUH_INDEXER_IP>"
          - name: indexer-2
            ip: "<NEW_WAZUH_INDEXER_IP>"
        # Wazuh manager nodes
        manager:
          - name: wazuh-manager
            ip: "<WAZUH_MANAGER_IP>"
        # Wazuh dashboard nodes
        dashboard:
          - name: wazuh-dashboard
            ip: "<WAZUH_DASHBOARD_IP>"

#. Download and run the certificates tool in the ``/root`` directory to recreate the certificates for the existing and new nodes:

   .. code-block:: console

      # curl -sO https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-certs-tool-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh
      # bash wazuh-certs-tool-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh -A

#. Compress the certificates folder and copy it to the new Wazuh indexer node. You can use the ``scp`` utility to copy the compressed file securely:

   .. code-block:: console

      # tar -cvf ./wazuh-certificates.tar -C ./wazuh-certificates/ .
      # scp wazuh-certificates.tar <TARGET_USERNAME>@<TARGET_IP>:

   This copies the certificates to the home directory of the logged-in user on the target endpoint. You can change this to point to your installation directory.

   Replace:

   -  ``<TARGET_USERNAME>`` with the SSH login username on the new Wazuh indexer node.

   -  ``<TARGET_IP>`` with the IP address of the new Wazuh indexer node.

#. Create the ``deploy-certificates.sh`` script to deploy the certificates on the respective Wazuh component nodes:

   .. code-block:: bash

      #!/bin/bash
      # Wazuh 5.0 certificate deployment script
      # Deploys the Wazuh indexer, Wazuh manager, and/or Wazuh dashboard certificates
      # from a wazuh-certificates.tar archive to the correct directory on this node.
      #
      # Usage:
      #   bash deploy-certificates.sh -i <INDEXER_NODE_NAME> -m <MANAGER_NODE_NAME> -d <DASHBOARD_NODE_NAME> [-t <PATH_TO_CERTIFICATES_TAR>] [-b] [-n]
      #
      # Pass the node names exactly as defined in the config.yml used to create the
      # certificates, and pass only the flags for the components installed on this node.
      # On an all-in-one deployment, pass -i, -m, and -d together, for example:
      #   bash deploy-certificates.sh -i indexer -m manager -d dashboard
      #
      # The script never deletes the certificates directory. It only writes the files
      # it deploys, so certificates created by the Wazuh packages that are not part of
      # the archive, such as the Wazuh manager certificates used to authenticate Wazuh
      # agents, are preserved.
      #
      # Every precondition is checked before anything is written to disk: the archive
      # members, the presence of each selected component, and the signing chain of the
      # archive itself. A node that is missing a component therefore fails with nothing
      # modified, instead of being left with some components on the new certificate
      # authority and some on the old one.
      #
      # File names, permissions, and ownership follow the Wazuh 5.0 installation guide:
      #   /etc/wazuh-indexer/certs      indexer.pem, indexer-key.pem, admin.pem,
      #                                 admin-key.pem, root-ca.pem   400 wazuh-indexer:wazuh-indexer
      #   /var/wazuh-manager/etc/certs  indexer-connector.pem, indexer-connector-key.pem,
      #                                 root-ca.pem                  640 root:wazuh-manager
      #   /etc/wazuh-dashboard/certs    dashboard.pem, dashboard-key.pem,
      #                                 root-ca.pem                  400 wazuh-dashboard:wazuh-dashboard

      set -euo pipefail

      TAR_FILE="./wazuh-certificates.tar"
      INDEXER_NODE=""
      MANAGER_NODE=""
      DASHBOARD_NODE=""
      BACKUP="no"
      DRY_RUN="no"
      STAGING=""
      RUN_TS="$(date +%Y%m%d%H%M%S)"
      BACKUP_DIR="/var/backups/wazuh-certificates/$RUN_TS"

      usage() {
        echo "Usage: bash deploy-certificates.sh -i <INDEXER_NODE_NAME> -m <MANAGER_NODE_NAME> -d <DASHBOARD_NODE_NAME> [-t <PATH_TO_CERTIFICATES_TAR>] [-b] [-n]"
        echo "  -i  Wazuh indexer node name as defined in config.yml"
        echo "  -m  Wazuh manager (server) node name as defined in config.yml"
        echo "  -d  Wazuh dashboard node name as defined in config.yml"
        echo "  -t  Path to the certificates archive (default: ./wazuh-certificates.tar)"
        echo "  -b  Back up every certificate this script replaces, under /var/backups/wazuh-certificates/<timestamp>/"
        echo "  -n  Dry run: report what would change and exit without writing anything"
        echo "Pass only the flags for the components installed on this node."
      }

      while getopts ":i:m:d:t:bnh" opt; do
        case "$opt" in
          i) INDEXER_NODE="$OPTARG" ;;
          m) MANAGER_NODE="$OPTARG" ;;
          d) DASHBOARD_NODE="$OPTARG" ;;
          t) TAR_FILE="$OPTARG" ;;
          b) BACKUP="yes" ;;
          n) DRY_RUN="yes" ;;
          h) usage; exit 0 ;;
          \?) echo "Unknown option: -$OPTARG"; usage; exit 1 ;;
          :) echo "Option -$OPTARG requires an argument"; usage; exit 1 ;;
        esac
      done

      if [ "$(id -u)" -ne 0 ]; then
        echo "Error: run this script as root"
        exit 1
      fi

      if [ -z "$INDEXER_NODE" ] && [ -z "$MANAGER_NODE" ] && [ -z "$DASHBOARD_NODE" ]; then
        echo "Error: specify at least one component with -i, -m, or -d"
        usage
        exit 1
      fi

      # A node name only ever names a member inside the archive. Reject any value that
      # could reach outside it, so a mistyped flag cannot pull in an unrelated path.
      for name in "$INDEXER_NODE" "$MANAGER_NODE" "$DASHBOARD_NODE"; do
        case "$name" in
          */*|*..*)
            echo "Error: invalid node name '$name'. Use the name as defined in config.yml, with no path separators."
            exit 1
            ;;
        esac
      done

      if [ ! -f "$TAR_FILE" ]; then
        echo "Certificates archive $TAR_FILE not found"
        exit 1
      fi

      cleanup() {
        if [ -n "$STAGING" ] && [ -d "$STAGING" ]; then
          rm -rf "$STAGING"
        fi
        return 0
      }
      trap cleanup EXIT

      # ---------------------------------------------------------------------------
      # Preflight. Nothing in this section writes outside the staging directory.
      # ---------------------------------------------------------------------------

      tar_has() {
        tar -tf "$TAR_FILE" "./$1" > /dev/null 2>&1
      }

      REQUIRED=()
      if [ -n "$INDEXER_NODE" ]; then
        REQUIRED+=("$INDEXER_NODE.pem" "$INDEXER_NODE-key.pem" "admin.pem" "admin-key.pem" "root-ca.pem")
      fi
      if [ -n "$MANAGER_NODE" ]; then
        REQUIRED+=("$MANAGER_NODE.pem" "$MANAGER_NODE-key.pem" "root-ca.pem")
      fi
      if [ -n "$DASHBOARD_NODE" ]; then
        REQUIRED+=("$DASHBOARD_NODE.pem" "$DASHBOARD_NODE-key.pem" "root-ca.pem")
      fi

      MISSING=()
      for member in "${REQUIRED[@]}"; do
        tar_has "$member" || MISSING+=("$member")
      done

      if [ "${#MISSING[@]}" -ne 0 ]; then
        echo "Error: the following certificates are not in $TAR_FILE:"
        printf '  %s\n' "${MISSING[@]}" | sort -u
        echo "Check that the node names match the ones defined in config.yml. Nothing was modified."
        exit 1
      fi

      # Component presence is checked here, for every selected component at once, so a
      # node missing one of them fails before any certificate is written. Checking this
      # inside the per-component blocks instead would deploy the earlier components and
      # then abort, leaving the node split across two certificate authorities.
      NOT_INSTALLED=()
      if [ -n "$INDEXER_NODE" ] && ! id wazuh-indexer > /dev/null 2>&1; then
        NOT_INSTALLED+=("wazuh-indexer: the wazuh-indexer user does not exist")
      fi
      if [ -n "$MANAGER_NODE" ]; then
        if [ ! -d /var/wazuh-manager ]; then
          NOT_INSTALLED+=("wazuh-manager: /var/wazuh-manager not found")
        fi
        if ! getent group wazuh-manager > /dev/null 2>&1; then
          NOT_INSTALLED+=("wazuh-manager: the wazuh-manager group does not exist")
        fi
      fi
      if [ -n "$DASHBOARD_NODE" ] && ! id wazuh-dashboard > /dev/null 2>&1; then
        NOT_INSTALLED+=("wazuh-dashboard: the wazuh-dashboard user does not exist")
      fi

      if [ "${#NOT_INSTALLED[@]}" -ne 0 ]; then
        echo "Error: certificates were requested for components that are not installed on this node:"
        printf '  %s\n' "${NOT_INSTALLED[@]}"
        echo "Install the missing packages, or pass only the flags for the components installed here."
        echo "Nothing was modified."
        exit 1
      fi

      STAGING="$(mktemp -d)"
      chmod 700 "$STAGING"

      # Confirm the archive is internally consistent before trusting it: every leaf
      # certificate must be signed by the root CA shipped in the same archive. A
      # mismatched or half-rebuilt archive is caught here, rather than after the
      # services have been restarted and the deployment is already down.
      tar -xf "$TAR_FILE" -C "$STAGING" ./root-ca.pem
      BAD_CHAIN=()
      for member in $(printf '%s\n' "${REQUIRED[@]}" | sort -u); do
        case "$member" in
          *-key.pem|root-ca.pem) continue ;;
        esac
        tar -xf "$TAR_FILE" -C "$STAGING" "./$member"
        if ! openssl verify -CAfile "$STAGING/root-ca.pem" "$STAGING/$member" > /dev/null 2>&1; then
          BAD_CHAIN+=("$member")
        fi
      done

      if [ "${#BAD_CHAIN[@]}" -ne 0 ]; then
        echo "Error: these certificates in $TAR_FILE are not signed by the root-ca.pem in the same archive:"
        printf '  %s\n' "${BAD_CHAIN[@]}"
        echo "Recreate the archive from a single run of the certificates tool. Nothing was modified."
        exit 1
      fi

      # ---------------------------------------------------------------------------
      # Build the full plan, then apply it.
      # ---------------------------------------------------------------------------

      PLAN=()
      add_plan() {
        PLAN+=("$1|$2|$3|$4|$5")
      }

      if [ -n "$INDEXER_NODE" ]; then
        add_plan "$INDEXER_NODE.pem"     /etc/wazuh-indexer/certs/indexer.pem     wazuh-indexer wazuh-indexer 400
        add_plan "$INDEXER_NODE-key.pem" /etc/wazuh-indexer/certs/indexer-key.pem wazuh-indexer wazuh-indexer 400
        add_plan "admin.pem"             /etc/wazuh-indexer/certs/admin.pem       wazuh-indexer wazuh-indexer 400
        add_plan "admin-key.pem"         /etc/wazuh-indexer/certs/admin-key.pem   wazuh-indexer wazuh-indexer 400
        add_plan "root-ca.pem"           /etc/wazuh-indexer/certs/root-ca.pem     wazuh-indexer wazuh-indexer 400
      fi
      if [ -n "$MANAGER_NODE" ]; then
        add_plan "$MANAGER_NODE.pem"     /var/wazuh-manager/etc/certs/indexer-connector.pem     root wazuh-manager 640
        add_plan "$MANAGER_NODE-key.pem" /var/wazuh-manager/etc/certs/indexer-connector-key.pem root wazuh-manager 640
        add_plan "root-ca.pem"           /var/wazuh-manager/etc/certs/root-ca.pem                root wazuh-manager 640
      fi
      if [ -n "$DASHBOARD_NODE" ]; then
        add_plan "$DASHBOARD_NODE.pem"     /etc/wazuh-dashboard/certs/dashboard.pem     wazuh-dashboard wazuh-dashboard 400
        add_plan "$DASHBOARD_NODE-key.pem" /etc/wazuh-dashboard/certs/dashboard-key.pem wazuh-dashboard wazuh-dashboard 400
        add_plan "root-ca.pem"             /etc/wazuh-dashboard/certs/root-ca.pem       wazuh-dashboard wazuh-dashboard 400
      fi

      if [ "$DRY_RUN" = "yes" ]; then
        echo "Dry run. The following files would be written, and nothing else:"
        for entry in "${PLAN[@]}"; do
          IFS='|' read -r member target owner group mode <<< "$entry"
          if [ -f "$target" ]; then
            state="replace"
          else
            state="create "
          fi
          printf '  %s  %-58s %s %s:%s  (from %s)\n' "$state" "$target" "$mode" "$owner" "$group" "$member"
        done
        echo "Nothing was modified."
        exit 0
      fi

      if [ "$BACKUP" = "yes" ]; then
        install -d -m 700 -o root -g root "$BACKUP_DIR"
      fi

      deploy() {
        local member="$1" target="$2" owner="$3" group="$4" mode="$5"
        local flat
        tar -xf "$TAR_FILE" -C "$STAGING" "./$member"
        if [ "$BACKUP" = "yes" ] && [ -f "$target" ]; then
          # Backups live outside the certificate directories, so superseded private
          # key material never accumulates beside the keys in use. One directory per
          # run also means repeated runs cannot overwrite each other's backups.
          flat="${target#/}"
          flat="${flat//\//_}"
          cp -p "$target" "$BACKUP_DIR/$flat"
        fi
        install -m "$mode" -o "$owner" -g "$group" "$STAGING/$member" "$target"
      }

      # Enforce the directory layout the Wazuh packages ship. install -d leaves the
      # files already in the directory alone, but restores the mode and the group, so
      # a directory left unreadable by an earlier run is repaired. The wazuh-manager
      # group must keep traversal here, because this directory also holds the
      # certificates the package creates to authenticate Wazuh agents.
      if [ -n "$INDEXER_NODE" ]; then
        install -d -m 500 -o wazuh-indexer -g wazuh-indexer /etc/wazuh-indexer/certs
      fi
      if [ -n "$MANAGER_NODE" ]; then
        install -d -m 1770 -o root -g wazuh-manager /var/wazuh-manager/etc/certs
      fi
      if [ -n "$DASHBOARD_NODE" ]; then
        install -d -m 500 -o wazuh-dashboard -g wazuh-dashboard /etc/wazuh-dashboard/certs
      fi

      for entry in "${PLAN[@]}"; do
        IFS='|' read -r member target owner group mode <<< "$entry"
        deploy "$member" "$target" "$owner" "$group" "$mode"
      done

      if [ -n "$INDEXER_NODE" ]; then
        echo "Certificates deployed to /etc/wazuh-indexer/certs for node $INDEXER_NODE"
      fi
      if [ -n "$MANAGER_NODE" ]; then
        echo "Certificates deployed to /var/wazuh-manager/etc/certs for node $MANAGER_NODE"
      fi
      if [ -n "$DASHBOARD_NODE" ]; then
        echo "Certificates deployed to /etc/wazuh-dashboard/certs for node $DASHBOARD_NODE"
      fi
      if [ "$BACKUP" = "yes" ]; then
        echo "Replaced certificates backed up to $BACKUP_DIR"
      fi

      echo "Certificate deployment complete."

      # ---------------------------------------------------------------------------
      # Tell the operator what still has to happen. The services keep using the
      # certificates they loaded at start-up, and a certificate is only accepted for
      # the addresses listed in its Subject Alternative Name, so a component still
      # pointing at an address the new certificate does not cover fails the TLS
      # handshake as soon as it restarts.
      # ---------------------------------------------------------------------------

      echo
      echo "The running services still hold the previous certificates in memory."
      echo "Before restarting them, confirm that every component points at an address"
      echo "covered by the new certificates:"
      for entry in "${PLAN[@]}"; do
        IFS='|' read -r member target owner group mode <<< "$entry"
        case "$target" in
          *-key.pem|*root-ca.pem) continue ;;
        esac
        san="$(openssl x509 -in "$STAGING/$member" -noout -ext subjectAltName 2>/dev/null | tail -n +2 | tr -d ' ' || true)"
        printf '  %-58s %s\n' "$target" "${san:-<no subjectAltName>}"
      done
      echo
      echo "  Wazuh indexer    network.host in /etc/wazuh-indexer/opensearch.yml"
      echo "  Wazuh manager    <host> entries in /var/wazuh-manager/etc/wazuh-manager.conf"
      echo "  Wazuh dashboard  opensearch.hosts in /etc/wazuh-dashboard/opensearch_dashboards.yml"
      echo
      echo "Then restart the components on this node, one at a time."

   For further information on how to use the script, run the command: ``bash ./deploy-certificates.sh -h``.

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      Usage: bash deploy-certificates.sh -i <INDEXER_NODE_NAME> -m <MANAGER_NODE_NAME> -d <DASHBOARD_NODE_NAME> [-t <PATH_TO_CERTIFICATES_TAR>] [-b]
        -i  Wazuh indexer node name as defined in config.yml
        -m  Wazuh manager (server) node name as defined in config.yml
        -d  Wazuh dashboard node name as defined in config.yml
        -t  Path to the certificates archive (default: ./wazuh-certificates.tar)
        -b  Back up any certificate this script replaces, as <file>.bak-<timestamp>
      Pass only the flags for the components installed on this node.

#. Deploy the recreated certificates on the existing components. On the existing Wazuh indexer node, run the deployment script created earlier, passing the existing node names:

   .. code-block:: console

      # bash ./deploy-certificates.sh -i indexer-1 -m wazuh-manager -d wazuh-dashboard -t ./wazuh-certificates.tar

Configuring existing components to connect with the new node
------------------------------------------------------------

In this section, we configure the Wazuh components of your existing all-in-one deployment to connect and communicate with the new Wazuh indexer node.

#. Edit the configuration file at ``/etc/wazuh-indexer/opensearch.yml`` on the existing Wazuh indexer node.

   .. code-block:: yaml

      network.host: "<EXISTING_WAZUH_INDEXER_IP>"
      node.name: "<EXISTING_WAZUH_INDEXER_NODE_NAME>"
      cluster.name: "wazuh-cluster"

      cluster.initial_cluster_manager_nodes:
        - "<EXISTING_WAZUH_INDEXER_NODE_NAME>"

      discovery.seed_hosts:
        - "<EXISTING_WAZUH_INDEXER_IP>"
        - "<NEW_WAZUH_INDEXER_IP>"

      plugins.security.nodes_dn:
        - "CN=<EXISTING_WAZUH_INDEXER_NODE_NAME>,OU=Wazuh,O=Wazuh,L=California,C=US"
        - "CN=<NEW_WAZUH_INDEXER_NODE_NAME>,OU=Wazuh,O=Wazuh,L=California,C=US"

   Replace the following values:

   -  ``<EXISTING_WAZUH_INDEXER_NODE_NAME>`` with the node name of the pre-existing Wazuh indexer.
   -  ``<NEW_WAZUH_INDEXER_NODE_NAME>`` with the node name of the new Wazuh indexer.
   -  ``<EXISTING_WAZUH_INDEXER_IP>`` with the IP address of the pre-existing Wazuh indexer node.
   -  ``<NEW_WAZUH_INDEXER_IP>`` with the IP address of the new Wazuh indexer node.

   .. note::

      The ``cluster.initial_cluster_manager_nodes`` setting is only used the first time a cluster starts. For consistency, keep it aligned with the list across all Wazuh indexer nodes. Still, the settings that allow the new node to join a running cluster are ``discovery.seed_hosts`` and ``plugins.security.nodes_dn``.

#. Edit the ``<indexer>`` block of the Wazuh manager configuration file ``/var/wazuh-manager/etc/wazuh-manager.conf`` to connect to the new Wazuh indexer node. In Wazuh 5.0, the Wazuh manager reports to the Wazuh indexer directly through its indexer connector.

   .. code-block:: xml

      <hosts>
        <host>https://<EXISTING_WAZUH_INDEXER_IP>:9200</host>
        <host>https://<NEW_WAZUH_INDEXER_IP>:9200</host>
      </hosts>

#. Edit the Wazuh dashboard configuration file ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` to include the new Wazuh indexer node:

   .. code-block:: yaml

      opensearch.hosts: ["https://<EXISTING_WAZUH_INDEXER_IP>:9200", "https://<NEW_WAZUH_INDEXER_IP>:9200"]

#. Restart the Wazuh component services to apply the changes:

   .. code-block:: console

      # systemctl restart wazuh-indexer
      # systemctl restart wazuh-manager
      # systemctl restart wazuh-dashboard

Having completed the all-in-one deployment steps, proceed to the :doc:`New Wazuh indexer node <new-wazuh-indexer-node>` step.
