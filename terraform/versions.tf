terraform {
  required_version = ">= 1.5.7"
  required_providers {
    google = {
      source = "hashicorp/google"
      version = "~> 5.45.0"
    }
    github = {
      source = "integrations/github"
      version = "~> 5.45.0"
    }
    null = {
      source = "hashicorp/null"
      version = "~> 3.2.2"
    }
    random = {
      source = "hashicorp/random"
      version = "~> 3.6.0"
    }
    time = {
      source = "hashicorp/time"
      version = "~> 0.11.1"
    }
    vault = {
      source = "hashicorp/vault"
      version = "~> 4.1.0"
    }
  }
}
