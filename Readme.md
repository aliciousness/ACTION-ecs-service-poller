> NOTE: To update the readme, just run the `npm run prebuild` This script will lint the code, and update the readme with the docs for said action using the [action.yml](./action.yml) file and the name of the project and version from your [package.json](./package.json) file

<!-- action-docs-header source="action.yml" -->

<!-- action-docs-header source="action.yml" -->

<!-- action-docs-inputs source="action.yml" -->
## Inputs

| name | description | required | default |
| --- | --- | --- | --- |
| `service_name` | <p>The name of the services</p> | `true` | `""` |
| `cluster_name` | <p>The name of the cluster</p> | `true` | `""` |
| `region` | <p>The region of the ECS cluster</p> | `false` | `us-west-2` |
| `max_retries` | <p>The maximum number of retries to check the service status: default is 30</p> | `false` | `30` |
| `delay` | <p>The delay between retries in miliseconds default is 60000 (60 seconds)</p> | `false` | `60000` |
<!-- action-docs-inputs source="action.yml" -->

<!-- action-docs-outputs source="action.yml" -->
## Outputs

| name | description |
| --- | --- |
| `status` | <p>The status of the service, either <code>running</code> or <code>failed</code></p> |
<!-- action-docs-outputs source="action.yml" -->

<!-- action-docs-usage source="action.yml" project="aliciousness/ACTION-action-template" version="v1.0.0" -->
## Usage

```yaml
- uses: aliciousness/ACTION-action-template@v1.0.0
  with:
    service_name:
    # The name of the services
    #
    # Required: true
    # Default: ""

    cluster_name:
    # The name of the cluster
    #
    # Required: true
    # Default: ""

    region:
    # The region of the ECS cluster
    #
    # Required: false
    # Default: us-west-2

    max_retries:
    # The maximum number of retries to check the service status: default is 30
    #
    # Required: false
    # Default: 30

    delay:
    # The delay between retries in miliseconds default is 60000 (60 seconds)
    #
    # Required: false
    # Default: 60000
```
<!-- action-docs-usage source="action.yml" project="aliciousness/ACTION-action-template" version="v1.0.0" -->
