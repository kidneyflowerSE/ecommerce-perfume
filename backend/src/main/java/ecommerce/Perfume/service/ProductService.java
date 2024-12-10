package ecommerce.Perfume.service;

import ecommerce.Perfume.dto.request.ProductCreation;
import ecommerce.Perfume.model.Brand;
import ecommerce.Perfume.model.Product;
import ecommerce.Perfume.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    ProductRepository productRepository;

    //tạo sản phẩm
    public Product createProduct(ProductCreation productCreation) {
        Product product = new Product();

        product.setName(productCreation.getName());
        product.setDescription(productCreation.getDescription());
        product.setPrice(productCreation.getPrice());
        product.setStock(productCreation.getStock());
        product.setImageUrl(productCreation.getImageUrl());
        product.setBrand(productCreation.getBrand());
        product.setCategory(productCreation.getCategory());
        product.setCreatedAt(LocalDateTime.now());
        product.setUpdatedAt(LocalDateTime.now());

        return productRepository.save(product);
    }

    // 2. Cập nhật sản phẩm
    public Product updateProduct(Integer productId, ProductCreation productCreation) {
        Optional<Product> productOptional = productRepository.findById(productId);
        if (productOptional.isEmpty()) {
            throw new RuntimeException("Product not found with ID: " + productId);
        }
        Product product = productOptional.get();
        product.setName(productCreation.getName());
        product.setDescription(productCreation.getDescription());
        product.setPrice(productCreation.getPrice());
        product.setStock(productCreation.getStock());
        product.setImageUrl(productCreation.getImageUrl());
        product.setBrand(productCreation.getBrand());
        product.setCategory(productCreation.getCategory());
        product.setUpdatedAt(LocalDateTime.now());
        return productRepository.save(product);
    }

    // 3. Xóa sản phẩm
    public void deleteProduct(Integer productId) {
        if (!productRepository.existsById(productId)) {
            throw new RuntimeException("Product not found with ID: " + productId);
        }
        productRepository.deleteById(productId);
    }

    // 4. Tìm sản phẩm theo ID
    public Product getProductById(Integer productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + productId));
    }

    // 5. Lấy danh sách sản phẩm
    public List<Product> getAllProducts() {
        List<Product> products = productRepository.findAll();
        System.out.println(products);
        return products;
    }

    // 6. Lọc sản phẩm theo thương hiệu
    public List<Product> getProductsByBrand(String brandName) {
        return productRepository.findByBrandName(brandName);
    }

    // 7. Lọc sản phẩm theo danh mục
    public List<Product> getProductsByCategory(String categoryName) {
        return productRepository.findByCategoryName(categoryName);
    }

    // 8. Tìm kiếm sản phẩm
    public List<Product> searchProducts(String keyword) {
        return productRepository.findByNameContainingIgnoreCase(keyword);
    }

    // 9. Cập nhật số lượng tồn kho
    public Product updateStock(Integer productId, int newStock) {
        Product product = getProductById(productId);
        product.setStock(newStock);
        product.setUpdatedAt(LocalDateTime.now());
        return productRepository.save(product);
    }

    // 10. Lọc sản phẩm theo giá
    public List<Product> filterProductsByPrice(BigDecimal minPrice, BigDecimal maxPrice){
        return productRepository.findByPriceBetween(minPrice, maxPrice);
    }
}
