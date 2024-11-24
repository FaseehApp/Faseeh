import { app } from 'electron'
import { join } from 'path'
import fs from 'fs'
import { Plugin } from '../types'

const pluginDirPath = join(app.getPath('userData'), 'plugins')

export class PluginManager {
  private registeredPlugins: Plugin[] = []
  private activePlugins: Plugin[] = []

  constructor() {
    this.ensurePluginDirectory()
  }

  /**
   * Ensure the plugins directory exists in the userData folder.
   */
  private ensurePluginDirectory(): void {
    if (!fs.existsSync(pluginDirPath)) {
      fs.mkdirSync(pluginDirPath, { recursive: true })
      console.log(`[PluginManager] Created plugins directory: ${pluginDirPath}`)
    }
  }

  /**
   * Load all plugins from the plugins directory.
   */
  public loadAll(): void {
    const pluginFolders = fs.readdirSync(pluginDirPath)

    for (const pluginFolder of pluginFolders) {
      this.loadPlugin(pluginFolder)
    }

    console.log(`[PluginManager] Loaded ${this.registeredPlugins.length} plugins.`)
    console.log(`[PluginManager] Activated ${this.activePlugins.length} plugins.`)
  }

  /**
   * Load a single plugin by its folder name.
   */
  private loadPlugin(pluginFolder: string): void {
    const pluginPath = join(pluginDirPath, pluginFolder)
    const manifestPath = join(pluginPath, 'package.json')

    if (!fs.existsSync(manifestPath)) {
      console.warn(`[PluginManager] Plugin manifest not found: ${manifestPath}`)
      return
    }

    try {
      const manifest = this.validateManifest(manifestPath)
      const plugin: Plugin = {
        ...manifest,
        main: join(pluginPath, manifest.main),
        activate: () => {},
        deactivate: () => {}
      }

      this.registeredPlugins.push(plugin)
      this.activatePlugin(plugin)
    } catch (error) {
      console.error(`[PluginManager] Failed to load plugin in "${pluginFolder}":`, error)
    }
  }

  /**
   * Validate and parse the plugin manifest file.
   */
  private validateManifest(manifestPath: string): Plugin {
    const rawManifest = fs.readFileSync(manifestPath, 'utf-8')
    const manifest = JSON.parse(rawManifest) as Partial<Plugin>

    const requiredFields = ['name', 'version', 'description', 'main']
    for (const field of requiredFields) {
      if (!manifest[field]) {
        throw new Error(`[PluginManager] Manifest is missing required field: ${field}`)
      }
    }

    return manifest as Plugin
  }

  /**
   * Activate a plugin.
   */
  private activatePlugin(plugin: Plugin): void {
    if (!fs.existsSync(plugin.main)) {
      console.error(`[PluginManager] Plugin entry file not found: ${plugin.main}`)
      return
    }

    try {
      const pluginModule = require(plugin.main)
      if (pluginModule.activate && typeof pluginModule.activate === 'function') {
        pluginModule.activate()
        this.activePlugins.push(plugin)
        console.log(`[PluginManager] Activated plugin: ${plugin.name}`)
      } else {
        console.warn(`[PluginManager] No activate function found for plugin: ${plugin.name}`)
      }
    } catch (error) {
      console.error(`[PluginManager] Failed to activate plugin: ${plugin.name}`, error)
    }
  }

  /**
   * Unload all plugins, calling their deactivate methods.
   */
  public unloadAll(): void {
    for (const plugin of this.activePlugins) {
      try {
        plugin.deactivate()
        console.log(`[PluginManager] Deactivated plugin: ${plugin.name}`)
      } catch (error) {
        console.error(`[PluginManager] Failed to deactivate plugin: ${plugin.name}`, error)
      }
    }
    this.activePlugins = []
  }
}
