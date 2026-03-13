import React, { useRef, useEffect, useState } from "react";

const VerticalStepProgress = ({ currentStep, steps }) => {
  const stepRefs = useRef([]);
  const [lineStyle, setLineStyle] = useState({ top: 0, height: 0, left: 0 });
  const [activeLineHeight, setActiveLineHeight] = useState(0);

  useEffect(() => {
    // Tính toán vị trí thanh dọc dựa trên vị trí thực tế của step đầu và cuối
    if (stepRefs.current[0] && stepRefs.current[steps.length - 1]) {
      const firstStep = stepRefs.current[0].getBoundingClientRect();
      const lastStep =
        stepRefs.current[steps.length - 1].getBoundingClientRect();
      const container =
        stepRefs.current[0].parentElement.getBoundingClientRect();

      const top = firstStep.top - container.top + firstStep.height / 2;
      const height = lastStep.top - firstStep.top;
      const left = firstStep.left - container.left + firstStep.width / 2;

      setLineStyle({ top, height, left });

      // Tính toán chiều cao thanh active
      // Cắm cờ active đến mức step nào
      const maxIndex = steps.length - 1;
      // Tránh index lỗi (vd: currentStep lớn hơn max hoặc bé hơn 0)
      const progressIndex = Math.min(Math.max(currentStep, 0), maxIndex);

      if (progressIndex > 0) {
        const currentProgressStep =
          stepRefs.current[progressIndex].getBoundingClientRect();
        setActiveLineHeight(currentProgressStep.top - firstStep.top);
      } else {
        setActiveLineHeight(0);
      }
    }
  }, [currentStep, steps.length]);

  return (
    <div className="w-full flex flex-col py-2 relative">
      <div
        className="absolute bg-gray-200 z-0"
        style={{
          top: `${lineStyle.top}px`,
          left: `${lineStyle.left}px`,
          height: `${lineStyle.height}px`,
          width: "1px",
          transform: "translateX(-50%)",
        }}
      ></div>

      {/* Thanh trạng thái màu (màu cam) hiển thị tiến độ */}
      <div
        className="absolute bg-[#ee4d2d] transition-all duration-500 z-0"
        style={{
          top: `${lineStyle.top}px`,
          left: `${lineStyle.left}px`,
          height: `${activeLineHeight}px`,
          width: "1px",
          transform: "translateX(-50%)",
        }}
      ></div>

      {steps.map((stepName, index) => {
        const isActive = index === currentStep;
        const isCompleted = index <= currentStep;
        const isNext = index === currentStep;

        return (
          <div
            key={index}
            className={`flex items-stretch cursor-pointer transition-colors relative z-10`}
          >
            {/* Cột trái chứa Icon */}
            <div className="w-12 shrink-0 relative flex flex-col items-center pt-3 pb-3">
              {/* Circle: Dùng ref để gắn vào div của hình tròn, dễ dàng xác định tâm */}
              <div
                ref={(el) => (stepRefs.current[index] = el)}
                className="w-4 h-4 rounded-full flex flex-col items-center justify-center shrink-0 bg-white"
              >
                {isCompleted ? (
                  <div className="w-4 h-4 rounded-full bg-[#ee4d2d] flex items-center justify-center text-white relative z-10">
                    <svg
                      className="w-2.5 h-2.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={4}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                ) : (
                  <div
                    className={`w-3.5 h-3.5 rounded-full border-[2px] bg-white relative z-10
                    ${isNext ? "border-[#ee4d2d]" : "border-gray-300"}`}
                  ></div>
                )}
              </div>
            </div>

            {/* Cột phải chứa Label */}
            <div
              className={`flex items-center text-[14px] py-2.5 pr-4
              ${isActive ? "font-semibold text-black" : "font-medium text-moregrayTextColor"}`}
            >
              {stepName}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VerticalStepProgress;
