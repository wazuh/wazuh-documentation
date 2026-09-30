#!/usr/bin/env python3
"""Report the warnings Sphinx wrote to a warning file (sphinx-build -w).

Writes every warning to the GitHub Actions job summary, optionally emits
each one as an annotation on the affected file and line, and exits 1 when
there is at least one warning so the check shows as failed.

Usage: report-sphinx-warnings.py <warning-file> [--annotate]
"""

import os
import re
import sys

LINE_RE = re.compile(
    r'^(?P<file>.+?)(?::(?P<line>\d+))?: (?P<level>WARNING|ERROR|CRITICAL|SEVERE): (?P<msg>.*)$'
)
LEVEL_ONLY_RE = re.compile(r'^(?P<level>WARNING|ERROR|CRITICAL|SEVERE): (?P<msg>.*)$')


def escape_data(value):
    return value.replace('%', '%25').replace('\r', '%0D').replace('\n', '%0A')


def escape_property(value):
    return escape_data(value).replace(':', '%3A').replace(',', '%2C')


def parse(path):
    workspace = os.environ.get('GITHUB_WORKSPACE', os.getcwd()).rstrip('/') + '/'
    warnings = []
    with open(path, encoding='utf-8', errors='replace') as fh:
        for raw in fh:
            raw = raw.rstrip('\n')
            match = LINE_RE.match(raw) or LEVEL_ONLY_RE.match(raw)
            if not match:
                # Continuation line of the previous warning (e.g. a table dump).
                continue
            groups = match.groupdict()
            file = groups.get('file') or ''
            if file.startswith(workspace):
                file = file[len(workspace):]
            warnings.append({
                'file': file,
                'line': groups.get('line') or '',
                'level': groups['level'],
                'msg': groups['msg'],
            })
    return warnings


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        return 2
    path = sys.argv[1]
    annotate = '--annotate' in sys.argv[2:]

    if not os.path.exists(path):
        print(f'::error::Warning file {path} not found. The build probably crashed before it started.')
        return 1

    warnings = parse(path)

    if annotate:
        for w in warnings:
            command = 'error' if w['level'] in ('ERROR', 'CRITICAL', 'SEVERE') else 'warning'
            props = []
            # Only files inside the repository can be annotated.
            if w['file'] and not w['file'].startswith('/'):
                props.append(f"file={escape_property(w['file'])}")
                if w['line']:
                    props.append(f"line={w['line']}")
            props.append('title=Sphinx build')
            print(f"::{command} {','.join(props)}::{escape_data(w['msg'])}")

    summary = os.environ.get('GITHUB_STEP_SUMMARY')
    if summary:
        with open(summary, 'a', encoding='utf-8') as fh:
            if not warnings:
                fh.write('### Sphinx build: no warnings\n')
            else:
                fh.write(f'### Sphinx build: {len(warnings)} warning(s)\n\n')
                fh.write('| File | Line | Level | Message |\n|---|---|---|---|\n')
                for w in warnings:
                    msg = w['msg'].replace('|', '\\|')
                    fh.write(f"| `{w['file'] or '-'}` | {w['line'] or '-'} | {w['level']} | {msg} |\n")

    print(f'Sphinx build warnings: {len(warnings)}')
    for w in warnings:
        location = w['file'] + (f":{w['line']}" if w['line'] else '')
        print(f"  {location or '-'}: {w['level']}: {w['msg']}")
    return 1 if warnings else 0


if __name__ == '__main__':
    sys.exit(main())
