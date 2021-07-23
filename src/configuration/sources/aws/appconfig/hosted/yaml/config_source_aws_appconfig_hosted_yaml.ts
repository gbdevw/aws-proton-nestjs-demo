// Import AWS App Config libs
import { AppConfigClient, GetConfigurationCommand, GetConfigurationCommandOutput } from '@aws-sdk/client-appconfig';

// Import 3rd party
import { v4 as uuidv4 } from 'uuid';
import * as yaml from 'js-yaml';

/**
 * Loads config. from a YAML hosted configuration on AWS App Config
 * @param application Name of the application related to the config.
 * @param env Target environment
 * @param configuration Name of the confguration profile
 * @param clientid Optional - Client ID for config. deployment monitoring - Defaults to random uuid
 * @param version Optional - Target config. version - Defaults to latest version
 * @returns Loaded config. keys
 */
export async function load_yaml_config_from_app_config_hosted(region: string, application: string, env: string, configuration: string, clientid?: string, version?: string): Promise<Record<string, any>> {

    // Create client - config. from env.
    const client = new AppConfigClient({region: region});

    try {
        // Fetch config.
        var response = await client.send(new GetConfigurationCommand(
            {
                Application: application,
                Environment: env,
                ClientId: clientid || uuidv4(),
                Configuration: configuration,
                ClientConfigurationVersion: version
            }
        ))

        console.log(response)
        // Load config as utf-8 encoded yaml doc
        return yaml.load((new TextDecoder('utf-8')).decode(response.Content)) as Record<string, any>;
    }
    catch(error) {
        // Reraise error
        throw error
    }
};