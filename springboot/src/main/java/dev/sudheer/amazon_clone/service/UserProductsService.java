package dev.sudheer.amazon_clone.service;

import dev.sudheer.amazon_clone.model.*;
import dev.sudheer.amazon_clone.repository.UserProductsRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserProductsService {

    private final UserProductsRepository userProductsRepository;
    private final ProductService productService;

    @Transactional
    public UserProducts addToCart(User user, String productId, int quantity) {
        ResponseEntity<Product> response = productService.getProductById(productId);
    
    if (!response.getStatusCode().equals(HttpStatus.OK) || response.getBody() == null) {
        throw new RuntimeException("Product not found");
    }
    
    Product product = response.getBody();
        
        // Check if product already in cart
        if (userProductsRepository.existsByUserAndProductAndStatus(user, product, UserProducts.Status.CART)) {
            throw new RuntimeException("Product already in cart");
        }

        double cost = product.getPrice() * quantity;
        
        UserProducts userProduct = new UserProducts(
                user,
                product,
                quantity,
                cost,
                "CART"
        );
        
        return userProductsRepository.save(userProduct);
    }

    @Transactional
    public UserProducts updateCartItem(String userProductId, int newQuantity) {
        UserProducts userProduct = userProductsRepository.findById(userProductId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        
        if (userProduct.getStatus() != UserProducts.Status.CART) {
            throw new RuntimeException("Only cart items can be updated");
        }
        
        double newCost = userProduct.getProduct().getPrice() * newQuantity;
        userProduct.setQuantity(newQuantity);
        userProduct.setCost(newCost);
        
        return userProductsRepository.save(userProduct);
    }

    @Transactional
    public void removeFromCart(String userProductId) {
        UserProducts userProduct = userProductsRepository.findById(userProductId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        
        if (userProduct.getStatus() != UserProducts.Status.CART) {
            throw new RuntimeException("Only cart items can be removed");
        }
        
        userProductsRepository.delete(userProduct);
    }

    public List<UserProducts> getUserCart(User user) {
        return userProductsRepository.findByUserAndStatus(user, UserProducts.Status.CART);
    }

    @Transactional
    public List<UserProducts> purchaseCartItems(User user) {
        List<UserProducts> cartItems = getUserCart(user);
        
        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }
        
        // Update status to PURCHASED
        cartItems.forEach(item -> {
            item.setStatus(UserProducts.Status.PURCHASED);
            userProductsRepository.save(item);
        });
        
        return cartItems;
    }

    public List<UserProducts> getPurchaseHistory(User user) {
        return userProductsRepository.findByUserAndStatus(user, UserProducts.Status.PURCHASED);
    }
}