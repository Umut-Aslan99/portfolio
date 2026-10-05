# Lifecycle: make build → make test → make deploy. CI runs the same targets.
SHELL      := /bin/bash
GIT_SHA    ?= $(shell git rev-parse --short HEAD 2>/dev/null || echo local)
BUILD_DATE ?= $(shell date -u +%FT%TZ)
IMAGE      := umutaslan/portfolio:$(GIT_SHA)
PW_IMAGE   := mcr.microsoft.com/playwright:v1.63.0-noble
NET        := portfolio-test
export GIT_SHA BUILD_DATE

.PHONY: build test preview deploy logs clean

build:            ## Type-check, render and package the site into an nginx image
	docker compose build

test: build       ## Run Playwright against the production image (desktop + mobile)
	-docker network create $(NET) >/dev/null 2>&1
	-docker rm -f portfolio-under-test >/dev/null 2>&1
	docker run -d --rm --name portfolio-under-test --network $(NET) $(IMAGE) >/dev/null
	docker run --rm --ipc=host --network $(NET) -u $$(id -u):$$(id -g) -e HOME=/tmp -e CI=1 \
	  -e BASE_URL=http://portfolio-under-test -v $(CURDIR)/site:/app -w /app $(PW_IMAGE) \
	  npx playwright test; status=$$?; docker rm -f portfolio-under-test >/dev/null; exit $$status

preview: build    ## Serve locally on http://127.0.0.1:8088 (VS Code forwards the port)
	-docker rm -f portfolio-preview >/dev/null 2>&1
	docker run -d --rm --name portfolio-preview -p 127.0.0.1:8088:80 $(IMAGE) >/dev/null
	@echo "→ http://127.0.0.1:8088"

deploy: test      ## Ship to Traefik (host rule from .env)
	docker compose up -d --remove-orphans
	@docker compose ps

logs:
	docker compose logs -f --tail=100

clean:
	-docker rm -f portfolio-preview portfolio-under-test >/dev/null 2>&1
	-docker network rm $(NET) >/dev/null 2>&1
