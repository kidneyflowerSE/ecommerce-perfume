package ecommerce.Perfume.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Cho phép tất cả các domain truy cập (cẩn thận với vấn đề bảo mật nếu bạn làm thế)
        registry.addMapping("/api/**") // Chỉ định các đường dẫn API cần cấu hình CORS
                .allowedOrigins("http://localhost:5173") // Thêm domain frontend của bạn
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Các phương thức HTTP cho phép
                .allowedHeaders("*") // Cho phép tất cả headers
                .allowCredentials(true); // Nếu cần gửi cookie hoặc authorization headers
    }
}