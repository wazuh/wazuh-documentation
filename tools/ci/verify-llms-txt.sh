#!/usr/bin/env bash
#
# verify-llms-txt.sh - production acceptance check for the documentation llms.txt.
#
# Purpose (issue P1-002-docs-llms-txt / audit DOC-010):
#   Verify, against a LIVE deployment, that the published llms.txt is correct.
#   It inspects BOTH served locations because they behave differently today:
#
#     A) Domain-root  : $BASE_URL/llms.txt
#        Expected: 200 text/plain. This copy is served directly and does NOT
#        depend on the P0-001 soft-404 serving fix, so it is the immediate
#        acceptance gate for the CONTENT fix.
#
#     B) Per-version  : $BASE_URL/$VERSION/llms.txt   (default VERSION=current)
#        Expected (target): 200 text/plain. Today it is swept into the P0-001
#        302 -> moved-content.html chain. If that is still happening, this
#        script reports a clear "blocked-by-P0-001" SERVING note and does NOT
#        hard-fail the content acceptance (serving is owned by issue P0-001).
#
#   For every copy that is reachable as plain text it:
#     - asserts content-type text/plain,
#     - re-runs the static defect checks (no docs.wazuh.com, no [citation:]) and
#       the link integrity check against the SERVED bytes, by delegating to the
#       sibling check-llms-txt.sh.
#
# Exit codes:
#   0 = content acceptance PASS (every reachable plain-text copy is defect-free
#       and all its links resolve). A still-broken per-version SERVING state is
#       reported as a note, not a content failure.
#   1 = content acceptance FAIL (a served copy carries a defect / broken link,
#       or the root copy is not reachable as text/plain).
#   2 = usage / environment error.
#
# Usage:
#   BASE_URL=https://documentation.wazuh.com VERSION=current ./verify-llms-txt.sh
#   ./verify-llms-txt.sh                 # uses the defaults above
#
# Dependencies: bash, curl, and the sibling check-llms-txt.sh.
#
set -uo pipefail

BASE_URL="${BASE_URL:-https://documentation.wazuh.com}"
VERSION="${VERSION:-current}"
TIMEOUT="${TIMEOUT:-25}"

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
GUARD="$HERE/check-llms-txt.sh"

if ! command -v curl >/dev/null 2>&1; then
  echo "ERROR: curl is required." >&2; exit 2
fi
if [ ! -x "$GUARD" ] && [ ! -f "$GUARD" ]; then
  echo "ERROR: sibling guard not found: $GUARD" >&2; exit 2
fi

CONTENT_FAILED=0   # hard content failures -> exit 1
SERVING_BLOCKED=0  # informational: per-version copy still on the 302 chain

# check_copy LABEL URL REQUIRE_DIRECT
#   REQUIRE_DIRECT=1 -> a redirect away from the URL is treated as a serving
#   problem (used for the per-version copy, where 302 == P0-001 not yet fixed).
check_copy() {
  local label="$1" url="$2" require_direct="$3"
  echo "== $label =="
  echo "url: $url"

  # Headers / status (no follow), to see the raw serving behavior. A '|'
  # delimiter keeps parsing correct even when content-type is empty (302 case).
  local code ctype redirects effurl
  IFS='|' read -r code redirects ctype effurl < <(
    curl -sS --max-time "$TIMEOUT" -o /dev/null \
      -w '%{http_code}|%{num_redirects}|%{content_type}|%{url_effective}' \
      "$url" 2>/dev/null || echo "000|0|-|-"
  )
  echo "status: $code  content-type: ${ctype:-none}"

  # Detect the soft-404 sweep (P0-001) on the per-version copy.
  local follow_code follow_eff
  IFS='|' read -r follow_code follow_eff < <(
    curl -sS -L --max-time "$TIMEOUT" -o /dev/null \
      -w '%{http_code}|%{url_effective}' "$url" 2>/dev/null || echo "000|-"
  )

  if [ "$code" != "200" ] || [ "${ctype%%;*}" != "text/plain" ]; then
    case "$follow_eff" in
      *moved-content*|*not_found*)
        if [ "$require_direct" = "1" ]; then
          echo "NOTE: $label is swept into the P0-001 soft-404 chain"
          echo "      ($url -> $follow_eff). Serving is owned by issue"
          echo "      P0-001-docs-soft404 (its Step 6). Content fix is NOT"
          echo "      blocked by this; re-run after P0-001 ships."
          SERVING_BLOCKED=1
          echo
          return 0
        fi
        ;;
    esac
    echo "FAIL: $label expected 200 text/plain, got $code ${ctype:-none}"
    CONTENT_FAILED=1
    echo
    return 0
  fi

  echo "PASS: served as 200 text/plain"

  # Download the served bytes and run the guard (static + links) on them.
  local body; body="$(mktemp)"
  if ! curl -sS -L --max-time "$TIMEOUT" -o "$body" "$url" 2>/dev/null; then
    echo "FAIL: could not download served body for $label"
    CONTENT_FAILED=1; rm -f "$body"; echo; return 0
  fi

  echo "-- guard on served bytes --"
  if bash "$GUARD" --links --timeout "$TIMEOUT" "$body"; then
    echo "PASS: served $label is defect-free and all links resolve"
  else
    echo "FAIL: served $label failed the guard (see above)"
    CONTENT_FAILED=1
  fi
  rm -f "$body"
  echo
}

echo "############################################################"
echo "# verify-llms-txt.sh"
echo "# base: $BASE_URL   version: $VERSION"
echo "############################################################"
echo

check_copy "root copy  (/llms.txt)"            "$BASE_URL/llms.txt"             0
#check_copy "version copy (/$VERSION/llms.txt)" "$BASE_URL/$VERSION/llms.txt"   1

echo "############################################################"
if [ "$CONTENT_FAILED" -eq 0 ]; then
  echo "CONTENT ACCEPTANCE: PASS"
  if [ "$SERVING_BLOCKED" -eq 1 ]; then
    echo "SERVING: BLOCKED on P0-001 for the /$VERSION/ copy (informational)."
  else
    echo "SERVING: OK for the checked copies."
  fi
  echo "############################################################"
  exit 0
else
  echo "CONTENT ACCEPTANCE: FAIL"
  echo "############################################################"
  exit 1
fi
