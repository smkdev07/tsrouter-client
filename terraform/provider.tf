provider "github" {
  owner = "oreillymedia"
}
provider "google" {
    project = var.project
    region = var.region
}
