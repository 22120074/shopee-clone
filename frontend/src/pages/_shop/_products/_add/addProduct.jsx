import { useState, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import InsertListImgButton from "../../../../components/buttons/insertListImgButton";
import PrimaryDashedButton from "../../../../components/buttons/primaryDashedBttn";
import TextInput from "../../../../components/input/textInput";
import CardAttribute from "../../../../components/shopComponents/cardAttribute";
import PrimaryButton from "../../../../components/buttons/Button";
import TableAttribute from "../../../../components/shopComponents/tableAttribute";
import Stack from "../../../../components/layout/stack";
import VerticalStepProgress from "../../../../components/verticalStepProgress";
import { createProduct } from "../../../../services/shopProduct.service";
import { uploadMultipleImages } from "../../../../services/media.service";
import Spinner from "../../../../components/skeletons/spinnerButton";
import DetailData from "../../../../components/shopComponents/product/detailData";
import useIsWindow from "../../../../hooks/useIsWindow";

const categories = [
  "Thời Trang Nam",
  "Điện Thoại & Phụ Kiện",
  "Thiết Bị Điện Tử",
  "Máy Tính & Laptop",
  "Máy Ảnh & Máy Quay Phim",
  "Đồng Hồ",
  "Giày Dép Nam",
  "Thiết Bị Điện Gia Dụng",
  "Thể Thao & Du Lịch",
  "Ô Tô & Xe Máy & Xe Đạp",
  "Balo & Túi Ví Nam",
  "Đồ Chơi",
  "Chăm Sóc Thú Cưng",
  "Dụng Cụ Và Thiết Bị Tiện Ích",
  "Thời Trang Nữ",
  "Mẹ & Bé",
  "Nhà Cửa & Đời Sống",
  "Sắc Đẹp",
  "Sức Khỏe",
  "Giày Dép Nữ",
  "Túi Ví Nữ",
  "Phụ Kiện & Trang Sức Nữ",
  "Bách Hóa Online",
  "Nhà Sách Online",
  "Thời Trang Trẻ Em",
  "Giặt Giũ & Chăm Sóc Nhà Cửa",
  "Voucher & Dịch Vụ",
];

function syncTable(state) {
  const { attributeList, sizeList, attributeObject: prevObj } = state;
  const newObj = {};

  attributeList.forEach((attr) => {
    const attrName = attr;
    const currentSizeList = sizeList.length > 0 ? sizeList : [""];

    newObj[attrName] = currentSizeList.map((size) => {
      const sizeName = size;
      const existingData = prevObj[attrName]?.find(
        (item) => item.size === sizeName,
      );

      return (
        existingData || {
          size: sizeName,
          price: 0,
          stock: 0,
        }
      );
    });
  });

  return { ...state, attributeObject: newObj };
}

function tableReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD": {
      const val =
        typeof action.payload === "function"
          ? action.payload(state[action.field])
          : action.payload;
      return { ...state, [action.field]: val };
    }
    case "SET_ATTRIBUTE_LIST": {
      const val =
        typeof action.payload === "function"
          ? action.payload(state.attributeList)
          : action.payload;
      return syncTable({ ...state, attributeList: val });
    }
    case "SET_SIZE_LIST": {
      const val =
        typeof action.payload === "function"
          ? action.payload(state.sizeList)
          : action.payload;
      return syncTable({ ...state, sizeList: val });
    }
    case "SET_ATTRIBUTE_OBJECT": {
      const val =
        typeof action.payload === "function"
          ? action.payload(state.attributeObject)
          : action.payload;
      return { ...state, attributeObject: val };
    }
    case "UPDATE_VALUE": {
      const { attrName, index, field, value } = action.payload;
      const updatedVariants = [...(state.attributeObject[attrName] || [])];
      updatedVariants[index] = { ...updatedVariants[index], [field]: value };
      return {
        ...state,
        attributeObject: {
          ...state.attributeObject,
          [attrName]: updatedVariants,
        },
      };
    }
    case "APPLY_ALL": {
      const newObj = { ...state.attributeObject };
      Object.keys(newObj).forEach((attrName) => {
        newObj[attrName] = newObj[attrName].map((variant) => ({
          ...variant,
          price:
            state.price !== undefined && state.price !== ""
              ? state.price
              : variant.price,
          stock:
            state.stock !== undefined && state.stock !== ""
              ? state.stock
              : variant.stock,
        }));
      });
      return { ...state, attributeObject: newObj };
    }
    default:
      return state;
  }
}

