REFRESH MATERIALIZED VIEW author_monthly_plays;

CREATE UNIQUE INDEX idx_author_monthly_index
    ON author_monthly_plays (author_id, month);
