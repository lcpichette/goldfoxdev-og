
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const EZA_LAID_OPTIONS: string;
	export const MANPATH: string;
	export const NIX_PROFILES: string;
	export const GHOSTTY_RESOURCES_DIR: string;
	export const EZA_LD_OPTIONS: string;
	export const TERM_PROGRAM: string;
	export const ABBR_TIPS_PROMPT: string;
	export const NODE: string;
	export const EZA_L_OPTIONS: string;
	export const INIT_CWD: string;
	export const SHELL: string;
	export const TERM: string;
	export const EZA_LAA_OPTIONS: string;
	export const EZA_LA_OPTIONS: string;
	export const __FISH_EZA_EXPANDED_OPT_NAME: string;
	export const TMPDIR: string;
	export const EZA_LAAD_OPTIONS: string;
	export const npm_config_global_prefix: string;
	export const TERM_PROGRAM_VERSION: string;
	export const EZA_LL_OPTIONS: string;
	export const EZA_LID_OPTIONS: string;
	export const __ABBR_TIPS_KEYS: string;
	export const COLOR: string;
	export const __ABBR_TIPS_VALUES: string;
	export const npm_config_noproxy: string;
	export const npm_config_local_prefix: string;
	export const PNPM_HOME: string;
	export const EZA_LO_OPTIONS: string;
	export const USER: string;
	export const EZA_LT_OPTIONS: string;
	export const COMMAND_MODE: string;
	export const npm_config_globalconfig: string;
	export const SSH_AUTH_SOCK: string;
	export const __CF_USER_TEXT_ENCODING: string;
	export const npm_execpath: string;
	export const nvm_current_version: string;
	export const PATH: string;
	export const EZA_LC_OPTIONS: string;
	export const npm_package_json: string;
	export const last_repository: string;
	export const npm_config_userconfig: string;
	export const npm_config_init_module: string;
	export const __CFBundleIdentifier: string;
	export const npm_command: string;
	export const PWD: string;
	export const npm_lifecycle_event: string;
	export const EDITOR: string;
	export const EZA_LE_OPTIONS: string;
	export const npm_package_name: string;
	export const LANG: string;
	export const npm_config_npm_version: string;
	export const XPC_FLAGS: string;
	export const NIX_SSL_CERT_FILE: string;
	export const __FISH_EZA_EXPANDED: string;
	export const EZA_LG_OPTIONS: string;
	export const npm_config_node_gyp: string;
	export const npm_package_version: string;
	export const XPC_SERVICE_NAME: string;
	export const SHLVL: string;
	export const HOME: string;
	export const __FISH_EZA_SORT_OPTIONS: string;
	export const EZA_STANDARD_OPTIONS: string;
	export const TERMINFO: string;
	export const EZA_LAI_OPTIONS: string;
	export const GHOSTTY_SHELL_INTEGRATION_NO_SUDO: string;
	export const __FISH_EZA_ALIASES: string;
	export const ABBR_TIPS_REGEXES: string;
	export const EZA_LI_OPTIONS: string;
	export const npm_config_cache: string;
	export const LOGNAME: string;
	export const EZA_LAD_OPTIONS: string;
	export const npm_lifecycle_script: string;
	export const XDG_DATA_DIRS: string;
	export const EZA_LAAID_OPTIONS: string;
	export const EZA_LAAI_OPTIONS: string;
	export const GHOSTTY_BIN_DIR: string;
	export const npm_config_user_agent: string;
	export const __FISH_EZA_OPT_NAMES: string;
	export const __FISH_EZA_BASE_ALIASES: string;
	export const npm_node_execpath: string;
	export const npm_config_prefix: string;
	export const COLORTERM: string;
	export const _: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://kit.svelte.dev/docs/modules#$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/master/packages/adapter-node) (or running [`vite preview`](https://kit.svelte.dev/docs/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env).
 * 
 * This module cannot be imported into client-side code.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		EZA_LAID_OPTIONS: string;
		MANPATH: string;
		NIX_PROFILES: string;
		GHOSTTY_RESOURCES_DIR: string;
		EZA_LD_OPTIONS: string;
		TERM_PROGRAM: string;
		ABBR_TIPS_PROMPT: string;
		NODE: string;
		EZA_L_OPTIONS: string;
		INIT_CWD: string;
		SHELL: string;
		TERM: string;
		EZA_LAA_OPTIONS: string;
		EZA_LA_OPTIONS: string;
		__FISH_EZA_EXPANDED_OPT_NAME: string;
		TMPDIR: string;
		EZA_LAAD_OPTIONS: string;
		npm_config_global_prefix: string;
		TERM_PROGRAM_VERSION: string;
		EZA_LL_OPTIONS: string;
		EZA_LID_OPTIONS: string;
		__ABBR_TIPS_KEYS: string;
		COLOR: string;
		__ABBR_TIPS_VALUES: string;
		npm_config_noproxy: string;
		npm_config_local_prefix: string;
		PNPM_HOME: string;
		EZA_LO_OPTIONS: string;
		USER: string;
		EZA_LT_OPTIONS: string;
		COMMAND_MODE: string;
		npm_config_globalconfig: string;
		SSH_AUTH_SOCK: string;
		__CF_USER_TEXT_ENCODING: string;
		npm_execpath: string;
		nvm_current_version: string;
		PATH: string;
		EZA_LC_OPTIONS: string;
		npm_package_json: string;
		last_repository: string;
		npm_config_userconfig: string;
		npm_config_init_module: string;
		__CFBundleIdentifier: string;
		npm_command: string;
		PWD: string;
		npm_lifecycle_event: string;
		EDITOR: string;
		EZA_LE_OPTIONS: string;
		npm_package_name: string;
		LANG: string;
		npm_config_npm_version: string;
		XPC_FLAGS: string;
		NIX_SSL_CERT_FILE: string;
		__FISH_EZA_EXPANDED: string;
		EZA_LG_OPTIONS: string;
		npm_config_node_gyp: string;
		npm_package_version: string;
		XPC_SERVICE_NAME: string;
		SHLVL: string;
		HOME: string;
		__FISH_EZA_SORT_OPTIONS: string;
		EZA_STANDARD_OPTIONS: string;
		TERMINFO: string;
		EZA_LAI_OPTIONS: string;
		GHOSTTY_SHELL_INTEGRATION_NO_SUDO: string;
		__FISH_EZA_ALIASES: string;
		ABBR_TIPS_REGEXES: string;
		EZA_LI_OPTIONS: string;
		npm_config_cache: string;
		LOGNAME: string;
		EZA_LAD_OPTIONS: string;
		npm_lifecycle_script: string;
		XDG_DATA_DIRS: string;
		EZA_LAAID_OPTIONS: string;
		EZA_LAAI_OPTIONS: string;
		GHOSTTY_BIN_DIR: string;
		npm_config_user_agent: string;
		__FISH_EZA_OPT_NAMES: string;
		__FISH_EZA_BASE_ALIASES: string;
		npm_node_execpath: string;
		npm_config_prefix: string;
		COLORTERM: string;
		_: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: string]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
