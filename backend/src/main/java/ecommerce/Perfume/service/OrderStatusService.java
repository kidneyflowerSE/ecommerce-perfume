package ecommerce.Perfume.service;

import ecommerce.Perfume.model.OrderStatus;
import ecommerce.Perfume.repository.OrderStatusRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class OrderStatusService {

    @Autowired
    private OrderStatusRepository orderStatusRepository;

    // Tạo mới OrderStatus
    public OrderStatus createOrderStatus(OrderStatus orderStatus) {
        return orderStatusRepository.save(orderStatus);
    }

    // Lấy OrderStatus theo ID
    public Optional<OrderStatus> getOrderStatusById(Integer id) {
        return orderStatusRepository.findById(id);
    }

    // Lấy tất cả OrderStatuses
    public List<OrderStatus> getAllOrderStatuses() {
        return orderStatusRepository.findAll();
    }

    // Cập nhật OrderStatus
    public OrderStatus updateOrderStatus(Integer id, OrderStatus updatedOrderStatus) {
        Optional<OrderStatus> existingOrderStatus = orderStatusRepository.findById(id);
        if (existingOrderStatus.isPresent()) {
            OrderStatus orderStatus = existingOrderStatus.get();
            orderStatus.setStatusName(updatedOrderStatus.getStatusName());
            orderStatus.setDescription(updatedOrderStatus.getDescription());
            return orderStatusRepository.save(orderStatus);
        }
        throw new IllegalArgumentException("OrderStatus with ID " + id + " not found.");
    }

    // Xoá OrderStatus
    public void deleteOrderStatus(Integer id) {
        if (orderStatusRepository.existsById(id)) {
            orderStatusRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("OrderStatus with ID " + id + " not found.");
        }
    }
}
