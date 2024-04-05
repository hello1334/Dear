package com.dear.userservice.domain.scheduler.service;

import com.dear.userservice.domain.user.repository.entity.User;
import com.dear.userservice.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.Trigger;
import org.springframework.scheduling.TriggerContext;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.ScheduledFuture;

@Slf4j
@Service
@RequiredArgsConstructor
public class SchedulerService {

    private final UserService userService;

    private final ThreadPoolTaskScheduler taskScheduler;
    private final Map<UUID, ScheduledFuture<?>> scheduledTasks = new HashMap<>();

    @Scheduled(fixedDelay = Long.MAX_VALUE)
    public void onStartup() {
        log.info("Server start!");

        // 유저 계정 삭제 스케쥴링
        List<User> userList = userService.getWithdrawUsers();
        log.info("size = {}", userList.size());
        List<User> havoToDeleteUserList = new ArrayList<>();
        userList.forEach(user -> {

            if(!user.getWithdrawFlag() && user.getWithdrawAt() != null && LocalDateTime.now().isAfter(user.getWithdrawAt().plusDays(7))) {
                log.info("삭제 되어야 할 유저 = {}", user.getId());
                havoToDeleteUserList.add(user);
            } else if(user.getWithdrawAt() != null && LocalDateTime.now().isBefore(user.getWithdrawAt().plusDays(7))) {
                log.info("유저 삭제 예약 = {}", user.getId());
                scheduleWithdraw(user.getId(), user.getWithdrawAt());
            }
        });
        userService.deleteUsersTotally(havoToDeleteUserList);
    }

    public void scheduleWithdraw(UUID userId, LocalDateTime withdrawAt) {
        Runnable task = () -> {
            log.info("유저 계정 삭제 됨 = {}", userId);

            // 회원 삭제
            userService.deleteMyInfoTotally(userId);
        };

        // 스케줄된 작업 예약
        ScheduledFuture<?> scheduledTask = taskScheduler.schedule(task, new Trigger() {
            @Override
            public Instant nextExecution(TriggerContext triggerContext) {
                String cronExpression = convertToCronExpression(withdrawAt.plusDays(7));
                CronTrigger crontrigger = new CronTrigger(cronExpression);
                return crontrigger.nextExecution(triggerContext);
            }
        });
        scheduledTasks.put(userId, scheduledTask);
    }

    // 동적으로 스케줄된 작업을 제거
    public void cancelAllScheduledTasks() {
        scheduledTasks.forEach((userId, scheduledTask) -> {
            if (scheduledTask != null && !scheduledTask.isCancelled()) {
                scheduledTask.cancel(true);
            }
        });
        scheduledTasks.clear();
    }

    public void cancleWithdrawScheduledTask(UUID userId) {
        ScheduledFuture<?> scheduledTask = scheduledTasks.get(userId);
        if (scheduledTask != null && !scheduledTask.isCancelled()) {
            scheduledTask.cancel(true);
            scheduledTasks.remove(userId);
        }
    }

    private String convertToCronExpression(LocalDateTime localDateTime) {
        // LocalDateTime을 cron 표현식으로 변환
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("ss mm HH dd MM *");
        return localDateTime.format(formatter);
    }
}
