import { Outlet } from 'react-router-dom'
import AppBar from '../components/appbar/appbar'

export default function Root() {
  return (
    <div id='detail'>
      <AppBar />
      <Outlet />
    </div>
  )
}
