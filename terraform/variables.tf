
variable "env" {
  description = "The environment to which the module will apply the changes"
  type        = string
}

variable "region" {
  description = "The GCP region to which the resources will be deployed, e.g. us-west1"
  type        = string
}

variable "project" {
  description = "The GCP project you&#39;re working in "
  type        = string
}

variable "service_name" {
  description = "The name of the microservice that owns these TF resources"
  type        = string
}

variable "github_repo" {
  description = "A complex variable with all the values for a github-repo&#39;s configuration"
  type        = map(object({
    slack_notifications_channel = string
  }))
}

variable "sa_config" {
  description = "A complex variable with all the values for a service-account&#39;s configuration"
  type        = map(object({
    
  }))
}

variable "dns_config" {
  description = "A complex variable with all the values for a dns-records&#39;s configuration"
  type        = map(object({
    feature_name = string
    subdomain_override = string
    should_create_internal = bool
  }))
}
