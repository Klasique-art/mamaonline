import React, { useState } from 'react'

import { Sidebar, MainMallContainer } from '../components'

const MallPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev)
  }

  return (
    <div className="bg-primary w-full overflow-hidden relative">
      <div className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient"></div>
      <Sidebar 
        toggleSidebar={toggleSidebar} 
        userImgStyle={`w-full ${sidebarOpen ? 'h-56 sm:h-48' : ''} bg-gray-200 mb-4 rounded-md overflow-hidden`}
        className={`sidebar bg-primary border-gradient sm:rounded-md ${sidebarOpen ? 'sidebar-expanded': 'sidebar-collapsed'} overflow-hidden`}
      />
      <MainMallContainer 
        toggleSidebar={toggleSidebar}
        className={`main-mall-container ${!sidebarOpen ? 'mall-container-expanded' : 'mall-container-collapsed'}`}
        topBarStyle={!sidebarOpen ? 'mall-container-expanded' : 'mall-container-collapsed'}
       />
    </div>
  )
}

export default MallPage