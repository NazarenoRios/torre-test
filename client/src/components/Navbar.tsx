import React from 'react';

const Navbar = () => {
  return (
    <nav className='bg-00102c p-4'>
      <div className='container mx-auto flex items-center justify-between'>
        <div>
          <a href='#' className='text-lg font-semibold text-white'>
            TORRE
          </a>
        </div>
        <div className='hidden space-x-4 md:flex'>
          <a href='#' className='text-gray-300 hover:text-white'>
            Inicio
          </a>
          <a href='#' className='text-gray-300 hover:text-white'>
            Acerca de
          </a>
          <a href='#' className='text-gray-300 hover:text-white'>
            Servicios
          </a>
          <a href='#' className='text-gray-300 hover:text-white'>
            Contacto
          </a>
        </div>
        <div className='md:hidden'>
          {/* <!-- Aquí agregarías el botón para el menú desplegable en dispositivos móviles --> */}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
