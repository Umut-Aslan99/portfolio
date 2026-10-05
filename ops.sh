#!/usr/bin/env bash
# Lifecycle for umut-aslan.dev:  ./ops.sh build | test | preview | deploy | logs
# CI runs exactly the same commands.
set -euo pipefail
cd "$(dirname "$0")"

export GIT_SHA="${GIT_SHA:-$(git rev-parse --short HEAD 2>/dev/null || echo local)}"
export BUILD_DATE="${BUILD_DATE:-$(date -u +%FT%TZ)}"
IMAGE="umutaslan/portfolio:$GIT_SHA"
PW_IMAGE="mcr.microsoft.com/playwright:v1.63.0-noble"
NET="portfolio-test"

build() {   # type-check, render, package into an nginx image
  docker compose build
}

test() {    # Playwright (desktop + mobile) against the production image
  build
  docker network create "$NET" >/dev/null 2>&1 || true
  docker rm -f portfolio-under-test >/dev/null 2>&1 || true
  docker run -d --rm --name portfolio-under-test --network "$NET" "$IMAGE" >/dev/null
  trap 'docker rm -f portfolio-under-test >/dev/null 2>&1 || true' RETURN
  docker run --rm --ipc=host --network "$NET" -u "$(id -u):$(id -g)" -e HOME=/tmp -e CI=1 \
    -e BASE_URL=http://portfolio-under-test -v "$PWD/site:/app" -w /app "$PW_IMAGE" \
    sh -c 'npm ci --no-audit --no-fund --ignore-scripts --silent && npx playwright test'
}

preview() { # private preview on 127.0.0.1:8088 (VS Code forwards the port)
  build
  docker rm -f portfolio-preview >/dev/null 2>&1 || true
  docker run -d --rm --name portfolio-preview -p 127.0.0.1:8088:80 "$IMAGE" >/dev/null
  echo "→ http://127.0.0.1:8088"
}

deploy() {  # tests must pass first; host rule comes from .env
  test
  docker compose up -d --remove-orphans
  docker compose ps
}

logs() { docker compose logs -f --tail=100; }

"${1:-test}"
