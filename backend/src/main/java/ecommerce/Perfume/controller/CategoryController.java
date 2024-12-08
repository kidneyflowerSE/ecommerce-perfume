package ecommerce.Perfume.controller;

import ecommerce.Perfume.dto.request.CategoryCreation;
import ecommerce.Perfume.model.Category;
import ecommerce.Perfume.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/{id}")
    public Category getCategoryById(@PathVariable Integer id) {
        return categoryService.getCategoryById(id);
    }

    @GetMapping("/search")
    public List<Category> searchCategoriesByName(@RequestParam String name) {
        return categoryService.searchCategoriesByName(name);
    }

    @PostMapping
    public Category createCategory(@RequestBody CategoryCreation category) {
        return categoryService.createCategory(category);
    }

    @PutMapping("/{id}")
    public Category updateCategory(@PathVariable Integer id, @RequestBody Category categoryDetails) {
        return categoryService.updateCategory(id, categoryDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable Integer id) {
        categoryService.deleteCategory(id);
    }
}
