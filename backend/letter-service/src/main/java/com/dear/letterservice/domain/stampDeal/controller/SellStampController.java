package com.dear.letterservice.domain.stampDeal.controller;

import com.dear.letterservice.domain.stampDeal.dto.AddSellStampRequest;
import com.dear.letterservice.domain.stampDeal.dto.GetAvailableSellStampResponse;
import com.dear.letterservice.domain.stampDeal.dto.GetSellStampsListRequest;
import com.dear.letterservice.domain.stampDeal.dto.GetSellStampsListResponse;
import com.dear.letterservice.domain.stampDeal.service.SellStampService;
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
@RequestMapping("/sell-stamps")
public class SellStampController {
    private final JwtUtil jwtUtil;
    private final SellStampService sellStampService;
    private final HttpServletRequest request;

    @PostMapping("/search")
    public ResponseEntity<BaseResponse<GetSellStampsListResponse>> getSellStampsList(@RequestBody GetSellStampsListRequest getSellStampsListRequest) {
        GetSellStampsListResponse getSellStampsListResponse
                = sellStampService.getSellStampsList(getSellStampsListRequest.getPage(), getSellStampsListRequest.getSize(), getSellStampsListRequest.getSort(), getSellStampsListRequest.getKeyword());
        return ResponseEntity.ok(BaseResponse.success(getSellStampsListResponse));
    }

    @GetMapping("/available-stamps")
    public ResponseEntity<BaseResponse<List<GetAvailableSellStampResponse>>> getAvailableSellStampsList() {
        UUID userId = jwtUtil.extractUserId(request);
        List<GetAvailableSellStampResponse> list = sellStampService.getAvailableSellStampList(userId);
        return ResponseEntity.ok(BaseResponse.success(list));
    }

    @PostMapping("")
    public ResponseEntity<BaseResponse<Void>> addSellStamp(@RequestBody AddSellStampRequest addSellStampRequest) {
        UUID userId = jwtUtil.extractUserId(request);
        sellStampService.addSellStamp(userId, addSellStampRequest);
        return ResponseEntity.ok(BaseResponse.success(null));
    }
}
