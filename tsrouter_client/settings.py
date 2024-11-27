from chassis.settings import *  # noqa: F403

SERVICE_NAME = SERVICE_CONF.name  # type: ignore # noqa: F405

SERVICE_DOCKERFILES = {
    '': [
        'chassis.dockerfile.BASE_IMAGE',
        'chassis.dockerfile.DJANGO_SETTINGS_ENV',
        'chassis.dockerfile.COPY_SERVICE',
    ],
    'frontend': ['chassis.dockerfile.FE_DOCKER_BUILD_COMMANDS'],
}

SERVICE_FEATURES = {
    'cypress-target': {
        'cls': 'chassis.features.CypressTarget',
        'dockerfile': 'frontend',
        'intermediate_images': ['cypress', 'cypress-target'],
        'target': 'cypress-target',
        'verbatim': True,
    },
    'manage': {
        'cls': 'chassis.features.Manage',
    },
    'tests': {
        'cls': 'chassis.features.Cypress',
        'dockerfile': 'frontend',
        'intermediate_images': ['cypress', 'cypress-target'],
        'target': 'cypress',
        'verbatim': True,
    },
    'web': {
        'cls': 'chassis.features.FEFFrontendApplication',
        'dockerfile': 'frontend',
        'intermediate_images': ['cypress', 'cypress-target'],
        'docker_compose': {
            'env_file': 'env.local',
            'volumes': ['./src/assets:/orm/service/dist/client', './:/orm/service:delegated'],
        },
        # By default, this feature has the following autoscale settings. You can
        # override these if you would like to fine tune your service more:
        #
        # 'kubernetes': {
        #     'autoscaling': {
        #         'min_replicas': 2,
        #         'max_replicas': 8,
        #         'metrics': [
        #             hpam.avg_cpu_util(75),
        #             hpam.avg_mem_util(95),
        #         ],
        #     }
        # },
        #
        #
        # By default, this feature has 2 nginx replicas as well as 2 app
        # replicas. You can scale the number of nginx replicas here, as needed
        # by your app. Most likely, you will want to scale them down, especially
        # in a dev/qa context.
        #
        # 'nginx': {
        #     'replicas': 2,
        # },
        'verbatim': True,
    },
    # If your app needs to redirect anonymous users, you can use the following
    # ingress instead of the standard ingress below.
    # 'ingress': {
    #     'cls': 'chassis.features.AuthenticatedFrontendIngress',
    #     'locally_ingressed_to': ['cypress-target', 'web'],
    #     'path': SERVICE_CONF.frontend_path,
    #     'ingress_service_name': 'http',
    # },
    'ingress': {
        'cls': 'chassis.features.Ingress',
        'locally_ingressed_to': ['cypress-target', 'web'],
        'host_groups': [
            LEARNING_PLATFORM_HOSTS,
            # CORPORATE_WEBSITE_HOSTS,
        ],
        'kubernetes': {'paths': {SERVICE_CONF.frontend_path: 'http'}},
    },
}
