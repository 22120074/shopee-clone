import TextInput from "../../input/textInput";

export default function DetailData({
  material,
  setMaterial,
  origin,
  setOrigin,
  shipFrom,
  setShipFrom,
}) {
  return (
    <section className="bg-white border border-2 border-lesslessgrayColor p-4 rounded-sm">
      <h1 className="text-xl font-medium mb-2 md:mb-4 lg:mb-8">
        Thông tin chi tiết
      </h1>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-x-12 lg:gap-y-6">
        <TextInput
          id="material"
          textLabel="Chất liệu"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
          placeholder="Nhập vào"
        />
        <TextInput
          id="origin"
          textLabel="Xuất xứ"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          placeholder="Nhập vào"
        />
        <TextInput
          id="shipFrom"
          textLabel="Gửi từ"
          value={shipFrom}
          onChange={(e) => setShipFrom(e.target.value)}
          placeholder="Nhập vào"
        />
      </div>
    </section>
  );
}
