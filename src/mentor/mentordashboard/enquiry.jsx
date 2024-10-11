import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Logo from "../../assets/logo.png";
import Badge from './badge';
import { useEffect, useState } from 'react';
import axios from 'axios';

const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const navigation = [
    { name: 'Dashboard', href: '/mentordashboard', current: false },
    { name: 'Mentees', href: '/mentees', current: false },
    { name: 'Enquiry', href: '/enquiry', current: true },
    { name: 'Schedules', href: '#', current: false },
    { name: 'Reports', href: '#', current: false },
];

const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const EnquiryFilters = ({ onFilterChange, selectedFilter, showDeleted, onShowDeletedToggle }) => {
    const filterOptions = [
        { label: 'All Enquiries', value: 'all' },
        { label: 'Enquired', value: '0' },
        { label: 'Registration Link Sent', value: '1' },
        { label: 'Registered Mentee', value: '2' },
        { label: 'Resubmission', value: 'resubmit' },
    ];

    return (
        <div className="flex justify-end text-dark p-4">
            {filterOptions.map(({ label, value }) => (
                <label key={value} className="mr-4">
                    <input
                        type="radio"
                        name="enquiryFilter"
                        value={value}
                        checked={selectedFilter === value}
                        onChange={() => onFilterChange(value)}
                        className="mr-1"
                    />
                    {label}
                </label>
            ))}
            <label className="mr-4">
                <input
                    type="checkbox"
                    checked={showDeleted}
                    onChange={onShowDeletedToggle}
                    className="mr-1"
                />
                Show Deleted
            </label>
        </div>
    );
};

