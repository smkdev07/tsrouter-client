#!groovy
/* This file is automatically created by the `regen` command.
   To make changes please edit the `jenkins` key in your `application.json` file.
   See https://devdocs.common-build.gcp.oreilly.com/chassis/builds_and_deployment.html#configuring-your-jenkins-pipeline
*/

REGISTRY = 'us-central1-docker.pkg.dev'
CONTAINER_REPO = "${REGISTRY}/common-build/orm-hub"
CHASSIS = "${CONTAINER_REPO}/chassis:latest"
GITHUB_REPO = 'git@github.com:oreillymedia/tsrouter-client.git'
COMMIT_STATUS_SOURCE = 'jenkins/tsrouter_client'
IMAGE_BASE_NAME = 'tsrouter_client'
NAMESPACE = 'tsrouter-client'
STABLE_BRANCH = 'main'
PUBLISHED_BRANCHES = ['main']
DEPLOY_STABLE_TO = ['dev-gke']
DEPLOY_RELEASES_TO = ['prod-gke']
CI_CUSTOMIZATION = 'v2_frontend_application'
IS_SUBPROJECT = false

def isRelease() {
  return env.IMAGE_TO_RELEASE ? true : false
}

node('google-compute') {
  sh "gcloud auth configure-docker ${REGISTRY} --quiet"
  
  stage('Initialize') {
    loadImage = CHASSIS
    if (isRelease()) {
      imageTag = env.IMAGE_TO_RELEASE.replace('image-', '')
      loadImage = "${CONTAINER_REPO}/${IMAGE_BASE_NAME}--manage:${imageTag}"
    }

    sh "docker pull ${loadImage}"
    sh "docker run --rm -e JENKINS=true ${loadImage} python /orm/manage.py cat Jenkinsfile.base > Jenkinsfile.base"
  }

  load 'Jenkinsfile.base'
  
}
