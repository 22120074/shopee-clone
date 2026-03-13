import { useState } from "react";
import CountLengthInput from "../input/countlengthInput";
import PrimaryDashedButton from "../buttons/primaryDashedBttn";
import Stack from "../layout/stack";

export default function CardAttribute({
  attribute,
  attributeList,
  size,
  sizeList,
  setAttribute,
  setAttributeList,
  setSize,
  setSizeList,
  setOpenAttribute,
}) {
  const [isOpenSize, setIsOpenSize] = useState(false);

  const handleAttributeListChange = (i, newValue) => {
    const newList = [...attributeList];
    if (i >= newList.length) {
      if (newValue !== "") {
        newList.push(newValue);
      }
    } else {
      newList[i] = newValue;
    }
    setAttributeList(newList);
  };

  const handleSizeListChange = (i, newValue) => {
    const newList = [...sizeList];
    if (i >= newList.length) {
      if (newValue !== "") {
        newList.push(newValue);
      }
    } else {
      newList[i] = newValue;
    }
    setSizeList(newList);
  };

  const handleRemoveAttributeListItem = (indexToRemove) => {
    const newList = attributeList.filter((_, i) => i !== indexToRemove);
    setAttributeList(newList);
  };

  const handleRemoveSizeListItem = (indexToRemove) => {
    const newList = sizeList.filter((_, i) => i !== indexToRemove);
    setSizeList(newList);
  };

  const handleRemoveAttribute = () => {
    if (isOpenSize) {
      setAttribute(size);
      setAttributeList(sizeList);
      setSize("");
      setSizeList([]);
      setIsOpenSize(false);
    } else {
      setAttribute("");
      setAttributeList([]);
      if (setOpenAttribute) setOpenAttribute(false);
    }
  };

  const handleRemoveSize = () => {
    setSize("");
    setSizeList([]);
    setIsOpenSize(false);
  };

  return (
    <>
      <div
        className="w-full grid grid-cols-[90px_1fr] md:grid-cols-[140px_1fr] bg-lesslessgrayColor p-4 rounded-sm
        justify-center items-start gap-2 mb-2"
      >
        <label
          htmlFor="attribute"
          className="flex items-start justify-start pt-1 text-md text-black"
        >
          Nhóm phân loại 1
        </label>
        <Stack
          direction="row"
          spacing={2}
          alignItems={"center"}
          justifyContent={"flex-start"}
        >
          <CountLengthInput
            id="attribute"
            value={attribute || ""}
            onChange={(e) => setAttribute(e.target.value)}
            maxLength={14}
            className="flex-1"
          />
          <i
            className="fa-solid fa-xmark w-auto h-full pt-1 text-xl cursor-pointer hover:text-red-500"
            onClick={handleRemoveAttribute}
          ></i>
        </Stack>
        <label
          htmlFor="attributeList"
          className="flex items-start justify-start pt-1 text-md text-black flex-shrink-0"
        >
          Phân loại hàng
        </label>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2 justify-center items-start">
          {(() => {
            const arr = [...attributeList];
            if (arr.length === 0 || arr[arr.length - 1] !== "") {
              arr.push("");
            }
            return arr.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <CountLengthInput
                  id={`attributeList-${i}`}
                  value={item || ""}
                  onChange={(e) => handleAttributeListChange(i, e.target.value)}
                  maxLength={20}
                  className="flex-1 !ml-0"
                />
                <i
                  className="fa-regular fa-trash-can text-gray-400 cursor-pointer hover:text-red-500"
                  onClick={() => handleRemoveAttributeListItem(i)}
                ></i>
              </div>
            ));
          })()}
        </div>
      </div>
      {!isOpenSize ? (
        <div
          className="w-full grid grid-cols-[90px_1fr] md:grid-cols-[140px_1fr] bg-lesslessgrayColor p-4 rounded-sm
        justify-center items-start gap-2"
        >
          <label className="flex items-start justify-start pt-1 text-md text-black">
            Nhóm phân loại 2
          </label>
          <PrimaryDashedButton
            width="200px"
            text={"Thêm nhóm phân loại"}
            onClick={() => setIsOpenSize(true)}
          >
            <i className="fa-solid fa-plus"></i>
          </PrimaryDashedButton>
        </div>
      ) : (
        <div
          className="w-full grid grid-cols-[90px_1fr] md:grid-cols-[140px_1fr] bg-lesslessgrayColor p-4 rounded-sm
        justify-center items-start gap-2 mt-4"
        >
          <label
            htmlFor="size"
            className="flex items-start justify-start pt-1 text-md text-black"
          >
            Nhóm phân loại 2
          </label>
          <Stack
            direction="row"
            spacing={2}
            alignItems={"center"}
            justifyContent={"flex-start"}
          >
            <CountLengthInput
              id="size"
              value={size || ""}
              onChange={(e) => setSize(e.target.value)}
              maxLength={14}
              className="flex-1"
            />
            <i
              className="fa-solid fa-xmark w-auto h-full pt-1 text-xl cursor-pointer hover:text-red-500"
              onClick={handleRemoveSize}
            ></i>
          </Stack>
          <label
            htmlFor="sizeList"
            className="flex items-start justify-start pt-1 text-md text-black flex-shrink-0"
          >
            Phân loại hàng
          </label>
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2 justify-center items-start">
            {(() => {
              const arr = [...sizeList];
              if (arr.length === 0 || arr[arr.length - 1] !== "") {
                arr.push("");
              }
              return arr.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CountLengthInput
                    id={`sizeList-${i}`}
                    value={item || ""}
                    onChange={(e) => handleSizeListChange(i, e.target.value)}
                    maxLength={20}
                    className="flex-1 !ml-0"
                  />
                  <i
                    className="fa-regular fa-trash-can text-gray-400 cursor-pointer hover:text-red-500"
                    onClick={() => handleRemoveSizeListItem(i)}
                  ></i>
                </div>
              ));
            })()}
          </div>
        </div>
      )}
    </>
  );
}
