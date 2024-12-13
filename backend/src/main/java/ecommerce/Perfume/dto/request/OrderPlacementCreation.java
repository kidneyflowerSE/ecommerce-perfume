package ecommerce.Perfume.dto.request;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderPlacementCreation {
    String name;
    String email;
    String phone;
    String address;

    int paymentMethodId;
    int shippingId;

    String promoCode;

    List<TempCartCreation> tempCart;

    String returnUrl;
    String cancelUrl;

}