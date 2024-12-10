import React from "react";

const Filter = () => {
    return (
        <div className="h-fit w-fit border-2 bg-gray-100 flex flex-col p-4 pr-24 rounded">
            <h1 className="tracking-wider font-bold">Bộ lọc</h1>
            <div className="mt-2">
                <h2 className="mt-2">Giá</h2>
                <div className="mt-2 ml-6">
                    <label className="flex">
                        <input type="radio" name="price" value="0" />
                        <span className="ml-2">Dưới 1 triệu</span>
                    </label>
                    <label className="flex">
                        <input type="radio" name="price" value="0" />
                        <span className="ml-2">1 - 2 triệu</span>
                    </label>
                    <label className="flex">
                        <input type="radio" name="price" value="0" />
                        <span className="ml-2">Dưới 2 - 5 triệu</span>
                    </label>
                    <label className="flex">
                        <input type="radio" name="price" value="0" />
                        <span className="ml-2">Trên 5 triệu</span>
                    </label>
                </div>
            </div>
            <div className="mt-2">
                <h2 className="mt-2">Brand</h2>
                <div className="mt-2 ml-6">
                    <label className="flex">
                        <input type="radio" name="price" value="0" />
                        <span className="ml-2">LV</span>
                    </label>
                    <label className="flex">
                        <input type="radio" name="price" value="0" />
                        <span className="ml-2">Clive</span>
                    </label>
                    <label className="flex">
                        <input type="radio" name="price" value="0" />
                        <span className="ml-2">Tom Ford</span>
                    </label>
                    <label className="flex">
                        <input type="radio" name="price" value="0" />
                        <span className="ml-2">Le Labo</span>
                    </label>
                    <label className="flex">
                        <input type="radio" name="price" value="0" />
                        <span className="ml-2">Roja</span>
                    </label>
                </div>
            </div>
            <div className="mt-2">
                <h2 className="mt-2">Quốc gia sản xuất</h2>
                <div className="mt-2 ml-6">
                    <label className="flex">
                        <input type="radio" name="price" value="0" />
                        <span className="ml-2">Pháp</span>
                    </label>
                    <label className="flex">
                        <input type="radio" name="price" value="0" />
                        <span className="ml-2">Mỹ</span>
                    </label>
                    <label className="flex">
                        <input type="radio" name="price" value="0" />
                        <span className="ml-2">Anh</span>
                    </label>
                    <label className="flex">
                        <input type="radio" name="price" value="0" />
                        <span className="ml-2">Việt Nam</span>
                    </label>
                </div>
            </div>

        </div>
    )
};
export default Filter;