// Import config. sources
import { env } from 'process';
import { load_yaml_config } from './sources/yaml/config_source_yaml'
import { load_yaml_config_from_app_config_hosted} from './sources/aws/appconfig/hosted/yaml/config_source_aws_appconfig_hosted_yaml'
/**
 * Factory that loads configuration from a YAML file.
 */
export default async () => {

    // YAML enabled if YAML_CONFIG_ENABLED is set to tru. False otherwise
    let yaml_enabled: boolean = !Boolean(process.env.YAML_CONFIG_ENABLED) || (process.env.YAML_CONFIG_ENABLED == 'true')

    // AWS App Config. YAML Hosted enabled - Defaults to false
    let aws_app_config_yaml_enabled: boolean = process.env.AWS_APPCONFIG_YAML_CONFIG_ENABLED == 'true'

    // YAML file will be loaded first. No fallback
    if (yaml_enabled) {
        // Load and return YAML config
        return load_yaml_config(process.env.YAML_CONFIG_PATH || 'resources/config/default.config.yaml')
    }

    // AWS App COnfig is used as an other source if YAML file is disabled
    if (aws_app_config_yaml_enabled) {

        // Get parameters for AWS App Config source
        var region = process.env.AWS_DEFAULT_REGION // Required
        var application = process.env.AWS_APPCONFIG_APPLICATION // Required
        var environment = process.env.AWS_APPCONFIG_ENVIRONMENT // Required
        var config  = process.env.AWS_APPCONFIG_CONFIGURATION // Required
        var version = process.env.AWS_APPCONFIG_VERSION
        var clientid = process.env.AWS_APPCONFIG_CLIENT_ID

        return await load_yaml_config_from_app_config_hosted(
            region,
            application,
            environment,
            config,
            clientid,
            version
        )
    }

    else {
        // Return empty config
        return {}
    }
};