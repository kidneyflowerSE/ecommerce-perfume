import React, { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import axios from "axios";

const ListProduct = () => {

    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    const storedBrands = localStorage.getItem("brands");
    if (storedProducts && storedBrands) {
      setProducts(JSON.parse(storedProducts)); 
      setBrands(JSON.parse(storedBrands)); 
      setLoading(false);
    } else {
      Promise.all([
        axios.get("http://localhost:8080/api/products"),
        axios.get("http://localhost:8080/api/brands")
      ])
      .then(([productsResponse, brandsResponse]) => {
        const productsData = productsResponse.data;
        const brandsData = brandsResponse.data;

        setProducts(productsData);
        setBrands(brandsData);

        localStorage.setItem("products", JSON.stringify(productsData));
        localStorage.setItem("brands", JSON.stringify(brandsData));
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message || "Có lỗi xảy ra!");
          setLoading(false);
        });
    }
  }, []);
    //   console.log(products);
    // console.log(brands);

    // const brand = brands.find((b) => b.id === products.brandid)
    // console.log(brand)

    return (
        <div className="grid grid-cols-4 gap-4">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="relative border-2 rounded p-2 flex flex-col cursor-pointer group"
                >
                    <div className="p-2">
                        {/* <img src={product.imageUrl} alt={product.name} /> */}
                        <img src="/assets/2.jpg" alt="Product" className="rounded object-cover w-full h-50" />
                    </div>
                    <div className="flex flex-col w-full justify-center items-center p-4">
                        <h2 className="tracking-wider font-semibold truncate w-60">{product.name}</h2>
                        <span className="my-2 text-xl">{product.price}</span>
                        <span className="text-xs font-light justify-between w-full flex my-1">
                           {(product.brand && (
                             <span className="bg-slate-200 p-2 rounded">Xuất xứ: {product.brand.country}</span>
                           ))}
                            <span className="bg-red-500 p-2 rounded text-white">2178</span>
                                <span className="absolute bottom-0 left-0 w-full h-1 bg-black transition-all rounded-b duration-300 opacity-0 group-hover:opacity-100" />
                        </span>
                    </div>
                </div>
            ))}

            {/* <div className="relative border-2 rounded p-2 flex flex-col cursor-pointer group">
                <div className="p-2">
                    <img src="/assets/2.jpg" alt="Product" className="rounded object-cover w-full h-50" />
                </div>
                <div className="flex flex-col w-full justify-center items-center p-4">
                    <h2 className="tracking-wider font-semibold truncate w-60">Louis Vuitton Eau de Parfum</h2>
                    <span className="my-2 text-xl">5 500 000 VNĐ</span>
                    <span className="text-xs font-light justify-between w-full flex my-1">
                        <span className="bg-slate-200 p-2 rounded">Xuất sứ: Pháp</span>
                        <span className="bg-red-500 p-2 rounded text-white">Đã bán: 2147</span>
                    </span>
                </div>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-black transition-all rounded-b duration-300 opacity-0 group-hover:opacity-100" />
            </div> */}
            {/* <div className="relative border-2 rounded p-2 flex flex-col cursor-pointer group">
                <div className="p-2">
                    <img src="/assets/2.jpg" alt="Product" className="rounded object-cover w-full h-50" />
                </div>
                <div className="flex flex-col w-full justify-center items-center p-4">
                    <h2 className="tracking-wider font-semibold truncate w-60">Louis Vuitton Eau de Parfum</h2>
                    <span className="my-2 text-xl">5 500 000 VNĐ</span>
                    <span className="text-xs font-light justify-between w-full flex my-1">
                        <span className="bg-slate-200 p-2 rounded">Xuất sứ: Pháp</span>
                        <span className="bg-red-500 p-2 rounded text-white">Đã bán: 2147</span>
                    </span>
                </div>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-black transition-all rounded-b duration-300 opacity-0 group-hover:opacity-100" />
            </div>
            <div className="relative border-2 rounded p-2 flex flex-col cursor-pointer group">
                <div className="p-2">
                    <img src="/assets/2.jpg" alt="Product" className="rounded object-cover w-full h-50" />
                </div>
                <div className="flex flex-col w-full justify-center items-center p-4">
                    <h2 className="tracking-wider font-semibold truncate w-60">Louis Vuitton Eau de Parfum</h2>
                    <span className="my-2 text-xl">5 500 000 VNĐ</span>
                    <span className="text-xs font-light justify-between w-full flex my-1">
                        <span className="bg-slate-200 p-2 rounded">Xuất sứ: Pháp</span>
                        <span className="bg-red-500 p-2 rounded text-white">Đã bán: 2147</span>
                    </span>
                </div>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-black transition-all rounded-b duration-300 opacity-0 group-hover:opacity-100" />
            </div>
            <div className="relative border-2 rounded p-2 flex flex-col cursor-pointer group">
                <div className="p-2">
                    <img src="/assets/2.jpg" alt="Product" className="rounded object-cover w-full h-50" />
                </div>
                <div className="flex flex-col w-full justify-center items-center p-4">
                    <h2 className="tracking-wider font-semibold truncate w-60">Louis Vuitton Eau de Parfum</h2>
                    <span className="my-2 text-xl">5 500 000 VNĐ</span>
                    <span className="text-xs font-light justify-between w-full flex my-1">
                        <span className="bg-slate-200 p-2 rounded">Xuất sứ: Pháp</span>
                        <span className="bg-red-500 p-2 rounded text-white">Đã bán: 2147</span>
                    </span>
                </div>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-black transition-all rounded-b duration-300 opacity-0 group-hover:opacity-100" />
            </div>
            <div className="relative border-2 rounded p-2 flex flex-col cursor-pointer group">
                <div className="p-2">
                    <img src="/assets/2.jpg" alt="Product" className="rounded object-cover w-full h-50" />
                </div>
                <div className="flex flex-col w-full justify-center items-center p-4">
                    <h2 className="tracking-wider font-semibold truncate w-60">Louis Vuitton Eau de Parfum</h2>
                    <span className="my-2 text-xl">5 500 000 VNĐ</span>
                    <span className="text-xs font-light justify-between w-full flex my-1">
                        <span className="bg-slate-200 p-2 rounded">Xuất sứ: Pháp</span>
                        <span className="bg-red-500 p-2 rounded text-white">Đã bán: 2147</span>
                    </span>
                </div>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-black transition-all rounded-b duration-300 opacity-0 group-hover:opacity-100" />
            </div>
            <div className="relative border-2 rounded p-2 flex flex-col cursor-pointer group">
                <div className="p-2">
                    <img src="/assets/2.jpg" alt="Product" className="rounded object-cover w-full h-50" />
                </div>
                <div className="flex flex-col w-full justify-center items-center p-4">
                    <h2 className="tracking-wider font-semibold truncate w-60">Louis Vuitton Eau de Parfum</h2>
                    <span className="my-2 text-xl">5 500 000 VNĐ</span>
                    <span className="text-xs font-light justify-between w-full flex my-1">
                        <span className="bg-slate-200 p-2 rounded">Xuất sứ: Pháp</span>
                        <span className="bg-red-500 p-2 rounded text-white">Đã bán: 2147</span>
                    </span>
                </div>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-black transition-all rounded-b duration-300 opacity-0 group-hover:opacity-100" />
            </div> */}
        </div>
    );
};

export default ListProduct;
