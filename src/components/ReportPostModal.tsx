import { useState } from 'react';

interface ReportPostModalProps {
    onClose: () => void;
    onSubmit: (reason: string) => void;
}

const reasons = [
    'Inappropriate content',
    'Spam or misleading',
    'Harassment or hate speech',
    'Violence or harm',
    'Other',
];

const ReportPostModal: React.FC<ReportPostModalProps> = ({ onClose, onSubmit }) => {
    const [selectedReason, setSelectedReason] = useState('');

    const handleSubmit = () => {
        if (!selectedReason) return alert('Please select a reason');
        onSubmit(selectedReason);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Report Post</h2>
                <div className="space-y-2">
                    {reasons.map((reason) => (
                        <label key={reason} className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="reportReason"
                                value={reason}
                                checked={selectedReason === reason}
                                onChange={() => setSelectedReason(reason)}
                            />
                            <span>{reason}</span>
                        </label>
                    ))}
                </div>
                <div className="mt-6 flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-1 rounded bg-gray-300 hover:bg-gray-400">Cancel</button>
                    <button onClick={handleSubmit} className="px-4 py-1 rounded bg-red-600 text-white hover:bg-red-700">Submit</button>
                </div>
            </div>
        </div>
    );
};

export default ReportPostModal;
