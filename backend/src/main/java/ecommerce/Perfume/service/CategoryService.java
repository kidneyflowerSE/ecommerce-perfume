package ecommerce.Perfume.service;

import ecommerce.Perfume.dto.request.CategoryCreation;
import ecommerce.Perfume.model.Category;
import ecommerce.Perfume.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    //tạo danh mục
    public Category createCategory(CategoryCreation request) {
        Category category = new Category();

        category.setName(request.getName());
        category.setDescription(request.getDescription());

        return categoryRepository.save(category);
    }

    //lấy tất cả danh mục
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    //lấy danh mục theo id
    public Category getCategoryById(int id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with ID: " + id));
    }

    //cập nhật danh mục
    public Category updateCategory(int id, Category categoryDetails) { // sửa id thành int
        Category existingCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with ID: " + id));

        existingCategory.setName(categoryDetails.getName());
        existingCategory.setDescription(categoryDetails.getDescription());
        return categoryRepository.save(existingCategory);
    }

    //xoá danh mục theo id
    public void deleteCategory(int id) { // sửa id thành int
        categoryRepository.deleteById(id);
    }

    //tìm kiếm danh mục theo tên
    public List<Category> searchCategoriesByName(String name) {
        return categoryRepository.findByNameContainingIgnoreCase(name);
    }
}
