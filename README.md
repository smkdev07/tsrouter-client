# tsrouter-client

The tsrouter-client module [tell us what this module does and why, what problem does it solve].

## Quickstart

tsrouter-client is based on the [microservice Chassis framework][1] and
the [Frontend Foundation Server library][2]. For more information about the
Chassis and its available commands, please consult the [Chassis
documentation][3]. For information on configuring `fef-server` to your specific
needs see the [README][4].

<details>
<summary><strong>Local Development Instructions</strong></summary>

This project comes with Dev Container configuration, so you can pull the
project's repository and start it locally by running:

```bash
orm dev start tsrouter_client
```

Once your terminal session is connected to the Dev Container, you can do the
following to start the project:

```bash
orm dev run
```

To lint the project's code or run the test suite, you can use:

```bash
orm dev lint
orm dev test
```

Your service will be available on port ``, and you can reach it
by making requests to <http://localhost:>. The project is also
has the configuration needed by [Local Platform][5], so is accessible through
the `.oreilly.local` domains as well.

For information on other commands available in this project, you can examine the
`scripts` found in the `package.json`. For a complete list of commands available
from the `orm` CLI, you can run:

```bash
orm dev run --list
```

</details>

## Next steps

### Server customization

Familiarize yourself with the functionality [fef-server][4] provides and
decide if you need to customize any of it.

### Create your application

Replace the `Home` component in `src/client/components/Home/` with the main
component of your application.

Add more routes to the `App` component in `src/client/components/App/` if
desired.

### Preparing to deploy your application for the first time

To prepare your application for deploy, make any needed changes in
`application.json` for your specific application/team, then run

```bash
/orm/manage.py preflight
```

This will perform the steps necessary to make your application deployable.  One
of the actions in this step is to create Jenkins jobs that are responsible for
the deploying of your application.  You can learn more about those jobs
[here][6].

[1]: https://github.com/oreillymedia/chassis
[2]: https://github.com/oreillymedia/fef-server
[3]: http://devdocs.common-build.gcp.oreilly.com/chassis/
[4]: https://github.com/oreillymedia/fef-server/blob/develop/README.md
[5]: http://localhost:8680/local-platform/
[6]: https://devdocs.common-build.gcp.oreilly.com/chassis/builds_and_deployment.html#understanding-your-jenkins-jobs