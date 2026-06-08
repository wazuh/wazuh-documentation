#!/usr/bin/env bash
#
# check-llms-txt.sh - CI guard / linter for the documentation llms.txt file.
#
# Purpose (issue P1-002-docs-llms-txt / audit DOC-010):
#   Fail the build if source/llms.txt contains either of the two known defect
#   classes, and (optionally) if any link in it does not resolve cleanly.
#
#   STATIC checks (default, offline, the hard CI gate):
#     1. Forbidden host  : the dead domain `docs.wazuh.com` must not appear.
#                          The pattern uses an ESCAPED dot (docs\.wazuh\.com) so
#                          it can never match the legitimate documentation.wazuh.com.
#     2. Citation token  : leftover generation artifacts like `[citation:2]`
#                          (pattern `\[citation:`) must not appear.
#
#   LINK check (opt-in with --links, needs network):
#     3. Every http(s) URL in the file must resolve to a final HTTP 200.
#        - External hosts (e.g. wazuh.com, github.com) may redirect; the final
#          status must be 200.
#        - documentation.wazuh.com links must additionally NOT be swept into the
#          soft-404 chain: the final URL must not contain moved-content/not_found,
#          and `.md` links must be served as text/markdown.
#
# Exit codes: 0 = all checks passed; 1 = one or more checks failed;
#             2 = usage / environment error.
#
# Usage:
#   ./check-llms-txt.sh [--links] [--timeout N] [PATH_TO_llms.txt]
#
# Defaults:
#   PATH_TO_llms.txt = ../../source/llms.txt
#                      (resolved relative to this script)
#
# Dependencies: bash, grep (ripgrep `rg` used automatically if present), and
#               curl (only when --links is passed). No Python required.
#
set -uo pipefail

# ---------------------------------------------------------------------------
# Argument parsing
# ---------------------------------------------------------------------------
DO_LINKS=0
TIMEOUT=20
FILE=""

while [ $# -gt 0 ]; do
  case "$1" in
    --links) DO_LINKS=1; shift ;;
    --timeout) TIMEOUT="${2:-20}"; shift 2 ;;
    -h|--help)
      grep -E '^#( |$)' "$0" | sed -E 's/^# ?//'
      exit 0 ;;
    -*) echo "ERROR: unknown option: $1" >&2; exit 2 ;;
    *) FILE="$1"; shift ;;
  esac
done

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ -z "$FILE" ]; then
  FILE="$HERE/../../source/llms.txt"
fi

if [ ! -f "$FILE" ]; then
  echo "ERROR: llms.txt not found at: $FILE" >&2
  exit 2
fi

# ---------------------------------------------------------------------------
# Helpers: prefer ripgrep, fall back to grep -E. We want line-numbered matches
# and a clean exit status, without aborting the script (set -e is off on purpose
# so we can aggregate every failure into one report).
# ---------------------------------------------------------------------------
search() {
  # search PATTERN FILE  ->  prints "line:content", returns 0 if any match.
  local pattern="$1" target="$2"
  if command -v rg >/dev/null 2>&1; then
    rg -n -- "$pattern" "$target"
  else
    grep -nE -- "$pattern" "$target"
  fi
}

FAILED=0
fail() { echo "FAIL: $*"; FAILED=1; }
pass() { echo "PASS: $*"; }

echo "== llms.txt guard =="
echo "file: $FILE"
echo

# ---------------------------------------------------------------------------
# Check 1 - forbidden dead host docs.wazuh.com (escaped dot; never matches
#           documentation.wazuh.com).
# ---------------------------------------------------------------------------
if matches="$(search 'docs\.wazuh\.com' "$FILE")"; then
  fail "forbidden host 'docs.wazuh.com' present (use documentation.wazuh.com):"
  echo "$matches" | sed 's/^/      /'
else
  pass "no forbidden host 'docs.wazuh.com'"
fi

# ---------------------------------------------------------------------------
# Check 2 - leftover citation artifact tokens like [citation:2].
# ---------------------------------------------------------------------------
if matches="$(search '\[citation:' "$FILE")"; then
  fail "citation artifact token present:"
  echo "$matches" | sed 's/^/      /'
else
  pass "no '[citation:' artifact tokens"
fi

# ---------------------------------------------------------------------------
# Check 3 - link integrity (opt-in).
# ---------------------------------------------------------------------------
if [ "$DO_LINKS" -eq 1 ]; then
  echo
  echo "== link integrity (--links) =="
  if ! command -v curl >/dev/null 2>&1; then
    echo "ERROR: --links requires curl, which was not found." >&2
    exit 2
  fi

  # Extract every http(s) URL from Markdown link targets and bare URLs.
  # Stop at whitespace or a closing paren, then strip trailing Markdown/
  # punctuation that is not part of the URL (e.g. the italic `*` wrapping the
  # `*Contact: ...*` metadata line, or sentence punctuation).
  urls="$(grep -oE 'https?://[^)[:space:]]+' "$FILE" \
            | sed -E 's/[)*.,;:!?"'"'"'>]+$//' \
            | sort -u)"

  link_total=0
  link_failed=0
  while IFS= read -r url; do
    [ -z "$url" ] && continue
    link_total=$((link_total + 1))

    # Follow redirects; capture final code, redirect count, content-type, final
    # URL. A '|' delimiter keeps parsing correct even when content-type is empty.
    IFS='|' read -r code redirects ctype effurl < <(
      curl -sS -L --max-time "$TIMEOUT" -o /dev/null \
        -w '%{http_code}|%{num_redirects}|%{content_type}|%{url_effective}' \
        "$url" 2>/dev/null || echo "000|0|-|-"
    )

    if [ "$code" != "200" ]; then
      fail "[$code] $url"
      link_failed=$((link_failed + 1))
      continue
    fi

    # documentation.wazuh.com links must not be swept into the soft-404 chain.
    case "$url" in
      *documentation.wazuh.com*)
        case "$effurl" in
          *moved-content*|*not_found*)
            fail "[swept into soft-404 chain] $url -> $effurl"
            link_failed=$((link_failed + 1))
            continue ;;
        esac
        case "$url" in
          *.md)
            case "$ctype" in
              text/markdown*) : ;;
              *) fail "[.md not served as text/markdown: $ctype] $url"
                 link_failed=$((link_failed + 1)); continue ;;
            esac ;;
        esac
        ;;
    esac

    pass "[$code] $url"
  done <<< "$urls"

  echo
  echo "links checked: $link_total, failed: $link_failed"
fi

echo
if [ "$FAILED" -eq 0 ]; then
  echo "RESULT: PASS - llms.txt checks passed"
  exit 0
else
  echo "RESULT: FAIL - llms.txt checks failed"
  exit 1
fi
