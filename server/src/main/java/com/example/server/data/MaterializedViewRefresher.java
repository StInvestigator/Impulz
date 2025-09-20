package com.example.server.data;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class MaterializedViewRefresher {

    private final JdbcTemplate jdbc;

    public MaterializedViewRefresher(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @Scheduled(cron = "0 0 0 * * *")
    public void refreshMonthlyPlays() {
        jdbc.execute("REFRESH MATERIALIZED VIEW CONCURRENTLY author_monthly_plays");
    }
}


