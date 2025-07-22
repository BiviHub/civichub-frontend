import { useState } from 'react';
import { CheckCircle, XCircle, Smartphone, Mail, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const TwoFactorSettings = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [method, setMethod] = useState<'sms' | 'email'>('sms');

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
            <div className="max-w-2xl mx-auto bg-white shadow rounded-lg p-6">
                <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-green-600" />
                    Two-Factor Authentication (2FA)
                </h2>

                <div className="mb-6">
                    <p className="text-gray-700">
                        Enhance your account security by enabling 2FA. You’ll be asked to enter a code sent via your preferred method each time you log in.
                    </p>
                </div>

                {/* Toggle 2FA */}
                <div className="mb-6">
                    <label className="flex items-center gap-2 font-medium text-gray-800 mb-2">
                        Status:
                        {isEnabled ? (
                            <span className="text-green-600 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" /> Enabled
              </span>
                        ) : (
                            <span className="text-red-600 flex items-center gap-1">
                <XCircle className="w-4 h-4" /> Disabled
              </span>
                        )}
                    </label>

                    <button
                        onClick={() => setIsEnabled(!isEnabled)}
                        className={`px-4 py-2 rounded-md text-white text-sm font-medium ${
                            isEnabled ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                        }`}
                    >
                        {isEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                    </button>
                </div>

                {/* Method Selection */}
                {isEnabled && (
                    <div className="mb-6">
                        <h3 className="font-medium text-gray-800 mb-2">Choose your preferred method:</h3>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setMethod('sms')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-md border ${
                                    method === 'sms' ? 'bg-blue-100 border-blue-600 text-blue-600' : 'border-gray-300'
                                }`}
                            >
                                <Smartphone className="w-4 h-4" />
                                SMS
                            </button>

                            <button
                                onClick={() => setMethod('email')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-md border ${
                                    method === 'email' ? 'bg-blue-100 border-blue-600 text-blue-600' : 'border-gray-300'
                                }`}
                            >
                                <Mail className="w-4 h-4" />
                                Email
                            </button>
                        </div>
                    </div>
                )}

                {/* Save Changes */}
                {isEnabled && (
                    <div className="pt-4 border-t">
                        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                            Save Preferences
                        </button>
                    </div>
                )}

                {/* Back Link */}
                <div className="mt-6 text-sm text-center">
                    <Link to="/settings" className="text-blue-600 hover:underline">
                        ← Back to Settings
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TwoFactorSettings;
