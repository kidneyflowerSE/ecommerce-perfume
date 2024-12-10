package ecommerce.Perfume.controller;

import ecommerce.Perfume.dto.request.BrandCreation;
import ecommerce.Perfume.model.Brand;
import ecommerce.Perfume.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/brands")
public class BrandController {

    @Autowired
    private BrandService brandService;

    // Tạo thương hiệu mới
    @PostMapping
    public ResponseEntity<Brand> createBrand(@RequestBody BrandCreation brandCreation) {
        Brand brand = brandService.createBrand(brandCreation);
        return new ResponseEntity<>(brand, HttpStatus.CREATED);
    }

    // Lấy danh sách thương hiệu
    @GetMapping
    public ResponseEntity<List<Brand>> getAllBrands() {
        List<Brand> brands = brandService.getAllBrands();
        return new ResponseEntity<>(brands, HttpStatus.OK);
    }

    // Lấy thương hiệu theo id
    @GetMapping("/{id}")
    public ResponseEntity<Brand> getBrandById(@PathVariable Integer id) {
        Brand brand = brandService.getBrandById(id);
        return new ResponseEntity<>(brand, HttpStatus.OK);
    }

    // Cập nhật thương hiệu
    @PutMapping("/{id}")
    public ResponseEntity<Brand> updateBrand(@PathVariable Integer id, @RequestBody Brand brandDetails) {
        Brand updatedBrand = brandService.updateBrand(id, brandDetails);
        return new ResponseEntity<>(updatedBrand, HttpStatus.OK);
    }

    // Xoá thương hiệu
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBrand(@PathVariable Integer id) {
        brandService.deleteBrand(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Lọc thương hiệu theo tên
    @GetMapping("/search")
    public ResponseEntity<List<Brand>> searchBrandsByName(@RequestParam String name) {
        List<Brand> brands = brandService.searchBrandsByName(name);
        return new ResponseEntity<>(brands, HttpStatus.OK);
    }
}
