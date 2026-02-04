import { useEffect } from 'react';
import Lottie from 'lottie-react';
import { CheckCircle } from 'lucide-react';

interface SuccessAnimationProps {
    show: boolean;
    onComplete?: () => void;
    message?: string;
    submessage?: string;
}

export default function SuccessAnimation({
    show,
    onComplete,
    message = "Application Submitted Successfully!",
    submessage = "Your admission application has been received"
}: SuccessAnimationProps) {
    useEffect(() => {
        if (show && onComplete) {
            const timer = setTimeout(() => {
                onComplete();
            }, 3000); // Auto close after 3 seconds
            return () => clearTimeout(timer);
        }
    }, [show, onComplete]);

    if (!show) return null;

    // Simple success animation data (inline)
    const successAnimationData = {
        v: "5.7.4",
        fr: 60,
        ip: 0,
        op: 60,
        w: 200,
        h: 200,
        nm: "Success Check",
        ddd: 0,
        assets: [],
        layers: [
            {
                ddd: 0,
                ind: 1,
                ty: 4,
                nm: "Circle",
                sr: 1,
                ks: {
                    o: { a: 0, k: 100 },
                    r: { a: 0, k: 0 },
                    p: { a: 0, k: [100, 100, 0] },
                    a: { a: 0, k: [0, 0, 0] },
                    s: {
                        a: 1,
                        k: [
                            { t: 0, s: [0, 0, 100] },
                            { t: 30, s: [100, 100, 100] }
                        ]
                    }
                },
                ao: 0,
                shapes: [
                    {
                        ty: "gr",
                        it: [
                            {
                                d: 1,
                                ty: "el",
                                s: { a: 0, k: [120, 120] },
                                p: { a: 0, k: [0, 0] }
                            },
                            {
                                ty: "st",
                                c: { a: 0, k: [0.22, 0.73, 0.29, 1] },
                                o: { a: 0, k: 100 },
                                w: { a: 0, k: 8 }
                            },
                            {
                                ty: "tr",
                                p: { a: 0, k: [0, 0] },
                                a: { a: 0, k: [0, 0] },
                                s: { a: 0, k: [100, 100] },
                                r: { a: 0, k: 0 },
                                o: { a: 0, k: 100 }
                            }
                        ]
                    }
                ],
                ip: 0,
                op: 60,
                st: 0
            }
        ]
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 text-center transform animate-scaleIn">
                {/* Success Icon with Animation */}
                <div className="relative mx-auto w-32 h-32 mb-6">
                    {/* Animated Circle Background */}
                    <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75"></div>

                    {/* Static Circle */}
                    <div className="absolute inset-0 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-20 h-20 text-white animate-checkmark" />
                    </div>
                </div>

                {/* Success Message */}
                <h2 className="text-2xl font-bold text-gray-900 mb-2 animate-slideUp">
                    {message}
                </h2>

                <p className="text-gray-600 mb-6 animate-slideUp animation-delay-100">
                    {submessage}
                </p>

                {/* Loading Dots */}
                <div className="flex justify-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce animation-delay-100"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce animation-delay-200"></div>
                </div>
            </div>

            <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes checkmark {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }

        .animate-checkmark {
          animation: checkmark 0.6s ease-out;
        }

        .animation-delay-100 {
          animation-delay: 0.1s;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
        </div>
    );
}
