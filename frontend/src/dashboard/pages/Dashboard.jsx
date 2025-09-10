import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMoneyBillWave, FaFilePdf, FaCreditCard, FaBell, FaExclamationTriangle, FaBullhorn, FaCommentDots, FaBuilding, FaBolt, FaWater, FaAngleDown, FaAngleUp, FaSearch, FaExclamationCircle } from 'react-icons/fa';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openServiceCharges, setOpenServiceCharges] = useState(false);
  const [openOtherExpenditure, setOpenOtherExpenditure] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  
const toggleDropdown = () => {
  setIsDropdownOpen(!isDropdownOpen);
};

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const bills = [
    { icon: FaBolt, title: 'Electricity Bill', amount: '₹12,500', due: 'Due: 05 Aug 2025' },
    { icon: FaWater, title: 'Water Bill', amount: '₹8,750', due: 'Due: 07 Aug 2025' },
    { icon: FaExclamationCircle, title: 'Complaint Management', amount: '2 Complaints', due: 'Last updated: 08 Sep 2025', link: '/complaints' },
  ];

  const notifications = [
    { icon: FaBell, title: 'Festival Notice', message: 'Diwali Celebration on 15th Nov', time: '2 hours ago' },
    { icon: FaExclamationTriangle, title: 'Emergency Work', message: 'Lift maintenance scheduled', time: '1 day ago' },
    { icon: FaBullhorn, title: 'Society Announcement', message: 'General meeting on 10th Aug', time: '3 days ago' },
    { icon: FaCommentDots, title: 'New Complaint', message: 'Parking issue reported', time: '5 hours ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-indigo-800 text-white transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-200 ease-in-out z-30`}>
        <div className="p-4">
          <h1 className="text-2xl font-bold">Society User</h1>
        </div>
        <div className="w-64 min-h-screen bg-gray-900 text-white">
          <nav className="p-4 space-y-2">
            {/* Electricity Bill */}
            <Link to="/electricity-bill" className="flex items-center gap-2 px-4 py-2 rounded bg-gray-800 hover:bg-indigo-700">
              <FaBolt className="text-lg" />
              Electricity Bill
            </Link>

            {/* Water Bill */}
            <Link to="/water-bill" className="flex items-center gap-2 px-4 py-2 rounded bg-gray-800 hover:bg-indigo-700">
              <FaWater className="text-lg" />
              Water Bill
            </Link>

            {/* Service Charges */}
            <div className="bg-gray-800 rounded">
              <button
                onClick={() => setOpenServiceCharges(!openServiceCharges)}
                className="flex w-full items-center justify-between px-4 py-2 font-semibold hover:bg-indigo-700 rounded">
                <span className="flex items-center gap-2">
                  <FaMoneyBillWave className="text-lg" />
                  Service Charges
                </span>
                {openServiceCharges ? (
                  <FaAngleUp className="text-sm" />
                ) : (
                  <FaAngleDown className="text-sm" />
                )}
              </button>
              {openServiceCharges && (
                <div className="space-y-1 pb-2">
                  <Link to="/guard-salary" className="block px-8 py-1 hover:bg-indigo-700 rounded">
                    Guard Salary
                  </Link>
                  <Link to="/sweeper-salary" className="block px-8 py-1 hover:bg-indigo-700 rounded">
                    Sweeper Salary
                  </Link>
                  <Link to="/maintenance" className="block px-8 py-1 hover:bg-indigo-700 rounded">
                    Maintenance & Miscellaneous
                  </Link>
                </div>
              )}
            </div>

            {/* Other Expenditure */}
            <div className="bg-gray-800 rounded">
              <button
                onClick={() => setOpenOtherExpenditure(!openOtherExpenditure)}
                className="flex w-full items-center justify-between px-4 py-2 font-semibold hover:bg-indigo-700 rounded"
              >
                <span className="flex items-center gap-2">
                  <FaBuilding className="text-lg" />
                  Other Expenditure
                </span>
                {openOtherExpenditure ? (
                  <FaAngleUp className="text-sm" />
                ) : (
                  <FaAngleDown className="text-sm" />
                )}
              </button>
              {openOtherExpenditure && (
                <div className="space-y-1 pb-2">
                  <Link to="/repairs" className="block px-8 py-1 hover:bg-indigo-700 rounded">
                    Repairs
                  </Link>
                  <Link to="/building-improvements" className="block px-8 py-1 hover:bg-indigo-700 rounded">
                    Building Improvements
                  </Link>
                  <Link to="/fund-collection" className="block px-8 py-1 hover:bg-indigo-700 rounded">
                    Fund Collection
                  </Link>
                </div>
              )}
            </div>

            {/* Payment Fine */}
            <Link to="/late-fines" className="flex items-center gap-2 px-4 py-2 rounded bg-gray-800 hover:bg-indigo-700">
              <FaExclamationTriangle className="text-lg" />
              Late Payment Fine
            </Link>

            {/* Bill PDF Generation */}
            <Link to="/bill-generation" className="flex items-center gap-2 px-4 py-2 rounded bg-gray-800 hover:bg-indigo-700">
              <FaFilePdf className="text-lg" />
              Bill PDF Generation
            </Link>

            {/* Online Payment */}
            <Link to="/online-payment" className="flex items-center gap-2 px-4 py-2 rounded bg-gray-800 hover:bg-indigo-700">
              <FaCreditCard className="text-lg" />
              Online Payment
            </Link>

            {/* Notifications */}
            <Link to="/notifications" className="flex items-center gap-2 px-4 py-2 rounded bg-gray-800 hover:bg-indigo-700">
              <FaBell className="text-lg" />
              Notifications
            </Link>

            {/* Complaint Management */}
            <Link to="/complaints" className="flex items-center gap-2 px-4 py-2 rounded bg-gray-800 hover:bg-indigo-700">
              <FaCommentDots className="text-lg" />
              Complaint Management
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
       <div className="md:ml-64">
        {/* Header */}
         <header className="bg-white shadow p-4 flex justify-between items-center">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="md:hidden mr-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h2 className="text-xl font-semibold text-gray-800">Vishwakarma Society Sonari</h2>
      </div>

   <div className="relative flex items-center space-x-4">
  {/* Search Input */}
  <div className="relative">
    <input
      type="text"
      placeholder="Search..."
      className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
  </div>

        {/* Notification Icon */}
        <FaBell className="text-gray-600 text-xl cursor-pointer hover:text-blue-600" />

        {/* Profile Dropdown */}
        <div className="relative">
         <button
  onClick={toggleDropdown}
  className="w-10 h-10 rounded-full  bg-indigo-200 flex items-center justify-center focus:outline-none overflow-hidden border-2 border-blue-700"
>
  <img
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA6ZY-K-g6Mj9Wn9TC2vFS74rVXTUeT5MFrw&s"  
    alt="Profile"
    className="w-full h-full object-cover"
  />
</button>


          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md z-10">
              <ul className="text-gray-700">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Bills Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {bills.map((bill, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <bill.icon className="text-3xl text-indigo-600" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{bill.title}</h3>
                      <p className="text-gray-600">{bill.amount}</p>
                      <p className="text-sm text-gray-500">{bill.due}</p>
                    </div>
                  </div>
<Link to={bill.link} className="text-indigo-600 hover:underline">View</Link>

                </div>
              </div>
            ))}
          </div>

          {/* Other Expenditure */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FaBuilding className="mr-2" /> Other Expenditure
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold">Repair Work</h4>
                <p className="text-gray-600">Building repair photos</p>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFAmdODdQ4I9eKwZJyyFZOnNCj86ZwGbx15Q&s" alt="Repair" className="mt-2 rounded" />
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold">Improvement Project</h4>
                <p className="text-gray-600">New garden installation</p>
         <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPPu9GmFU49ehD6jewwVAMqPIrFQGLR59Rxw&s" alt="Repair" className="mt-2 rounded" />   
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold">Fund Collection</h4>
                <p className="text-gray-600">Crowdfunding for new amenities</p>
                <p className="text-indigo-600 font-semibold mt-2">₹50,000 collected</p>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FaBell className="mr-2" /> Notifications
            </h3>
            <div className="space-y-4">
              {notifications.map((notification, index) => (
                <div key={index} className="flex items-center space-x-4 border-b pb-2">
                  <notification.icon className="text-indigo-600" />
                  <div>
                    <h4 className="font-semibold">{notification.title}</h4>
                    <p className="text-gray-600">{notification.message}</p>
                    <p className="text-sm text-gray-500">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main> 
      </div> 
    </div>
  );
};

export default Dashboard;
