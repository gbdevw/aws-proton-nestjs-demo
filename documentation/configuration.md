## Configuration sources settings

Application settings can be loaded from one of these sources :

- A local YAML file
- A AWS AppConfig hosted YAML configuration

Each source has its own set of settings that can be set using env. variables. If both sources are enabled, configuration will be loaded only from the YAML local file.

### YAML local file

| ENV | Required ? | Default | Description |
| --- | --- | --- | --- |
| YAML_CONFIG_ENABLED | No | true | 'true' or 'false' - Enable configuration source |
| YAML_CONFIG_PATH | No | Default to resources/config/default.config.yaml | Absolute path to configuration file. | 

### AWS App Config - Hosted YAML configuration

| ENV | Required ? | Default | Description |
| --- | --- | --- | --- |
| AWS_APPCONFIG_YAML_CONFIG_ENABLED | No | false | 'true' or 'false' - Enable configuration source |
| AWS_DEFAULT_REGION | Yes | - | AWS Region for the client configuration (ex : eu-west-1) |
| AWS_APPCONFIG_APPLICATION | Yes | - | Name of the application on AWS App Config |
| AWS_APPCONFIG_ENVIRONMENT | Yes | - | Target environment for the application configuration (ex : dev) |
| AWS_APPCONFIG_CONFIGURATION | Yes |- | Name of the configuration profile on AWS App. Config. |
| AWS_APPCONFIG_VERSION | No | - | Target version of the configuration. If not set, the latest version will be loaded. |
| AWS_APPCONFIG_CLIENT_ID | No | Random UUID | Client ID for configuratin deployment monitoring. |

## Application settings

[A template for the application configuration can be found here](../resources/config/default.config.yaml)
