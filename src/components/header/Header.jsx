import React from 'react'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import  {Container, Input, Logo, Logoutbtn } from '../../Index'
import {CircleUser, ShoppingCart} from 'lucide-react'
import { ID } from 'appwrite'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const id = ID

  const navItems =[
    {
      id: ID.unique(),
      name: 'home',
      url: '/',
      active: true
    },
    {
      id: ID.unique(),
      name: 'furniture',
      url:'/category/furniture',
      active: true
    },
    {
      id: ID.unique(),
      name: 'electronic',
      url:'/category/electronics',
      active: true
    },
    {
      id: ID.unique(),
      name:<Input type='text' placeholder='search' className=' bg-white border border-gray-200 py-2 px-3 w-[350px] rounded-2xl ' />,
      active:true
    },
    
    {
      id: ID.unique(),
      name: <CircleUser />,
      url: '/login',
      active: !authStatus
    },
    {
      id: ID.unique(),
      name: <CircleUser />,
      url: '/user-page',
      active: authStatus
    },
    {
      id: ID.unique(),
      name: <ShoppingCart/>,
      url: '/user-page/cart',
      active: true
    }
  ]
  return (
    <header>
      <Container >
        <nav className='flex justify-between items-center py-3 px-8 bg-white shadow-md'>
          <div className='w-[20%]'>
            <Logo />
          </div>
          
          <ul className='flex items-center justify-between gap-7'>
            {navItems.map((item) => 
            item.active ?  
              <li key={item.id}> 
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