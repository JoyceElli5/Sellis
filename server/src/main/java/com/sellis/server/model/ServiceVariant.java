package com.sellis.server.model;

public class ServiceVariant {

    private String name;
    private double price;

    public ServiceVariant() {}

    public ServiceVariant(String name, double price) {
        this.name = name;
        this.price = price;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
}
