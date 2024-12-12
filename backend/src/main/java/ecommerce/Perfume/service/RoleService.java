package ecommerce.Perfume.service;

import ecommerce.Perfume.model.Role;
import ecommerce.Perfume.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    // Tạo mới Role
    public Role createRole(Role role) {
        return roleRepository.save(role);
    }

    // Lấy Role theo ID
    public Optional<Role> getRoleById(Integer id) {
        return roleRepository.findById(id);
    }

    // Lấy tất cả Roles
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    // Cập nhật Role
    public Role updateRole(Integer id, Role updatedRole) {
        Optional<Role> existingRole = roleRepository.findById(id);
        if (existingRole.isPresent()) {
            Role role = existingRole.get();
            role.setRoleName(updatedRole.getRoleName());
            role.setPermissions(updatedRole.getPermissions());
            return roleRepository.save(role);
        }
        throw new IllegalArgumentException("Role with ID " + id + " not found.");
    }

    // Xoá Role
    public void deleteRole(Integer id) {
        if (roleRepository.existsById(id)) {
            roleRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Role with ID " + id + " not found.");
        }
    }
}
