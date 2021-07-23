import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';

/**
 * Loads configuration from a YAML file.
 * 
 * @param path Absolute path to YAML config. file
 * @returns Record<string, any> - Loaded keys
 */
export function load_yaml_config (path: string):  Record<string, any> {
    return yaml.load(readFileSync(path, 'utf8')) as Record<string, any>;
};