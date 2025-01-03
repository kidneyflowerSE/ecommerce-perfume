package ecommerce.Perfume.service;

import ecommerce.Perfume.dto.request.ProductDto;
import ecommerce.Perfume.model.Brand;
import ecommerce.Perfume.model.Product;
import ecommerce.Perfume.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProductService {
    @Autowired
    ProductRepository productRepository;

    //tạo sản phẩm
    public Product createProduct(Product productCreation) {
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

    // Cập nhật sản phẩm
    public Product updateProduct(Integer productId, Product productCreation) {
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

    // Xóa sản phẩm
    public void deleteProduct(Integer productId) {
        if (!productRepository.existsById(productId)) {
            throw new RuntimeException("Product not found with ID: " + productId);
        }
        productRepository.deleteById(productId);
    }

    // Tìm sản phẩm theo ID
    public Product getProductById(Integer productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + productId));
    }

    // Lấy danh sách sản phẩm
    public List<Product> getAllProducts() {
        List<Product> products = productRepository.findAll();
        System.out.println(products);
        return products;
    }

    // Lọc sản phẩm theo thương hiệu
    public List<Product> getProductsByBrand(String brandName) {
        return productRepository.findByBrandName(brandName);
    }

    // Lọc sản phẩm theo danh mục
    public List<Product> getProductsByCategory(String categoryName) {
        return productRepository.findByCategoryName(categoryName);
    }

    // Tìm kiếm sản phẩm theo tên
    public List<Product> searchProducts(String keyword) {
        return productRepository.findByNameContainingIgnoreCase(keyword);
    }

    // Cập nhật số lượng tồn kho
    public Product updateStock(Integer productId, int newStock) {
        Product product = getProductById(productId);
        product.setStock(newStock);
        product.setUpdatedAt(LocalDateTime.now());
        return productRepository.save(product);
    }

    // Lọc sản phẩm theo giá
    public List<Product> filterProductsByPrice(BigDecimal minPrice, BigDecimal maxPrice){
        return productRepository.findByPriceBetween(minPrice, maxPrice);
    }

    // Lọc sản phẩm theo quốc gia
    public List<Product> getProductsByCountry(String country) {
        return productRepository.findProductsByBrandCountry(country);
    }

    // Lấy top 10 sản phẩm bán chạy nhất
    public List<ProductDto> getTop10BestSellingProducts() {
        List<Object[]> results = productRepository.findTop10BestSellingProducts();

        return results.stream().map(row -> {
            ProductDto product = new ProductDto();
            product.setId((Integer) row[0]);
            product.setName((String) row[1]);
            product.setPrice((BigDecimal) row[2]);
            product.setDescription((String) row[3]);
            product.setImageUrl((String) row[4]);
            product.setBrandName((String) row[5]);

            return product;
        }).collect(Collectors.toList());
    }
}
