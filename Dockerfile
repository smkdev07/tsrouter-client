# This file is automatically created by the `regen` command.
# To make changes please edit the `SERVICE_DOCKERFILES` setting.
# See https://devdocs.common-build.gcp.oreilly.com/chassis/dockerfile.html#dockerfiles
FROM us-central1-docker.pkg.dev/common-build/orm-hub/chassis:latest
ENV DJANGO_SETTINGS_MODULE=tsrouter_client.settings
COPY . /orm/service/
WORKDIR /orm/service/
