package ecommerce.Perfume.service;

import ecommerce.Perfume.dto.request.BrandCreation;
import ecommerce.Perfume.model.Brand;
import ecommerce.Perfume.repository.BrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrandService {

    @Autowired
    private BrandRepository brandRepository;

    //tạo thương hiệu mới
    public Brand createBrand(BrandCreation request) {
        Brand brand = new Brand();

        brand.setName(request.getName());
        brand.setDescription(request.getDescription());
        brand.setCountry(request.getCountry());

        return brandRepository.save(brand);
    }

    //lấy danh sách thương hiệu
    public List<Brand> getAllBrands() {
        return brandRepository.findAll();
    }

    //lấy thương hiệu theo id
    public Brand getBrandById(Integer id) {
        return brandRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Brand not found with ID: " + id));
    }

    //cập nhật thương hiệu
    public Brand updateBrand(Integer id, Brand brandDetails) {
        Brand existingBrand = brandRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Brand not found with ID: " + id));

        existingBrand.setName(brandDetails.getName());
        existingBrand.setDescription(brandDetails.getDescription());
        return brandRepository.save(existingBrand);
    }

    //xoá thương hiệu
    public void deleteBrand(Integer id) {
        if (!brandRepository.existsById(id)) {
            throw new RuntimeException("Brand not found with ID: " + id);
        }
        brandRepository.deleteById(id);
    }

    //tìm thương hiệu theo tên
    public List<Brand> searchBrandsByName(String name) {
        return brandRepository.findByNameContainingIgnoreCase(name);
    }
}
