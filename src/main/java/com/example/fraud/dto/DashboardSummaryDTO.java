package com.example.fraud.dto;

public class DashboardSummaryDTO {

    private long approved;
    private long flagged;
    private long pending;

    // Constructor
    public DashboardSummaryDTO(long approved, long flagged, long pending) {
        this.approved = approved;
        this.flagged = flagged;
        this.pending = pending;
    }

    // Getters (These are required for Spring to create the JSON)
    public long getApproved() {
        return approved;
    }

    public long getFlagged() {
        return flagged;
    }

    public long getPending() {
        return pending;
    }
}