import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Input, Logo, Logoutbtn } from '../../Index';
import { CircleUser, ShoppingCart, User, Menu } from 'lucide-react';
import { ID } from 'appwrite';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navItems = [
    { id: ID.unique(), name: 'Home', url: '/', active: true },
    { id: ID.unique(), name: 'Shift', url: '/shift-page', active: role === 'user' },
    { id: ID.unique(), name: 'Sell', url: '/sell-page', active: role === 'user' },
    { id: ID.unique(), name: 'Recycle', url: '/recycle-page', active: role === 'user' },
    { id: ID.unique(), name: 'Donate', url: '/donate-page', active: role === 'user' },
    { id: ID.unique(), name: 'Buy', url: '/buy-page', active: role === 'user' },
    { id: ID.unique(), name: 'Requests', url: '/recycle-requets', active: role === 'recycle' },
    { id: ID.unique(), name: 'Accepted', url: '/accepted-recycle-requets', active: role === 'recycle' },
    { id: ID.unique(), name: 'Delivery', url: '/delivery-requets', active: role === 'shift' },
    { id: ID.unique(), name: 'DonationDel', url: '/donation-requets', active: role === 'shift' },
    { id: ID.unique(), name: 'Shifting', url: '/shifting-requets', active: role === 'shift' },
    { id: ID.unique(), name: <Input type='text' placeholder='Search' className='bg-white border border-gray-200 py-2 px-3 w-[200px] rounded-2xl' />, active: role === 'user' },
    { id: ID.unique(), name: <CircleUser />, url: '/login', active: !authStatus },
    { id: ID.unique(), name: <User />, url: '/user-page', active: role === 'user' },
    { id: ID.unique(), name: <User />, url: '/shifting-agency-page', active: role === 'shift' },
    { id: ID.unique(), name: <ShoppingCart />, url: '/user-page/cart', active: role === 'user' }
  ];

  return (
    <header className='bg-gray-900 shadow-lg'>
      <Container>
        <nav className='flex justify-between items-center py-3 px-8'>
          <div className='w-[18%] cursor-pointer' onClick={() => navigate("/")}> <Logo /> </div>
          
          <button className='lg:hidden text-white' onClick={toggleMenu}>
            <Menu size={28} />
          </button>

          {/* Desktop Navigation */}
          <ul className='hidden lg:flex items-center gap-7'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.id} className='text-lg font-semibold text-gray-500 hover:text-gray-700'>
                  <button
                    onClick={() => navigate(item.url)}
                    className={`text-lg font-semibold text-gray-300 hover:text-green-400 transition duration-300 ${
                      location.pathname === item.url ? "border-b-2 border-green-400" : ""
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li> <Logoutbtn /> </li>
            )}
          </ul>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className='lg:hidden bg-gray-800 p-4 rounded-md shadow-md'>
            <ul className='flex flex-col gap-4'>
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.id} className='text-lg font-semibold text-gray-300 hover:text-green-400'>
                    <button onClick={() => { navigate(item.url); setMenuOpen(false); }}>
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li>
                  <Logoutbtn />
                </li>
              )}
            </ul>
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;