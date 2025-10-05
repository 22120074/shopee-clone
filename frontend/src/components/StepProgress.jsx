import React, { useRef, useEffect, useState } from 'react';

const StepProgress = ({ currentStep, steps }) => {
    const stepRefs = useRef([]);
    const [lineStyle, setLineStyle] = useState({ left: 0, width: 0 });
    const [activeLineWidth, setActiveLineWidth] = useState(0);

    useEffect(() => {
        // Tính toán vị trí thanh ngang dựa trên vị trí thực tế của step đầu và cuối
        if (stepRefs.current[0] && stepRefs.current[steps.length - 1]) {
            const firstStep = stepRefs.current[0].getBoundingClientRect();
            const lastStep = stepRefs.current[steps.length - 1].getBoundingClientRect();
            const container = stepRefs.current[0].parentElement.getBoundingClientRect();
            
            const left = firstStep.left - container.left + firstStep.width / 2;
            const width = lastStep.left - firstStep.left;
            
            setLineStyle({ left, width });
            
            // Tính toán chiều rộng thanh active
            const progress = (currentStep - 1) / (steps.length - 1);
            setActiveLineWidth(width * progress);
        }
    }, [currentStep, steps.length]);
    
    return (
        <div className="w-full py-8">
            <div className="flex items-center justify-evenly relative">
                {/* Thanh trạng thái từ step đầu đến step cuối */}
                <div 
                    className="absolute top-5 h-1 bg-primaryBorderRating z-0"
                    style={{ 
                        left: `${lineStyle.left}px`, 
                        width: `${lineStyle.width}px` 
                    }}
                ></div>
                
                {/* Thanh trạng thái tô màu */}
                <div 
                    className="absolute top-5 h-1 bg-primaryColor transition-all duration-500 z-0"
                    style={{ 
                        left: `${lineStyle.left}px`,
                        width: `${activeLineWidth}px` 
                    }}
                ></div>

                {/* Step */}
                {steps.map((step, index) => (
                    <div 
                        key={step.number} 
                        ref={(el) => (stepRefs.current[index] = el)}
                        className="flex flex-col items-center relative z-10"
                    >
                        {/* Vòng tròn */}
                        <div 
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
                                transition-all duration-300
                                ${currentStep > step.number 
                                    ? 'bg-primaryColor text-white' 
                                    : currentStep === step.number 
                                        ? 'bg-primaryColor text-white ring-4 ring-primaryColor ring-opacity-30' 
                                        : 'bg-white text-primaryTextColor border-2 border-primaryColor'
                                }
                            `}
                        >
                            {currentStep > step.number ? (
                                // Icon hoàn thành
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                                </svg>
                            ) : (
                                step.number
                            )}
                        </div>

                        {/* Tiêu đề */}
                        <div className={`mt-2 text-sm font-medium
                                ${currentStep >= step.number ? 'text-primaryColor' : 'text-gray-400'}
                            `}
                        >
                            {step.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StepProgress;
