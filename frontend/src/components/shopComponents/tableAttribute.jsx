import InsertImgButton from "../buttons/insertImgButton";

export default function TableAttribute({
  attributeObject,
  setAttributeObject,
}) {
  const handleUpdate = (attrName, index, field, value) => {
    const updated = { ...attributeObject };
    updated[attrName][index][field] = value;
    if (setAttributeObject) {
      setAttributeObject(updated);
    }
  };

  // Determine if any variant has a 'size' property
  const hasSize = Object.values(attributeObject).some((variants) =>
    variants.some((variant) => variant.size),
  );

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-sm">
      <table className="w-full border-collapse text-[14px]">
        <thead>
          <tr className="bg-gray-50 text-gray-500 border-b border-gray-200">
            <th className="px-4 py-2 lg:py-3 font-medium border-r border-gray-200 w-[80px] md:w-[100px] lg:w-[120px]">
              Màu sắc
            </th>
            {hasSize && (
              <th className="px-4 py-2 lg:py-3 font-medium border-r border-gray-200 w-[40px] md:w-[50px] lg:w-[100px]">
                Size
              </th>
            )}
            <th className="px-4 py-2 lg:py-3 font-medium border-r border-gray-200">
              <span className="text-red-500">*</span>Giá
            </th>
            <th className="px-4 py-2 lg:py-3 font-medium">
              <span className="text-red-500">*</span>Kho hàng
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(attributeObject).map((attrName) => {
            const variants = attributeObject[attrName];
            return variants.map((variant, vIndex) => (
              <tr
                key={`${attrName}-${vIndex}`}
                className="border-b border-gray-200 last:border-b-0"
              >
                {/* Cột Màu sắc: Chỉ hiển thị ở hàng đầu tiên của nhóm và dùng rowSpan */}
                {vIndex === 0 && (
                  <td
                    className="p-2 lg:p-4 border-r border-gray-200 align-top text-center"
                    rowSpan={variants.length}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span>{attrName}</span>
                      <InsertImgButton
                        imgData={variant.imgData}
                        setImgData={(data) =>
                          handleUpdate(attrName, vIndex, "imgData", data)
                        }
                        width="48px"
                        height="48px"
                        text=""
                      />
                    </div>
                  </td>
                )}

                {/* Cột Size */}
                {hasSize && (
                  <td className="p-2 lg:p-4 border-r border-gray-200 text-center">
                    {variant.size}
                  </td>
                )}

                {/* Cột Giá */}
                <td className="p-2 lg:p-4 border-r border-gray-200">
                  <div className="flex items-center h-10 rounded-sm border border-gray-300 overflow-hidden">
                    <span className="w-10 h-full flex justify-center items-center text-gray-400 text-[14px]">
                      ₫
                    </span>
                    <div className="w-[1px] h-full bg-gray-300"></div>
                    <input
                      type="text"
                      className="w-full h-10 pl-3 pr-3 rounded-sm focus:outline-none focus:border-gray-400"
                      placeholder="Nhập vào"
                      value={variant.price || ""}
                      onChange={(e) =>
                        handleUpdate(
                          attrName,
                          vIndex,
                          "price",
                          e.target.value.replace(/\D/g, ""),
                        )
                      }
                    />
                  </div>
                </td>

                {/* Cột Kho hàng */}
                <td className="p-2 lg:p-4">
                  <input
                    type="text"
                    className="w-full h-10 px-3 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-400"
                    placeholder="Nhập vào"
                    value={variant.stock || ""}
                    onChange={(e) =>
                      handleUpdate(
                        attrName,
                        vIndex,
                        "stock",
                        e.target.value.replace(/\D/g, ""),
                      )
                    }
                  />
                </td>
              </tr>
            ));
          })}
        </tbody>
      </table>
    </div>
  );
}
