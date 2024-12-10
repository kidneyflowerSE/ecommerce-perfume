package ecommerce.Perfume.service;

import ecommerce.Perfume.model.Admin;
import ecommerce.Perfume.model.Role;
import ecommerce.Perfume.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    // Tạo Admin
    public Admin createAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    // Lấy Admin theo ID
    public Optional<Admin> getAdminById(Integer id) {
        return adminRepository.findById(id);
    }

    // Lấy tất cả Admins
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    // Cập nhật Admin
    public Admin updateAdmin(Integer id, Admin updatedAdmin) {
        Optional<Admin> existingAdmin = adminRepository.findById(id);
        if (existingAdmin.isPresent()) {
            Admin admin = existingAdmin.get();
            admin.setName(updatedAdmin.getName());
            admin.setEmail(updatedAdmin.getEmail());
            admin.setRole(updatedAdmin.getRole());
            if (updatedAdmin.getPassword() != null) {
                admin.setPassword(updatedAdmin.getPassword());
            }
            return adminRepository.save(admin);
        }
        throw new IllegalArgumentException("Admin with ID " + id + " not found.");
    }

    // Xoá Admin
    public void deleteAdmin(Integer id) {
        if (adminRepository.existsById(id)) {
            adminRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Admin with ID " + id + " not found.");
        }
    }

    // Login
    public Admin login(String email, String password) {
        Optional<Admin> adminOpt = adminRepository.findByEmail(email);
        if (adminOpt.isPresent()) {
            Admin admin = adminOpt.get();
            if (admin.getPassword().equals(password)) {
                return admin;
            }
        }
        throw new IllegalArgumentException("Invalid email or password.");
    }

    // Đổi mật khẩu
    public void changePassword(Integer id, String oldPassword, String newPassword) {
        Optional<Admin> adminOpt = adminRepository.findById(id);
        if (adminOpt.isPresent()) {
            Admin admin = adminOpt.get();
            if (admin.getPassword().equals(oldPassword)) {
                admin.setPassword(newPassword);
                adminRepository.save(admin);
            } else {
                throw new IllegalArgumentException("Old password is incorrect.");
            }
        } else {
            throw new IllegalArgumentException("Admin with ID " + id + " not found.");
        }
    }

    // Đăng ký vai trò
    public Admin assignRole(Integer id, Role role) {
        Optional<Admin> adminOpt = adminRepository.findById(id);
        if (adminOpt.isPresent()) {
            Admin admin = adminOpt.get();
            admin.setRole(role);
            return adminRepository.save(admin);
        }
        throw new IllegalArgumentException("Admin with ID " + id + " not found.");
    }
}