export default function AddProduct() {
  const isDesktop = useIsWindow("(min-width: 1024px)");
  const isTablet = useIsWindow("(min-width: 768px) and (max-width: 1023px)");
  const user = useSelector((state) => state.auth.currentUser);

  const steps = [
    "Thông tin cơ bản",
    "Thông tin chi tiết",
    "Thông tin bán hàng",
  ];
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Thông tin cơ bản
  const [imgs, setImgs] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [detail, setDetail] = useState("");

  // Thông tin chi tiết
  const [material, setMaterial] = useState("");
  const [origin, setOrigin] = useState("");
  const [shipFrom, setShipFrom] = useState("");

  // Thông tin bán hàng gom vào useReducer
  const [isOpenAttribute, setOpenAttribute] = useState(false);

  const [tableState, dispatch] = useReducer(tableReducer, {
    attribute: "",
    attributeList: [],
    size: "",
    sizeList: [],
    price: "",
    stock: "",
    attributeObject: {},
  });

  const {
    attribute,
    attributeList,
    size,
    sizeList,
    price,
    stock,
    attributeObject,
  } = tableState;

  const setAttribute = (payload) =>
    dispatch({ type: "SET_FIELD", field: "attribute", payload });
  const setAttributeList = (payload) =>
    dispatch({ type: "SET_ATTRIBUTE_LIST", payload });
  const setSize = (payload) =>
    dispatch({ type: "SET_FIELD", field: "size", payload });
  const setSizeList = (payload) => dispatch({ type: "SET_SIZE_LIST", payload });
  const setPrice = (payload) =>
    dispatch({ type: "SET_FIELD", field: "price", payload });
  const setStock = (payload) =>
    dispatch({ type: "SET_FIELD", field: "stock", payload });
  const setAttributeObject = (payload) =>
    dispatch({ type: "SET_ATTRIBUTE_OBJECT", payload });

  const prepareAttributesForServer = async (attributeData) => {
    // TẠO HÀNG ĐỢI UPLOAD (Mỗi màu chỉ lấy đúng 1 ảnh)
    const uploadQueue = [];
    const seenColors = new Set();

    attributeData.forEach((attr) => {
      if (
        attr.imageUrl &&
        attr.imageUrl.file &&
        !seenColors.has(attr.nameEach)
      ) {
        uploadQueue.push({
          nameEach: attr.nameEach,
          fileObj: attr.imageUrl,
        });
        seenColors.add(attr.nameEach); // Đánh dấu
      }
    });

    // GỌI API UPLOAD
    let uploadedDict = {};

    if (uploadQueue.length > 0) {
      // Truyền mảng fileObj lên Cloudinary
      const response = await uploadMultipleImages(
        uploadQueue.map((item) => item.fileObj),
      );
      const results = response.data.data;

      // Lưu kết quả upload vào từ điển theo tên màu
      uploadQueue.forEach((item, index) => {
        uploadedDict[item.nameEach] = {
          url: results[index].url,
          public_id: results[index].public_id,
        };
      });
    }

    const finalAttributeData = attributeData.map((attr) => {
      let finalUrl = "";
      let finalPublicId = "";

      if (uploadedDict[attr.nameEach]) {
        finalUrl = uploadedDict[attr.nameEach].url;
        finalPublicId = uploadedDict[attr.nameEach].public_id;
      } else if (typeof attr.imageUrl === "string") {
        finalUrl = attr.imageUrl;
      }

      return {
        nameEach: attr.nameEach,
        size: attr.size,
        price: parseFloat(attr.price) || 0,
        stock: parseInt(attr.stock, 10) || 0,
        imageUrl: finalUrl,
        publicId: finalPublicId,
      };
    });

    return finalAttributeData;
  };

  const handlePostData = async () => {
    try {
      setIsLoading(true);
      const productData = {
        name: name,
        attributeName: attribute,
        fromStore: user.userId || user.googleID,
        category: category,
      };
      const detailData = {
        material: material,
        origin: origin,
        shipFrom: shipFrom,
        description: detail,
      };

      const uploadedImgs = await uploadMultipleImages(imgs);
      const imagesData = uploadedImgs.data.data;

      const attributeData = Object.entries(attributeObject).flatMap(
        ([attrName, variants]) =>
          variants.map((variant) => ({
            nameEach: attrName,
            size: variant.size,
            price: parseFloat(variant.price) || 0,
            stock: parseInt(variant.stock, 10) || 0,
            imageUrl: variant.imgData || "",
          })),
      );
      const finalAttributes = await prepareAttributesForServer(attributeData);
      const payload = {
        product: productData,
        imagesData: imagesData,
        detail: detailData,
        attributes: finalAttributes,
      };
      const response = await createProduct(payload);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let step = 0;

    // Check Step 1: Thông tin cơ bản
    const isStep1Valid =
      imgs.length > 0 &&
      name.trim() !== "" &&
      category.trim() !== "" &&
      detail.trim() !== "";
    if (isStep1Valid) step = 1;

    // Check Step 2: Thông tin chi tiết
    const isStep2Valid =
      isStep1Valid &&
      material.trim() !== "" &&
      origin.trim() !== "" &&
      shipFrom.trim() !== "";
    if (isStep2Valid) step = 2;

    // Check Step 3: Thông tin bán hàng
    let isStep3Valid = false;
    if (isStep2Valid && Object.keys(attributeObject).length > 0) {
      isStep3Valid = Object.values(attributeObject).every((variants) =>
        variants.every((v) => Number(v.price) > 0 && Number(v.stock) > 0),
      );
    }
    if (isStep3Valid) step = 3;

    setCurrentStep(step);
  }, [
    imgs,
    name,
    category,
    detail,
    material,
    origin,
    shipFrom,
    attributeObject,
  ]);

  const handleApplyAll = () => {
    if (!price && !stock) return;
    dispatch({ type: "APPLY_ALL" });
  };

  return (
    <div
      className="relative w-full h-auto bg-backgroundGrayColor 
      grid grid-cols-1 lg:grid-cols-10 gap-2 p-2 md:p-4 lg:p-8 items-start"
    >
      {/* Nội dung chính */}
      <main className="lg:col-span-8 flex flex-col gap-2">
        {/* ----------------------- Thông tin cơ bản ----------------------- */}
        <section className="bg-white border border-2 border-lesslessgrayColor p-4 rounded-sm">
          <h1 className="text-xl font-medium mb-2 md:mb-4 lg:mb-8">
            Thông tin cơ bản
          </h1>
          <div className="w-full grid grid-cols-1 gap-y-2 lg:grid-cols-[160px_1fr] lg:gap-y-6">
            <label
              htmlFor="imgs"
              className="flex items-start pt-1 justify-start lg:justify-end text-md"
            >
              <span className="text-red-500">*</span>
              Hình ảnh sản phẩm
            </label>
            <div className="flex flex-row flex-wrap gap-4 lg:pl-4 items-center">
              {Array.isArray(imgs) &&
                imgs.map((img, idx) => (
                  <div
                    key={idx}
                    className="group w-[80px] h-[80px] border border-gray-200 rounded-sm 
                    overflow-hidden relative"
                  >
                    <img
                      src={img.preview}
                      alt={`product-${idx}`}
                      className="w-full h-full object-cover"
                    />
                    {/* Nút xóa ảnh */}
                    <div
                      className="absolute top-0 right-0 hidden group-hover:flex items-center justify-center 
                      w-6 h-6 bg-gray-200/70 rounded-bl-sm cursor-pointer hover:bg-lessgrayColor"
                      onClick={() =>
                        setImgs((prev) => prev.filter((_, i) => i !== idx))
                      }
                    >
                      <i className="fa-solid fa-trash text-primaryColor text-xs"></i>
                    </div>
                  </div>
                ))}
              <InsertListImgButton imgs={imgs} setImgs={setImgs} limit={9} />
            </div>
            {/* ------------- Tên sản phẩm ------------- */}
            <label
              htmlFor="name"
              className="flex items-center justify-start lg:justify-end text-md"
            >
              <span className="text-red-500">*</span>
              Tên sản phẩm
            </label>
            <div className="relative lg:ml-4">
              <textarea
                id="name"
                rows={1}
                className="w-full border border-gray-300 rounded-sm p-2 pr-14 focus:outline-none 
                text-[15px] text-dark resize-none overflow-hidden min-h-[40px]"
                value={name}
                onInput={(e) => {
                  e.target.style.height = "40px";
                  e.target.style.height = e.target.scrollHeight + "px";
                }}
                onChange={(e) => setName(e.target.value)}
                maxLength={120}
                placeholder="Nhập vào"
              />
              <span className="absolute right-2 top-5 -translate-y-1/2 text-[13px] text-gray-400">
                {name.length}/120
              </span>
            </div>
            {/* ------------- Ngành hàng ------------- */}
            <label
              htmlFor="category"
              className="flex items-center justify-start lg:justify-end text-md"
            >
              <span className="text-red-500">*</span>
              Ngành hàng
            </label>
            <div className="relative lg:ml-4">
              <select
                id="category"
                className="w-full min-h-[40px] border border-gray-300 rounded-sm p-2 pr-10 focus:outline-none
                 text-[15px] text-dark appearance-none cursor-pointer bg-white"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled>
                  Chọn ngành hàng
                </option>
                {categories.map((category, i) => (
                  <option key={i} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <i
                className="fa-solid fa-pencil absolute right-3 top-1/2 -translate-y-1/2 
                text-gray-400 pointer-events-none text-[13px]"
              ></i>
            </div>
            {/* ------------- Mô tả sản phẩm ------------- */}
            <label
              htmlFor="detail"
              className="flex items-start justify-start lg:justify-end text-md pt-2"
            >
              <span className="text-red-500">*</span>
              Mô tả sản phẩm
            </label>
            <div className="relative lg:ml-4">
              <textarea
                id="detail"
                rows={8}
                className="w-full border border-gray-300 rounded-sm p-3 pb-8 focus:outline-none 
                text-[15px] text-dark resize-y min-h-[50px] max-h-[200px] 
                md:min-h-[200px] md:max-h-[300px] lg:min-h-[300px] lg:max-h-[500px] overflow-y-auto"
                value={detail}
                onInput={(e) => {
                  e.target.style.height = "150px";
                  e.target.style.height = e.target.scrollHeight + "px";
                }}
                onChange={(e) => setDetail(e.target.value)}
                maxLength={3000}
              />
              <span className="absolute right-3 bottom-3 text-[13px] text-gray-400 bg-white">
                {detail.length}/3000
              </span>
            </div>
          </div>
        </section>
        {/* ----------------------- Thông tin chi tiết ----------------------- */}
        <DetailData
          material={material}
          setMaterial={setMaterial}
          origin={origin}
          setOrigin={setOrigin}
          shipFrom={shipFrom}
          setShipFrom={setShipFrom}
        />
        {/* ----------------------- Thông tin bán hàng ----------------------- */}
        <section className="bg-white border border-2 border-lesslessgrayColor p-4 rounded-sm">
          <h1 className="text-xl font-medium">Thông tin bán hàng</h1>
          <p className="text-red-500 mb-2 md:mb-4 lg:mb-8">
            Bạn phải thêm ít nhất 1 phân loại hàng!
          </p>
          <div className="w-full grid grid-cols-1 lg:grid-cols-[140px_minmax(0,1fr)] gap-2 md:gap-4 lg:gap-6">
            <label
              className={`flex items-start pt-1 justify-start lg:justify-end text-md`}
            >
              Phân loại hàng
            </label>
            <div className="flex-1 relative">
              {isOpenAttribute ? (
                <CardAttribute
                  index={0}
                  attribute={attribute}
                  attributeList={attributeList}
                  size={size}
                  sizeList={sizeList}
                  setAttribute={setAttribute}
                  setAttributeList={setAttributeList}
                  setSize={setSize}
                  setSizeList={setSizeList}
                  setOpenAttribute={setOpenAttribute}
                />
              ) : (
                <PrimaryDashedButton
                  width="200px"
                  text={"Thêm nhóm phân loại"}
                  onClick={() => setOpenAttribute((prev) => !prev)}
                >
                  <i className="fa-solid fa-plus"></i>
                </PrimaryDashedButton>
              )}
            </div>
            {isOpenAttribute && (
              <>
                <label className="flex items-start pt-1 justify-start lg:justify-end text-md lg:text-right">
                  Danh sách phân loại
                </label>
                <Stack spacing={2} alignItems="start" justifyContent="start">
                  <div className="flex items-center h-9 rounded-sm">
                    <span
                      className="w-9 h-full flex justify-center items-center text-gray-400 text-[14px] 
                    border border-gray-300 border-r-transparent flex-shrink-0"
                    >
                      ₫
                    </span>
                    <div className="w-[1px] h-full bg-gray-300"></div>
                    <input
                      type="text"
                      id="price"
                      className="flex-1 min-w-0 h-full p-2 focus:outline-none text-[14px] text-dark 
                      bg-transparent border-y border-gray-300"
                      value={price}
                      onChange={(e) =>
                        setPrice(e.target.value.replace(/\D/g, ""))
                      }
                      placeholder="Giá"
                    />
                    <div className="w-[1px] h-full bg-gray-300"></div>
                    <input
                      type="text"
                      id="stock"
                      className="flex-1 min-w-0 h-full p-2 focus:outline-none text-[14px] text-dark bg-transparent 
                      border border-gray-300 border-l-transparent mr-2"
                      value={stock}
                      onChange={(e) =>
                        setStock(e.target.value.replace(/\D/g, ""))
                      }
                      placeholder="Kho hàng"
                    />
                    <PrimaryButton
                      width={isDesktop ? "300px" : isTablet ? "200px" : "120px"}
                      height="36px"
                      onClick={handleApplyAll}
                    >
                      <span>
                        {isDesktop
                          ? "Áp dụng cho tất cả các phân loại"
                          : isTablet
                            ? "Áp dụng cho tất cả"
                            : "Áp dụng"}
                      </span>
                    </PrimaryButton>
                  </div>
                  <TableAttribute
                    attributeObject={attributeObject}
                    setAttributeObject={setAttributeObject}
                  />
                </Stack>
              </>
            )}
          </div>
        </section>
      </main>
      {/* Progress sidebar */}
      <aside
        className="lg:col-span-2 bg-white rounded-sm p-2 sticky top-4 right-0
        flex flex-col border border-2 border-lesslessgrayColor"
      >
        <VerticalStepProgress currentStep={currentStep} steps={steps} />
        <PrimaryButton
          text={"Lưu sản phẩm"}
          width="100%"
          height="36px"
          onClick={handlePostData}
          disabled={currentStep !== 3}
        >
          <div
            className={`absolute top-0 left-0 w-full h-full flex items-center justify-center
            ${isLoading ? "bg-white/50" : "hidden"}`}
          >
            <Spinner
              size={"30px"}
              stroke={"5px"}
              _hidden={!isLoading ? "hidden" : ""}
              color={"white"}
            />
          </div>
        </PrimaryButton>
      </aside>
    </div>
  );
}
