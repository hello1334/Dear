package com.dear.letterservice.domain.stampBuy.controller;

import com.dear.letterservice.domain.stamp.dto.GetPurchaseStampsListResponse;
import com.dear.letterservice.domain.stampBuy.dto.PurchaseStampRequest;
import com.dear.letterservice.domain.stampBuy.service.PurchaseStampService;
import com.dear.letterservice.global.dto.BaseResponse;
import com.dear.letterservice.global.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/purchase-stamps")
public class PurchaseStampController {

    private final JwtUtil jwtUtil;
    private final PurchaseStampService purchaseStampService;
    private final HttpServletRequest request;
    @PostMapping("")
    public ResponseEntity<BaseResponse<Void>> getStampDetail(@RequestBody PurchaseStampRequest purchaseStampRequest) {
        UUID userId = jwtUtil.extractUserId(request);
        purchaseStampService.purchaseStamp(userId, purchaseStampRequest.getStampId());
        return ResponseEntity.ok(BaseResponse.success(null));
    }

    @GetMapping("")
    public ResponseEntity<BaseResponse<List<GetPurchaseStampsListResponse>>> getPurchaseStampsList() {
        UUID userId = jwtUtil.extractUserId(request);
        List<GetPurchaseStampsListResponse> list = purchaseStampService.getPurchaseStampsList(userId);
        return ResponseEntity.ok(BaseResponse.success(list));
    }
}
