import { Outlet, Link, useLocation } from 'react-router-dom'
import './App.css'

function App() {
  const location = useLocation()

  const menuItems = [
    { path: '/', label: 'Factory Pattern', description: '기본 팩토리 패턴' },
    { path: '/object-map', label: 'Object Map Pattern', description: '객체 맵 팩토리' },
  ]

  return (
    <div className="app">
      <nav className="sidebar">
        <h1>Design Patterns</h1>
        <ul className="menu-list">
          {menuItems.map((item) => (
            <li key={item.path} className={location.pathname === item.path ? 'active' : ''}>
              <Link to={item.path}>
                <span className="menu-title">{item.label}</span>
                <span className="menu-description">{item.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}

export default App