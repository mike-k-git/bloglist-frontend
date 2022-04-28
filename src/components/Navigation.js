import { NavLink } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { XIcon, MenuIcon } from "@heroicons/react/outline";
import { Fragment } from "react";

const Navigation = ({ user, handleLogout }) => {
  const active =
    "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium";
  const inactive =
    "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium";
  const activeMobile =
    "bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium";
  const inactiveMobile =
    "text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium";
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        isActive ? active : inactive
                      }
                      aria-current={({ isActive }) =>
                        isActive ? "page" : undefined
                      }
                    >
                      blogs
                    </NavLink>
                    <NavLink
                      to="/users"
                      className={({ isActive }) =>
                        isActive ? active : inactive
                      }
                      aria-current={({ isActive }) =>
                        isActive ? "page" : undefined
                      }
                    >
                      users
                    </NavLink>
                  </div>
                </div>
              </div>
              {user && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <div className="text-gray-100">{user.name} logged in</div>
                  <button
                    className="ml-5 bg-orange-300 px-3 py-2 rounded-md text-gray-800 hover:text-white hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    type="submit"
                    onClick={handleLogout}
                    data-cy="logout-submit"
                  >
                    logout
                  </button>
                </div>
              )}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Disclosure.Button as={Fragment}>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? activeMobile : inactiveMobile
                  }
                  aria-current={({ isActive }) =>
                    isActive ? "page" : undefined
                  }
                >
                  blogs
                </NavLink>
              </Disclosure.Button>
              <Disclosure.Button as={Fragment}>
                <NavLink
                  to="/users"
                  className={({ isActive }) =>
                    isActive ? activeMobile : inactiveMobile
                  }
                  aria-current={({ isActive }) =>
                    isActive ? "page" : undefined
                  }
                >
                  users
                </NavLink>
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navigation;
