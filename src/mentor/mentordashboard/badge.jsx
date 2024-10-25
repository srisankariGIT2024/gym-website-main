const Badge = ({ enquiryStatus, reSubmitCount, resSubmitOn }) => {
    let text = '';
    let statusClass = '';

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    switch (enquiryStatus) {
        case 0: // Enquired
            text = 'Enquired - Sent Registration Link';
            statusClass = 'bg-red-500 text-white';
            break;
    
        case 1: // Registration Link Sent
            if (reSubmitCount === 0) {
                text = 'Registration Link Sent';
                statusClass = 'bg-yellow-400 text-dark';
            } else {
                text = `Registration Link Sent - Re-Enquired (${reSubmitCount} times)`;
                statusClass = 'bg-yellow-400 text-dark';
            }
            break;
    
        case 2: // Registered Mentee
            text = 'Registered Mentee';
            statusClass = 'bg-green-500 text-white';
            break;
    
        default: // Unknown Status
            text = 'Unknown Status';
            statusClass = 'bg-gray-500 text-white';
            break;
    }
    return (
        <span
        className={`inline-flex flex-col items-start px-3 py-1 rounded-full text-sm font-medium ${statusClass}`}
        style={{ whiteSpace: 'normal', lineHeight: '1.1' }}
    >
        {text}
        {enquiryStatus === 1 && reSubmitCount > 0 && (
            <span className="text-xs mt-1">
                {`done on ${formatDate(resSubmitOn)}`}
            </span>
        )}
        {enquiryStatus === 0 && reSubmitCount === 1 && (
            <span className="text-xs mt-1">
                {`Re-enquired once`}
            </span>
        )}
    </span>
    
    );
};

export default Badge;
