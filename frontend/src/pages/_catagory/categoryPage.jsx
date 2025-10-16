import CarouselSlider from "../../components/CarouselSlide";
import { useParams } from "react-router-dom";

function CategoryPage() {
    const { categoryName } = useParams();

    // Ảnh quảng cáo của danh mục
    const images = [
        {
            name: 'Thời Trang Nam',
            images: [
                'https://cf.shopee.vn/file/vn-50009109-727a24a85a60935da5ccb9008298f681',
                'https://cf.shopee.vn/file/vn-11134258-7ra0g-m94aqg6gzyx34d'
            ]
        },
        {
            name: 'Điện Thoại & Phụ Kiện',
            images: [
                'https://cf.shopee.vn/file/vn-50009109-727a24a85a60935da5ccb9008298f681',
                'https://cf.shopee.vn/file/vn-11134258-7ra0g-ma42w9lgb4sr90',
                'https://cf.shopee.vn/file/vn-11134258-7ra0g-m8zocsz5aute02',
                'https://cf.shopee.vn/file/vn-11134258-7ra0g-m8zojffmb3us4d',
                'https://cf.shopee.vn/file/vn-11134258-7ra0g-m9077bo3r610f7',
                'https://cf.shopee.vn/file/vn-11134258-7ra0g-ma4deidznzhtcc',
                'https://cf.shopee.vn/file/vn-11134258-7ra0g-ma2meva6u3b81b',
                'https://cf.shopee.vn/file/vn-11134258-7ra0g-m8zo73nrpttw16',
                'https://cf.shopee.vn/file/vn-11134258-7ra0g-m8zobbdxoknb59',
                'https://cf.shopee.vn/file/vn-11134258-7ra0g-m907auutmq9a94',
                'https://cf.shopee.vn/file/vn-11134258-7ra0g-m9zagznfq8uc90'
            ]
        },
        {
            name: 'Thiết Bị Điện Tử',
            images: [
                'https://cf.shopee.vn/file/vn-50009109-727a24a85a60935da5ccb9008298f681',
                'https://cf.shopee.vn/file/vn-11134258-7ra0g-ma7zhoxnymir5b',
                'https://cf.shopee.vn/file/vn-11134258-7ra0g-m944ang8gkg762',
                'https://cf.shopee.vn/file/vn-11134258-7ra0g-m944d9dp096q50',
                'https://cf.shopee.vn/file/vn-11134258-7ra0g-m945kd783rt3e6',
                'https://cf.shopee.vn/file/vn-11134258-7ra0g-m9zagznfq8uc90'
            ]
        },
        {
            name: 'Máy Tính & Laptop',
            images: [
                'https://cf.shopee.vn/file/vn-50009109-727a24a85a60935da5ccb9008298f681',
                'https://cf.shopee.vn/file/vn-11134258-7ra0g-m8znwcyjlv2a55',
                'https://cf.shopee.vn/file/vn-11134258-7ra0g-m8zo26b1kcxu6a',
                'https://cf.shopee.vn/file/vn-11134258-7ra0g-ma2fhr8af0qq9b',
                'https://cf.shopee.vn/file/vn-11134258-7ra0g-ma2fjnpu6xymf6',
                'https://cf.shopee.vn/file/vn-11134258-7ra0g-m945ckgkxmcu96'
            ]
        },
        {
            name: 'Máy Ảnh & Máy Quay Phim',
            images: [
                'https://cf.shopee.vn/file/vn-50009109-727a24a85a60935da5ccb9008298f681',
                'https://cf.shopee.vn/file/vn-11134258-7ra0g-ma42rjg56kqv74'
            ]
        },
        {
            name: 'Đồng Hồ',
            images: [
                'https://cf.shopee.vn/file/vn-50009109-727a24a85a60935da5ccb9008298f681',
                'https://cf.shopee.vn/file/vn-11134258-7ra0g-m93x3xwpqpaa6d'
            ]
        },
        {
            name: 'Giày Dép Nam',
            images: [
                'https://cf.shopee.vn/file/vn-50009109-727a24a85a60935da5ccb9008298f681',
                'https://cf.shopee.vn/file/vn-11134258-7ra0g-m93x2gqhihrib5'
            ]
        },
        {
            name: 'Thiết Bị Điện Gia Dụng',
            images: [
                'https://cf.shopee.vn/file/vn-50009109-727a24a85a60935da5ccb9008298f681',
                'https://cf.shopee.vn/file/vn-11134258-7ra0g-m9454jrbey6a4d',
                'https://cf.shopee.vn/file/vn-11134258-7ra0g-ma2flo3scax085',
                'https://cf.shopee.vn/file/vn-11134258-7ra0g-ma2fnudfq79g6c',
                'https://cf.shopee.vn/file/vn-11134258-7ra0g-m8zoi2wpbgxa65',
            ]
        },
        {
            name: 'Thể Thao & Du Lịch',
            images: [
                'https://cf.shopee.vn/file/vn-50009109-727a24a85a60935da5ccb9008298f681',
                'https://cf.shopee.vn/file/vn-11134258-7ra0g-m93wsowsd8w452',
            ]
        },
        {
            name: 'Ô Tô & Xe Máy & Xe Đạp',
            images: [
                'https://cf.shopee.vn/file/vn-50009109-727a24a85a60935da5ccb9008298f681',
            ]
        },
        {
            name: 'Balo & Túi Ví Nam',
            images: [
                'https://cf.shopee.vn/file/vn-50009109-727a24a85a60935da5ccb9008298f681',
                'https://cf.shopee.vn/file/vn-11134258-7ra0g-m94b95961a4n22',
            ]
        },
        {
            name: 'Đồ Chơi',
            images: [
                'https://cf.shopee.vn/file/vn-50009109-727a24a85a60935da5ccb9008298f681',
            ]
        },
        {
            name: 'Chăm Sóc Thú Cưng',
            images: [
                'https://cf.shopee.vn/file/vn-50009109-727a24a85a60935da5ccb9008298f681',
            ]
        },
        {
            name: 'Dụng Cụ Và Thiết Bị Tiện Ích',
            images: [
                'https://cf.shopee.vn/file/vn-50009109-727a24a85a60935da5ccb9008298f681',
            ]
        },
        {
            name: 'Thời Trang Nữ',
            images: [
                'https://cf.shopee.vn/file/vn-50009109-727a24a85a60935da5ccb9008298f681',
                'https://cf.shopee.vn/file/vn-11134258-7ra0g-m93wptptdnya4f',
                'https://cf.shopee.vn/file/vn-11134258-7ra0g-m94aomn6wj9e57'
            ]
        },
        {
            name: 'Mẹ & Bé',
            images: [
                'https://cf.shopee.vn/file/vn-50009109-727a24a85a60935da5ccb9008298f681',
            ]
        },
        {
            name: 'Nhà Cửa & Đời Sống',
            images: [
                'https://cf.shopee.vn/file/vn-50009109-727a24a85a60935da5ccb9008298f681',
            ]
        },
        {
            name: 'Sắc Đẹp',
            images: [
                'https://cf.shopee.vn/file/vn-50009109-727a24a85a60935da5ccb9008298f681',
                'https://cf.shopee.vn/file/vn-11134258-7ra0g-ma0yase23k7u5b'
            ]
        },
        {
            name: 'Sắc Đẹp',
            images: [
                'https://cf.shopee.vn/file/vn-50009109-727a24a85a60935da5ccb9008298f681',
                'https://cf.shopee.vn/file/vn-11134258-7ra0g-ma0yase23k7u5b'
            ]
        },
        {
            name: 'Sức Khỏe',
            images: [
                'https://cf.shopee.vn/file/vn-50009109-727a24a85a60935da5ccb9008298f681',
            ]
        },
        {
            name: 'Giày Dép Nữ',
            images: [
                'https://cf.shopee.vn/file/vn-50009109-727a24a85a60935da5ccb9008298f681',
                'https://cf.shopee.vn/file/vn-11134258-7ra0g-m94b7mku0bwkcd'
            ]
        },
        {
            name: 'Túi Ví Nữ',
            images: [
                'https://cf.shopee.vn/file/vn-50009109-727a24a85a60935da5ccb9008298f681',
                'https://cf.shopee.vn/file/vn-11134258-7ra0g-m93wveldf43rbf'
            ]
        },
        {
            name: 'TPhụ Kiện Và Trang Sức Nữ',
            images: [
                'https://cf.shopee.vn/file/vn-50009109-727a24a85a60935da5ccb9008298f681',
                'https://cf.shopee.vn/file/vn-11134258-7ra0g-m93x587fzn9e36'
            ]
        },
        {
            name: 'Bách Hóa Online',
            images: [
                'https://cf.shopee.vn/file/vn-50009109-727a24a85a60935da5ccb9008298f681',
            ]
        },
        {
            name: 'Nhà Sách Online',
            images: [
                'https://cf.shopee.vn/file/vn-50009109-727a24a85a60935da5ccb9008298f681',
            ]
        },
        {
            name: 'Thời Trang Trẻ Em',
            images: [
                'https://cf.shopee.vn/file/vn-50009109-727a24a85a60935da5ccb9008298f681',
                'https://cf.shopee.vn/file/vn-11134258-7ra0g-m94b60qqomtecf'
            ]
        },
                {
            name: 'Giặt Giũ & Chăm Sóc Nhà Cửa',
            images: [
                'https://cf.shopee.vn/file/vn-50009109-727a24a85a60935da5ccb9008298f681',
            ]
        },
        {
            name: 'Voucher & Dịch Vụ',
            images: [
                'https://cf.shopee.vn/file/vn-50009109-727a24a85a60935da5ccb9008298f681',
            ]
        }
    ];

    const category = images.find(img => img.name === categoryName);

    return (
        <div className="flex flex-col items-center bg-backgroundGrayColor w-full pt-8">
            <CarouselSlider images={category ? category.images : []} width={'1200px'} height={'360px'} />
        </div>
    );
};
export default CategoryPage;