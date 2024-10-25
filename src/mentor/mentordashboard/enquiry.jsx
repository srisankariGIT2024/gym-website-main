import { useMemo, useState, useEffect } from 'react';
import { useTable, usePagination } from 'react-table';
import axios from 'axios';
import { Disclosure, Menu, MenuButton } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import Logo from "../../assets/logo.png";

const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const navigation = [
    { name: 'Dashboard', href: '/Enquiry', current: true },
    { name: 'Mentees', href: '/mentees', current: false },
    { name: 'Enquiry', href: '/enquiry', current: false },
    { name: 'Schedules', href: '#', current: false },
    { name: 'Reports', href: '#', current: false },
];

const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
];

export default function Enquiry() {
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({
        enquiry: true,
        resubmission: false,
        deleted: false,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/enquiries');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const columns = useMemo(() => [
        {
            Header: 'Name',
            accessor: 'firstname',
            Cell: ({ row }) => {
                const { firstname, lastname } = row.original || {};
                return `${firstname || 'Unknown'} ${lastname || ''}`;
            },
        },
        {
            Header: 'Email',
            accessor: 'email',
        },
        {
            Header: 'Mobile Number',
            accessor: 'mobilenumber',
        },
        {
            Header: 'Enquiry Status',
            accessor: 'enquiryStatus',
            Cell: ({ row }) => {
                const value = row.original.enquiryStatus;
                const deleted = row.original.deleted;
                const reSubmitCount = row.original.reSubmit_count || 0;
                let badgeClass = '';
                let statusText = '';

                if (value === 0) {
                    badgeClass = 'bg-yellow-500';
                    statusText = 'Enquired';
                } else if (value === 1) {
                    badgeClass = 'bg-green-500';
                    statusText = `Enquired (${reSubmitCount} times)`;
                } else {
                    badgeClass = 'bg-red-500';
                    statusText = 'Deleted';
                }

                return (
                    <span className={`inline-flex items-center px-2 py-1 rounded text-white ${badgeClass}`}>
                        {statusText}
                    </span>
                );
            },
        },
        {
            Header: 'Created On',
            accessor: 'createdAt',
            Cell: ({ value }) => new Date(value).toLocaleString(),
        },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: () => (
                <div className="flex space-x-2">
                    <button className="text-blue-500">Email</button>
                    <button className="text-yellow-500">Edit</button>
                    <button className="text-red-500">Delete</button>
                </div>
            ),
        },
    ], []);

    // Apply filters based on selected checkboxes
    const filteredData = useMemo(() => {
        return data.filter(item => {
            const { enquiryStatus, reSubmit_count, deleted } = item;
            const isEnquiry = filters.enquiry && enquiryStatus === 0 && reSubmit_count === 0 && deleted === 0;
            const isResubmission = filters.resubmission && enquiryStatus === 1 && reSubmit_count >= 1 && deleted === 0;
            const isDeleted = filters.deleted && deleted === 1;

            return isEnquiry || isResubmission || isDeleted;
        });
    }, [data, filters]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data: filteredData,
            initialState: { pageIndex: 0 },
        },
        usePagination
    );

    const handleFilterChange = (e) => {
        const { name, checked } = e.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: checked }));
    };

    return (
        <div className="min-h-full">
            <Disclosure as="nav" className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <img alt="Your Company" src={Logo} className="h-8 w-8" />
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            aria-current={item.current ? 'page' : undefined}
                                            className={`rounded-md px-3 py-2 text-sm font-medium ${item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center md:ml-6">
                                <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none">
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon aria-hidden="true" className="h-6 w-6" />
                                </button>
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none">
                                            <img alt="" src={user.imageUrl} className="h-8 w-8 rounded-full" />
                                        </MenuButton>
                                    </div>
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        {userNavigation.map((item) => (
                                            <Menu.Item key={item.name}>
                                                <a href={item.href} className="block px-4 py-2 text-sm text-gray-700">{item.name}</a>
                                            </Menu.Item>
                                        ))}
                                    </Menu.Items>
                                </Menu>
                            </div>
                        </div>
                    </div>
                </div>
            </Disclosure>

            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Enquiries</h1>
                </div>
            </header>

            <main>
                <div className="mx-auto max-w-7xl bg-white px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                            <label className="mr-2 text-dark">
                                <input
                                    type="checkbox"
                                    name="enquiry"
                                    checked={filters.enquiry}
                                    onChange={handleFilterChange}
                                    className="mr-1 text-dark"
                                />
                                Enquired
                            </label>
                            <label className="mr-2 text-dark">
                                <input
                                    type="checkbox"
                                    name="resubmission"
                                    checked={filters.resubmission}
                                    onChange={handleFilterChange}
                                    className="mr-1"
                                />
                                Resubmission
                            </label>
                            <label className="mr-2 text-dark">
                                <input
                                    type="checkbox"
                                    name="deleted"
                                    checked={filters.deleted}
                                    onChange={handleFilterChange}
                                    className="mr-1"
                                />
                                Deleted
                            </label>
                        </div>
                        <div className="flex items-center">
                            <label className="mr-2 text-sm">Show</label>
                            <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))} className="bg-blue-400 rounded p-2">
                                {[5, 10, 20, 50].map(size => (
                                    <option key={size} value={size}>Show {size}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <table {...getTableProps()} className="min-w-full divide-y divide-gray-200 border border-gray-300">
                        <thead>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps()} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
                                            {column.render('Header')}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()} className="divide-y divide-gray-200">
                            {page.map(row => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map(cell => (
                                            <td {...cell.getCellProps()} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b border-gray-300">
                                                {cell.render('Cell')}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className="mt-4 flex items-center justify-end gap-4">
                        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="p-2 bg-blue-400 rounded">{"<<"}</button>
                        <button onClick={() => previousPage()} disabled={!canPreviousPage} className="p-2 bg-blue-400 rounded">{"<"}</button>
                        <button onClick={() => nextPage()} disabled={!canNextPage} className="p-2 bg-blue-400 rounded">{">"}</button>
                        <button onClick={() => gotoPage(data.length / pageSize - 1)} disabled={!canNextPage} className="p-2 bg-blue-400 rounded">{">>"}</button>
                    </div>
                </div>
            </main>
        </div>
    );
}
