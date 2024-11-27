module "github-repo" {
    for_each = var.github_repo
    source   = "git::https://github.com/oreillymedia/tf-github-repo.git?ref=1.0.12"
    env = var.env
    project = var.project
    region = var.region
    repo_description = "A manifest repository for the tsrouter-client service"
    repo_name = "tsrouter-client-manifests"
    repo_template = "chassis-manifest-template"
    repo_template_owner = "oreillymedia"
    code_owners = "systems-engineering"
    slack_notifications_channel = each.value.slack_notifications_channel
    service_name = var.service_name
}
module "service-account" {
    for_each = var.sa_config
    source   = "git::https://github.com/oreillymedia/tf-gcp-chassis-sa.git?ref=1.0.2"
    env = var.env
    service_name = var.service_name
}
module "dns-records" {
    for_each = var.dns_config
    source   = "git::https://github.com/oreillymedia/tf-gcp-dns.git?ref=1.0.2"
    env = var.env
    project = var.project
    feature_name = each.value.feature_name
    subdomain_override = each.value.subdomain_override
    should_create_internal = each.value.should_create_internal
    service_name = var.service_name
}
