'use client'

import Sidebar from './Sidebar'
import Header from './Header'
import { Save, Key, Database, Bell, User, Shield, Globe, Mail } from 'lucide-react'
import { useState } from 'react'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // General Settings
    language: 'zh-CN',
    timezone: 'Asia/Shanghai',
    theme: 'dark',
    notifications: {
      email: true,
      push: true,
      reports: true,
      analysis: true,
    },
    // API Settings
    openaiApiKey: '',
    geminiApiKey: '',
    // Storage Settings
    maxFileSize: 50,
    allowedFileTypes: ['pdf', 'xlsx', 'csv', 'docx'],
    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: 30,
  })

  const handleSave = () => {
    // In real app, save to backend
    console.log('Saving settings:', settings)
    alert('Settings saved successfully!')
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-4xl">
            {/* Page Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Settings</h2>
                <p className="mt-1 text-sm text-gray-400">
                  Manage your account settings and preferences
                </p>
              </div>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark"
              >
                <Save className="h-4 w-4" />
                Save Changes
              </button>
            </div>

            {/* General Settings */}
            <div className="mb-6 rounded-lg border border-card-border bg-card-bg p-6">
              <div className="mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-gray-400" />
                <h3 className="text-lg font-semibold text-white">General Settings</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">Language</label>
                  <select
                    value={settings.language}
                    onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                    className="w-full rounded-lg border border-card-border bg-sidebar-bg px-3 py-2 text-sm text-white focus:border-primary focus:outline-none"
                  >
                    <option value="zh-CN">简体中文</option>
                    <option value="en-US">English</option>
                    <option value="ja-JP">日本語</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">Timezone</label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                    className="w-full rounded-lg border border-card-border bg-sidebar-bg px-3 py-2 text-sm text-white focus:border-primary focus:outline-none"
                  >
                    <option value="Asia/Shanghai">Asia/Shanghai (UTC+8)</option>
                    <option value="America/New_York">America/New_York (UTC-5)</option>
                    <option value="Europe/London">Europe/London (UTC+0)</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">Theme</label>
                  <select
                    value={settings.theme}
                    onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
                    className="w-full rounded-lg border border-card-border bg-sidebar-bg px-3 py-2 text-sm text-white focus:border-primary focus:outline-none"
                  >
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="mb-6 rounded-lg border border-card-border bg-card-bg p-6">
              <div className="mb-4 flex items-center gap-2">
                <Bell className="h-5 w-5 text-gray-400" />
                <h3 className="text-lg font-semibold text-white">Notification Settings</h3>
              </div>

              <div className="space-y-4">
                <label className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-white">Email Notifications</span>
                    <p className="text-xs text-gray-400">Receive notifications via email</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.email}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, email: e.target.checked },
                      })
                    }
                    className="h-5 w-5 rounded border-card-border bg-sidebar-bg text-primary focus:ring-primary"
                  />
                </label>

                <label className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-white">Push Notifications</span>
                    <p className="text-xs text-gray-400">Receive browser push notifications</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.push}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, push: e.target.checked },
                      })
                    }
                    className="h-5 w-5 rounded border-card-border bg-sidebar-bg text-primary focus:ring-primary"
                  />
                </label>

                <label className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-white">Report Notifications</span>
                    <p className="text-xs text-gray-400">Notify when new reports are available</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.reports}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, reports: e.target.checked },
                      })
                    }
                    className="h-5 w-5 rounded border-card-border bg-sidebar-bg text-primary focus:ring-primary"
                  />
                </label>

                <label className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-white">Analysis Notifications</span>
                    <p className="text-xs text-gray-400">Notify when analysis is complete</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.analysis}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, analysis: e.target.checked },
                      })
                    }
                    className="h-5 w-5 rounded border-card-border bg-sidebar-bg text-primary focus:ring-primary"
                  />
                </label>
              </div>
            </div>

            {/* API Settings */}
            <div className="mb-6 rounded-lg border border-card-border bg-card-bg p-6">
              <div className="mb-4 flex items-center gap-2">
                <Key className="h-5 w-5 text-gray-400" />
                <h3 className="text-lg font-semibold text-white">API Settings</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    OpenAI API Key
                  </label>
                  <input
                    type="password"
                    value={settings.openaiApiKey}
                    onChange={(e) => setSettings({ ...settings, openaiApiKey: e.target.value })}
                    placeholder="sk-..."
                    className="w-full rounded-lg border border-card-border bg-sidebar-bg px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-primary focus:outline-none"
                  />
                  <p className="mt-1 text-xs text-gray-400">
                    Your API key is encrypted and stored securely
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Gemini API Key
                  </label>
                  <input
                    type="password"
                    value={settings.geminiApiKey}
                    onChange={(e) => setSettings({ ...settings, geminiApiKey: e.target.value })}
                    placeholder="AIza..."
                    className="w-full rounded-lg border border-card-border bg-sidebar-bg px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-primary focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Storage Settings */}
            <div className="mb-6 rounded-lg border border-card-border bg-card-bg p-6">
              <div className="mb-4 flex items-center gap-2">
                <Database className="h-5 w-5 text-gray-400" />
                <h3 className="text-lg font-semibold text-white">Storage Settings</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Max File Size (MB)
                  </label>
                  <input
                    type="number"
                    value={settings.maxFileSize}
                    onChange={(e) =>
                      setSettings({ ...settings, maxFileSize: parseInt(e.target.value) })
                    }
                    className="w-full rounded-lg border border-card-border bg-sidebar-bg px-3 py-2 text-sm text-white focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Allowed File Types
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['pdf', 'xlsx', 'csv', 'docx', 'txt'].map((type) => (
                      <label
                        key={type}
                        className="flex items-center gap-2 rounded-lg border border-card-border bg-sidebar-bg px-3 py-2"
                      >
                        <input
                          type="checkbox"
                          checked={settings.allowedFileTypes.includes(type)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSettings({
                                ...settings,
                                allowedFileTypes: [...settings.allowedFileTypes, type],
                              })
                            } else {
                              setSettings({
                                ...settings,
                                allowedFileTypes: settings.allowedFileTypes.filter((t) => t !== type),
                              })
                            }
                          }}
                          className="h-4 w-4 rounded border-card-border bg-sidebar-bg text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-gray-300">.{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="mb-6 rounded-lg border border-card-border bg-card-bg p-6">
              <div className="mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-gray-400" />
                <h3 className="text-lg font-semibold text-white">Security Settings</h3>
              </div>

              <div className="space-y-4">
                <label className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-white">Two-Factor Authentication</span>
                    <p className="text-xs text-gray-400">Add an extra layer of security</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.twoFactorAuth}
                    onChange={(e) => setSettings({ ...settings, twoFactorAuth: e.target.checked })}
                    className="h-5 w-5 rounded border-card-border bg-sidebar-bg text-primary focus:ring-primary"
                  />
                </label>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Session Timeout (minutes)
                  </label>
                  <input
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) =>
                      setSettings({ ...settings, sessionTimeout: parseInt(e.target.value) })
                    }
                    className="w-full rounded-lg border border-card-border bg-sidebar-bg px-3 py-2 text-sm text-white focus:border-primary focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

