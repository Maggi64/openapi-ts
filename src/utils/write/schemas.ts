import { resolve } from 'path';

import type { Client } from '../../client/interfaces/Client';
import type { Options } from '../../client/interfaces/Options';
import { writeFile } from '../fileSystem';
import type { Templates } from '../registerHandlebarTemplates';

/**
 * Generate Schemas using the Handlebar template and write to disk.
 * @param client Client containing models, schemas, and services
 * @param templates The loaded handlebar templates
 * @param outputPath Directory to write the generated files to
 * @param options Options passed to the `generate()` function
 */
export const writeClientSchemas = async (
    client: Client,
    templates: Templates,
    outputPath: string,
    options: Pick<Required<Options>, 'client' | 'enums'>
): Promise<void> => {
    for (const model of client.models) {
        const file = resolve(outputPath, `$${model.name}.ts`);
        const templateResult = templates.exports.schema({
            $config: options,
            ...model,
        });
        await writeFile(file, templateResult);
    }
};