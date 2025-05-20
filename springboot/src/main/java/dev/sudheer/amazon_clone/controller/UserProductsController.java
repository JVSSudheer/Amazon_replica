package dev.sudheer.amazon_clone.controller;

import dev.sudheer.amazon_clone.model.User;
import dev.sudheer.amazon_clone.model.UserProducts;
import dev.sudheer.amazon_clone.service.UserProductsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/userProducts")
@RequiredArgsConstructor
public class UserProductsController {

    private final UserProductsService userProductsService;

    @PostMapping("/cart")
    public ResponseEntity<UserProducts> addToCart(
            @AuthenticationPrincipal User user,
            @RequestParam String productId,
            @RequestParam(defaultValue = "1") int quantity) {
        return ResponseEntity.ok(
                userProductsService.addToCart(user, productId, quantity)
        );
    }

    @PutMapping("/cart/{id}")
    public ResponseEntity<UserProducts> updateCartItem(
            @PathVariable String id,
            @RequestParam int quantity) {
        return ResponseEntity.ok(
                userProductsService.updateCartItem(id, quantity)
        );
    }

    @DeleteMapping("/cart/{id}")
    public ResponseEntity<Void> removeFromCart(@PathVariable String id) {
        userProductsService.removeFromCart(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/cart")
    public ResponseEntity<List<UserProducts>> getUserCart(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(
                userProductsService.getUserCart(user)
        );
    }

    @PostMapping("/purchase")
    public ResponseEntity<List<UserProducts>> purchaseCartItems(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(
                userProductsService.purchaseCartItems(user)
        );
    }

    @GetMapping("/history")
    public ResponseEntity<List<UserProducts>> getPurchaseHistory(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(
                userProductsService.getPurchaseHistory(user)
        );
    }
}