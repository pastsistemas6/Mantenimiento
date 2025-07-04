import { ExternalPkgName, AutoInstall, CustomIconLoader } from './types.mjs';
import '@antfu/utils';
import '../customisations/defaults.mjs';
import '@iconify/types';

/**
 * Creates a CustomIconLoader collection from an external package collection.
 *
 * @param packageName The package name.
 * @param autoInstall {AutoInstall} [autoInstall=false] - whether to automatically install
 */
declare function createExternalPackageIconLoader(packageName: ExternalPkgName, autoInstall?: AutoInstall, cwd?: string): Record<string, CustomIconLoader>;

export { createExternalPackageIconLoader };
