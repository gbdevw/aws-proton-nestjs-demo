// Import config. sources
import { load_yaml_config } from './sources/yaml/config_source_yaml'

/**
 * Factory that loads configuration from a YAML file.
 */
export default () => {

    // YAML enabled if YAML_CONFIG_ENABLED is set to tru. False otherwise
    let yaml_enabled: boolean = process.env.YAML_CONFIG_ENABLED && (process.env.YAML_CONFIG_ENABLED == 'true')

    if (yaml_enabled) {
        // Load and return YAML config
        return load_yaml_config(process.env.YAML_CONFIG_PATH)
    }
    else {
        return {}
    }
};