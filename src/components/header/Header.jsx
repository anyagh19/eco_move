import React from 'react'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import  {Container, Input, Logo, Logoutbtn } from '../../Index'
import {CircleUser, ShoppingCart , User} from 'lucide-react'
import { ID } from 'appwrite'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const role = useSelector((state) => state.auth.role);
  console.log("User Role:", role);
  const navigate = useNavigate()

  const navItems = [
    { id: ID.unique(), name: 'Home', url: '/', active: true },
    { id: ID.unique(), name: 'Buy', url: '/buy-page', active: role === 'user'  },
    { id: ID.unique(), name: 'Sell', url: '/sell-page', active: role === 'user'  },
    { id: ID.unique(), name: 'Donate', url: '/donate-page', active: role === 'user' },
    { id: ID.unique(), name: 'Recycle', url: '/recycle-page', active: role === 'user' },
    { id: ID.unique(), name: 'Shift', url: '/shift-page', active: role === 'user' },
    { id: ID.unique(), name: 'Requets', url: '/recycle-requets', active: role === 'recycle' },
    { id: ID.unique(), name: 'Accepted', url: '/accepted-recycle-requets', active: role === 'recycle' },
    { id: ID.unique(), name: 'Delivery', url: '/delivery-requets', active: role === 'shift' },
    { id: ID.unique(), name: 'DonationDel', url: '/donation-requets', active: role === 'shift' },
    { id: ID.unique(), name: 'Shifting', url: '/shifting-requets', active: role === 'shift' },
    { id: ID.unique(), name: <Input type='text' placeholder='Search' className='bg-white border border-gray-200 py-2 px-3 w-[350px] rounded-2xl' />, active: role === 'user' },
    { id: ID.unique(), name: <CircleUser />, url: '/login', active: !authStatus }, 
    { id: ID.unique(), name: <User />, url: '/user-page', active: role === 'user'  },
    { id: ID.unique(), name: <User />, url: '/shifting-agency-page', active:  role === 'shift' },
    { id: ID.unique(), name: <ShoppingCart />, url: '/user-page/cart', active: role === 'user' }
  ];
  return (
    <header>
      <Container >
        <nav className='flex justify-between items-center py-3 px-8 bg-white shadow-md'>
          <div className='w-[15%]'>
            <Logo />
          </div>
          
          <ul className='flex items-center justify-between gap-7'>
            {navItems.map((item) => 
            item.active ?  
              <li key={item.id} className='text-lg font-semibold text-gray-500 hover:text-gray-700 '> 
                <button
                onClick={() => navigate(item.url)}
                >{item.name}</button>
              </li>
            : null
            )}
            {authStatus && (
              <li>
                <Logoutbtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header