const Enquiry = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [filteredEnquiries, setFilteredEnquiries] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('0'); // Default filter
    const [showDeleted, setShowDeleted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEnquiries = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/contacts');
                setEnquiries(response.data);
                filterEnquiries(response.data);
            } catch (error) {
                console.error('Error fetching enquiries:', error);
                setError('Failed to load enquiries.');
            } finally {
                setLoading(false);
            }
        };
        fetchEnquiries();
    }, []);

    useEffect(() => {
        filterEnquiries(enquiries);
    }, [selectedFilter, enquiries, showDeleted]);

    const filterEnquiries = (enquiries) => {
        const filtered = enquiries.filter(enquiry => {
            const isDeleted = enquiry.deleted === 1;

            if (showDeleted && isDeleted) return true; // Show deleted if toggled on

            switch (selectedFilter) {
                case 'all':
                    return true;
                case '0':
                    return enquiry.enquiryStatus === 0 && enquiry.deleted == 0; // Enquired
                case '1':
                    return enquiry.enquiryStatus === 1 && enquiry.deleted == 0;; // Registration Link Sent
                case '2':
                    return enquiry.enquiryStatus === 2 && enquiry.deleted == 0; // Registered Mentee
                case 'resubmit':
                    return enquiry.reSubmit_count > 0 && enquiry.deleted == 0; // Resubmission
                case 'delete':
                    return enquiry.deleted == 1; // Deleted
                default:
                    return enquiry.enquiryStatus === 0 && enquiry.deleted == 0; // Enquired
            }
        });

        setFilteredEnquiries(filtered);
    };

    const handleFilterChange = (value) => {
        setSelectedFilter(value);
    };

    const toggleShowDeleted = () => {
        setShowDeleted(prev => !prev);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="min-h-full bg-white">
            <Disclosure as="nav" className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <img
                                    alt="Your Company"
                                    src={Logo}
                                    className="h-8 w-8"
                                />
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            aria-current={item.current ? 'page' : undefined}
                                            className={classNames(
                                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'rounded-md px-3 py-2 text-sm font-medium',
                                            )}
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center md:ml-6">
                                <button
                                    type="button"
                                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon aria-hidden="true" className="h-6 w-6" />
                                </button>

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <img alt="" src={user.imageUrl} className="h-8 w-8 rounded-full" />
                                        </MenuButton>
                                    </div>
                                    <MenuItems
                                        transition
                                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                    >
                                        {userNavigation.map((item) => (
                                            <MenuItem key={item.name}>
                                                <a
                                                    href={item.href}
                                                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                                                >
                                                    {item.name}
                                                </a>
                                            </MenuItem>
                                        ))}
                                    </MenuItems>
                                </Menu>
                            </div>
                        </div>
                        <div className="-mr-2 flex md:hidden">
                            {/* Mobile menu button */}
                            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                                <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                            </DisclosureButton>
                        </div>
                    </div>
                </div>

                <DisclosurePanel className="md:hidden">
                    <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                        {navigation.map((item) => (
                            <DisclosureButton
                                key={item.name}
                                as="a"
                                href={item.href}
                                aria-current={item.current ? 'page' : undefined}
                                className={classNames(
                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    'block rounded-md px-3 py-2 text-base font-medium',
                                )}
                            >
                                {item.name}
                            </DisclosureButton>
                        ))}
                    </div>
                    <div className="border-t border-gray-700 pb-3 pt-4">
                        <div className="flex items-center px-5">
                            <div className="flex-shrink-0">
                                <img alt="" src={user.imageUrl} className="h-10 w-10 rounded-full" />
                            </div>
                            <div className="ml-3">
                                <div className="text-base font-medium leading-none text-white">{user.name}</div>
                                <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                            </div>
                            <button
                                type="button"
                                className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">View notifications</span>
                                <BellIcon aria-hidden="true" className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="mt-3 space-y-1 px-2">
                            {userNavigation.map((item) => (
                                <DisclosureButton
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                >
                                    {item.name}
                                </DisclosureButton>
                            ))}
                        </div>
                    </div>
                </DisclosurePanel>
            </Disclosure>

            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">List of Enquiries</h1>
                </div>
            </header>
            <EnquiryFilters
                onFilterChange={handleFilterChange}
                selectedFilter={selectedFilter}
                onShowDeletedToggle={toggleShowDeleted}
                showDeleted={showDeleted}
            />
            <div className="min-h-full">
                <div className="mx-auto max-w-7xl text-dark bg-white px-4 py-6 sm:px-6 lg:px-8">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <>
                            <div className="flex flex-col mt-6">
                                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                        <div className="overflow-hidden">
                                            <table className="min-w-full text-left text-sm font-light">
                                                <thead className="border-b font-medium dark:border-neutral-500">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-4">#</th>
                                                        <th scope="col" className="px-6 py-4">First Name</th>
                                                        <th scope="col" className="px-6 py-4">Last Name</th>
                                                        <th scope="col" className="px-6 py-4">Email</th>
                                                        <th scope="col" className="px-6 py-4">Mobile Number</th>
                                                        <th scope="col" className="px-6 py-4">Message</th>
                                                        <th scope="col" className="px-6 py-4">Created On</th>
                                                        <th scope="col" className="px-6 py-4">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredEnquiries.map((enquiry, index) => (
                                                        <tr key={enquiry._id} className={`border-b transition duration-300 ease-in-out hover:bg-neutral-100 ${enquiry.deleted === 1 ? 'bg-red-100' : ''}`}>
                                                            <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                                                            <td className="whitespace-nowrap px-6 py-4">{enquiry.firstname}</td>
                                                            <td className="whitespace-nowrap px-6 py-4">{enquiry.lastname}</td>
                                                            <td className="whitespace-nowrap px-6 py-4">{enquiry.email}</td>
                                                            <td className="whitespace-nowrap px-6 py-4">{enquiry.mobilenumber}</td>
                                                            <td className="whitespace-nowrap px-6 py-4">{enquiry.message}</td>
                                                            <td className="whitespace-nowrap px-6 py-4">{formatDate(enquiry.createdAt)}</td>
                                                            <td className="whitespace-nowrap px-6 py-4">
                                                                {enquiry.deleted === 1 ? (
                                                                    <span className="text-red-600">Deleted</span>
                                                                ) : (
                                                                    <Badge enquiryStatus={enquiry.enquiryStatus} reSubmitCount={enquiry.reSubmit_count} resSubmitOn={enquiry.resSubmit_on} />
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Enquiry;
