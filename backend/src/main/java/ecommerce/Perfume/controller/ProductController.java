package ecommerce.Perfume.controller;

import ecommerce.Perfume.dto.request.ProductCreation;
import ecommerce.Perfume.model.Product;
import ecommerce.Perfume.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    // Tạo sản phẩm mới
    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody ProductCreation productCreation) {
        Product product = productService.createProduct(productCreation);
        return new ResponseEntity<>(product, HttpStatus.CREATED);
    }

    // Cập nhật sản phẩm
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Integer id,
                                                 @RequestBody ProductCreation productCreation) {
        Product updatedProduct = productService.updateProduct(id, productCreation);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }

    // Xóa sản phẩm
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Integer id) {/**/
        productService.deleteProduct(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Lấy sản phẩm theo ID
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Integer id) {
        Product product = productService.getProductById(id);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    // Lấy tất cả sản phẩm
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    // Lọc sản phẩm theo thương hiệu
    @GetMapping("/brand/{brandName}")
    public ResponseEntity<List<Product>> getProductsByBrand(@PathVariable String brandName) {
        List<Product> products = productService.getProductsByBrand(brandName);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    // Lọc sản phẩm theo danh mục
    @GetMapping("/category/{categoryName}")
    public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable String categoryName) {
        List<Product> products = productService.getProductsByCategory(categoryName);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    // Tìm kiếm sản phẩm theo tên
    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String keyword) {
        List<Product> products = productService.searchProducts(keyword);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    // Cập nhật số lượng tồn kho
    @PutMapping("/{id}/stock")
    public ResponseEntity<Product> updateStock(@PathVariable Integer id, @RequestParam int newStock) {
        Product updatedProduct = productService.updateStock(id, newStock);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }

    // Lọc sản phẩm theo giá
    @GetMapping("/filterByPrice")
    public ResponseEntity<List<Product>> filterProductsByPrice(@RequestParam BigDecimal minPrice, @RequestParam BigDecimal maxPrice) {
        List<Product> products = productService.filterProductsByPrice(minPrice, maxPrice);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
}
