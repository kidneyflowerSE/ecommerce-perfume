package ecommerce.Perfume.controller;

import ecommerce.Perfume.dto.request.ProductCreation;
import ecommerce.Perfume.model.Product;
import ecommerce.Perfume.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Products")
public class ProductController {

    @Autowired
    private ProductService productService;

    // Tạo sản phẩm mới
    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody ProductCreation productCreation) {
        Product product = productService.createProduct(productCreation);
        return ResponseEntity.status(201).body(product);
    }

    // Cập nhật sản phẩm
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Integer id,
                                                 @RequestBody ProductCreation productCreation) {
        Product updatedProduct = productService.updateProduct(id, productCreation);
        return ResponseEntity.ok(updatedProduct);
    }

    // Xóa sản phẩm
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Integer id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    // Lấy sản phẩm theo ID
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Integer id) {
        Product product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    // Lấy tất cả sản phẩm
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        productService.checkConnection();
        return ResponseEntity.ok(products);
    }

    // Lọc sản phẩm theo thương hiệu
    @GetMapping("/brand/{brandName}")
    public ResponseEntity<List<Product>> getProductsByBrand(@PathVariable String brandName) {
        List<Product> products = productService.getProductsByBrand(brandName);
        return ResponseEntity.ok(products);
    }

    // Lọc sản phẩm theo danh mục
    @GetMapping("/category/{categoryName}")
    public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable String categoryName) {
        List<Product> products = productService.getProductsByCategory(categoryName);
        return ResponseEntity.ok(products);
    }

    // Tìm kiếm sản phẩm theo tên
    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String keyword) {
        List<Product> products = productService.searchProducts(keyword);
        return ResponseEntity.ok(products);
    }

    // Cập nhật số lượng tồn kho
    @PutMapping("/{id}/stock")
    public ResponseEntity<Product> updateStock(@PathVariable Integer id, @RequestParam int newStock) {
        Product updatedProduct = productService.updateStock(id, newStock);
        return ResponseEntity.ok(updatedProduct);
    }
}
