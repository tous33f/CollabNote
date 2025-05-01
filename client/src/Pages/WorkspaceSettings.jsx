"use client"

import { useState, useRef, useEffect } from "react"
import Header from "../Components/Header"

export default function WorkspaceSettings() {
  const [workspaceName, setWorkspaceName] = useState("My Workspace")
  const [bannerImage, setBannerImage] = useState("/placeholder.svg?height=200&width=800")
  const [inviteLink, setInviteLink] = useState("")
  const [showInviteLink, setShowInviteLink] = useState(false)
  const fileInputRef = useRef(null)

  // Handle banner image upload
  const handleBannerUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setBannerImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle workspace name change
  const handleWorkspaceNameChange = (e) => {
    setWorkspaceName(e.target.value)
  }

  // Handle save workspace settings
  const handleSaveSettings = () => {
    // In a real app, you would save to backend here
    alert("Settings saved successfully!")
  }

  // Generate invite link
  const generateInviteLink = () => {
    const link = `https://app.example.com/invite/${Math.random().toString(36).substring(2, 15)}`
    setInviteLink(link)
    setShowInviteLink(true)
  }

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink)
    alert("Invite link copied to clipboard!")
  }

  return (
    <div className="bg-gray-50 min-h-screen w-full p-6">
        <Header title={"Workspace Settings"} description={"Manage your workspace settins"} />

        {/* General Settings Tab */}
          <div className="space-y-6 mt-8">
            <div className="bg-white p-6 rounded-md border border-gray-200 space-y-6">
              <div>
                <h2 className="text-lg font-medium mb-4">Workspace Information</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="workspace-name" className="block text-sm font-medium text-gray-700 mb-1">
                      Workspace Name
                    </label>
                    <input
                      id="workspace-name"
                      type="text"
                      value={workspaceName}
                      onChange={handleWorkspaceNameChange}
                      className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium mb-4">Workspace Banner</h2>
                <div className="space-y-4">
                  <div className="w-full h-[200px] bg-gray-100 rounded-md overflow-hidden relative">
                    <img
                      src={"https://g-p1v8sxx1jj4.vusercontent.net/placeholder.svg?height=100&width=200"}
                      alt="Workspace Banner"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-50 transition-opacity">
                      <button
                        className="px-4 py-2 bg-white text-gray-800 rounded-md shadow hover:bg-gray-100"
                        onClick={() => fileInputRef.current.click()}
                      >
                        Change Banner
                      </button>
                    </div>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleBannerUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <p className="text-sm text-gray-500">Recommended size: 1200 x 300 pixels. Max file size: 5MB.</p>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium mb-4">Invite Members</h2>
                <div className="space-y-4">
                  <div>
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      onClick={generateInviteLink}
                    >
                      Generate Invite Link
                    </button>
                  </div>
                  {showInviteLink && (
                    <div className="flex items-center gap-2 max-w-md">
                      <input
                        type="text"
                        value={inviteLink}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        onClick={copyInviteLink}
                      >
                        Copy
                      </button>
                    </div>
                  )}
                  <p className="text-sm text-gray-500">
                    Share this link with people you want to invite to your workspace. The link will expire after 7 days.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={handleSaveSettings}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
    </div>
  )
}
