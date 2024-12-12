package ecommerce.Perfume.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.github.cdimascio.dotenv.Dotenv;
import vn.payos.PayOS;

@Configuration
public class PayOSConfig {
    Dotenv dotenv = Dotenv.configure().load();

    private String clientId = dotenv.get("PAYOS_CLIENT_ID");
    private String apiKey = dotenv.get("PAYOS_API_KEY");
    private String checksumKey = dotenv.get("PAYOS_CHECKSUM_KEY");

    @Bean
    public PayOS payOS() {
        return new PayOS(clientId, apiKey, checksumKey);
    }
}