package com.sellis.server.model;

public class PriceRange {

    private double min;
    private double max;

    public PriceRange() {}

    public PriceRange(double min, double max) {
        this.min = min;
        this.max = max;
    }

    public double getMin() { return min; }
    public void setMin(double min) { this.min = min; }
    public double getMax() { return max; }
    public void setMax(double max) { this.max = max; }
}
